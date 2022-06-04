<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use App\Models\Date;
use Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Carbon\Carbon;

class DatesController extends Controller
{
    public function show(Dates $dates)
    {
        return response()->json([
            'dates'=>$dates
        ]);
    }
    public function mydates($request){
        $query = DB::table('dates')
        ->join('users', 'dates.id_stylist','=','users.id')
        ->join('services','dates.id_service','=','services.id')
        ->join('shops','dates.id_shop','=','shops.id')
        ->join('styles','dates.id_style','=','styles.id')
        ->join('colors','dates.id_color','=','colors.id')
        ->where('dates.id_client','=',$request)
        ->where('users.fullaccess','=','soso')
        ->select('dates.id as iddate', 'shops.name as shopname','users.name as username','users.url as stylistfoto','shops.url as shopfoto','services.name as servicename',
        'styles.name as stylename','colors.name as colorname','colors.url as colorfoto','dates.date as date',
        'dates.hour as hour', 'styles.cost as cost', 'dates.ok as ok', 'dates.payed as payed')
        ->get();
        return response()->json([
            'dates'=>$query
        ]);
    }
    public function getAvailableServices($request){

        $sql = DB::table('services')
        ->join('dates', 'dates.id_service','=','services.id')
        ->join('users', 'dates.id_client','=','users.id')
        ->where('dates.date','>=',now()->toDateString())
        ->where('dates.id_client','=',$request)
        ->groupBy('dates.id_service')
        ->select('dates.id_service')
        ->get();
        return $sql;
    }
    public function getAvailable(Request $request){
        $query = DB::select('select dates.hour as nope, count(dates.hour) as counted, (select count(users.id) 
            from users inner join shops on shops.id = users.id_shop where shops.id = 
            ? group by (users.id_shop)) as XD from dates
            where dates.date = ?
            group by dates.hour',
           [$request->id_shop, $request->date]);
       
       return $query;
    }
    public function getAvailableStylist(Request $request){
        $query = DB::select('select users.id as id from users
        inner join shops on users.id_shop = shops.id
        where shops.id = ? and
        users.fullaccess = ?
        and users.id not in
        (select users.id from users
        inner join dates on dates.id_stylist = users.id
        where dates.fulldate = ? and users.id_shop = ?) group by users.id limit 1',
           [$request->id_shop, $request->access, $request->date, $request->id_shop]);
      

       return $query;
    }

    public function index(){
        return Dates::all();
    }
    public function countingDates(Request $request){
        

    } 

    public function getNextUserDate($request){

            $date = DB::table('Dates')
            ->join('shops', 'shops.id','=','dates.id_shop')
            ->join('users', 'users.id_shop','=','shops.id')
            ->where('dates.date','>=',now()->toDateString())
            ->where('dates.ok','=','0')
            ->where ('dates.id_client','=',$request)
            ->orderBy('dates.date')
            ->orderBy('dates.hour')
            ->select('dates.hour', 'dates.date', 'shops.name')
            ->first();
            return $date;

    }

    public function getRates($request){

        $rate = DB::table('Dates')
        ->join('users', 'users.id','=','dates.id_client')
        ->join('services', 'dates.id_service','=','services.id')
        ->where ('dates.id_stylist','=',$request)
        ->where('users.fullaccess','=','no')
        ->orderBy('dates.fulldate')
        ->select('users.name as username', 'services.name as servicename',
        'dates.fulldate as date', 'dates.opinion as opinion', 'dates.rating as rate')
        ->get();
        return $rate;

}
    public function getNextClient($request){

        $date = DB::table('Dates')
        ->join('users', 'users.id','=','dates.id_client')
        ->where('dates.date','>=',now()->toDateString())
        ->where ('dates.id_stylist','=',$request)
        ->where('users.fullaccess','=','no')
        ->orderBy('dates.fulldate')
        ->select('users.id', 'dates.hour', 'dates.date', 'users.name as names')

        ->first();
        return $date;

}
    public function getClientDates($request){

        $date = DB::table('Dates')
        ->join('users', 'users.id','=','dates.id_client')
        ->join('services','dates.id_service','=','services.id')
        ->join('styles','dates.id_style','=','styles.id')
        ->join('colors','dates.id_color','=','colors.id')
        ->where('dates.date','>=',now()->toDateString())
        ->where ('dates.id_stylist','=',$request)
        ->where('dates.ok','=','0')
        ->orderBy('dates.fulldate')
        ->select('dates.id_client as idclient', 'dates.id as iddate','dates.hour as hour', 'dates.date as date', 
        'users.name as username',
        'styles.cost as cost',
        'styles.url as stylefoto',
        'services.url as servicefoto',
        'services.name as servicename','styles.name as stylename',
        'colors.name as colorname','colors.url as colorfoto')
        ->get();
        return $date;

    }
    
    public function getAll(){
        $now = Carbon::now();
        return DB::table('Dates')
        ->join('dates', 'dates.id_Dates', '=', 'Dates.id')
        ->select('count(dates.id)')
        ->where('dates.ok','=','true')
        ->whereMonth('dates.date','=',now()->month)
        ->whereYear('dates.date','=',now()->year)
        ->groupBy('dates.date')
        ->get();
    }

    public function update(Request $request, Date $date)
    {

        try{

            $date->fill($request->post())->update();
            return response()->json([
                'message'=>'Dates Updated Successfully!!'
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
            Date::create($request->post());

            return response()->json([
                'message'=>'The Dates has been created'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>$e->getMessage()
            ],500);
        }
    }
    public function destroy(Date $date)
    {
        try {


            $date->delete();

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