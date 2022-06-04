<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use App\Models\Service;
use Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Carbon\Carbon;

class ServicesController extends Controller
{
    public function show(Service $service)
    {
        return response()->json([
            'service'=>$service
        ]);
    }

    public function index(){
        return Service::all();
    }
    public function update(Request $request, Service $service)
    {

        try{

            $service->fill($request->post())->update();

            if($request->hasFile('image')){

                // remove old image
                if($service->image){
                    $exists = Storage::disk('public')->exists("service/image/{$service->image}");
                    if($exists){
                        Storage::disk('public')->delete("service/image/{$service->image}");
                    }
                }

                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('service/image', $request->image,$imageName);
                $service->url = $imageName;
                $service->save();
            }

            return response()->json([
                'message'=>'Service Updated Successfully!!'
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
        $request->validate([
            'name'=>'required',
            'description'=>'required',
            'image'=>'required|image'
        ]);

        try{
            $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('service/image', $request->image,$imageName);
            Service::create($request->post()+['url'=>$imageName]);

            return response()->json([
                'message'=>'The srvice has been created'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>$e->getMessage()
            ],500);
        }
    }

    
    public function destroy(Service $service)
    {
        try {

            if($service->url){
                $exists = Storage::disk('public')->exists("service/image/{$service->url}");
                if($exists){
                    Storage::disk('public')->delete("service/image/{$service->url}");
                }
            }

            $service->delete();

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