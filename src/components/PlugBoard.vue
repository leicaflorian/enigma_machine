<template>
  <div class="plug-board" :class="{'open': opened}">
    <div class="container">

      <!-- Btn to toggle state -->
      <div class="text-center py-3">
        <button class="btn btn-outline-light" @click="toggleStatus">
          <i class="fas fa-chevron-up" :class="{'fa-rotate-180': opened}"></i>
        </button>
      </div>

      <div class="py-4">
        <template v-for="row in rows">
          <div class="row mb-2">
            <div class="col" v-for="letter in row">
              <div class="pin-container">
                <div class="letter d-flex">
                  {{ letter }}
                  ->
                  <select class="ms-2 form-select-sm bg-dark text-light" :value="value.map[letter]"
                          @change="onChange(letter, $event.currentTarget.value)">
                    <option value=""></option>
                    <option v-for="(connection, key) in value.map" :key="key" :value="key"
                            :disabled="key === letter">
                      {{ key }}
                    </option>
                  </select>
                </div>

                <div class="pins"></div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, watch } from 'vue';
  import { Plugboard } from '../composables/Plugboard';
  import { PlugboardData } from '../composables/Enigma';

  export default defineComponent({
    name: "PlugBoard",
    props: {
      boardOpen: Boolean,
      value: Object as PropType<PlugboardData>
    },
    setup (props, { emit }) {
      const opened = ref(props.boardOpen);
      const rows = ["QWERTZUIO", "ASDFGHJK", "PYXCVBNML"];

      function toggleStatus () {
        opened.value = !opened.value;
        emit("boardStatus", opened.value)
      }

      function onChange (letter, connectTo) {
        console.log(letter, "->", connectTo)
        props.value.connect(letter, connectTo)
      }

      watch(() => props.boardOpen, (value) => {
        opened.value = value
      })

      return {
        opened, rows,
        toggleStatus, onChange
      }
    }
  });
</script>

<style scoped lang="scss">
  .plug-board {
    position: fixed;
    bottom: 0;
    background-color: var(--bg-color);
    width: 100%;
    max-height: 100vh;
    overflow: auto;
    left: 0;
    transition: transform .3s ease-in-out;
    transform: translateY(calc(100% - 70px));
    z-index: 3;

    i {
      transition: transform .3s;
    }

    &.open {
      transform: translateY(0%);
    }

    .pin-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;

      .letter {
        font-size: 1.2rem;
        padding-top: calc(var(--spacer) / 2);
      }

      .pins {
        width: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: calc(var(--spacer) / 2);
        padding: calc(var(--spacer) / 2) 0;

        &:after, &:before {
          content: "";
          width: 20px;
          height: 20px;
          background: var(--bg-color-light);
          display: inline-block;
          border-radius: 50%;
          border: solid 1px #3c3c3c;

        }
      }
    }
  }
</style>
