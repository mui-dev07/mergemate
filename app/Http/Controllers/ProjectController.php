<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with(['user', 'tasks'])
            ->withCount(['tasks'])
            ->latest()
            ->paginate(10);
        return response()->json($projects);
    }

    public function viewProjects(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        
        $userTechStack = $user->tech_stack ?? [];
        
        $projects = Project::query()
            ->whereJsonContains('tech_stack', $userTechStack)
            ->orWhere(function($query) use ($userTechStack) {
                foreach($userTechStack as $tech) {
                    $query->orWhere('tech_stack', 'like', "%$tech%");
                }
            })
            ->with(['user', 'tasks'])
            ->withCount(['tasks'])
            ->latest()
            ->paginate(10);

        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'tech_stack' => 'required|array',
            'tech_stack.*' => 'string',
            'repository_url' => 'required|url',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image'] = $path;
        }

        $project = Project::create([
            ...$validated,
            'user_id' => $user->id,
            'status' => 'active'
        ]);

        return response()->json($project->load('user'), 201);
    }

    public function show(Project $project)
    {
        return response()->json(
            $project->load(['tasks.contributions', 'user'])
                   ->loadCount(['tasks'])
        );
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'tech_stack' => 'array',
            'tech_stack.*' => 'string',
            'repository_url' => 'url',
            'status' => 'string|in:active,archived',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        $project->update($validated);
        return response()->json($project->load('user'));
    }

    public function destroy(Project $project)
    {
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }
        $project->delete();
        return response()->json(['message' => 'Project deleted']);
    }
} 