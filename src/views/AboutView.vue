<template>
  <div class="screen">
    <h1>✨ Congratulations ✨</h1>
    <h3>{{ currentTime }} seconds</h3>
    <caption class="text-white">High Scores (total {{ listHightScope.length }})</caption>
    <div class="wrapper">
      <table>
        <tr>
          <th>Pos</th>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Step</th>
        </tr>
        <tr v-for="(item, i) in sortData(listHightScope)">
          <td>{{ i + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ formatDate(item.date) }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.step }}</td>
        </tr>
      </table>
    </div>
    <button @click="onStartAgain">Start Again</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment';

export default {
  computed: {
    localComputed() {

    },
    ...mapState(["currentTime", "listHightScope"]),

  },
  methods: {
    onStartAgain() {
      this.$router.push({ path: '/' })
    },
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY HH:mm:ss')
    },
    sortData(data) {
      let array = []
      let dataCopy = data.slice()
      array = dataCopy.sort(function (a, b) {
        var timeA = parseInt(a.time);
        var timeB = parseInt(b.time);
        var stepA = a.step;
        var stepB = b.step;

        // Compare
        if (timeA < timeB) {
          return -1
        } else if (timeA == timeB) {
          if (stepA < stepB) {
            return -1
          } else if (stepA == stepB) {
            return 0
          } else {
            return 1
          }
        } else {
          return 1
        }

      });
      return array;
    }
  },
};
</script>

<style scoped>
.screen {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: var(--dark);
  color: var(--light);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.screen h1 {
  font-size: 5rem;
  color: white;
}

.screen h3 {
  margin-top: 1.5rem;
  font-size: 3rem;
  color: white;
}

.screen button {
  font: var(--font);
  background: transparent;
  box-shadow: none;
  border: 1px solid var(--light);
  color: var(--light);
  margin: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.screen button:hover {
  background-color: var(--light);
  color: var(--dark);
}

.text-white {
  color: white;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
}

table {
  font-family: "Lucida Sans Unicode", "Lucida Grande", Sans-Serif;
  font-size: 14px;
  border-radius: 10px;
  border-spacing: 0;
  text-align: center;
}

caption {
  color: white;
  margin-bottom: 7px;
  font-size: 20px;
}

th {
  background: rgba(255, 137, 0, 0.9);
  padding: 10px 20px;
  color: rgba(129, 69, 0, 1);
}

th,
td {
  border-style: solid;
  border-width: 0 1px 1px 0;
  border-color: rgba(0, 0, 0, 0.1);
}

th:first-child {
  border-top-left-radius: 5px;
}

th:last-child {
  border-top-right-radius: 5px;
  border-right: none;
}

th:first-child,
td:first-child {
  padding: 7px 8px;
}

td {
  padding: 7px 20px;
  background: rgba(230, 230, 230, 1);
  color: rgba(0, 0, 0, 0.6);
}

.player td {
  color: rgba(0, 0, 0, 1.0);
  font-weight: bold;
  background: rgba(215, 215, 215, 1);
  color: rgba(0, 0, 0, 0.8);

}

tr:last-child td:first-child {
  border-radius: 0 0 0 5px;
}

tr:last-child td:last-child {
  border-radius: 0 0 5px 0;
}

tr td:last-child {
  border-right: none;
}
</style>
