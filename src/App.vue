<script setup>
  import { Plugboard } from './composables/Plugboard';
  import { Rotor } from './composables/Rotor';
  import { Enigma } from './composables/Enigma';

  const enigma = new Enigma(['I', 'IV', 'II'], ["B", "X", "A"], "B");

  window.addEventListener("keydown", function (e) {
    console.log("IN", e.key, "OUT", enigma.input(e.key));
  });
  console.log(enigma);

</script>

<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + Vite" />-->
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
