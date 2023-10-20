import PushNotificationButton from "@/Components/PushNotificationButton";
import {Head} from "@inertiajs/react";
import { useEffect, FC } from "react";

type Props = {
    vapidPublicKey: string
}

const WebPush:FC<Props> = ({vapidPublicKey}) => {
    return (
        <div>
            <Head>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <h1>Web Push のテスト</h1>
            <PushNotificationButton vapidPublicKey={vapidPublicKey} />
        </div>
    );
}

export default WebPush;