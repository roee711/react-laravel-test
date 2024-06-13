<?php

namespace Database\Seeders;

use App\Models\Rule;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now =now();
        $rule[] = [ 'title' =>'admin' ,
                    'created_at' =>$now,
                    'updated_at' =>$now
        ];
        $rule[] = [ 'title' =>'employee',
                    'created_at' =>$now,
                    'updated_at' =>$now
        ];
        Rule::insert($rule);
    }
}
