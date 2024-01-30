<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id',
        'img',
        'is_available',
        'note',
    ];

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function ingredients()
    {
        return $this->hasMany(Ingredient::class, 'menu_item_id');
    }
}
