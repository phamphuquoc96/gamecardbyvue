<template>
  <div>
    <div style="{marginTop:'15px'}">
      <div v-for="(items, i) in generateMatrix">
        <div v-for="(item, j) in items" :style="{ display: 'inline-block' }">
          <div @click="onClickCard(i, j)" class="flip-card"
            :class="[selectedCard_1 == `${i}x${j}` || selectedCard_2 == `${i}x${j}` || getOpenedFromIndex(i, j) ? 'flip-card-hover' : '']"
            :style="{ width: `${600 / this.numberOfMatrix}px`, height: `${750 / this.numberOfMatrix}px` }">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img src="../assets/images/icon_back.png" alt="Avatar" style="object-fit: contain;  margin: auto;"
                  :style="{ width: `${400 / this.numberOfMatrix}px`, height: `${400 / this.numberOfMatrix}px` }">
              </div>
              <div class="flip-card-back">
                <img :src=getImageByValue(item) alt="Avatar" style="object-fit: contain;  margin: auto;"
                  :style="{ width: `${400 / this.numberOfMatrix}px`, height: `${400 / this.numberOfMatrix}px` }">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-modal v-model:visible="modalVisible" title="Select Difficulty" :footer="null" centered
      @ok="onselectedDifficult(2)">
      <div class="center-content">
        <p class="button-19" @click="onselectedDifficult(4)">Human</p>
        <p class="button-19" @click="onselectedDifficult(6)">God</p>
        <p class="button-19" @click="onselectedDifficult(8)">Universe</p>
      </div>
    </a-modal>
  </div>

</template>

<script>
// @ is an alias to /src
import store from "../store";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomPositionOfMatrix(_matrixWidth) {
  return [randomInteger(0, randomPositionOfMatrix), randomInteger(0, randomPositionOfMatrix)]
}
function countNumInMatrix(num, array, maxTrix) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === num) {
      count++
    }
  }
  for (let i = 0; i < maxTrix.length; i++) {
    for (let j = 0; j < maxTrix[i].length; j++) {
      if (maxTrix[i][j] === num) {
        count++
      }
    }
  }
  return count
}

export default {
  name: "HomeView",
  components: {

  },
  data() {
    return {
      numberOfMatrix: 2, //4x4,
      numberOfCardPairs: 2,
      matrixData: [],
      selectedCard_1: '',
      selectedCard_2: '',
      listOpened: [],
      modalVisible: true,

    }
  },

  computed: {
    // generateMatrix() {
    //   let matrix = [];
    //   for (let i = 0; i < this.numberOfMatrix; i++) {
    //     let arr = []
    //     for (let j = 0; j < this.numberOfMatrix; j++) {
    //       let num = randomInteger(1, this.numberOfMatrix * 2)
    //       do {
    //         num = randomInteger(1, this.numberOfMatrix * 2)
    //       } while (countNumInMatrix(num, arr, matrix) >= 2)
    //       arr.push(num)
    //     }
    //     matrix.push(arr)
    //   }
    //   console.log(matrix)
    //   this.matrixData = matrix;
    //   return matrix
    // },
    generateMatrix() {
      let matrix = [];
      let matrixIndex = [];
      //create empty martix
      for (let i = 0; i < this.numberOfMatrix; i++) {
        let arr = []
        for (let j = 0; j < this.numberOfMatrix; j++) {
          arr.push(0)
          matrixIndex.push(`${i}x${j}`)
        }
        matrix.push(arr)
      }
      //generate data
      for (let i = 0; i < this.numberOfMatrix * this.numberOfMatrix; i++) {
        let num = parseInt(i / 2) + 1
        let indexMatrix = randomInteger(0, matrixIndex.length - 1)
        let dataIndex = matrixIndex[indexMatrix]
        let split_index = dataIndex.split('x')
        matrix[split_index[0]][split_index[1]] = num
        matrixIndex.splice(indexMatrix, 1)
      }
      this.matrixData = matrix;
      console.log(matrix)
      return matrix
    }

  },
  methods: {
    onselectedDifficult(value) {
      this.numberOfMatrix = value
      this.modalVisible = false
      this.time = 0
      store.dispatch('countTime')
    },
    getImageByValue(value) {
      return require(`@/assets/images/${value}.png`)
    },
    getOpenedFromIndex(i, j) {
      let index = `${i}x${j}`
      let flag = this.listOpened.findIndex(obj => obj === index)
      return flag != -1
    },
    onClickCard(i, j) {
      store.dispatch('increment')
      if (this.selectedCard_2 === '' && `${i}x${j}` === this.selectedCard_1) {
        this.selectedCard_1 = ''
      } else {
        if (this.selectedCard_1) {
          this.selectedCard_2 = `${i}x${j}`
        } else {
          this.selectedCard_1 = `${i}x${j}`
        }
      }
    },
  },
  watch: {
    selectedCard_2() {
      function findValueOfMaTrixFromIndex(index, matrixData) {
        let split_index = index.split('x')
        return matrixData[split_index[0]][split_index[1]]
      }
      if (this.selectedCard_2) {
        if (findValueOfMaTrixFromIndex(this.selectedCard_1, this.matrixData)
          == findValueOfMaTrixFromIndex(this.selectedCard_2, this.matrixData)) {
          this.listOpened.push(this.selectedCard_1)
          this.listOpened.push(this.selectedCard_2)
          this.selectedCard_1 = ''
          this.selectedCard_2 = ''
        } else {
          setTimeout(() => {
            this.selectedCard_1 = ''
            this.selectedCard_2 = ''
          }, 300)
        }
      }
    },
    listOpened: {
      handler(newValue, oldValue) {
        if (this.listOpened.length === this.numberOfMatrix * this.numberOfMatrix) {
          this.$router.push({ path: '/about' })
          store.dispatch('stopCountTime')
        }
      },
      deep: true
    }
  },

};
</script>


<style >
body {
  font-family: Arial, Helvetica, sans-serif;
  background: black !important;
}

.flip-card {
  background-color: transparent;
  width: 75px;
  height: 100px;
  perspective: 1000px;
  margin-right: 6px;

}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card-hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
  border-radius: 10px;
  display: flex;
}

.flip-card-back {
  background-color: white;
  color: white;
  transform: rotateY(180deg);
  border-radius: 10px;
  display: flex;
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.button-19 {
  appearance: button;
  background-color: #1899D6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: din-round, sans-serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: .8px;
  line-height: 20px;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 13px 16px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter .2s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 50%;
  margin-bottom: 10px;
}

.button-19:after {
  background-clip: padding-box;
  background-color: #1CB0F6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  bottom: -4px;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}

.button-19:main,
.button-19:focus {
  user-select: auto;
}

.button-19:hover:not(:disabled) {
  filter: brightness(1.1);
  -webkit-filter: brightness(1.1);
}

.button-19:disabled {
  cursor: auto;
}
</style>