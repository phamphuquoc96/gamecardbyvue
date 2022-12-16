<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <div>
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
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

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
    HelloWorld,
  },
  data() {
    return {
      numberOfMatrix: 8, //4x4,
      numberOfCardPairs: 2,
      matrixData: [],
      selectedCard_1: '',
      selectedCard_2: '',
      listOpened: []
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
    getImageByValue(value) {
      return require(`@/assets/images/${value}.png`)
    },
    getOpenedFromIndex(i, j) {
      let index = `${i}x${j}`
      let flag = this.listOpened.findIndex(obj => obj === index)
      return flag != -1
    },

    onClickCard(i, j) {
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
        }
      },
      deep: true
    }
  }
};
</script>


<style >
body {
  font-family: Arial, Helvetica, sans-serif;
  background: black;
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
</style>