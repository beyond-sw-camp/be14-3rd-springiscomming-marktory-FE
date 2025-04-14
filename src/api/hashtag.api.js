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
export async function createHashtag(hashtagData) {
    const hashtags = await getHashtags();  // 기존 해시태그 가져오기

    // 가장 큰 id를 찾아서 +1한 값으로 새로운 id 생성
    const newId = hashtags.length ? Math.max(...hashtags.map(h => parseInt(h.id))) + 1 : 1;

    // 새로운 해시태그 데이터에 새 id 추가
    const hashtagWithId = {
        ...hashtagData,
        id: newId
    };

    // json-server에 해시태그 저장
    const res = await api.post('/hashtags', hashtagWithId);
    return res.data;
}