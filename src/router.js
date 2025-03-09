import { createRouter, createWebHistory } from 'vue-router';

import Menu from './components/Menu.vue';
import Game from './components/Game.vue';

const routes = [
    { path: '/', component: Menu },
    { path: '/game', component: Game },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;