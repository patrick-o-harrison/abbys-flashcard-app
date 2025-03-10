<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import _ from 'lodash-es';

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


function beginGame() {
    console.log(`${goal.value}, ${limit.value}`);
    if(goal.value > limit.value) {
        alert("Questions to Win must be less than Max Total Questions");
        return;
    }
    if(!_.values(types.value).some(e => e)) {
        alert("At least one type of problem must be selected");
        return;
    }
    
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
        <ProblemTypesSelector v-model="types" />
        <NumberSelector label="Seconds Per Question" v-model="timeout" :dependent="{type: 'none'}"/>
        <NumberSelector label="Questions to Win" v-model="goal" :dependent="{type: 'lt', value: {limit} }"/>
        <NumberSelector label="Max Total Questions" v-model="limit" :dependent="{type: 'gt', value: {goal}}"/>
        <div @click="beginGame" class="border-solid border-1 m-1 h-32 flex items-center justify-center">Begin Game</div>
    </div>
</template>