<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use App\Models\style;
use Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Carbon\Carbon;

class StylesController extends Controller
{
    public function show(style $style)
    {
        return response()->json([
            'style'=>$style
        ]);
    }
    public function index(){
        return style::all();
    }
    public function getAll(){
        return DB::table('styles')
        ->join('services', 'services.id', '=', 'styles.id_service')
        ->select('styles.*', 'services.name as sname')
        ->get();
    }

    public function update(Request $request, style $style)
    {

        try{

            $style->fill($request->post())->update();

            if($request->hasFile('image')){

                // remove old image
                if($style->image){
                    $exists = Storage::disk('public')->exists("style/image/{$style->image}");
                    if($exists){
                        Storage::disk('public')->delete("style/image/{$style->image}");
                    }
                }

                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('style/image', $request->image,$imageName);
                $style->url = $imageName;
                $style->save();
            }

            return response()->json([
                'message'=>'Style Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a Service!!'
            ],500);
        }
    }

    public function store(Request $request)
    {

        try{
            $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('style/image', $request->image,$imageName);
            style::create($request->post()+['url'=>$imageName]);

            return response()->json([
                'message'=>'The style has been created'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>$e->getMessage()
            ],500);
        }
    }
    public function destroy(Style $style)
    {
        try {

            if($style->url){
                $exists = Storage::disk('public')->exists("style/image/{$style->url}");
                if($exists){
                    Storage::disk('public')->delete("style/image/{$style->url}");
                }
            }

            $style->delete();

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