<template>
  <div class="light-board">
    <template v-for="row in rows">
      <div class="row mb-2">
        <div class="col" v-for="letter in row">
          <div class="letter" :class="{'active': value === letter}">{{ letter }}</div>
        </div>
      </div>
    </template>
  </div>
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
  .light-board {
    padding-top: calc(var(--spacer) * 2);
    padding-bottom: calc(var(--spacer) * 2);

    .letter {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: solid 1px black;
      border-radius: 50%;
      margin: auto;
      transition: background-color .3s;
      font-weight: bold;
      font-size: 1.3rem;
      color: white;
      background-color: var(--bg-color-light);

      &.active {
        animation: activate 1s;
      }

      @keyframes activate {
        0% {
          background-color: var(--bg-color-light);
          color: white;
        }
        25% {
          background-color: #ffe100;
          color: var(--bg-color-light);
        }
        100% {
          background-color: var(--bg-color-light);
          color: white;
        }
      }
    }
  }
</style>
