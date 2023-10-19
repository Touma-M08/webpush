<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushMessage as PushMessage;
use NotificationChannels\WebPush\WebPushChannel;

class WebPushNotification extends Notification
{
    public function via($notifiable)
    {
        return [WebPushChannel::class];
    }

    public function toWebPush($notifiable, $notification)
    {
        return (new PushMessage)
            ->title('New Notification')
            ->body('This is a test notification')
            ->action('View', 'view_notification')
            ->data(['id' => $notification->id]);
    }
}