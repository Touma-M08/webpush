import {useEffect, useState, FC} from 'react'
import {router} from "@inertiajs/react";

type Props = {
    vapidPublicKey: string
}

const PushNotificationButton:FC<Props> = ({vapidPublicKey}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // ServiceWorker
    useEffect(() => {

        // Service Workerをブラウザにインストールする
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {

                registration.pushManager.getSubscription();

            });

    }, []);

    // Server public key
    const base64toUint8 = (base64String:any) => {

        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;

    }

    const handleClick = async () => {
        setIsLoading(true);
        setError('');

        try {
            // Service Worker が利用可能かどうかを確認する
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.getRegistration();

                // Service Worker が登録されているかどうかを確認する
                if (registration) {
                    // Push 通知の許可を求める
                    const permission = await Notification.requestPermission();

                    // 許可が得られた場合
                    if (permission === 'granted') {

                        // プッシュ通知の登録を行う
                        const subscription = await registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: base64toUint8(vapidPublicKey)
                        });

                        // サーバーに登録情報を送信する
                        const url = route('web_push.store');
                        router.post(url, subscription as any);

                        alert('プッシュ通知の登録が完了しました。');
                    }
                } else {
                    setError('Service Worker が登録されていません。');
                }
            } else {
                setError('Service Worker が利用できません。');
            }
        } catch (e:any) {
            setError(e.message);
        }

        setIsLoading(false);
    };

    return (
        <button onClick={handleClick} disabled={isLoading}>
            {isLoading ? '処理中...' : 'プッシュ通知を登録する'}
            {error && <div className="text-red-500">{error}</div>}
        </button>
    );
}

export default PushNotificationButton;