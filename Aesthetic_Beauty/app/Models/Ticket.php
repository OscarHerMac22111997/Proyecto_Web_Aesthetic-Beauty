<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Ticket extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $timestamps = false;
    public $table = "tickets";
    protected $fillable = [
        'number',
        'id_date
        ',
        'url',
        'id_style'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

}
