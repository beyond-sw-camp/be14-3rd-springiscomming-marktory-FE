<template>
    <div class="reply-item">
        <div class="reply-header">
            <img :src="reply.profileImage" alt="profile" class="profile-img" />
            <div class="user-info">
                <div class="nickname">{{ reply.nickname }}</div>
                <div class="date">{{ formatDate(reply.createdAt) }}</div>
            </div>

            <div class="reply-actions">
                <template v-if="isMine">
                    <button class="action-btn">수정</button>
                    <button class="action-btn">삭제</button>
                </template>
                <template v-else>
                    <button class="action-btn">신고</button>
                </template>
            </div>
        </div>

        <div class="reply-content">{{ reply.content }}</div>

        <div class="reply-footer">
            <button class="like-btn" :class="{ liked: reply.liked }" @click="toggleLike">
                <img :src="reply.liked ? filledHeart : emptyHeart" alt="like" class="heart-icon" />
                <span>{{ reply.likeCount }}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import filledHeart from "@/assets/icons/heart-icon.svg";
import emptyHeart from "@/assets/icons/heart-icon.svg";

const props = defineProps({
    reply: Object,
    currentUserId: String,
});

const isMine = computed(() => props.reply.userId === props.currentUserId);
const formatDate = (dateStr) => {
    if (!dateStr) return '날짜 없음';
    return dateStr.split('T')[0];
};
const toggleLike = () => {
    console.log("좋아요 토글:", props.reply.id);
};
</script>

<style scoped>
.reply-item {
    background-color: #1c1c1c;
    border-radius: 1rem;
    padding: 1.25rem 1rem;
    color: #fff;
    font-size: 0.95rem;
    position: relative;
    margin-left: 2.5rem;
    margin-top: 0.5rem;
    border-left: 0.5px solid #444;
    padding-left: 1rem;
}


.reply-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
}

.profile-img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.75rem;
}

.user-info {
    flex-grow: 1;
}

.nickname {
    font-weight: 600;
}

.date {
    font-size: 0.75rem;
    color: #aaa;
}

.reply-actions {
    display: flex;
    align-self: flex-start;
    gap: 1rem;
}

.action-btn {
    background: none;
    color: #aaa;
    border: none;
    font-size: 15px;
    cursor: pointer;
    padding: 0;
}

.reply-content {
    margin: 0.75rem 0;
    line-height: 1.6;
    word-break: break-word;
}

.reply-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
}

.reply-icon {
    width: 18px;
    height: 18px;
}

.like-btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #fff;
    border: none;
    background: none;
    font-size: 0.9rem;
    cursor: pointer;
}

.heart-icon {
    width: 20px;
    height: 20px;
}

.liked {
    color: #f87171;
}
</style>
