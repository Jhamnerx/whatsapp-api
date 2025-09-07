<?php

namespace Database\Seeders;

use App\Models\Device;
use App\Models\Number;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NumberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'user_id' => 1,
                'body' => '6282298859671',
                'webhook' => '',
                'status' => 'Disconnect',
                'api_key' => Str::random(16),
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        foreach ($data as $d) {
            Device::create($d);
        }
    }
}
