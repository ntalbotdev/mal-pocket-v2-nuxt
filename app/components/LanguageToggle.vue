<template>
  <button 
    class="language-toggle"
    @click="toggleLanguage"
  >
    {{ showJapanese ? 'EN' : 'JP' }}
  </button>
</template>

<script setup lang="ts">
interface LanguageToggleProps {
  modelValue: boolean;
}

interface LanguageToggleEmits {
  (e: 'update:modelValue', value: boolean): void;
}

const props = defineProps<LanguageToggleProps>();
const emit = defineEmits<LanguageToggleEmits>();

const showJapanese = computed(() => props.modelValue);

const toggleLanguage = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>
