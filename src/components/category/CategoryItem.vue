<template>
  <div :class="['category-item', { editing: isEditing }]">
    <span class="icon drag">☰</span>

    <input
      v-if="isEditing"
      v-model="editedCategory"
      class="category-input"
      @keyup.enter="finishEdit"
    />
    <span v-else class="category-text">{{ editedCategory }}</span>

    <button
      class="icon-button"
      @click="toggleEdit"
      @mouseenter="hovered = 'edit'"
      @mouseleave="hovered = ''">
      <img v-if="!isEditing" :src="hovered === 'edit' ? editOrange : editWhite" alt="수정"/>
      <img v-else :src="hovered === 'edit' ? checkWhite : checkOrange" alt="완료"/>
    </button>

    <button
      class="icon-button"
      @click="showConfirm = true"
      @mouseenter="hovered = 'delete'"
      @mouseleave="hovered = ''">
      <img :src="isEditing ? hovered === 'delete' ? trashWhite : trashOrange : hovered === 'delete' ? trashOrange : trashWhite" alt="삭제"/>
    </button>

    <!-- 삭제 확인 모달 -->
    <div v-if="showConfirm" class="overlay">
      <div class="confirm-box">
        <p>정말 제거하시겠어요?<br /><small>(적용된 게시글은 유지됩니다.)</small></p>
        <div class="buttons">
          <button class="cancel" @click="showConfirm = false">취소</button>
          <button class="confirm" @click="deleteItem">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import editWhite from '@/assets/icons/edit-icon-white.svg'
import editOrange from '@/assets/icons/edit-icon-orange.svg'
import checkWhite from '@/assets/icons/check-icon-white.svg'
import checkOrange from '@/assets/icons/check-icon-orange.svg'
import trashWhite from '@/assets/icons/trash-icon-white.svg'
import trashOrange from '@/assets/icons/trash-icon-orange.svg'
import { ref } from 'vue';

const props = defineProps({
  category: Object
});
const emit = defineEmits(['update', 'delete']);

const isEditing = ref(false);
const hovered = ref('');
const editedCategory = ref(props.category.name);
const showConfirm = ref(false);

function toggleEdit() {
  if (isEditing.value) {
    emit('update', { id: props.category.id, name: editedCategory.value });
  }
  isEditing.value = !isEditing.value;
}

function finishEdit() {
  isEditing.value = false;
  emit('update', { id: props.category.id, name: editedCategory.value });
}

function deleteItem() {
  emit('delete', props.category.id);
  showConfirm.value = false;
}
</script>

<style scoped>
  .category-item {
    width: 803px;
    height: 80px;
    display: flex;
    align-items: center;
    border: 1px solid white;
    padding: 0 20px;
    margin-bottom: 16px;
    position: relative;
    background-color: transparent;
    transition: all 0.3s;
    color: white;
  }

  .category-item:hover {
    border-color: #FD6F22;
  }

  .category-item.editing {
    border: 1px solid #FD6F22;
    color: #FD6F22;
  }

  .icon {
    font-size: 20px;
    margin-right: 16px;
    color: inherit;
  }

  .category-text {
    flex-grow: 1;
    font-size: 20px;
    color: inherit;
  }

  .category-input {
    flex-grow: 1;
    font-size: 20px;
    padding: 8px;
    background-color: transparent;
    color: #FD6F22;
    border: none;
    outline: none;
  }

  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 12px;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .confirm-box {
    width: 430px;
    height: 212px;
    font-size: 23px;
    background: #2f2f2f;
    padding: 24px;
    border-radius: 8px;
    text-align: center;
    color: white;
  }

  .confirm-box .buttons {
    display: flex;
    justify-content: center;
    margin-top: 47px;
    gap: 90px;
  }

  .confirm-box .cancel {
    width: 133px;
    height: 52px;
    padding: 8px 16px;
    background: white;
    border: none;
    color: #FD6F22;
    border-radius: 6px;
    cursor: pointer;
  }

  .confirm-box .cancel:hover {
    background-color: #FD6F22;
    color: white;
  }

  .confirm-box .confirm {
    width: 133px;
    height: 52px;
    padding: 8px 16px;
    background: #fd6f22;
    border: none;
    color: white;
    border-radius: 6px;
    cursor: pointer;
  }

  .confirm-box .confirm:hover {
    background-color: white;
    color: #FD6F22;
  }
</style>
