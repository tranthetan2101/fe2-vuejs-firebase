<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="/">Vuejs</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex" style="margin-left: auto">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success"  type="submit">
              Search
            </button>
          </form>
          <a
            href="#"
            class="btn btn-danger"
            data-toggle="modal"
            data-target="#loginModal"
            >Login</a
          >
        </div>
      </div>
      <Login></Login>
    </nav>
  </div>
</template>

<script>
import Login from "./Login";
export default {
  name: "Navbar",
  components: { Login },
  props: {
    msg: String,
  },
  data() {
    return {
    };
  },
};
</script>
<style scoped lang="scss">
</style>
