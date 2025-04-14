export function mapMemberTemplate(raw) {
    return {
        id: Number(raw.id),
        title: raw.title,
        description: raw.description,
        content: raw.content,
        thumbnail: raw.thumbnail,
        visibility: raw.visibility,
        writtenDate: raw.written_date,
        deleteDate: raw.delete_date,
        usageCount: Number(raw.usage_count),
        isCopy: raw.is_copy === 'Y',
        repositoryId: Number(raw.repository_id)
    };
}