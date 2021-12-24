<template>
  <div class="container app-container" :class="{'plugboard-opened': plugBoardStatus}">
    <h1 class="text-light text-center py-3">Enigma machine</h1>

    <!-- rotors -->
    <RotorsBoard :rotors="enigma.rotorsList"></RotorsBoard>

    <!-- light board -->
    <LightsBoard :value="resultLetter"></LightsBoard>

    <!-- plug board -->
    <PlugBoard :boardOpen="plugBoardStatus" @boardStatus="plugBoardStatus = $event"
    :value="enigma.plugboardMap"></PlugBoard>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Enigma } from './composables/Enigma';
  import LightsBoard from './components/LightsBoard.vue';
  import RotorsBoard from './components/RotorsBoard.vue';
  import PlugBoard from './components/PlugBoard.vue';

  const resultLetter = ref(null);
  const plugBoardStatus = ref(false);
  const enigma = new Enigma(['III', 'I', 'II'], ["B", "I", "A"], "A");

  enigma.addEventListener("encryption", (e: CustomEvent<string>) => {
    resultLetter.value = e.detail
  })
</script>


<style lang="scss">
  @import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
  @import "/node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
  @import "/node_modules/@fortawesome/fontawesome-free/css/solid.css";


  body {
    --bg-color: black;
    --bg-color-light: #232323;
    --spacer: 16px;

    background-color: var(--bg-color-light);
  }

  .app-container {
    &:after {
      content: "";
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, .5);
      backdrop-filter: blur(10px);
      opacity: 0;
      transition: opacity .3s;
      pointer-events: none;
    }

    &.plugboard-opened {
      overflow: hidden;
      height: 100vh;
      padding-bottom: 10vh;

      &:after {
        pointer-events: all;
        opacity: 1;
      }
    }
  }

</style>
