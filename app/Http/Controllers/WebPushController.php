<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\WebPushNotification;

class WebPushController extends Controller
{
    public function index()
    {
        return Inertia::render('WebPush', [
            'vapidPublicKey' => env('VAPID_PUBLIC_KEY')
        ]);
    }

    public function store(Request $request)
    {
        // バリデーションは省略しています

        $endpoint = $request->endpoint;
        $token = $request->keys['auth'];
        $key = $request->keys['p256dh'];
        $user = User::find(1); // テストのため、特定のユーザーをつかう
        $user->updatePushSubscription($endpoint, $key, $token);

        return redirect()->route('web_push.index');
    }

    public function test()
    {
        $user = User::find(1); // テストのため、特定のユーザーをつかう
        $user->notify(new WebPushNotification());
    }
}