export function mapLike(raw) {
    return {
        id: raw.id,
        type: raw.type, // 'post' or 'comment'
        postId: raw.post_id,
        commentId: raw.comment_id,
        memberId: raw.member_id
    };
}