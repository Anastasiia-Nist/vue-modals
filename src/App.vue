<template>
  <div class="page">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <div class="logo">Modals</div>
            <ul class="navbar-list" >
              <li class="navbar-item" v-for="link in links" :key="link.title">
                <router-link
                  class="navbar-link"
                  :title="link.title"
                  :to="link.url"
                  >{{ link.title }}</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      links: [
        { title: "Основное", url: "/" },
        { title: "Авторизация", url: "/auth" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  .navbar-item {
    .navbar-link.router-link-exact-active {
      color: #671d7d;
    }
  }
</style>