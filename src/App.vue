<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="danger">
      <b-link to="/"><b-img src="logo.png" v-bind="mainProps"></b-img></b-link>
      <b-navbar-brand to="/">Numismatica 1.0<sup> Beta</sup></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item to="/items" active-class="active" exact>List items</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item to="/add" active-class="active" exact>Add items</b-nav-item>
          </b-navbar-nav>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>Profile</em>
            </template>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      mainProps: { width: 50, height: 50 }
    }
  }
}
</script>
