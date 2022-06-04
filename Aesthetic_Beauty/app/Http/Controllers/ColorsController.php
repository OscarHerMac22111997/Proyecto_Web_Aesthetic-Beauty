<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;

use App\Models\Color;

use Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Carbon\Carbon;

class ColorsController extends Controller
{
    public function show(Color $color)
    {
        return response()->json([
            'color'=>$color
        ]);
    }

    public function index(){
        return Color::all();
    }

    public function getAll(){
        return DB::table('colors')
        ->join('styles', 'styles.id', '=', 'colors.id_style')
        ->select('colors.*', 'styles.name as sname')
        ->orderBy('styles.name')
        ->get();
    }

    public function update(Request $request, Color $color)
    {

        try{

            $color->fill($request->post())->update();

            if($request->hasFile('image')){

                // remove old image
                if($color->image){
                    $exists = Storage::disk('public')->exists("color/image/{$color->image}");
                    if($exists){
                        Storage::disk('public')->delete("color/image/{$color->image}");
                    }
                }

                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('color/image', $request->image,$imageName);
                $color->url = $imageName;
                $color->save();
            }

            return response()->json([
                'message'=>'color Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a Color!!'
            ],500);
        }
    }
    
    public function store(Request $request)
    {

        try{
            $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('color/image', $request->image,$imageName);
            Color::create($request->post()+['url'=>$imageName]);

            return response()->json([
                'message'=>'The color has been created'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>$e->getMessage()
            ],500);
        }
    }
    public function destroy(Color $color)
    {
        try {

            if($color->url){
                $exists = Storage::disk('public')->exists("color/image/{$color->url}");
                if($exists){
                    Storage::disk('public')->delete("color/image/{$color->url}");
                }
            }

            $color->delete();

            return response()->json([
                'message'=>'Backend Message: Is Ok profe!'
            ]);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Backend Message: is not working, please check the code. :)'
            ]);
        }
    }
    
}