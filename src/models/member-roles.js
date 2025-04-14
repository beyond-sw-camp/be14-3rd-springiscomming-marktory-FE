export function mapMemberRole(raw) {
    return {
        memberId: raw.member_id,
        authorityId: raw.authority_id
    };
}