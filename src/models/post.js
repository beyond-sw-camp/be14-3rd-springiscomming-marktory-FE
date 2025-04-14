function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export function mapPost(raw, hashtags = [], member = null, category = null) {
    return {
        id: raw.id,
        title: raw.title,
        content: raw.content,
        image: '/src/assets/post/content-img.png', // 하드코딩된 이미지 경로 사용
        tags: hashtags,
        date: formatDate(raw.written_date),
        member,
        category,
        postUrl: raw.post_url,
        isDeleted: !!raw.delete_date,
        visibility: raw.visibility
    };
}

export function createEmptyPost(memberId = null, categoryId = null) {
    return {
        id: null,
        title: '',
        content: '',
        postUrl: '',
        thumbnail: '',
        writtenDate: new Date().toISOString(),
        deleteDate: null,
        visibility: 'public',
        memberId,
        categoryId
    };
}
