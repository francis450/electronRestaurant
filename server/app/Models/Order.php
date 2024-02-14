<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'table_id',
        'status',
        'total_price',
        'note',
        'completed_at',
        'canceled_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function table()
    {
        return $this->belongsTo(Table::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }


    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
