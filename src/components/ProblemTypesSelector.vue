<script setup>
import {defineModel} from 'vue';

const model = defineModel();

function toggle(type) {
    let value = model.value[type];
    model.value[type] = !value;
}
</script>

<template>
    <div class="border-solid border-1 m-1 h-32 flex flex-col justify-center">
        <div>Types of Problems</div>
        <div class="grid grid-cols-2">
            <div @click="toggle('addition')" class="m-1 border-solid border-1"
                :class="{ 'bg-green-500': model.addition }">Addition</div>
            <div @click="toggle('subtraction')" class="m-1 border-solid border-1"
                :class="{ 'bg-green-500': model.subtraction }">Subtraction</div>
            <div @click="toggle('multiplication')" class="m-1 border-solid border-1"
                :class="{ 'bg-green-500': model.multiplication }">Multiplication</div>
            <div @click="toggle('division')" class="m-1 border-solid border-1"
                :class="{ 'bg-green-500': model.division }">Division</div>
        </div>
    </div>
</template>