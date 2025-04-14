export function mapPost(raw) {
    return {
        id: raw.id,
        title: raw.title,
        content: raw.content,
        postUrl: raw.post_url,
        thumbnail: raw.thumbnail,
        writtenDate: raw.written_date,
        deleteDate: raw.delete_date,
        visibility: raw.visibility,
        memberId: raw.member_id,
        categoryId: raw.category_id,
        isDeleted: !!raw.delete_date
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
