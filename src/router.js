import { createRouter, createMemoryHistory } from 'vue-router';

import Menu from './components/Menu.vue';
import Game from './components/Game.vue';

const routes = [
    { path: '/', component: Menu },
    { path: '/game', component: Game },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router;