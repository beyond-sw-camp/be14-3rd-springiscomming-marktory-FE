export function mapLike(raw) {
    return {
        id: Number(raw.id),
        type: raw.type, // 'post' or 'comment'
        postId: Number(raw.post_id),
        commentId: Number(raw.comment_id),
        memberId: Number(raw.member_id)
    };
}