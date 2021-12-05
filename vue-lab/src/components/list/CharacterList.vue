<template>
    <div>
        <ul>
            <li v-for="(character,index) in characters" :key="index">
                <router-link :to="{name: 'character', params: {id: character.id}}">{{character.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import URLGenerator from '../URLGenerator'
export default {
    name: "CharacterList",
    data() {
        return {
            characters: []
        }
    },
    created() {
        axios
            .get(URLGenerator('https://gateway.marvel.com:443/v1/public/characters'))
            .then(
                ({data}) => {
                    (this.characters = data.data.results);
                    console.log(data.data.results);
                });
    }
}
</script>
