export function mapSubscribe(raw) {
    return {
        id: raw.id,
        subscriberId: raw.subscriber_id,
        subscribedId: raw.subscribed_id,
        notify: raw.is_notification === 'Y'
    };
}