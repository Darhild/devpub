<template>
  <div class="Articles">
    <nav class="ArticlesNav Nav">
      <div class="ArticlesNav-Item Nav-Item">
        Новые
      </div>
      <div class="ArticlesNav-Item Nav-Item">
        Самые обсуждаемые
      </div>
      <div class="ArticlesNav-Item Nav-Item">
        Лучшие
      </div>
      <div class="ArticlesNav-Item Nav-Item">
        Старые
      </div>
    </nav>
    <div class="Articles-Content">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articlesNumber: 4
    }
  },

  mounted() {

  }
}
</script>
