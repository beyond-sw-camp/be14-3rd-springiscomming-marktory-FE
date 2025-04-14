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

/**
 * 게시글과 해시태그 연결 저장
 * @param {Object} data - { post_id, hashtag_id }
 */

// 해시태그 생성 함수
export async function createHashtag(data) {
    const hashtags = await getHashtags()
    const newId = Math.max(...hashtags.map(h => parseInt(h.id || 0))) + 1

    const newHashtag = { id: String(newId), name: data.name }
    const res = await api.post('/hashtags', newHashtag)
    return res.data
}

export async function createPostHashtag(data) {
    const all = await api.get('/post_hashtag')
    const newId = Math.max(...all.data.map(ph => parseInt(ph.id || 0))) + 1

    const postHashtag = {
        id: String(newId),
        post_id: String(data.post_id),
        hashtag_id: String(data.hashtag_id)
    }

    const res = await api.post('/post_hashtag', postHashtag)
    return res.data
}