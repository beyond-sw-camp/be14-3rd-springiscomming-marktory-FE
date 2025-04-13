<!-- Comment.vue -->
<template>
    <section class="comment-section">
        <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment"
            :current-user-id="currentUserId" />
    </section>
</template>
<script setup>
import CommentItem from './CommentItem.vue'
import kassy_profile from '@/assets/comment/kassy_profile.png';
import alex_profile from '@/assets/comment/alex_profile.png';
import tim_profile from '@/assets/comment/tim_profile.png';
import morris_profile from '@/assets/comment/morris_profile.png';
import d_profile from '@/assets/comment/d_profile.png';
import dong_profile from '@/assets/comment/dong_profile.png';

const comments = [
    {
        id: 'c1',
        userId: 'u1',
        nickname: '헬로마켓',
        profileImage: kassy_profile,
        content: 'SQLD 시험 어땠나요? 전 꽤 어려웠어요.',
        createdAt: '2025-04-13T12:00:00',
        liked: false,
        likeCount: 3
    },
    {
        id: 'c2',
        userId: 'u2',
        nickname: '이응이응',
        profileImage: alex_profile,
        content: '응원합니다!',
        createdAt: '2025-04-13T14:21:00',
        liked: true,
        likeCount: 5
    }
]

const currentUserId = 'u1'
</script>

<style scoped>
.comment-section {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
</style>
