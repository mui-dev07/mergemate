<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Exception;

class AuthController extends Controller
{
    public function redirectToGithub()
    {
        $clientId = config('services.github.client_id');
        $clientSecret = config('services.github.client_secret');
        $redirectUrl = config('services.github.redirect');

        if (!$clientId || !$clientSecret || !$redirectUrl) {
            return response()->json(['error' => 'GitHub OAuth configuration is missing'], 500);
        }

        return response()->json([
            'url' => Socialite::driver('github')
                ->stateless()
                ->with(['scope' => 'read:user user:email repo'])
                ->redirect()
                ->getTargetUrl(),
        ]);
    }

    public function handleGithubCallback()
    {
        try {
            $githubUser = Socialite::driver('github')
                ->stateless()
                ->user();

            $user = User::updateOrCreate(
                ['github_id' => $githubUser->id],
                [
                    'name' => $githubUser->name,
                    'email' => $githubUser->email,
                    'github_token' => $githubUser->token,
                    'github_refresh_token' => $githubUser->refreshToken,
                    'github_username' => $githubUser->nickname,
                    'avatar_url' => $githubUser->avatar,
                ]
            );

            $token = $user->createToken('github-token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);

        } catch (Exception $e) {
            return response()->json(['error' => 'Authentication failed'], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}