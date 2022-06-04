<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use App\Models\Shop;
use Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Carbon\Carbon;

class ShopsController extends Controller
{
    public function show(Shop $shop)
    {
        return response()->json([
            'shop'=>$shop
        ]);
    }
    public function index(){
        return Shop::all();
    }
    public function getAll(){
        $now = Carbon::now();
        return DB::table('Shops')
        ->join('dates', 'dates.id_Shops', '=', 'Shops.id')
        ->select('count(dates.id)')
        ->where('dates.ok','=','true')
        ->whereMonth('dates.date','=',now()->month)
        ->whereYear('dates.date','=',now()->year)
        ->groupBy('dates.date')
        ->get();
    }

    public function update(Request $request, Shop $shop)
    {

        try{

            $shop->fill($request->post())->update();

            if($request->hasFile('image')){

                // remove old image
                if($shop->image){
                    $exists = Storage::disk('public')->exists("shops/image/{$shop->image}");
                    if($exists){
                        Storage::disk('public')->delete("shops/image/{$shop->image}");
                    }
                }

                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('shops/image', $request->image,$imageName);
                $shop->url = $imageName;
                $shop->save();
            }

            return response()->json([
                'message'=>'Shops Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>$e->getMessage()
            ],500);
        }
    }

    public function store(Request $request)
    {

        try{
            $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('shops/image', $request->image,$imageName);
            Shop::create($request->post()+['url'=>$imageName]);

            return response()->json([
                'message'=>'The Shop has been created'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>$e->getMessage()
            ],500);
        }
    }
    public function destroy(Shop $shop)
    {
        try {

            if($shop->url){
                $exists = Storage::disk('public')->exists("shops/image/{$shop->url}");
                if($exists){
                    Storage::disk('public')->delete("shops/image/{$shop->url}");
                }
            }

            $shop->delete();

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