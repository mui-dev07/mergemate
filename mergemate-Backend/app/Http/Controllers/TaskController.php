<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::query()
            ->when($request->project_id, fn($q) => $q->where('project_id', $request->project_id))
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->when($request->difficulty, fn($q) => $q->where('difficulty_level', $request->difficulty))
            ->with(['project', 'assignee', 'contributions.user'])
            ->latest()
            ->paginate(10);
            
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'difficulty_level' => 'required|string|in:easy,medium,hard',
            'project_id' => 'required|exists:projects,id',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $task = Task::create([
            ...$validated,
            'status' => 'open'
        ]);

        return response()->json($task->load(['project', 'assignee']), 201);
    }

    public function show(Task $task)
    {
        return response()->json(
            $task->load(['project', 'assignee', 'contributions.user'])
        );
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'status' => 'string|in:open,in_progress,completed',
            'difficulty_level' => 'string|in:easy,medium,hard',
            'assigned_to' => 'nullable|exists:users,id',
        ]);

        $task->update($validated);
        return response()->json($task->load(['project', 'assignee']));
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}