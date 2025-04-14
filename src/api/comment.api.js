import api from './index';

/**
 * 전체 댓글 조회
 */
export async function getComments() {
    const res = await api.get('/comments');
    return res.data;
}

/**
 * 댓글 등록
 * @param {Object} commentData - 등록할 댓글 데이터
 */
export async function createComment(commentData) {
    const res = await api.post('/comments', commentData);
    return res.data;
}

/**
 * 댓글 수정
 * @param {Number} id - 댓글 ID
 * @param {Object} updateData - 수정할 필드 (예: { content: '변경된 내용' })
 */
export async function updateComment(id, updateData) {
    const res = await api.patch(`/comments/${id}`, updateData);
    return res.data;
}

/**
 * 댓글 삭제 (soft delete)
 * @param {Number} id - 댓글 ID
 */
export async function deleteComment(id) {
    const res = await api.patch(`/comments/${id}`, { is_deleted: true });
    return res.data;
}
