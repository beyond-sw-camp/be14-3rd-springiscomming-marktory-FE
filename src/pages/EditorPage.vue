// src/pages/EditorPage.vue
<template>
    <div class="editor-page">
        <div class="editor-card">
            <!-- 에디터 + 뷰어 통합 카드 -->
            <div class="editor-preview-wrap">
                <!-- ✍️ 에디터 섹션 -->
                <div class="editor-left">
                    <MarkdownEditor v-model="content" v-model:title="form.title" v-model:tags="form.tags"
                        @publish-click="showSheet = true" />
                </div>

                <!-- 👀 실시간 뷰어 -->
                <div class="editor-right">
                    <MarkdownViewer :source="content" />
                </div>
            </div>
        </div>

        <!-- ✅ 바텀시트 -->
        <PublishBottomSheet :visible="showSheet" :title="form.title" @close="showSheet = false"
            @publish="handlePublish" />
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import MarkdownEditor from '../components/post/MarkdownEditor.vue'
import MarkdownViewer from '../components/post/MarkdownViewer.vue'
import PublishBottomSheet from '../components/post/PublishBottomSheet.vue'
import MarkdownIt from 'markdown-it'
import { getCategories } from '../api/category.api'
import { createPost } from '../api/post.api'
import {
    getHashtags,
    createHashtag
} from '@/api/hashtag.api'
import { getTemplateSpaceByMember, createTemplate } from '../api/template.api';

const showSheet = ref(false)
const content = ref('# 시작해볼까요?')
const form = reactive({
    title: '', tags: []
})

// const handlePublish = (data) => {
//     console.log('출간 데이터:', data)
// }

// ✅ 마크다운 → HTML 변환기 세팅
const md = new MarkdownIt({ html: true, linkify: true })

const handlePublish = async (data) => {
    const html = md.render(content.value)
    const categories = await getCategories()
    const category = categories.find(c => c.name === data.selectedCategory)
    const categoryId = category?.id ?? null

    if (data.type === 'post') {
        const postPayload = {
            title: form.title,
            content: html,
            post_url: '',
            thumbnail: '',
            written_date: new Date().toISOString(),
            delete_date: null,
            visibility: data.visibility,
            member_id: 1,
            category_id: categoryId
        }

        const savedPost = await createPost(postPayload)
        const postId = savedPost.id

        const existingHashtags = await getHashtags()
        const nameToIdMap = Object.fromEntries(existingHashtags.map(h => [h.name, h.id]))

        for (const tag of form.tags) {
            let hashtagId = nameToIdMap[tag]
            if (!hashtagId) {
                const newHashtag = await createHashtag({ name: tag })
                hashtagId = newHashtag.id
            }
            await createHashtag({ post_id: postId, hashtag_id: hashtagId })
        }

        console.log('✅ 게시글 출간 완료')
    } else {
        const templateSpace = await getTemplateSpaceByMember(1)
        const templatePayload = {
            title: form.title,
            description: data.description,
            content: html,
            thumbnail: '',
            written_date: new Date().toISOString(),
            delete_date: null,
            visibility: data.visibility,
            usage_count: 0,
            is_copy: 'N',
            repository_id: templateSpace.id
        }

        await createTemplate(templatePayload)
        console.log('✅ 템플릿 저장 완료')
    }

    showSheet.value = false
}

</script>

<style scoped>
.editor-page {
    background-color: #121212;
    height: 100vh;
    padding: 2rem;
    box-sizing: border-box;
}

.editor-card {
    background-color: #1e1e1e;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    height: 100%;
}

.editor-preview-wrap {
    display: flex;
    height: 100%;
    min-height: 0;
}

.editor-left {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE & Edge */
    border-right: 1px solid #D4D4D4;
}

.editor-left::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari */
}

.editor-right {
    flex: 1;
    padding: 2rem;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.editor-right::-webkit-scrollbar {
    display: none;
}
</style>
