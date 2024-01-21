<?php

namespace App\Models;

use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subunit extends UnitsOfMeasurement
{
    use HasFactory;
    public static function boot()
    {
        parent::boot();

        static::creating(function ($subunit) {
            if ($subunit->subunit_id !== null) {
                $parentUnit = $subunit->subunit->fresh();
                if ($parentUnit->type === 'subunit') {
                    throw ValidationException::withMessages([
                        'subunit_id' => 'Subunits cannot have subunits.'
                    ]);
                }
            }
        });
    }
}
