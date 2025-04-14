<template>
    <section class="comment-section">
        <CommentInput @submit="handleSubmitNewComment" />

        <CommentList :comments="comments" :current-user-id="currentUserId" :expanded-comment-ids="expandedCommentIds"
            :replying-comment-id="replyingCommentId" :editing-comment-id="editingCommentId" :edit-content="editContent"
            @toggle-replies="handleToggleReplies" @reply-to="handleReplyTo" @start-edit="handleStartEdit"
            @update-edit-content="(val) => (editContent = val)" @cancel-edit="cancelEdit" @submit-edit="submitEdit" />
    </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import CommentList from './CommentList.vue';
import CommentInput from './CommentInput.vue';

const props = defineProps({
    comments: {
        type: Array,
        required: true
    },
    postId: {
        type: Number,
        required: true
    }
});

const currentUserId = 'u1'; // ✨ 실 서비스에서는 로그인 상태에 따라 처리

const expandedCommentIds = ref(new Set());
const replyingCommentId = ref(null);
const editingCommentId = ref(null);
const editContent = ref('');

function handleToggleReplies(id) {
    if (expandedCommentIds.value.has(id)) {
        expandedCommentIds.value.delete(id);
        if (replyingCommentId.value === id) {
            replyingCommentId.value = null;
        }
    } else {
        expandedCommentIds.value.add(id);
    }
}

function handleReplyTo(id) {
    if (replyingCommentId.value === id) {
        replyingCommentId.value = null;
        expandedCommentIds.value.delete(id);
    } else {
        replyingCommentId.value = id;
        expandedCommentIds.value.add(id);
        editingCommentId.value = null;
        editContent.value = '';
    }
}

function handleStartEdit(id, content) {
    editingCommentId.value = id;
    editContent.value = content;
    replyingCommentId.value = null;
}

function cancelEdit() {
    editingCommentId.value = null;
    editContent.value = '';
}

function submitEdit(content) {
    console.log('수정 제출:', editingCommentId.value, content);
    // 👉 실제 수정 API 연동 필요
    editingCommentId.value = null;
    editContent.value = '';
}

function handleSubmitNewComment(content) {
    console.log('새 댓글 등록:', content);
    // 👉 실제 등록 API 연동 필요
}
</script>

<style scoped>
.comment-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
}
</style>