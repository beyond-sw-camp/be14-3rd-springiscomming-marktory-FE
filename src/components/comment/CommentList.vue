<template>
    <section class="comment-section">
        <div v-for="comment in comments" :key="comment.id">
            <CommentItem :comment="comment" :current-user-id="currentUserId" />

            <ReplyItem v-for="reply in comment.replies" :key="reply.id" :reply="reply"
                :current-user-id="currentUserId" />
        </div>
    </section>
</template>
<script setup>
import CommentItem from "./CommentItem.vue";
import ReplyItem from "./ReplyItem.vue";

const props = defineProps({
    comments: Array,
    currentUserId: String,
});
</script>

<style scoped>
.comment-section {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
</style>