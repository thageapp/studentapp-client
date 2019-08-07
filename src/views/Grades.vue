<template>
  <div class="page">
    <div class="top-bar">
      <h2>{{ title }}</h2>

      <div class="add-button" @click="addGradeModal">
        <i data-feather="plus"></i>
      </div>
    </div>

    <div class="cards-container grades">
      <div class="small-card grade" v-for="grade in grades" :key="grade.id">
        <div class="grade-value">
          {{ grade.grade }}
        </div>

        <div class="grade-info">
          <div class="grade-text-container">
            <div class="grade-subject">
              {{ grade.subject_name }}
            </div>

            <div class="modify-button" @click="updateGradeModal(grade.id)">
              ...
            </div>
          </div>

          <div class="card-date-type">
            {{ formatDate(grade.date) }} - {{ grade.grade_type }}
          </div>
        </div>
      </div>
    </div>

    <modal name="add-grade-modal" height="400px" width="450px">
      <div class="modal-content" @keyup.enter="addGrade">
        <div class="modal-form">
          <div class="form-group">
            <label for="date">Data</label>
            <input type="text" v-model="date" id="date" placeholder="GG/MM/AAAA" required>
          </div>

          <div class="form-group">
            <label for="grade">Voto</label>
            <input v-model="grade" type="number" min="0" max="10" step=".1" placeholder="Voto" id="grade" required>
          </div>

          <div class="form-group">
            <label for="subject">Materia</label>
            <select v-model="subject" placeholder="Materia del voto..." id="subject" required>
              <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
            </select>
            <div class="add-button" @click="addSubjectModal">
              Aggiungi materia
            </div>
          </div>

          <div class="form-group">
            <label for="grade-type">Tipo</label>
            <select v-model="gradeType" placeholder="Tipo del voto..." id="grade-type" required>
              <option value="1">Orale</option>
              <option value="2">Scritto</option>
              <option value="3">Pratico</option>
            </select>
          </div>

          <button @click="addGrade">Aggiungi voto</button>
        </div>
      </div>
    </modal>

    <modal name="update-grade-modal" height="450px" width="450px">
      <div class="modal-content" @keyup.enter="updateGrade(tempGradeId)">
        <div class="modal-form">
          <div class="form-group">
            <label for="tempDate">Data</label>
            <input type="text" v-model="tempDate" id="tempDate" placeholder="GG/MM/AAAA" required>
          </div>

          <div class="form-group">
            <label for="tempGrade">Voto</label>
            <input v-model="tempGrade" type="number" min="0" max="10" step=".1" placeholder="Voto" id="tempGrade" required>
          </div>

          <div class="form-group">
            <label for="tempSubject">Materia</label>
            <select v-model="tempSubject" placeholder="Materia del voto..." id="tempSubject" required>
              <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
            </select>
            <div class="add-button" @click="addSubjectModal">
              Aggiungi materia
            </div>
          </div>

          <div class="form-group">
            <label for="tempGradeType">Tipo</label>
            <select v-model="tempGradeType" placeholder="Tipo del voto..." id="tempGradeType" required>
              <option value="1">Orale</option>
              <option value="2">Scritto</option>
              <option value="3">Pratico</option>
            </select>
          </div>

          <div class="buttons-container">
            <button @click="updateGrade(tempGradeId)">Aggiorna voto</button>
            <button class="btn-grey" @click="deleteGrade(tempGradeId)">Elimina voto</button>
          </div>
        </div>
      </div>
    </modal>

    <modal name="add-subject-modal" height="175px" width="350px">
      <div class="modal-content" @keyup.enter.prevent="addSubject">
        <div class="modal-form">
          <div class="form-group">
            <label for="newSubject">Materia</label>
            <input type="text" v-model="newSubject" id="newSubject" placeholder="Nome della materia..." required>
          </div>

          <div class="buttons-container">
            <button @click="addSubject">Aggiungi materia</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import moment from 'moment'
import GradesStore from '@/stores/grades'
import SubjectsStore from '@/stores/subjects'

export default {
  name: 'voti',
  data () {
    return {
      title: 'I tuoi voti',
      grade: 0,
      subject: 0,
      date: '',
      gradeType: 1,
      tempGradeId: 0,
      tempGrade: 0,
      tempSubject: 0,
      tempDate: '',
      tempGradeType: 0,
      newSubject: '',
      grades: [],
      subjects: []
    }
  },
  methods: {
    // Shows the modal to add a grade
    addGradeModal () {
      SubjectsStore.methods.fetchSubjects(() => {
        this.subjects = SubjectsStore.data.subjects
        this.date = moment().format('DD/MM/YYYY')
        this.$modal.show('add-grade-modal')
      })
    },
    // Shows the modal to update a grade
    updateGradeModal (id) {
      SubjectsStore.methods.fetchSubjects(() => {
        this.subjects = SubjectsStore.data.subjects

        GradesStore.methods.fetchGrade(id, grade => {
          this.tempGradeId = id
          this.tempGrade = grade.grade
          this.tempSubject = grade.subject_id
          this.tempDate = moment(grade.date, 'YYYY-MM-DD').format('DD/MM/YYYY')
          this.tempGradeType = grade.grade_type
          this.$modal.show('update-grade-modal')
        })
      })
    },
    // Shows the modal to add a subject
    addSubjectModal () {
      this.newSubject = ''
      this.$modal.show('add-subject-modal')
    },
    // Calls the store method to add a grade and updates 'grades' array
    addSubject () {
      if (this.newSubject.length < 1) {
        alert('Devi inserire il nome della materia.')
        return false
      }

      SubjectsStore.methods.addSubject(this.newSubject, err => {
        if (!err) {
          this.subjects = SubjectsStore.data.subjects
          this.$modal.hide('add-subject-modal')
        } else {
          alert('Non è stato possibile aggiungere la materia.')
        }
      })
    },
    checkForm (date, grade, subject, gradeType) {
      if (!date.length) {
        alert('Inserisci una data.')
        return false
      }

      if (!moment(date, 'DD/MM/YYYY', true).isValid()) {
        alert('La data deve essere nel formato GG/MM/YYYY. Ad esempio 19/03/2017 per il 19 marzo 2017.')
        return false
      }

      if (grade < 0 || grade > 10) {
        alert('Il voto deve essere compreso tra 0 e 10.')
        return false
      }

      if (subject < 1) {
        alert('Scegli una materia dal menu a tendina.')
        return false
      }

      if (gradeType < 1) {
        alert('Scegli un tipo dal menu a tendina.')
        return false
      }

      return true
    },
    // Calls the store method to add a grade and updates 'grades' array
    addGrade () {
      if (!this.checkForm(this.date, this.grade, this.subject, this.gradeType)) {
        return
      }

      GradesStore.methods.addGrade(this.grade, this.subject, this.toIsoDate(this.date), this.gradeType, err => {
        if (!err) {
          this.grades = GradesStore.data.grades
          this.$modal.hide('add-grade-modal')
        } else {
          alert('Non è stato possibile aggiungere il voto.')
        }
      })
    },
    // Calls the store method to update a grade and updates 'grades' array
    updateGrade (id) {
      if (!this.checkForm(this.tempDate, this.tempGrade, this.tempSubject, this.tempGradeType)) {
        return
      }

      GradesStore.methods.updateGrade(id, this.tempGrade, this.toIsoDate(this.tempDate), this.tempSubject, this.tempGradeType, err => {
        if (!err) {
          this.grades = GradesStore.data.grades
          this.$modal.hide('update-grade-modal')
        } else {
          alert('Non è stato possibile aggiornare il voto.')
        }
      })
    },
    // Calls the store method to delete a grade and updates 'grades' array
    deleteGrade (id) {
      GradesStore.methods.deleteGrade(id, err => {
        if (!err) {
          this.grades = GradesStore.data.grades
          this.$modal.hide('update-grade-modal')
        } else {
          alert('Non è stato possibile eliminare il voto.')
        }
      })
    }
  },
  mounted () {
    // Gets all grades
    GradesStore.methods.fetchGrades(() => {
      this.grades = GradesStore.data.grades
    })
  }
}
</script>

<style scoped>
  /*
    Cards container
  */

  .grades {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 1200px) {
    .grades {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 1000px) {
    .grades {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 800px) {
    .grades {
      grid-template-columns: 1fr;
    }
  }

  /*
    Grades
  */

  .grade {
    flex-direction: row;
    align-items: center;
  }

  .grade-info {
    width: 100%;
  }

  .grade-value {
    margin-right: 15px;
    font-size: 125%;
    color: rgb(255, 81, 0);
  }

  .grade-subject {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 90%;
    margin-bottom: 5px;
    width: 0;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
  }

  .grade-text-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
