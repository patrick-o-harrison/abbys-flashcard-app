<script setup>
    import {defineModel, defineProps, watch} from 'vue';
    const props = defineProps(["label", "dependent"])
    const model = defineModel();
    if(props.dependent.value !== undefined) {
        watch(() => props.dependent, (d) => {
        });
    }
</script>

<template>
    <div class="border-solid border-1 m-1 h-32 flex flex-col justify-center">
        <div>{{ label }}</div>
        <div class="grid grid-cols-3">
            <span @click="model--" class="m-1 border-solid border-1">-</span>
            <input v-model="model" class="m-1 text-center"></input>
            <span @click="model++" class="m-1 border-solid border-1">+</span>
        </div>
    </div>
</template>