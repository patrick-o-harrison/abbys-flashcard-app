<script setup>
    import {defineEmits, defineProps} from 'vue';

    const props = defineProps(['label', 'value']);
    const emit = defineEmits(['increment', 'decrement']);
</script>

<template>
    <div class="border-solid border-1 m-1 h-32 flex flex-col justify-center">
        <div>{{ label }}</div>
        <div class="grid grid-cols-3">
            <span @click="emit('decrement')" class="m-1 border-solid border-1">-</span>
            <span class="m-1">{{ value }}</span>
            <span @click="emit('increment')" class="m-1 border-solid border-1">+</span>
        </div>
    </div>
</template>