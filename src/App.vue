<template>
  <div class="container">
    <LightsBoard :value="resultLetter"></LightsBoard>
  </div>
</template>

<script setup lang="ts">
  import LightsBoard from './components/LightsBoard.vue';
  import { Enigma } from './composables/Enigma';
  import { ref } from 'vue';

  const resultLetter = ref(null);
  const enigma = new Enigma(['I', 'IV', 'II'], ["B", "I", "A"], "B");

  enigma.addEventListener("encryption", (e: CustomEvent<string>) => {

    resultLetter.value = e.detail
  })

  // window.enigma = enigma;
</script>


<style lang="scss">
  @import "/node_modules/bootstrap/dist/css/bootstrap.min.css";

</style>
