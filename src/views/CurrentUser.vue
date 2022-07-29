<template>
  <div class="wrapper">

    <div class="container">
      <NavBar />

        <div class="info">
          <div class="info__title"></div>
        </div>

        <PopularUser />

    </div>

  </div>
</template>

<script>
import NavBar from './../components/NavBar';
import PopularUser from './../components/PopularUser';

export default {
  name: "CurrentUser",

  components: {
    NavBar,
    PopularUser,
  },

};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 auto;
  max-width: 1140px;
  max-height: 1200px;
}

.container {
  display: grid;
  grid-template-columns: 178px auto 273px;
}

</style>
