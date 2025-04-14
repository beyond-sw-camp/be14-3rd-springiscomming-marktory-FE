<!-- Comment.vue -->
<template>
    <section class="comment-section">
        <CommentInput />
        <CommentList :comments="comments" :replys="replys" :current-user-id="currentUserId" />
    </section>
</template>
<script setup>
import kassy_profile from "@/assets/comment/kassy_profile.png";
import alex_profile from "@/assets/comment/alex_profile.png";
import tim_profile from "@/assets/comment/tim_profile.png";
import morris_profile from "@/assets/comment/morris_profile.png";
import d_profile from "@/assets/comment/d_profile.png";
import dong_profile from "@/assets/comment/dong_profile.png";
import CommentInput from "./CommentInput.vue";
import CommentList from "./CommentList.vue";

const currentUserId = "u1";

// 목업
const comments = [
    {
        id: "c1",
        userId: "u1",
        nickname: "헬로마켓",
        profileImage: kassy_profile,
        content: "SQLD 시험 어땠나요? 전 꽤 어려웠어요.",
        createdAt: "2025-04-13T12:00:00",
        liked: false,
        likeCount: 3,
        replies: [ // 이 댓글에 달린 대댓글들 (type = 2, above_id = c1)
            {
                id: "c1r1",
                userId: "u3",
                nickname: "바이마켓",
                profileImage: tim_profile,
                content: "전 정처기가 더 쉬웠어요 ㅋㅋ",
                createdAt: "2025-04-13T12:33:00",
                liked: true,
                likeCount: 23,
            },
            {
                id: "c1r2",
                userId: "u5",
                nickname: "솔직한사람",
                profileImage: d_profile,
                content: "난 SQLD 탈락 ㅠㅠ",
                createdAt: "2025-04-13T12:35:00",
                liked: false,
                likeCount: 1,
            }
        ]
    },
    {
        id: "c2",
        userId: "u2",
        nickname: "이응이응",
        profileImage: alex_profile,
        content: "응원합니다!",
        createdAt: "2025-04-13T14:21:00",
        liked: true,
        likeCount: 5,
        replies: [
            {
                id: "c2r1",
                userId: "u4",
                nickname: "지읏지읏",
                profileImage: d_profile,
                content: "응원 안합니다.",
                createdAt: "2025-04-13T14:45:00",
                liked: true,
                likeCount: 10,
            }
        ]
    }
];
</script>

<style scoped></style>
