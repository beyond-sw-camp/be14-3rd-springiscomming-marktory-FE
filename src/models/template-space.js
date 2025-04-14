export function mapTemplateSpace(raw) {
    return {
        id: Number(raw.id),
        memberId: Number(raw.member_id)
    };
}