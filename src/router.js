import { createRouter, createWebHistory } from 'vue-router';

import Menu from './components/Menu.vue';
import Game from './components/Game.vue';
import GameOver from './components/GameOver.vue';

const routes = [
    { path: '/', component: Menu },
    { path: '/game', component: Game },
    { path: '/gameover', component: GameOver }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;