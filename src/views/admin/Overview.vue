<template>
  <div class="overview">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Overview page</h3>
            <p>The ultimate creative studio. Let your ideas flow with brilliant
              color, blazing graphics, faster processors, intuitive tools, and
              a stunning, adjustable 28” display.</p>
          </div>
          <div class="col-md-6">
              <img src="/img/svg/overview.svg" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Overview",
  props: {
    msg: String,
  }
}
</script>
<style scoped lang="scss">
//viết css ở đây
</style>