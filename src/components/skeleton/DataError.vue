<template>
  <div class="error">
    <h2 class="error-heading">Данные отсутствуют</h2>
    <img class="error-img" src="../img/error.svg" alt="" />
  </div>
</template>
<style lang="scss" scoped>
.error {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(105, 105, 105, 0.493);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &-heading {
  }
  &-img {
    width: 50px;
    height: 50px;
  }
}
</style>