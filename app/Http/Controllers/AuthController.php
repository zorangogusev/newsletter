<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = new User;
    }

    public function register(Request $request)
    {
        $validator = validator($request->all(), [
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 400);
        }

        $check_email = $this->user->where('email', $request->email)->count();
        if ($check_email > 0) {
            return response()->json([
                'success' => false,
                'message' => 'this email already exist please try another email'
            ], 200);
        }

        $registerComplete = $this->user::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if($registerComplete) {
            return $this->login($request);
        }
    }

    public function login(Request $request) {
        $validator = validator($request->only('email', 'password'), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 400);
        }

        $jwt_token = null;

        $input = $request->only('email', 'password');

        if(!$jwt_token = auth('users')->attempt($input)) {
            return response()->json([
                'success' => false,
                'message' => 'invalid email or password'
            ]);
        }

        return response()->json([
            'success' => true,
            'token' => $jwt_token
        ]);
    }
}
