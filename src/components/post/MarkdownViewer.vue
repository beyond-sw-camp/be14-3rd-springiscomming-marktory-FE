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
.markdown-body {
    background: transparent;
    color: white;
    font-size: 1rem;
    line-height: 1.6;
    padding: 0.5rem;
    white-space: pre-wrap;
    word-break: break-word;
}
</style>