<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ContributionController;
use Illuminate\Support\Facades\Route;

// Auth Routes
Route::get('auth/github', [AuthController::class, 'redirectToGithub']);
Route::get('auth/github/callback', [AuthController::class, 'handleGithubCallback']);

// Public Routes
Route::get('projects', [ProjectController::class, 'index']);
Route::get('projects/{project}', [ProjectController::class, 'show']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Profile Routes
    Route::get('profile', [ProfileController::class, 'show']);
    Route::put('profile', [ProfileController::class, 'update']);
    Route::post('profile/sync-github', [ProfileController::class, 'syncGithubProfile']);
    Route::get('profile/repositories', [ProfileController::class, 'getGithubRepositories']);
    
    // Project Routes
    Route::prefix('projects')->group(function () {
        Route::get('recommended', [ProjectController::class, 'viewProjects']);
    });

    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('tasks', TaskController::class);
    Route::apiResource('contributions', ContributionController::class);
    Route::post('tasks/{task}/contribute', [ContributionController::class, 'store']);
    
    // Auth
    Route::post('logout', [AuthController::class, 'logout']);
});
