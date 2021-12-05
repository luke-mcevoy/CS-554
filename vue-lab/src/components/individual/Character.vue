<template>
    <div>
        <h1>
            {{this.character.name}}
        </h1>
        <p>
            {{this.character.id}}
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import URLGenerator from '../URLGenerator'
export default {
    name: 'Character',
    data () {
        return {
            id: this.$route.params.id,
            character: {name: null},
            name: null
        };
    },
    methods: {
        getCharacter(ID) {
            axios
                .get(URLGenerator('https://gateway.marvel.com:443/v1/public/characters/'+ID))
                .then(({data}) => {
                    this.character = data.data.results[0];
                    console.log(data.data.results[0]);
                });
        }
    },
    created() {
        this.getCharacter(this.$route.params.id);
    },
    watch: {
        $route() {
            this.getCharacter(this.$route.params.id);
        }
    }
};
</script>
