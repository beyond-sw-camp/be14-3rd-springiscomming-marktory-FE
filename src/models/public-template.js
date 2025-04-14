export function mapPublicTemplate(raw) {
    return {
        id: raw.id,
        title: raw.title,
        content: raw.content,
        writtenDate: raw.written_date,
        deleteDate: raw.delete_date,
        usageCount: raw.usage_count,
        writerId: raw.writer_id
    };
}