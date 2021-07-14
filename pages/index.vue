<template>
  <v-row>
    <v-col cols="12">
        total: {{ total }}
        offset: {{ offset }}
    </v-col>
    <v-col v-for="(game, i) in contents" :key="i" cols="6" md="6" sm="6">
      <v-card :href="`https://store.nintendo.co.kr/${game.id}`" target="_blank">
        <v-img :src="game.hero_banner_url" height="200px" />
        <v-card-title>{{ game.formal_name }}</v-card-title>
        <v-card-subtitle>{{ game.disclaimer }}</v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { getSaleGames } from 'ns-eshop-sale';

export default {
  async asyncData() {

    const { contents, offset, total } = await getSaleGames({
      country: 'KR',
      language: 'ko',
      count: 20,
      offset: 0
    });
    return { contents, offset, total };
  },
  data() {
    return {
      contents: {},
    };
  },
};
</script>