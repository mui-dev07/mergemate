<?php

namespace App\Http\Controllers;

use App\Models\Contribution;
use App\Models\Task;
use Illuminate\Http\Request;

class ContributionController extends Controller
{
    public function index(Request $request)
    {
        $contributions = Contribution::query()
            ->when($request->task_id, fn($q) => $q->where('task_id', $request->task_id))
            ->when($request->user_id, fn($q) => $q->where('user_id', $request->user_id))
            ->with(['user', 'task'])
            ->latest()
            ->paginate(10);

        return response()->json($contributions);
    }

    public function store(Request $request, Task $task)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'pull_request_url' => 'required|url',
            'notes' => 'nullable|string',
        ]);

        $contribution = $task->contributions()->create([
            ...$validated,
            'user_id' => $user->id,
            'status' => 'pending'
        ]);

        return response()->json($contribution->load(['user', 'task']), 201);
    }

    public function update(Request $request, Contribution $contribution)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,accepted,rejected',
            'notes' => 'nullable|string',
        ]);

        $contribution->update($validated);
        return response()->json($contribution->load(['user', 'task']));
    }

    public function destroy(Contribution $contribution)
    {
        $contribution->delete();
        return response()->json(['message' => 'Contribution deleted']);
    }
}
