<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'price',
        'menu_item_category_id',
        'img',
        'is_available',
        'note',
    ];

    public function category() {
        return $this->belongsTo(MenuItemCategory::class, 'menu_item_category_id');
    }

    public function ingredients()
    {
        return $this->hasMany(Ingredient::class, 'menu_item_id');
    }
}
