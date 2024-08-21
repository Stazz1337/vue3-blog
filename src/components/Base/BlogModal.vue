<template>
  <div class="blog-item-modal flex fixed top-0 left-0 w-full h-full z-40" @click="$emit('close')">
    <div class="wrapper h-full mx-auto flex overflow-auto py-4 px-2.5">
      <div class="main flex flex-col gap-2.5 bg-white rounded-xl p-4 my-auto relative shadow-2xl" @click.stop>
        <i class="icon icon-cross-x absolute top-4 right-4 text-xl cursor-pointer font-semibold" @click="$emit('close')"></i>
        <h3 class="title text-2xl/6 font-semibold">{{ blog.title }}</h3>
        <div class="content flex flex-col">
          <BlogInfo :created-at="blog.createdAt" :comments="blog.comments.length" />
          <img :src="`src/assets/img/images/${blog.img}.png`" alt="" @click="$emit('openBlog', blog)">
          <p class="text text-base/[25px] font-medium">{{ blog.text }}</p>
        </div>
        <Tags class="gap-2.5 mb-1.5" :tags="blog.tags" :tag-class="'text-sm'"/>
        <div class="comments flex flex-col gap-2.5">
          <h4 class="comments-title text-base font-semibold">Комментариев {{ blog.comments.length }}</h4>
          <CommentInput @submit-comment="addComment"/>
          <div class="comments-list p-3 flex flex-col gap-3">
            <CommentItem v-for="(comment, index) in blog.comments" :key="index" :comment="comment"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tags from '@/components/Base/Tags.vue';
import BlogInfo from '@/components/Base/BlogInfo.vue';
import CommentItem from '@/components/Base/CommentItem.vue';
import CommentInput from '@/components/Base/CommentInput.vue';

const props = defineProps({
  blog: { type: Object }
});

const addComment = (newComment) => {
  props.blog.comments.push(newComment);
};
</script>

<style lang="scss" scoped>
.blog-item-modal {
  background-color: #0000004D;
  .main {
    max-width: 39.375rem;
  }
  .content {
    gap: 0.9375rem;
  }
  .wrapper {
    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
  }
}
</style>
