<template>
  <div class="pagination">
    <button 
      class="pagination__btn"
      :disabled="currentPage === 1"
      @click="$emit('page-change', currentPage - 1)"
    >
      Previous
    </button>
    
    <span class="pagination__info">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    
    <button 
      class="pagination__btn"
      :disabled="currentPage === totalPages"
      @click="$emit('page-change', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

interface PaginationEmits {
  (e: 'page-change', page: number): void;
}

defineProps<PaginationProps>();
defineEmits<PaginationEmits>();
</script>

<style scoped lang="scss">
@use "@/assets/css/variables" as *;

.pagination {
  @apply flex items-center justify-center gap-4 py-6;

  &__btn {
    @apply px-4 py-2 rounded transition-colors duration-200 shadow;
    background-color: $color-accent;
    color: $color-bg;

    &:hover:not(:disabled) {
      background-color: $color-accent-hover;
      color: $color-text;
    }

    &:disabled {
      @apply opacity-50 cursor-not-allowed;
    }
  }

  &__info {
    @apply font-semibold;
    color: $color-text;
  }
}
</style>
