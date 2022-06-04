<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;

use App\Models\Stylist;

use App\Models\User;

use Auth;
use Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Carbon\Carbon;

class StylistsController extends Controller
{
    private $apiToken;
    public function __construct()
    {
        $this->apiToken = uniqid(base64_encode(Str::random(40)));
    }

    public function show(User $user)
    {
        return response()->json([
            'users'=>$user
        ]);
    }

    public function index(){
        return User::all();
    }

    public function getAll(){
        $now = Carbon::now();
        return DB::table('users')
        ->join('shops', 'shops.id','=','users.id_shop')
        ->select('users.*', 'shops.name as shopname')
        ->where('users.fullaccess','=','soso')
        ->get();
    }

    public function getStatics(){
        $now = Carbon::now();
        $resultado = DB::table('users')
        ->join('dates', 'dates.id_stylist', '=', 'users.id')
        ->where('dates.ok','=', '1')
        ->whereMonth('dates.date','=',now()->month)
        ->whereYear('dates.date','=',now()->year)
        ->groupBy('dates.date')
        ->select(DB::raw('count(dates.id) as stylistwork, month(dates.date) as mes'))
        ->get(); 
        return response()->json([
            'statics'=>$resultado
        ]);
    }

    public function update(Request $request, User $user)
    {

        try{

            $user->fill($request->post())->update();

            if($request->hasFile('image')){

                // remove old image
                if($user->image){
                    $exists = Storage::disk('public')->exists("stylist/image/{$user->image}");
                    if($exists){
                        Storage::disk('public')->delete("stylist/image/{$user->image}");
                    }
                }

                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('stylist/image', $request->image,$imageName);
                $user->url = $imageName;
                $user->save();
            }

            return response()->json([
                'message'=>'Correctly updated'            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a stylist!!'
            ],500);
        }
    }
    public function register(Request $request) 
    { 
      
      $validator = Validator::make($request->all(), [ 
        'name' => 'required', 
        'email' => 'required|email', 
        'password' => 'required', 
        
      ]);
  
      if ($validator->fails()) { 
        return response()->json(['errorXD'=>$validator->errors()]);
      }
      $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
      Storage::disk('public')->putFileAs('stylist/image', $request->image,$imageName);

      $postArray = $request->all(); 
     
      $postArray['password'] = bcrypt($postArray['password']);
  
      $user = User::create($postArray+['url'=>$imageName]); 
      
      $success['token'] = $this->apiToken;  
      $success['name'] =  $user->name;
      return response()->json([
        'status' => 'success',
        'data' => $success,
      ]); 
    }

    public function store(Request $request)
    {

        try{
            $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('stylist/image', $request->image,$imageName);
            User::create($request->post()+['url'=>$imageName]);

            return response()->json([
                'message'=>'The stylist has been created'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>$e->getMessage()
            ],500);
        }
    }
    public function destroy(User $user)
    {
        try {

            if($user->url){
                $exists = Storage::disk('public')->exists("stylist/image/{$user->url}");
                if($exists){
                    Storage::disk('public')->delete("stylist/image/{$user->url}");
                }
            }

            $user->delete();

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