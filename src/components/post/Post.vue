<template>
  <article class="post-article">
    <header class="post-header">
      <div class="post-title">{{ post.title }}</div>
      <div class="post-meta">
        {{ post.date }}
        <span class="report-link">신고</span>
      </div>
    </header>

    <section class="post-tags">
      <span v-for="(tag, index) in post.tags" :key="index" class="tag">
        #{{ tag }}
      </span>
    </section>

    <section v-if="post.image" class="post-image">
      <img :src="post.image" alt="포스트 이미지" />
      <figcaption class="caption">휴식 중인 고양이</figcaption>
    </section>

    <section class="post-content">
      <div class="post-label">Liked</div>
      <p class="post-body" v-html="post.content" />
    </section>
  </article>
</template>

<script>
export default {
  name: "Post",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.post-article {
  background-color: #000;
  color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 720px;
  margin: 2rem auto;
  font-family: 'Helvetica Neue', sans-serif;
}

.post-header {
  margin-bottom: 1.2rem;
}

.post-title {
  font-size: 1.6rem;
  font-weight: bold;
}

.post-subtitle {
  font-size: 1.2rem;
  color: #ccc;
  margin-top: 0.25rem;
}

.post-meta {
  font-size: 0.9rem;
  color: #aaa;
  margin-top: 0.5rem;
}

.report-link {
  float: right;
  color: #fff;
  cursor: pointer;
}

.post-tags {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: #f58220;
  color: #424242;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.85rem;
}

.post-image {
  margin: 1rem 0;
  text-align: center;
}

.post-image img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.caption {
  font-size: 0.85rem;
  color: #aaa;
  margin-top: 0.3rem;
}

.post-content {
  margin-top: 1.5rem;
}

.post-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.post-body {
  white-space: pre-line;
  line-height: 1.7;
  font-size: 1rem;
}
</style>
