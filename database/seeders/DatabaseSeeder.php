<?php

namespace Database\Seeders;

use App\Models\Click;
use App\Models\Link;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Dxrie',
            'email' => 'colinedric04@gmail.com',
            'password' => 'sigmasigma'
        ]);
        User::factory(10)->create();
        Link::factory(25)->create();
        Click::factory(25)->create();
    }
}
