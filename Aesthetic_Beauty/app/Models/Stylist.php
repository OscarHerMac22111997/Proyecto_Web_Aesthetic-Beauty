<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Stylist extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $timestamps = false;
    public $table = "stylist";
   protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'name',
        'phone',
        'genre',
        'initialDate',
        'url',
        'id_shop'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

}
