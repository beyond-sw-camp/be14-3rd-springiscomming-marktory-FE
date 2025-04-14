export function mapNotice(raw) {
    return {
        id: raw.id,
        title: raw.title,
        date: raw.date,
        content: raw.content,
        memberId: raw.member_id
    };
}