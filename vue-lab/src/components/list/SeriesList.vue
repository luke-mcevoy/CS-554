<template>
    <div>
        <ul>
            <li v-for="(serie,index) in series" :key="index">
                <router-link :to="{name: 'serie', params: {id: serie.id}}">{{serie.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import URLGenerator from '../URLGenerator'
export default {
    name: "SeriesList",
    data() {
        return {
            series: []
        }
    },
    created() {
        axios
            .get(URLGenerator('https://gateway.marvel.com:443/v1/public/series'))
            .then(
                ({data}) => {
                    (this.series = data.data.results);
                    console.log(data.data.results);
                });
    }
}
</script>
