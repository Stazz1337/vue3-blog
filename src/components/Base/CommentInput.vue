<template>
  <div class="comment-input flex flex-col gap-2.5 w-full">
    <div class="group flex flex-col gap-1.5">
      <textarea
          v-model="commentText"
          class="comment-textarea text-sm font-medium rounded-md text-sm w-full"
          :class="[{'error': commentText.length > 250}, {'focus': openInput}]"
          placeholder="Введите комментарий"
          @focus="expandTextarea"
          @blur="reduceTextarea"
      ></textarea>
      <span class="text-xs font-medium" v-show="openInput">
        <span :class="{'text-error': commentText.length > 250}">{{ commentText.length }}</span> из 250 символов
      </span>
    </div>
    <div class="group-btns flex gap-2.5 justify-end" v-show="openInput">
      <button class="btn-close py-3 px-4 rounded-md font-bold" @click="clearTextarea">Отмена</button>
      <button class="btn-enter py-3 px-4 rounded-md font-bold" @click="submitComment">Опубликовать</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const commentText = ref('');
const openInput = ref(false);

const emit = defineEmits(['submit-comment']);

const expandTextarea = () => {
  openInput.value = true;
};

const reduceTextarea = () => {
  if (commentText.value !== '') return
  openInput.value = false;
}

const clearTextarea = () => {
  commentText.value = ''
}

const formatDate = (date) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const formattedDate = date.toLocaleString('ru-RU', options);
  const [datePart, timePart] = formattedDate.split(', ');
  const [day, month, year] = datePart.split('.');

  return `${day}-${month}-${year} в ${timePart}`;
};

const submitComment = () => {
  if (commentText.value.trim().length === 0 || commentText.value.length > 250) {
    return;
  }

  const newComment = {
    userId: Math.floor(Math.random() * 5) + 1,
    userName: 'Гость',
    message: commentText.value,
    date: formatDate(new Date())
  };

  emit('submit-comment', newComment);

  clearTextarea();
  reduceTextarea();
}
</script>

<style lang="scss" scoped>
.comment-input {
  .comment-textarea {
    height: 3.25rem;
    padding: 15px;
    resize: none;
    transition: height 0.3s ease;
    border: 1px solid #ccc;
    box-sizing: border-box;
    color: #3F4254;

    &.error {
      &.focus {
        border: 1px solid rgb(241, 65, 108);
        box-shadow: 0 0 0 2px rgba(241, 65, 108, 0.32);
      }
    }

    &::placeholder {
      color: #7E8299;
    }

    &.focus {
      padding: 10px 15px;
      outline: none;
      height: 8.25rem;
      border: 1px solid rgb(225, 227, 234);
      box-shadow: 0 0 0 2px rgba(62, 151, 255, 0.32);
    }
  }

  .text-error {
    color: rgb(241, 65, 108);
  }

  .group-btns {
    .btn-close {
      min-width: 7.5rem;
      font-size: 0.8125rem;
      line-height: 0.875rem;
      color: #3E97FF;
      background-color: #EEF6FF;
    }
    .btn-enter {
      font-size: 0.8125rem;
      line-height: 0.875rem;
      color: white;
      background-color: #3E97FF;
    }
  }
}
</style>
