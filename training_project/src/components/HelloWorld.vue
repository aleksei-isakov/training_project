<template>
  <div class="wrapper">
  <h1>Calc</h1>
    <div class="calc-body">
      <div class="calc-field" v-if="!displayCurrentNumber && result && !currentAction">
        <div class="calc-field__result">{{result}}</div>
      </div>
      <div class="calc-field" v-else>
        <div class="calc-field__current">{{displayCurrentNumber}}</div>
        <div class="calc-field__current-action">{{currentAction}}</div>
        <div class="calc-field__prev">{{previousField}}</div>
        <div class="calc-field__result">{{result}}</div>
      </div>
      <div class="calc-buttons">
        <div class="calc-buttons__functionals">
          <button
              class="buttons"
              v-for="fn of functionals"
              @click="fnButtonClick(fn)"
          >
            {{fn}}
          </button>
        </div>
        <div class="calc-buttons__nums">
          <div class="top-row">
            <button
                :class="[num == 0 ? 'buttons zero-button' : 'buttons']"
                v-for="num of numbers"
                @click="buttonSelect(num)"
            >
              {{num}}
            </button>
          </div>
        </div>

        <div class="calc-buttons__operators">
          <button
              class="buttons"
              v-for="operator in operators"
              @click="setAction(operator)"
          >
            {{operator}}
          </button>
          <button class="buttons" @click="calculate(currentAction)">=</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

const displayCurrentNumber = computed(() => {
  return !currentField.length ?  0 : currentField.join('')
})

let currentField = reactive([])
let previousField = ref('')
let currentAction = ref('')
let result = ref('')

const numbers = [1,2,3,4,5,6,7,8,9,0, '.'].join('')
const operators = ['-', '+', '*', '/'].join('')
const functionals = ['CE', 'del', 'C']


defineProps<{ msg?: string }>()

function buttonSelect(num): void {
  currentField.push(num)
}

function setAction(operator): void {
  previousField.value = currentField.join('')

  if (previousField.value && currentField) {
    currentField.length = 0
  }
  currentAction.value = ''
  currentAction.value = operator
}

function fnButtonClick(fn): void  {
  switch(fn) {
    case 'C':
      previousField.value = '';
      currentField.length = 0;
      currentAction.value= '';
      result.value = ''
    break;
    case 'del':
    currentField.splice(-1,1)
    break;
    case 'CE':
      currentField.length = 0;
    break
  }
}

function calculate(action):void {
  if (currentField && previousField.value) {
    result.value = eval(`${currentField.join('')} ${action} ${previousField.value}`);
    previousField.value = '';
    currentField.length = 0;
    currentAction.value= '';
  }
   else if (result.value && !previousField.value) {
    result.value = eval(`${result.value} ${action} ${currentField.join('')}`);
    previousField.value = '';
    currentField.length = 0;
    currentAction.value= '';
  }
}

</script>


<style scoped lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
.calc-body {
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 20px 10px;
  gap: 15px;
}
.calc-field {
  height: 200px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 5px;
  &__current {
    height: 20px;
    font-size: 20px;
    font-family: "Comic Sans MS",sans-serif;
    padding:  5px 0 0 10px;
  }
  &__prev {
    height: 20px;
    font-size: 20px;
    font-family: "Comic Sans MS",sans-serif;
    padding:  5px 0 0 10px;
  }
  &__result {
    height: 20px;
    font-size: 20px;
    font-family: "Comic Sans MS",sans-serif;
    padding:  5px 0 0 10px;
  }
  &__current-action {
    height: 15px;
    font-size: 15px;
    font-family: "Comic Sans MS",sans-serif;
    padding: 5px 0 0 10px;
  }
}
.calc-buttons {
  display: grid;
  grid-template-areas: "func-buttons ."
                        "num-buttons operate-buttons";
  grid-gap: 15px;
  grid-template-columns: 2fr 1fr;
}
.calc-buttons__functionals {
  grid-area: func-buttons;
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.buttons {
  height: 55px;
  width: 55px;
  background-color: white;
  border: 1px solid darkcyan;
  border-radius: 50%;
}
.zero-button {
  width: 130px;
  border-radius: 10px;
}
.calc-buttons__nums {
  grid-area: num-buttons;
  height: 300px;
  display: flex;
  flex-direction: column;
}
.top-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 15px;
  justify-content: center;
  align-items: center;
}
.bottom-row {
  display: flex;
  justify-content: space-evenly;
}
.calc-buttons__operators {
  grid-area: operate-buttons;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

</style>
