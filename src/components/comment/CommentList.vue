<template>
    <section class="comment-section">
        <div v-for="comment in comments" :key="comment.id">
            <CommentItem :comment="comment" :current-user-id="currentUserId"
                :is-expanded="expandedCommentIds.has(comment.id)" :is-replying="replyingCommentId === comment.id"
                :is-editing="editingCommentId === comment.id" :edit-content="editContent"
                @toggle-replies="$emit('toggle-replies', comment.id)" @reply-to="$emit('reply-to', comment.id)"
                @start-edit="$emit('start-edit', comment.id, comment.content)"
                @update-edit-content="$emit('update-edit-content', $event)" @cancel-edit="$emit('cancel-edit')"
                @submit-edit="$emit('submit-edit')" />

            <div v-if="expandedCommentIds.has(comment.id)" class="reply-wrapper">
                <ReplyItem v-for="reply in comment.replies" :key="reply.id" :reply="reply"
                    :current-user-id="currentUserId" />

                <CommentInput v-if="replyingCommentId === comment.id" :parent-id="comment.id"
                    @submit="(content) => console.log('답글 등록:', content)" />
            </div>
        </div>
    </section>
</template>

<script setup>
import CommentItem from "./CommentItem.vue";
import ReplyItem from "./ReplyItem.vue";
import CommentInput from "./CommentInput.vue";

const props = defineProps({
    comments: Array,
    currentUserId: String,
    expandedCommentIds: Object, // Set
    replyingCommentId: String,
    editingCommentId: String,
    editContent: String,
});
</script>

<style scoped>
.comment-section {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.reply-wrapper {
    margin-left: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>