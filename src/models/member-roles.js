export function mapMemberRole(raw) {
    return {
        memberId: Number(raw.member_id),
        authorityId: Number(raw.authority_id)
    };
}