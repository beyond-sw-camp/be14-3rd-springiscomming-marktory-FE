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
