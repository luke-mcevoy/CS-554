<template>
    <div>
        <h1>
            {{this.serie.title}}
        </h1>
        <p>
            {{this.serie.id}}
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import URLGenerator from '../URLGenerator'
export default {
    name: 'Series',
    data () {
        return {
            id: this.$route.params.id,
            serie: {title: null},
            name: null
        };
    },
    methods: {
        getSeries(ID) {
            axios
                .get(URLGenerator('https://gateway.marvel.com:443/v1/public/series/'+ID))
                .then(({data}) => {
                    this.serie = data.data.results[0];
                    console.log(data.data.results[0]);
                });
        }
    },
    created() {
        this.getSeries(this.$route.params.id);
    },
    watch: {
        $route() {
            this.getSeries(this.$route.params.id);
        }
    }
};
</script>
