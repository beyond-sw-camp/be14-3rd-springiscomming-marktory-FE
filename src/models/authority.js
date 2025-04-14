export function mapAuthority(raw) {
    return {
        id: Number(raw.id),
        name: raw.name
    };
}