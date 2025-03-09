<script setup>
    import {defineProps} from 'vue';

    const props = defineProps(['label', 'count']);
</script>

<template>
    <div class="flex justify-center items-center">
        <div>
            <span>{{ label }}</span>
        </div>
        <div>
            {{  count.value }}
        </div>
    </div>
</template>