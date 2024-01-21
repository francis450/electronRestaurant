<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory; //remember to make this factory for testing

    protected $table = 'suppliers';

    protected $fillable = [
        'name',
        'contact_name',
        'email',
        'phone_number',
        'address',
        'kra_pin',
        'customer_unit_serial_number'
    ];


}
