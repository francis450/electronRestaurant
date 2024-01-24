<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitsOfMeasurement extends Model
{
    use HasFactory;

    protected $table = 'units_of_measurements';

    protected $fillable = [
        'name',
        'symbol',
        'type',
        'conversion_factor',
        'subunit_id',
    ];

    public function subunit()
    {
        return $this->belongsTo(UnitsOfMeasurement::class, 'subunit_id');
    }protected $guarded = [];
    public function subunits()
    {
        return $this->hasMany(self::class, 'subunit_id');
    }

    public function isBaseUnit(): bool
    {
        return $this->type === 'base';
    }

    public function getSubunitFactor(): ?float
    {
        if ($this->isBaseUnit()) {
            return 1;
        }

        return $this->conversion_factor * $this->subunit->getSubunitFactor();
    }
}
