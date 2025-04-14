export function mapCategory(raw) {
    return {
        id: raw.id,
        name: raw.name,
        memberId: raw.member_id
    };
}

export function createEmptyCategory(memberId = null) {
    return {
        id: null,
        name: '',
        memberId
    };
}
