<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class  InventoryPurchaseItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchase_receipt_id',
        'inventory_item_id',
        'quantity',
        'unit_price',
        'subtotal'
    ];
    public function receipt()
    {
        return $this->belongsTo(InventoryPurchaseReceipt::class);
    }

    public function item()
    {
        return $this->belongsTo(Inventory::class);
    }
}
