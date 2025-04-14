import api from './index';

/**
 * 모든 해시태그 조회
 */
export async function getHashtags() {
    const res = await api.get('/hashtags');
    return res.data;
}

/**
 * 게시글-해시태그 매핑 조회
 */
export async function getPostHashtag() {
    const res = await api.get('/post_hashtag');
    return res.data;
}
