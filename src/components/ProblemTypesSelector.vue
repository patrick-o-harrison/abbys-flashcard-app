<script setup>
import {defineProps, defineEmits} from 'vue';

const props = defineProps(['types']);
const emit = defineEmits(['toggle']);
</script>

<template>
    <div class="border-solid border-1 m-1 h-32 flex flex-col justify-center">
        <div>Types of Problems</div>
        <div class="grid grid-cols-2">
            <div @click="emit('toggle', 'addition')" class="m-1 border-solid border-1"
                :class="{ 'bg-green-500': types.addition }">Addition</div>
            <div @click="emit('toggle', 'subtraction')" class="m-1 border-solid border-1"
                :class="{ 'bg-green-500': types.subtraction }">Subtraction</div>
            <div @click="emit('toggle', 'multiplication')" class="m-1 border-solid border-1"
                :class="{ 'bg-green-500': types.multiplication }">Multiplication</div>
            <div @click="emit('toggle', 'division')" class="m-1 border-solid border-1"
                :class="{ 'bg-green-500': types.division }">Division</div>
        </div>
    </div>
</template>