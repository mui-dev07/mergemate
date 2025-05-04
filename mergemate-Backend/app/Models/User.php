<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'github_id',
        'github_token',
        'github_refresh_token',
        'github_username',
        'avatar_url',
        'bio',
        'location',
        'github_repositories',
        'experience_level',
        'tech_stack',
        'expertise'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'github_token',
        'github_refresh_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'skills' => 'array',
        'expertise' => 'array',
        'github_repositories' => 'array'
    ];

    protected $guarded = [
        'avatar_url',
        'bio',
        'location',
        'github_repositories'
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function contributions()
    {
        return $this->hasMany(Contribution::class);
    }
}
