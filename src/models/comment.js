export function mapComment(raw) {
    return {
        id: Number(raw.id),
        content: raw.is_deleted ? '삭제된 댓글입니다.' : raw.content,
        writtenDate: raw.written_date,
        modifyDate: raw.modify_date,
        isDeleted: raw.is_deleted,
        isReply: raw.type === 2,
        parentId: Number(raw.above_id),
        memberId: Number(raw.member_id),
        postId: Number(raw.post_id)
    };
}

export function createEmptyComment(postId, memberId, parentId = null) {
    return {
        id: null,
        content: '',
        writtenDate: new Date().toISOString(),
        modifyDate: null,
        isDeleted: false,
        type: parentId ? 2 : 1,
        above_id: parentId,
        member_id: memberId,
        post_id: postId
    };
}
