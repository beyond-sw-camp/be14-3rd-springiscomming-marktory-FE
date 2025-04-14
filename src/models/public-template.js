export function mapPublicTemplate(raw) {
    return {
        id: Number(raw.id),
        title: raw.title,
        content: raw.content,
        writtenDate: raw.written_date,
        deleteDate: raw.delete_date,
        usageCount: Number(raw.usage_count),
        writerId: Number(raw.writer_id)
    };
}