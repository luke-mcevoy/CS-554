<template>
    <div>
        <ul>
            <li v-for="(comic,index) in comics" :key="index">
                <router-link :to="{name: 'comic', params: {id: comic.id}}">{{comic.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import URLGenerator from '../URLGenerator'
export default {
    name: "ComicList",
    data() {
        return {
            comics: []
        }
    },
    created() {
        axios
            .get(URLGenerator('https://gateway.marvel.com:443/v1/public/comics'))
            .then(
                ({data}) => {
                    (this.comics = data.data.results);
                    console.log(data.data.results);
                });
    }
}
</script>
