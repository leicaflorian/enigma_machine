<template>
  <div class="rotors-board">
    <div class="rotor mx-3" v-for="rotor in sortedRotors">

      <div class="btn-group-vertical align-items-center">
        <span class="text-light">
          {{ rotor.index }} - {{ rotor.type }}
        </span>

        <button class="btn btn-primary" @click="rotor.up()"><i class="fas fa-chevron-up"></i></button>
        <div class="rotor-letter text-light form-control text-dark text-center">{{ rotor.letter }}</div>
        <button class="btn btn-primary" @click="rotor.down()"><i class="fas fa-chevron-down"></i></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, PropType } from 'vue';
  import { RotorData } from '../composables/Enigma';

  export default defineComponent({
    name: "RotorsBoard",
    props: {
      rotors: Array as PropType<RotorData[]>
    },
    setup (props) {
      const sortedRotors: ComputedRef<RotorData[]> = computed(() => {
        return [...props.rotors].sort((a, b) => b.index - a.index)
      })

      return {
        sortedRotors
      }
    }
  });
</script>

<style scoped lang="scss">
  .rotors-board {
    display: flex;
    justify-content: center;
    padding-top: calc(var(--spacer) * 2);
    padding-bottom: calc(var(--spacer) * 2);

    .rotor {
      .rotor-letter {
        border-radius: 0;
      }
    }
  }
</style>
