<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Demande;
use App\Models\Discussion;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller; // Ensure this is imported

class DiscussionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function createDiscussion(Request $request)
    {
        $request->validate([
            'demande_id' => 'required|exists:demandes,id',
        ]);

        $demande = Demande::findOrFail($request->demande_id);

        if ($demande->discussion) {
            return response()->json(['error' => 'Discussion already exists for this demande'], 400);
        }

        if (!Auth::user()->isAdmin()) {
            return response()->json(['error' => 'Only admins can create discussions'], 403);
        }

        $discussion = Discussion::create([
            'demande_id' => $request->demande_id,
            'admin_id' => Auth::id(),
            'demandeur_id' => $demande->user_id,
        ]);

        return response()->json(['discussion' => $discussion], 201);
    }

    public function getDiscussionByDemandeId(Request $request)
    {
        $request->validate([
            'demande_id' => 'required|exists:demandes,id',
        ]);

        $discussion = Discussion::where('demande_id', $request->demande_id)->first();

        if (!$discussion) {
            return response()->json(['discussion' => null], 200);
        }

        return response()->json(['discussion' => $discussion], 200);
    }

    public function sendMessage(Request $request, $discussionId)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $discussion = Discussion::findOrFail($discussionId);
        if (Auth::id() !== $discussion->admin_id && Auth::id() !== $discussion->demandeur_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $message = Message::create([
            'discussion_id' => $discussionId,
            'user_id' => Auth::id(),
            'content' => $request->content,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['message' => $message], 201);
    }

    public function getMessages($discussionId)
    {
        $discussion = Discussion::findOrFail($discussionId);
        if (Auth::id() !== $discussion->admin_id && Auth::id() !== $discussion->demandeur_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $messages = $discussion->messages()->with('user')->get();
        return response()->json(['messages' => $messages]);
    }
}
