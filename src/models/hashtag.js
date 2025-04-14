export function mapHashtag(raw) {
    return {
        id: Number(raw.id),
        name: raw.name
    };
}