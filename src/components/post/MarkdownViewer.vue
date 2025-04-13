<template>
    <div class="viewer-wrapper">
        <div class="markdown-body" v-html="renderedHtml" />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps({ source: String })
const md = new MarkdownIt({ html: true, linkify: true })
const renderedHtml = computed(() => md.render(props.source || ''))
</script>

<style scoped>
.viewer-wrapper {
    height: 100%;
    overflow-y: auto;
    padding: 1rem;
    box-sizing: border-box;

    scrollbar-width: none;
    -ms-overflow-style: none;
}

.viewer-wrapper::-webkit-scrollbar {
    display: none;
}

.markdown-body {
    min-height: 100%;
    background: transparent;
    color: white;
    font-size: 1rem;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
}
</style>