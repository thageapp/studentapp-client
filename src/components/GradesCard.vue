<template>
  <router-link class="card" to="/voti">
    <h3 class="card-title">{{ title }}</h3>

    <div class="card-content">
      <div class="list">
        <div v-if="threeGrades.length <= 0">
          Non ci sono voti :/
        </div>

        <div class="list-item" v-for="grade in threeGrades" :key="grade.id">
          <div class="round-value-container grade-value">{{ grade.grade }}</div>

          <div class="grade-subject">{{ grade.subject_name }}</div>
        </div>
      </div>

      <div class="main-average-gauge-container">
        <h3>Media</h3>

        <progress class="main-average-gauge" :value="average" max="100" :style="{ '--progress': average * 10 }"></progress>
      </div>
    </div>
  </router-link>
</template>

<script>
import GradesStore from '../stores/grades'

export default {
  name: 'GradesCard',
  data () {
    return {
      title: 'Voti',
      grades: []
    }
  },
  computed: {
    // Grades average
    average () {
      let sum = 0

      for (let grade of this.grades) {
        sum += grade.grade
      }

      return Math.round((sum / this.grades.length) * 10) / 10
    },
    // Get only the last three grades
    threeGrades () {
      return this.grades.slice(0, 3)
    }
  },
  mounted () {
    // Get all grades when mounted
    GradesStore.methods.fetchGrades(() => {
      this.grades = GradesStore.data.grades
    })
  }
}
</script>

<style scoped>
/*
  Card content columns setup
*/

.card-content {
  grid-template-columns: 1fr auto;
}

/*
  Grade content
*/

.grade-value {
  font-size: 90%;
}

.grade-subject {
  flex-grow: 1;
  padding-left: 10px;
}

/*
  Average gauge
*/

.main-average-gauge-container {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.025);
  padding: 10px;
  border-radius: 10px;
}

.main-average-gauge-container h3 {
  text-align: center;
}

progress {
  -webkit-appearance: none;
  appearance: none;
}

::-webkit-progress-bar,
::-webkit-progress-value {
  display: none;
}

.main-average-gauge:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: conic-gradient(
    rgb(83, 216, 6),
    rgb(40, 197, 9) calc(var(--progress) * 1%),
    rgba(0, 0, 0, 0.1) 0
  );
  -webkit-mask: radial-gradient(
    closest-side,
    transparent calc(100% - 15px),
    #66ff00 calc(100% - 40px + 1px)
  );
}

.main-average-gauge:after {
  content: attr(value);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  background: transparent;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 400;
}

.main-average-gauge {
  position: relative;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
