import api from './index';

/**
 * 모든 카테고리 조회
 */
export async function getCategories() {
    const res = await api.get('/categories');
    return res.data;
}