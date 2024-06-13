<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Rule;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $ruleId = $user->rule->id;
        $rule =Rule::find($ruleId);
        if($rule->title=='admin') {
            return TaskResource::collection(Task::query()->orderBy('priority', 'asc')->get());

        }else{
            return TaskResource::collection(
                Task::query()->where("user_id", "=", $user->id)->orderBy('priority', 'asc')->get());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $user = auth()->user();
        $data = $request->validated();
        $priority = Task::max('priority');
        $data['priority']=$priority+1;
        $data['user_id'] =$user->id;
        $task = Task::create($data);
        return response(new TaskResource($task),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return new TaskResource($task);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return  new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $task->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response('',204);
    }
    public  function  saveOrder(Request $request){
        $tasks = $request->input('tasks');

        foreach ($tasks as $index => $row) {
            $dbRow = Task::find($row['id']);
            $dbRow->update(['priority' => $index+1]);
        }
        return response()->json([
            'success' => true,
            'message' => "Tasks save successfully.",
        ], 201);
    }
}
