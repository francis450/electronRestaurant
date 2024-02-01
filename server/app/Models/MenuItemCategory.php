<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MenuItemCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'parent_category_id',
        'description'
    ];

    public function parent_category() {
        return $this->belongsTo(MenuItemCategory::class, 'parent_category_id');
    }

    public function child_categories() {
        return $this->hasMany(MenuItemCategory::class, 'parent_category_id');
    }

    public function menu_items() {
        return $this->hasMany(MenuItem::class, 'category_id');
    }
}