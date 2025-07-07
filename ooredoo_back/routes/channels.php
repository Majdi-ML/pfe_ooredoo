<?php

use App\Models\Discussion;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Database\Eloquent\ModelNotFoundException;

Broadcast::channel('private-discussion.{discussionId}', function ($user, $discussionId) {
    \Log::info('User in broadcast callback', [
        'user' => $user,
        'discussion_id' => $discussionId
    ]);
    
    if (!$user) {
        \Log::error('User is null in broadcast channel');
        return false;
    }

    try {
        $discussion = \App\Models\Discussion::findOrFail($discussionId);
        $isAuthorized = $user->id === $discussion->admin_id || $user->id === $discussion->demandeur_id;
        
        \Log::info('Authorization result', [
            'authorized' => $isAuthorized,
            'user_id' => $user->id,
            'admin_id' => $discussion->admin_id,
            'demandeur_id' => $discussion->demandeur_id
        ]);
        
        return $isAuthorized;
    } catch (ModelNotFoundException $e) {
        \Log::error('Discussion not found', ['discussionId' => $discussionId]);
        return false;
    }
});
