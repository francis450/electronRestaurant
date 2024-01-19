<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Inventory extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'inventory';
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'item_id',
        'item_name',
        'category',
        'unit_of_measurement_id',
        'current_quantity',
        'par_level',
        'reorder_point',
        'supplier',
        'cost_per_unit',
        'expiration_date',
    ];
}
