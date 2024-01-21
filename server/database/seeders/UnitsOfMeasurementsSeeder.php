<?php

namespace Database\Seeders;

use App\Models\UnitsOfMeasurement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitsOfMeasurementsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UnitsOfMeasurement::create([
            'name' => 'Kilogram',
            'symbol' => 'kg',
            'type' => 'base',
            'conversion_factor' => 1,
        ]);

        UnitsOfMeasurement::create([
            'name' => 'Liter',
            'symbol' => 'L',
            'type' => 'base',
            'conversion_factor' => 1,
        ]);

        // Subunits
        UnitsOfMeasurement::create([
            'name' => 'Gram',
            'symbol' => 'g',
            'type' => 'subunit',
            'subunit_id' => 1, 
            'conversion_factor' => 0.001,
        ]);

        UnitsOfMeasurement::create([
            'name' => 'Milliliter',
            'symbol' => 'mL',
            'type' => 'subunit',
            'subunit_id' => 2, 
            'conversion_factor' => 0.001,
        ]);

        // Other units without subunits
        UnitsOfMeasurement::create([
            'name' => 'Piece',
            'symbol' => 'pc',
            'type' => 'base',
            'conversion_factor' => 1,
        ]);
    }
}
