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

const showSheet = ref(false)
const content = ref('# 시작해볼까요?')
const form = reactive({
    title: '', tags: []
})

const handlePublish = (data) => {
    console.log('출간 데이터:', data)
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
