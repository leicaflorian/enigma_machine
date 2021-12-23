<template>
  <template v-for="row in rows">
    <div class="row mb-2">
      <div class="col" v-for="letter in row">
        <div class="letter" :class="{'active': value === letter}">{{ letter }}</div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "LightsBoard",
    props: {
      value: String
    },
    setup () {
      const rows = ["QWERTZUIO", "ASDFGHJK", "PYXCVBNML"]

      return {
        rows
      }
    }
  });
</script>

<style scoped lang="scss">
  ::v-deep .letter {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px black;
    border-radius: 50%;
    margin: auto;
    transition: background-color .3s;

    &.active {
      animation: activate 1s;
    }

    @keyframes activate {
      0% {
        background-color: transparent;
      }
      25% {
        background-color: yellow;
      }
      100% {
        background-color: transparent;
      }
    }
  }
</style>
