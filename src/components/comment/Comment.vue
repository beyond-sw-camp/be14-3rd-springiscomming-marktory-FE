<template>
    <section class="comment-section">
        <CommentInput @submit="handleSubmitNewComment" />

        <CommentList :comments="comments" :current-user-id="currentUserId" :expanded-comment-ids="expandedCommentIds"
            :replying-comment-id="replyingCommentId" :editing-comment-id="editingCommentId" :edit-content="editContent"
            @toggle-replies="handleToggleReplies" @reply-to="handleReplyTo" @start-edit="handleStartEdit"
            @update-edit-content="(val) => (editContent = val)" @cancel-edit="cancelEdit" @submit-edit="submitEdit"
            @submit-reply="handleSubmitReply" />

        <div ref="scrollAnchor" style="height: 1px;"></div>
    </section>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import CommentList from './CommentList.vue'
import CommentInput from './CommentInput.vue'
import { createComment, getComments } from '@/api/comment.api'

const props = defineProps({
    postId: String,
    comments: Array,
    currentUserId: {
        type: String,
        default: '1'
    }
})

const emit = defineEmits(['update:comments'])

const expandedCommentIds = ref(new Set())
const replyingCommentId = ref(null)
const editingCommentId = ref(null)
const editContent = ref('')
const scrollAnchor = ref(null)

function handleToggleReplies(id) {
    if (expandedCommentIds.value.has(id)) {
        expandedCommentIds.value.delete(id)
        if (replyingCommentId.value === id) {
            replyingCommentId.value = null
        }
    } else {
        expandedCommentIds.value.add(id)
    }
}

function handleReplyTo(id) {
    if (replyingCommentId.value === id) {
        replyingCommentId.value = null
        expandedCommentIds.value.delete(id)
    } else {
        replyingCommentId.value = id
        expandedCommentIds.value.add(id)
        editingCommentId.value = null
        editContent.value = ''
    }
}

function handleStartEdit(id, content) {
    editingCommentId.value = id
    editContent.value = content
    replyingCommentId.value = null
}

function cancelEdit() {
    editingCommentId.value = null
    editContent.value = ''
}

function submitEdit() {
    editingCommentId.value = null
    editContent.value = ''
}

function getKSTISOString() {
    const now = new Date()
    const kstOffset = 9 * 60 * 60 * 1000
    return new Date(now.getTime() + kstOffset).toISOString()
}

function buildCommentTree(flatComments) {
    const map = new Map()
    const roots = []

    flatComments.forEach(c => {
        c.replies = []
        map.set(c.id, c)
    })

    flatComments.forEach(c => {
        if (c.type === 2 && c.above_id && map.has(c.above_id)) {
            map.get(c.above_id).replies.push(c)
        } else if (c.type === 1) {
            roots.push(c)
        }
    })

    return roots
}

async function handleSubmitNewComment(content) {
    try {
        await createComment({
            content,
            written_date: getKSTISOString(),
            modify_date: null,
            is_deleted: false,
            type: 1,
            above_id: null,
            member_id: props.currentUserId,
            post_id: props.postId
        })

        const updated = await getComments()
        const filtered = updated.filter(c => c.post_id === props.postId && !c.is_deleted)
        const tree = buildCommentTree(filtered)

        emit('update:comments', tree)

        await nextTick()
        scrollAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } catch (err) {
        console.error('댓글 저장 실패:', err)
    }
}

async function handleSubmitReply(content) {
    try {
        await createComment({
            content,
            written_date: getKSTISOString(),
            modify_date: null,
            is_deleted: false,
            type: 2,
            above_id: replyingCommentId.value,
            member_id: props.currentUserId,
            post_id: props.postId
        })

        const updated = await getComments()
        const filtered = updated.filter(c => c.post_id === props.postId && !c.is_deleted)
        const tree = buildCommentTree(filtered)

        replyingCommentId.value = null
        emit('update:comments', tree)

        await nextTick()
        scrollAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } catch (err) {
        console.error('답글 저장 실패:', err)
    }
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