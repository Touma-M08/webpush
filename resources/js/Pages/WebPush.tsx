import PushNotificationButton from "@/Components/PushNotificationButton";
import {Head} from "@inertiajs/react";

export default function WebPush(props: any) {

    return (
        <div>
            <Head>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <h1>Web Push のテスト</h1>
            <PushNotificationButton vapidPublicKey={props.vapidPublicKey} />
        </div>
    );

}