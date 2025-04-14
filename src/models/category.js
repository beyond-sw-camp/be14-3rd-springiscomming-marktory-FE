export function mapCategory(raw) {
    return {
        id: Number(raw.id),
        name: raw.name,
        memberId: Number(raw.member_id)
    };
}

export function createEmptyCategory(memberId = null) {
    return {
        id: null,
        name: '',
        memberId
    };
}
