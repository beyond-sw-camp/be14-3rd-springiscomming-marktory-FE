<template>
  <AppHeader />
  <main class="page-layout">
    <aside class="left-sidebar">
      <!-- <AuthorProfile v-if="postData" :member="postData.member" /> -->
    </aside>

    <article class="main-content">
      <Post v-if="postData" :post="postData" />
      <Comment v-if="postData" :comments="commentTree" :post-id="postData.id" @update:comments="updateCommentTree" />
    </article>

    <aside class="right-sidebar">
      <Category :categories="categoryList" />
    </aside>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import AppHeader from '@/components/AppHeader.vue'
import Comment from "../components/comment/Comment.vue";
import Post from "../components/post/Post.vue";
import Category from "../components/post/Category.vue";
import AuthorProfile from "../components/mypage/SideProfile.vue";

import { getPostById } from '@/api/post.api';
import { getMembers } from '@/api/member.api';
import { getCategories } from '@/api/category.api';
import { getHashtags, getPostHashtag } from '@/api/hashtag.api';
import { getComments } from '@/api/comment.api';

import { mapPost } from '@/models/post.js';

const route = useRoute();

const postData = ref(null);
const categoryList = ref([]);
const commentTree = ref([]);

onMounted(async () => {
  const postId = Number(route.params.id || 1);

  const [postRaw, members, categories, hashtags, postHashtags, comments] = await Promise.all([
    getPostById(postId),
    getMembers(),
    getCategories(),
    getHashtags(),
    getPostHashtag(),
    getComments()
  ]);

  const member = members.find(m => m.id === postRaw.member_id);
  const category = categories.find(c => c.id === postRaw.category_id);
  const hashtagNames = postHashtags
    .filter(ph => ph.post_id === postRaw.id)
    .map(ph => hashtags.find(h => h.id === ph.hashtag_id)?.name)
    .filter(Boolean);

  postData.value = mapPost(postRaw, hashtagNames, member, category);
  categoryList.value = categories;

  // 댓글 작성자 매핑
  const filtered = comments
    .filter(c => Number(c.post_id) === Number(postRaw.id) && !c.is_deleted)
    .map(c => ({
      ...c,
      member: members.find(m => m.id === c.member_id) || null
    }));

  // 1단계 대댓글 트리 구성
  const parents = filtered.filter(c => c.type === 1);
  const replies = filtered.filter(c => c.type === 2);

  commentTree.value = parents.map(parent => ({
    ...parent,
    replies: replies.filter(reply => reply.above_id === parent.id)
  }));
  console.log('✅ commentTree:', commentTree.value);
  console.log('✅ sample comment:', commentTree.value[0]);
});

function updateCommentTree(newComments) {
  commentTree.value = buildCommentTree(newComments)
}

// 댓글들을 트리 구조로 변환
function buildCommentTree(comments) {
  const map = {}
  const roots = []

  comments.forEach(c => {
    map[c.id] = { ...c, replies: [] }
  })

  comments.forEach(c => {
    if (c.above_id) {
      map[c.above_id]?.replies.push(map[c.id])
    } else {
      roots.push(map[c.id])
    }
  })

  return roots
}
</script>

<style scoped>
.page-layout {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
}

.left-sidebar {
  width: 200px;
}

.main-content {
  flex: 1;
  max-width: 720px;
}

.right-sidebar {
  position: sticky;
  top: 2rem;
  width: 160px;
}

.comment-section {}
</style>
