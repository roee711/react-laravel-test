<?php

namespace Database\Seeders;

use App\Models\Rule;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $adminRule = Rule::where('title','admin')->first();
         $employeeRule = Rule::where('title','employee')->first();
         $now =now();
             $users[] = ['name' =>'admin',
                         'email'=> 'admin@gmail.com',
                         'password' =>  Hash::make('a12345678'),
                         'rule_id'=>$adminRule->id ,
                         'created_at' =>$now,
                         'updated_at' =>$now];

         $users[] = [   'name' =>'admin',
                        'email'=> 'employee@gmail.com',
                        'password' =>  Hash::make('e12345678'),
                        'rule_id'=>$employeeRule->id,
                        'created_at' =>$now,
                        'updated_at' =>$now];

          User::insert($users);
    }
}
