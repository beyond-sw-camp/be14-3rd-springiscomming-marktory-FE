export function mapNotice(raw) {
    return {
        id: Number(raw.id),
        title: raw.title,
        date: raw.date,
        content: raw.content,
        memberId: Number(raw.member_id)
    };
}