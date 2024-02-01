<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Inventory extends Model
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'inventory';
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'item_id',
        'item_name',
        'category_id',
        'unit_of_measurement_id',
        'current_quantity',
        'par_level',
        'reorder_point',
        'supplier',
        'cost_per_unit',
        'expiration_date',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function unitOfMeasurement()
    {
        return $this->belongsTo(UnitsOfMeasurement::class);
    }

    public function ingredients()
    {
        return $this->hasMany(Ingredient::class);
    }

    public function menuItems()
    {
        return $this->belongsToMany(MenuItem::class, 'ingredients', 'inventory_item_id', 'menu_item_id');
    }

}
