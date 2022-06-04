<?php
namespace App\Http\Controllers\API;
use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use \Auth; 
use App\Models\User; 
use Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Carbon\Carbon;
use DB;
use Redirect;
class AuthController extends Controller 
{
  
   private $apiToken;
   public function __construct()
    {
    $this->apiToken = uniqid(base64_encode(Str::random(40)));
    }
  /** 
   * 
   * @return \Illuminate\Http\Response 
   */ 
  public function getCurrentUser($request){
    $us = DB::table('users')
    ->where('users.email','=', $request)
    ->select('users.*')
    ->get();
    return response()->json([
      'user'=>$us
    ]);
  }
  public function show(User $user)
  {
      return response()->json([
          'user'=>$user
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
              'message'=>$e->getMessage()
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
    $postArray = $request->all(); 
   
    $postArray['password'] = bcrypt($postArray['password']);
    $postArray['fullaccess'] = 'no';
    $user = User::create($postArray); 
    
    $success['token'] = $this->apiToken;  
    $success['name'] =  $user->name;
    return response()->json([
      'status' => 'success',
      'data' => $success,
    ]); 
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

  public function login(Request $request){ 
    //Validación de usuario
    if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
      
      $user = Auth::user(); 
    //Asgnando toquen exitoso
    $success['token'] = $this->apiToken;
    $success['email'] =  $user->email;
    $fullaccess = DB::table('users')
    ->where('users.email','=',$request->email)
    ->select('users.fullaccess')
    ->get();
      return response()->json([
        'status' => 'success',
        'data' => $success,
        'entered' => $request,
        'fullaccess' => $fullaccess
      ]); 
      
    } else { 
      return response()->json([
        'status' => 'error',
        'data' => 'Unauthorized Access',
        'entered' => $request
      ]); 
    } 
  }
}