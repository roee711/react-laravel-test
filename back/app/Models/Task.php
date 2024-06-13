<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'user_id', // foreign key, integer
        'priority', // integer
        'title', // string
        'description', // text
        'due_date'
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
