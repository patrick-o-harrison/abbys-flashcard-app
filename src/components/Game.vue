<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import debounce from 'debounce';

// Build a list of problem generators from the query params,
// and extract the other query params while we're at it.
let route = useRoute();
let generators = [];
if (route.query.addition) {
    generators.push(generateAdditonProblem);
}
if (route.query.subtraction) {
    generators.push(generateSubtractionProblem);
}
if (route.query.multiplication) {
    generators.push(generateMultiplicationProblem);
}
if (route.query.division) {
    generators.push(generateDivisionProblem);
}
let timeout = route.query.timeout;
let goal = route.query.goal;
let limit = route.query.limit;

// The number of correct answers Abby made.
let correctAnswers = ref(0);

// The total number of problems attempted.
let totalProblems = ref(0);


// This is the current problem.  This will be set in
// The transition to the wait_to_start state.
let gameCurrentProblem = ref({});


// When transitioning to the running state, this will
// be the time that transition took place.
let startTime = 0;

// The purpose of timerOut is to easily display the remaining time.
let timerOut = ref("0.00");

// This is the timer's main loop.
let updateTimerTimeout = 0; // Hang onto the handle so we can cancel.
function updateTimer() {
    let now = Date.now();
    let remainingTime = (timeout - (now - startTime) / 1000);
    if (remainingTime > 0) {
        updateTimerTimeout = setTimeout(updateTimer, 40);
    } else {
        remainingTime = 0;
        changeState('wait-to-reset');
    }
    timerOut.value = remainingTime.toFixed(2);
}

// The game can be in one of three states:
//   * init
//   * wait-to-start
//   * running
//   * wait-to-reset
// The game starts in the wait_to_start state.  But during initialization
// it's in the 'init' state.
let gameState = ref('init');

function changeState(state) {
    if (state == 'wait-to-start') {
        // If the timer was running when we transitioned here, it's
        // because the button was pressed.  Abby got one right!
        if (gameState.value == 'running') {
            correctAnswers.value++;
        }
        if (gameState.value != 'init') {
            totalProblems.value++;
        }
        checkScores();
        gameCurrentProblem.value = generateProblem(generators)
    }

    // Stop the timer if we're transitioning from running.
    if (gameState.value == 'running') {
        clearTimeout(updateTimerTimeout);
    }

    if (state == 'running') {
        startTime = Date.now();
        updateTimer();
    }

    gameState.value = state;
}

// When the game is over, route to the /gameover page.
let router = useRouter();
function checkScores() {
    if (correctAnswers.value >= goal) {
        router.replace({
            path: '/gameover',
            query: { goalMet: true, totalTries: totalProblems.value }
        });
    } else if (totalProblems.value >= limit) {
        router.replace({
            path: '/gameover',
            query: { goalMet: false, totalTries: totalProblems.value }
        });
    }
}

let buttonClicked = debounce(() => {
    switch (gameState.value) {
        case 'wait-to-start': {
            changeState('running');
            break;
        }
        case 'running': {
            changeState('wait-to-start');
            break;
        }
        case 'wait-to-reset': {
            changeState('wait-to-start');
            break;
        }
    }
}, 100);

function makeTerms(limitA, limitB) {
    return [
        Math.floor(Math.random() * limitA),
        Math.floor(Math.random() * limitB)
    ]
}

function generateProblem(generators) {
    let index = Math.floor(Math.random() * generators.length);
    let generator = generators[index];
    return generator();
}

function generateAdditonProblem() {
    let [leftTerm, rightTerm] = makeTerms(20, 11);
    let answer = leftTerm + rightTerm;
    return {
        leftTerm,
        rightTerm,
        answer,
        operator: '+'
    };
}

function generateSubtractionProblem() {
    let [leftTerm, rightTerm] = makeTerms(20, 11);
    // Make sure the left term is greater than the right term.
    [leftTerm, rightTerm] = leftTerm > rightTerm ? [leftTerm, rightTerm] : [rightTerm, leftTerm];
    let answer = leftTerm - rightTerm;
    return {
        leftTerm,
        rightTerm,
        answer,
        operator: '-'
    };
}

function generateMultiplicationProblem() {
    let [leftTerm, rightTerm] = makeTerms(11, 11);
    let answer = leftTerm * rightTerm;
    return {
        leftTerm,
        rightTerm,
        answer,
        operator: 'x',
    };
}

function generateDivisionProblem() {
    let mulProblem = generateMultiplicationProblem();
    let leftTerm = mulProblem.answer;
    let [rightTerm, answer] = Math.random() > 0.5 ? [mulProblem.leftTerm, mulProblem.rightTerm] : [mulProblem.rightTerm, mulProblem.leftTerm];
    return {
        leftTerm: leftTerm,
        rightTerm: rightTerm,
        answer,
        operator: '÷'
    }
}

changeState('wait-to-start');

</script>

<template>
    <div class="text-center select-none">
        <div class="grid grid-cols-2 m-1 h-36">
            <span class="justify-self-start m-1">Correct: {{ correctAnswers }}</span>
            <span class="justify-self-end m-1">Total: {{ totalProblems }}</span>
        </div>
        <div class="m-1 h-36">
            <span class="text-5xl"><span class="text-blue-700">{{ gameCurrentProblem.leftTerm }}</span>
                {{ gameCurrentProblem.operator }} <span class="text-blue-700">{{ gameCurrentProblem.rightTerm }}</span>
                = <span class="text-green-700">{{ gameCurrentProblem.answer }}</span></span>
        </div>
        <div class="m-1 h-48">
            <h1 class="text-8xl">{{ timerOut }}</h1>
        </div>
        <div @click="buttonClicked" class="m-1 h-40 border-solid border-1 flex flex-col justify-center"
            :class="{ 'bg-green-500': gameState == 'running', 'bg-red-500': gameState == 'wait-to-reset', 'bg-blue-500': gameState == 'wait-to-start' }">
            <span v-if="gameState == 'running'" class="text-2xl">Tap immediately when Abby gives the correct
                answer!</span>
            <span v-else-if="gameState == 'wait-to-reset'" class="text-2xl">Time Expired. Give Abby the answer and tap
                to continue.</span>
            <span v-else class="text-2xl">Read the problem above (minus the answer) and tap immediately to start.</span>
        </div>
    </div>
</template>