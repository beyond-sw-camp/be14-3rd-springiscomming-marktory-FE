<template>
    <div class="sort-dropdown">
        <button class="sort-button" @click="toggleDropdown">
        {{ selected }}
        <span class="arrow">&#9662;</span>
        </button>
    
        <div v-if="open" class="sort-menu">
        <div
            v-for="option in options"
            :key="option"
            class="sort-option"
            @click="selectOption(option)"
        >
            {{ option }}
        </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, defineEmits } from 'vue'

    const emit = defineEmits(['updateSort']);

    const options = ['전체', '사용순', '최신순']
    const selected = ref('전체')
    const open = ref(false)

    const toggleDropdown = () => {
    open.value = !open.value
    }

    const selectOption = (option) => {
    selected.value = option
    open.value = false
    emit('updateSort', option)
    }
</script>

<style scoped>
    .sort-dropdown {
    position: relative;
    display: inline-block;
    }

    .sort-button {
    background-color: #3a3a3a;
    color: white;
    padding: 12px 16px;
    font-size: 18px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    min-width: 140px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }

    .arrow {
    margin-left: 8px;
    }

    .sort-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    background-color: #3a3a3a;
    border-radius: 20px;
    padding: 12px 0;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    width: 140px;
    z-index: 1000;
    }

    .sort-option {
    padding: 12px 16px;
    color: white;
    cursor: pointer;
    font-size: 18px;
    }

    .sort-option:hover {
    background-color: #2a2a2a;
    }
</style>