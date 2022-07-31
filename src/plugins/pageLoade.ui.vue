<template>
  <div class="spin-loader">
    <div class="content-loader">
      <div class="loader-action">
        <span class="loader"></span>
      </div>
      <div class="action-description">
        <slot name="loader-description" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.spin-loader {
  height: calc(100vh - 50px);
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  width: 50px;
  height: 50px;
}
</style>
