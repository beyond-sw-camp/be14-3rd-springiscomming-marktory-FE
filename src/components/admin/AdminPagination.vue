<!-- components/Pagination.vue -->
<template>
    <div class="pagination">
      <span @click="goToPrev" :class="{ disabled: currentPage <= 1 }">&laquo;</span>
  
      <span
        v-for="page in totalPages"
        :key="page"
        :class="{ active: currentPage === page }"
        @click="$emit('update:page', page)"
      >
        {{ page }}
      </span>
  
      <span @click="goToNext" :class="{ disabled: currentPage >= totalPages }">&raquo;</span>
    </div>
  </template>
  
  <script setup>
  defineProps({
    currentPage: Number,
    totalPages: Number
  })
  
  const emit = defineEmits(['update:page'])
  
  function goToPrev() {
    if (currentPage > 1) emit('update:page', currentPage - 1)
  }
  
  function goToNext() {
    if (currentPage < totalPages) emit('update:page', currentPage + 1)
  }
  </script>
  
  <style scoped>
  .pagination {
    position: sticky;
    margin-top: 100px;
    bottom: 50px;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
  
  .pagination span {
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
    background-color: #222;
    color: #ccc;
    transition: 0.3s;
  }
  
  .pagination span:hover {
    background-color: #FD6F22;
    color: #fff;
  }
  
  .pagination .active {
    background-color: #FD6F22;
    color: #fff;
  }
  
  .pagination .disabled {
    pointer-events: none;
    opacity: 0.4;
  }
  </style>
  