<template>
  <v-row>
    <v-col cols="12">
      <p>
        This is a sample nuxt app using <a href="https://github.com/rkJun/ns-eshop-sale" target="_blank">ns-eshop-sale</a> api.
      </p>
    </v-col>
    <v-col cols="12">
      <v-form>
        <v-row>
          <v-col cols="6" md="4" sm="6">
            <v-select
              v-model="selectedShop"
              :items="shopList"
              :hint="`${selectedShop.country}, ${selectedShop.language}`"
              item-text="countryName"
              item-value="country"
              label="Countries/Language"
              outlined
              return-object
              dense
            ></v-select>
          </v-col>
          <v-col cols="6" md="2" sm="6">
            <v-select
              v-model="count"
              :items="[10, 20, 30]"
              label="Count"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="6" md="2" sm="6">
            <v-select
              v-model="offset"
              :items="offsetList"
              label="Offset"
              outlined
              return-object
              dense
            ></v-select>
          </v-col>
          <v-col cols="6" md="4" sm="6">
            <v-btn large class="primary" @click.stop="onSubmit">
              Search
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>

    <v-col cols="12">
      <h1>total : {{ total }} </h1>
    </v-col>
    <v-col v-for="(game, i) in contents" :key="i" cols="6" md="6" sm="6">
      <v-card :href="`https://store.nintendo.co.kr/${game.id}`" target="_blank">
        <v-img :src="game.hero_banner_url" height="200px" />
        <v-card-title>{{ game.formal_name }}</v-card-title>
        <v-card-subtitle>{{ game.disclaimer }}</v-card-subtitle>
      </v-card>
    </v-col>
      <v-snackbar
      v-model="snackbar"
      timeout="2000"
    >
      {{ textMsg }}
    </v-snackbar>
  </v-row>
</template>
<script>
import { getSaleGames } from 'ns-eshop-sale';

export default {
  async asyncData({params}) {

    const { country = 'KR', language = 'ko', count = 10, offset = 0} = params;
    const { contents, total } = await getSaleGames({
        country,
        language,
        count,
        offset
      }
    );

    const offsetList = [];
    for (let i = 0; i < total; i+=count) {
      offsetList.push(i);
    }
    return { contents, total, params, offsetList };
  },
  data() {
    return {
      contents: {},
      total: 0,
      count: 10,
      offset: 0,
      offsetList: [],
      snackbar: false,
      textMsg: 'No Data Found',
      selectedShop: { country: 'KR', language: 'ko', countryName: '대한민국' },
      shopList: [
        { country: 'AR', language: 'es', countryName: 'Argentina' },
        { country: 'AU', language: 'en', countryName: 'Australia' },
        { country: 'BE', language: 'fr', countryName: 'Belgium' },
        { country: 'BR', language: 'pt', countryName: 'Brazil' },
        { country: 'CA', language: 'en', countryName: 'Canada' },
        { country: 'CH', language: 'de', countryName: 'Switzerland' },
        { country: 'CL', language: 'es', countryName: 'Chile' },
        { country: 'CO', language: 'es', countryName: 'Columbia' },
        { country: 'CZ', language: 'en', countryName: 'Czech' },
        { country: 'DE', language: 'de', countryName: 'Germany' },
        { country: 'DK', language: 'en', countryName: 'Denmark' },
        { country: 'ES', language: 'es', countryName: 'Spain' },
        { country: 'FI', language: 'en', countryName: 'Finland' },
        { country: 'FR', language: 'fr', countryName: 'France' },
        { country: 'GB', language: 'en', countryName: 'UK' },
        { country: 'GR', language: 'en', countryName: 'Greece' },
        { country: 'HK', language: 'zh', countryName: 'Hongkong' },
        { country: 'HU', language: 'en', countryName: 'Hungary' },
        { country: 'IT', language: 'it', countryName: 'Italia' },
        { country: 'JP', language: 'ja', countryName: 'Japan' },
        { country: 'KR', language: 'ko', countryName: '대한민국' },
        { country: 'MX', language: 'es', countryName: 'Mexico' },
        { country: 'NL', language: 'nl', countryName: 'Nederland' },
        { country: 'NO', language: 'en', countryName: 'Norway' },
        { country: 'NZ', language: 'en', countryName: 'NewZealand' },
        { country: 'PE', language: 'es', countryName: 'Peru' },
        { country: 'PL', language: 'en', countryName: 'Poland' },
        { country: 'PT', language: 'pt', countryName: 'Portugal' },
        { country: 'RU', language: 'ru', countryName: 'Российская Федерация' },
        { country: 'SE', language: 'en', countryName: 'Sweden' },
        { country: 'US', language: 'en', countryName: 'United States of America' },
        { country: 'ZA', language: 'en', countryName: 'SouthAfrica' },      ]
    };
  },
  beforeMount() {
    window.addEventListener('scroll', this.onScroll);
  },
  methods: {
    async getGames() {
      const { data } = await this.$axios.get('/api/games', {
        params: {
          country: this.selectedShop.country,
          language: this.selectedShop.language,
          count: this.count,
          offset: this.offset
        }
      });
      return data;
    },
    async onSubmit() {

      const data = await this.getGames();

      const offsetList = [];
      for (let i = 0; i < data.total; i+=this.count) {
        offsetList.push(i);
      }

      this.contents = data.contents;
      this.total = data.total;

      this.offsetList = offsetList;

    },
    async onScroll() {

      const nowScroll = Math.round(window.scrollY);
      const limit = document.body.offsetHeight - window.innerHeight;

      if (this.total <= this.offset) {
        this.snackbar = true;
      }

      if ((nowScroll === limit - 1 || nowScroll === limit) && (this.total > this.offset)) {
        this.offset = this.offset + this.count;

        const data = await this.getGames();

        this.contents.push(...data.contents);
      }
    }
  },
};
</script>