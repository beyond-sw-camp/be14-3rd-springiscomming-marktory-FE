export function mapSubscribe(raw) {
    return {
        id: Number(raw.id),
        subscriberId: Number(raw.subscriber_id),
        subscribedId: Number(raw.subscribed_id),
        notify: raw.is_notification === 'Y'
    };
}