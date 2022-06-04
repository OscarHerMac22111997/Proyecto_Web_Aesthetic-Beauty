<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Date extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $timestamps = false;
    public $table = "dates";
   protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'id_service',
        'id_client',
        'id_shop',
        'id_stylist',
        'id_style',
        'id_color',
        'date',
        'hour',
        'fulldate',
        'opinion',
        'rating',
        'total',
        'payed',
        'ok'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

}
