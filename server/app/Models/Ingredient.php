<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;

    protected $fillable = [
      'inventory_item_id',
      'menu_item_id',
      'name',
      'unit_price',
      'quantity',
      'cost'
    ];

    public function inventoryItem(){
        return $this->belongsTo(Inventory::class);
    }

    // public function menuItem(){
    //     // return $this->belongsTo(Menu:class);
    // }
}
