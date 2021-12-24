<template>
  <div class="container">
    <!-- rotors -->
    <RotorsBoard :rotors="enigma.rotorsList"></RotorsBoard>

    <!-- light board -->
    <LightsBoard :value="resultLetter"></LightsBoard>

    <!-- plug board -->
  </div>
</template>

<script setup lang="ts">
  import LightsBoard from './components/LightsBoard.vue';
  import { Enigma } from './composables/Enigma';
  import { ref } from 'vue';
  import RotorsBoard from './components/RotorsBoard.vue';

  const resultLetter = ref(null);
  const enigma = new Enigma(['I', 'IV', 'II'], ["B", "I", "A"], "B");

  enigma.addEventListener("encryption", (e: CustomEvent<string>) => {
    resultLetter.value = e.detail
  })
</script>


<style lang="scss">
  @import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
  @import "/node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
  @import "/node_modules/@fortawesome/fontawesome-free/css/solid.css";


  body {
    --bg-color: #232323;
    --bg-color-light: black;
    --spacer: 16px;

    background-color: var(--bg-color);
  }
</style>
