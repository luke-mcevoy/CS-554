import Vue from 'vue';
import Router from 'vue-router';
import Landing from './components/Landing.vue';
import Character from './components/individual/Character.vue';
import Comic from './components/individual/Comic.vue';
import Series from './components/individual/Series.vue';
import CharacterList from './components/list/CharacterList.vue';
import ComicList from './components/list/ComicList.vue';
import SeriesList from './components/list/SeriesList.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'landing',
			component: Landing,
		},
		{
			path: '/characters',
			name: 'characters',
			component: CharacterList,
		},
		{
			path: '/comics',
			name: 'comics',
			component: ComicList,
		},
		{
			path: '/series',
			name: 'series',
			component: SeriesList,
		},
		{
			path: '/character/:id',
			name: 'character',
			component: Character,
		},
		{
			path: '/comic/:id',
			name: 'comic',
			component: Comic,
		},
		{
			path: '/serie/:id',
			name: 'serie',
			component: Series,
		},
	],
});
