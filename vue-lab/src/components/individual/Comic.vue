<template>
    <div>
        <h1>
            {{this.comic.title}}
        </h1>
        <p>
            {{this.comic.id}}
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import URLGenerator from '../URLGenerator'
export default {
    name: 'Comic',
    data () {
        return {
            id: this.$route.params.id,
            comic: {name: null},
            name: null
        };
    },
    methods: {
        getComic(ID) {
            axios
                .get(URLGenerator('https://gateway.marvel.com:443/v1/public/comics/'+ID))
                .then(({data}) => {
                    this.comic = data.data.results[0];
                    console.log(data.data.results[0]);
                });
        }
    },
    created() {
        this.getComic(this.$route.params.id);
    },
    watch: {
        $route() {
            this.getComic(this.$route.params.id);
        }
    }
};
</script>
