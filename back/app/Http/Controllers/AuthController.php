<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\Rule;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    function login(LoginRequest $request)
    {
        $data = $request->validated();

        if(!Auth::attempt($data)){
            return response([
                'message' => 'email or password are wrong'
            ]);
        }
        $user = Auth::user();
        $tokenUser = $user->createToken('main')->plainTextToken;
        $user['rule'] =$request->user()->rule;
        return response()->json([
            'user' => $user,
            'token' => $tokenUser
        ]);
    }
    function register(RegisterRequest $request):JsonResponse
    {

        $data = $request->validated();
        $rule =Rule::where('title','employee')->first();
        $user = User::create([
            'name' => $data['name'],
            'email' =>  $data['email'],
            'password' => Hash::make($data['password']),
            'rule_id' =>$rule->id
        ]);

        $tokenUser = $user->createToken('main')->plainTextToken;
        $user['rule'] =$rule;
        return response()->json([
            'user' => $user,
            'token' => $tokenUser,
        ]);
    }
    public function logout(Request $request)
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response('',204);
    }
}
