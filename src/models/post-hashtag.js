export function mapPostHashtag(raw) {
    return {
        postId: Number(raw.post_id),
        hashtagId: Number(raw.hashtag_id)
    };
}