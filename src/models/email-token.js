export function mapEmailToken(raw) {
    return {
        id: raw.id,
        email: raw.email,
        token: raw.token,
        expirationTime: raw.expiration_time,
        isVerified: raw.is_verified
    };
}