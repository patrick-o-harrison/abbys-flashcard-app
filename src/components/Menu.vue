<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import debounce from 'debounce';

import NumberSelector from './NumberSelector.vue';
import ProblemTypesSelector from './ProblemTypesSelector.vue';

let router = useRouter();

let types = ref({
    'addition': true,
    'subtraction': true,
    'multiplication': true,
    'division': true,
})
let timeout = ref(10);
let goal = ref(25);
let limit = ref(50);

let numberProps = {
    timeout,
    goal,
    limit,
};

let adjustValue = debounce((type, amount) => {
    let value = numberProps[type].value + amount;
    if (value < 1) {
        value = 1;
    }
    numberProps[type].value = value;
}, 100, {immediate: true});

let toggleType = debounce((type) => {
    let value = !types.value[type]
    types.value[type] = value;
}, 100, {immediate: true});

function beginGame() {
    router.push({
        path: '/game',
        query: {
            addition: types.value.addition,
            subtraction: types.value.subtraction,
            multiplication: types.value.multiplication,
            division: types.value.division,
            timeout: timeout.value,
            goal: goal.value,
            limit: limit.value,
        },
    })
}

</script>

<template>
    <div class="text-center select-none">
        <ProblemTypesSelector :types="types" @toggle="toggleType" />
        <NumberSelector @increment="adjustValue('timeout', 1)" @decrement="adjustValue('timeout', -1)"
            label="Seconds Per Question" :value="timeout" />
        <NumberSelector @increment="adjustValue('goal', 1)" @decrement="adjustValue('goal', -1)"
            label="Questions to Win" :value="goal" />
        <NumberSelector @increment="adjustValue('limit', 1)" @decrement="adjustValue('limit', -1)"
            label="Max Total Questions" :value="limit" />
        <div @click="beginGame" class="border-solid border-1 m-1 h-32 flex items-center justify-center">Begin Game</div>
    </div>
</template>