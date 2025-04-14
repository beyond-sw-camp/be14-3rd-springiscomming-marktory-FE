<template>
    <div class="comment-item">
        <!-- 수정 모드 -->
        <CommentInput v-if="isEditing" :initial-text="editContent" :is-edit="true"
            @submit="(content) => $emit('submit-edit', content)" @cancel="$emit('cancel-edit')" />

        <!-- 일반 모드 -->
        <template v-else>
            <div class="comment-header" @click="$emit('toggle-replies')">
                <img :src="comment.profileImage" alt="profile" class="profile-img" />
                <div class="user-info">
                    <div class="nickname">{{ comment.nickname }}</div>
                    <div class="date">{{ formatDate(comment.createdAt) }}</div>
                </div>

                <div class="comment-actions">
                    <template v-if="isMine">
                        <button class="action-btn" @click.stop="$emit('start-edit')">수정</button>
                        <button class="action-btn" @click.stop>삭제</button>
                    </template>
                    <template v-else>
                        <button class="action-btn" @click.stop>신고</button>
                    </template>
                </div>
            </div>

            <div class="comment-content">{{ comment.content }}</div>

            <div class="comment-footer">
                <button class="reply-btn" @click="$emit('reply-to')">
                    <img src="@/assets/icons/reply-icon.svg" alt="reply" class="reply-icon" />
                    답글 달기
                    <span>{{ comment.replies.length }}</span>
                </button>

                <button class="like-btn" :class="{ liked: comment.liked }" @click="toggleLike">
                    <img :src="comment.liked ? filledHeart : emptyHeart" alt="like" class="heart-icon" />
                    <span>{{ comment.likeCount }}</span>
                </button>
            </div>
        </template>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import filledHeart from '@/assets/icons/heart-icon.svg';
import emptyHeart from '@/assets/icons/heart-icon-empty.svg';
import CommentInput from './CommentInput.vue';

const props = defineProps({
    comment: Object,
    currentUserId: String,
    isExpanded: Boolean,
    isReplying: Boolean,
    isEditing: Boolean,
    editContent: String,
});

const emit = defineEmits([
    'toggle-replies',
    'reply-to',
    'start-edit',
    'submit-edit',
    'cancel-edit',
]);

const isMine = computed(() => props.comment.userId === props.currentUserId);
const formatDate = (dateStr) => {
    if (!dateStr) return '날짜 없음';
    return dateStr.split('T')[0];
};
const toggleLike = () => {
    console.log('좋아요 토글:', props.comment.id);
};
</script>

<style scoped>
.comment-item {
    background-color: #2a2a2a;
    border-radius: 1rem;
    padding: 1.25rem 1rem;
    color: #fff;
    font-size: 0.95rem;
    border-left: 1.5px solid #444;
    position: relative;
}

.comment-header {
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

.comment-actions {
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

.comment-content {
    margin: 0.75rem 0;
    line-height: 1.6;
    word-break: break-word;
}

.comment-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
}

.reply-btn {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    color: #f58220;
    border: none;
    background: none;
    cursor: pointer;
    font-weight: 500;
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