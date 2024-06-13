<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $tasks=[];
        $now =now();
        foreach ($users as $key => $user){

            for ($i=0;$i<20;$i++){
                $tasks[] =[ 'title' =>'Title'.($i+1) ,
                            'description' =>'Description'.($i+1) ,
                            'priority' =>$i+1,
                            'user_id' =>$user->id,
                            'due_date'=>date("Y-m-d") ,
                             'created_at' =>$now,
                             'updated_at' =>$now ];

            }
        }
        Task::insert($tasks);
    }
}
