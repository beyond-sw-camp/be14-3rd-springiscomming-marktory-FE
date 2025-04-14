// src/api/post.api.js
import api from './index';

/**
 * 전체 게시물 조회
 */
export async function getPosts() {
    const res = await api.get('/posts');
    return res.data;
}

/**
 * 특정 게시물 조회
 */
export async function getPostById(id) {
    const res = await api.get(`/posts/${id}`);
    return res.data;
}

/**
 * 특정 멤버의 게시물만 조회
 */
export async function getPostsByMember(memberId) {
    const res = await api.get('/posts', { params: { member_id: memberId } });
    return res.data;
}

/**
 * 카테고리별 게시물 조회
 */
export async function getPostsByCategory(categoryId) {
    const res = await api.get('/posts', { params: { category_id: categoryId } });
    return res.data;
}

// 게시글 등록 (HTML만 저장)
// 게시물 생성 함수
export async function createPost(postData) {
    const posts = await getPosts();
    const newId = posts.length ? Math.max(...posts.map(p => Number(p.id))) + 1 : 1;

    const postWithId = {
        ...postData,
        id: String(newId), // ✅ 문자열로 저장
        member_id: String(postData.member_id),
        category_id: postData.category_id != null ? String(postData.category_id) : null
    };

    const res = await api.post('/posts', postWithId);
    return res.data;
}