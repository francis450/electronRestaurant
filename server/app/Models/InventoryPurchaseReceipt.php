<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryPurchaseReceipt extends Model
{
    use HasFactory;

    protected $table = 'inventory_purchase_receipts';

    protected $fillable = [
        'receipt_number',
        'supplier_id',
        'date',
        'total_cost',
        'payment_method',
        'notes',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function items()
    {
        return $this->hasMany(InventoryPurchaseItem::class);
    }
}
