<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" flat outlined app>
      <v-toolbar-title>{{ title }}
        <v-btn href="https://github.com/rkJun/ns-eshop-sale-nuxt" target="_blank" plain><v-icon>mdi-github</v-icon></v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} </span>
    </v-footer> -->
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: '인기 검색어',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '최신뉴스',
          to: '/news/recent',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '많이 본 뉴스',
          to: '/news/ranking',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '커뮤니티 최신글',
          to: '/community/recent',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '커뮤니티 베스트글',
          to: '/community/recent',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '유튜브테스트',
          to: '/youtubetest',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ns-eshop-sale-nuxt',
    };
  },
};
</script>
<style>
/* .v-application a {
  text-decoration: none;
} */
</style>
