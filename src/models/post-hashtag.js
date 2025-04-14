export function mapPostHashtag(raw) {
    return {
        postId: raw.post_id,
        hashtagId: raw.hashtag_id
    };
}