<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        return response()->json($user);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'experience_level' => 'required|in:beginner,intermediate,advanced,expert',
            'tech_stack' => 'required|array',
            'tech_stack.*' => 'string',
            'expertise' => 'required|array',
            'expertise.*' => 'string',
        ]);

        $user = $request->user();
        $user->update($validated);

        return response()->json($user);
    }

    public function syncGithubProfile(Request $request)
    {
        $user = $request->user();

        try {
            // Fetch user profile from GitHub
            $profileResponse = Http::withToken($user->github_token)
                ->get('https://api.github.com/user');

            if (!$profileResponse->successful()) {
                return response()->json(['error' => 'Failed to fetch GitHub profile'], 422);
            }

            $profile = $profileResponse->json();

            // Fetch repositories
            $reposResponse = Http::withToken($user->github_token)
                ->get('https://api.github.com/user/repos', [
                    'sort' => 'updated',
                    'per_page' => 100,
                ]);

            if (!$reposResponse->successful()) {
                return response()->json(['error' => 'Failed to fetch repositories'], 422);
            }

            $repositories = $reposResponse->json();

            // Update user with GitHub data
            $user->update([
                'avatar_url' => $profile['avatar_url'],
                'bio' => $profile['bio'],
                'location' => $profile['location'],
                'github_repositories' => collect($repositories)->map(function ($repo) {
                    return [
                        'id' => $repo['id'],
                        'name' => $repo['name'],
                        'full_name' => $repo['full_name'],
                        'description' => $repo['description'],
                        'html_url' => $repo['html_url'],
                        'language' => $repo['language'],
                        'stargazers_count' => $repo['stargazers_count'],
                        'fork' => $repo['fork'],
                    ];
                })->toArray()
            ]);

            return response()->json($user);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to sync GitHub profile'], 500);
        }
    }

    public function getGithubRepositories(Request $request)
    {
        $user = $request->user();
        return response()->json($user->github_repositories);
    }
}