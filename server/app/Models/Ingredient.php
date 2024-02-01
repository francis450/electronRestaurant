<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ingredient extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
      'inventory_item_id',
      'menu_item_id',
      'name',
      'unit_price',
      'quantity',
      'unit_of_measurement_id',
      'cost'
    ];

    public function inventoryItem(){
        return $this->belongsTo(Inventory::class);
    }

    public function unitOfMeasurement(){
        return $this->belongsTo(UnitsOfMeasurement::class);
    }
}
