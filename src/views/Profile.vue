<template>
  <div class="page">
    <h2>{{ title }}</h2>

    <div id="tabs-container">
      <tabs :options="{ useUrlFragment: false }" cache-lifetime="0">
        <tab name="Dati personali">
          <h3>I tuoi dati personali</h3>

          <span id="student-infos">
            <div class="info"><b>Nome completo:</b> {{ `${student.name} ${student.surname}` }}</div>
            <div class="info"><b>Classe:</b> {{ student.class_name }}</div>
            <div class="info"><b>Data di nascita:</b> {{ birthDate }}</div>
            <div class="info"><b>Email:</b> {{ student.email }}</div>
            <div class="info"><b>Sesso:</b> {{ student.gender ? 'M' : 'F' }}</div>
            <div class="info"><b>Numero di telefono:</b> {{ student.phone_number }}</div>
          </span>
        </tab>

        <tab name="Materie">
          <h3>Le tue materie</h3>

          <div class="subject" v-for="subject in subjects" :key="subject.id">
            <div class="subject-name">
              {{ subject.name }}
            </div>
            <div class="delete-button" @click="deleteSubject(subject.id)">
              <i data-feather="x"></i>
            </div>
          </div>

          <button @click="addSubjectModal">Aggiungi una materia</button>
        </tab>

        <tab name="Termini e condizioni">
          <h3>Ci prendiamo cura dei dati dei nostri utenti</h3>

          <a href="https://westudents.it/privacy.html" target="_blank">
            <button>Scopri come</button>
          </a>
        </tab>

        <tab name="Elimina account">
          <h3>Sei sicuro di voler eliminare il tuo account WeStudents?</h3>

          <button @click="deleteStudent">Conferma</button>
          <router-link to="/">
            <button class="btn-grey">Annulla</button>
          </router-link>
        </tab>
      </tabs>
    </div>

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
import feather from 'feather-icons'
import StudentsController from '@/controllers/students'
import SubjectsStore from '@/stores/subjects'

export default {
  name: 'impostazioni',
  data () {
    return {
      title: 'Il tuo profilo',
      student: JSON.parse(localStorage.getItem('student') || '{}'),
      newSubject: '',
      subjects: []
    }
  },
  mounted () {
    feather.replace()

    SubjectsStore.methods.fetchSubjects(() => {
      this.subjects = SubjectsStore.data.subjects
    })
  },
  updated () {
    feather.replace()
  },
  computed: {
    birthDate () {
      return moment(this.student.birth_date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    }
  },
  methods: {
    // Calls the store method to delete a student
    deleteStudent () {
      StudentsController.methods.deleteStudent()
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
    // Calls the store method to delete a subject by its id
    deleteSubject (id) {
      SubjectsStore.methods.deleteSubject(id, (err) => {
        if (err && err.response.data.error.name === 'SequelizeForeignKeyConstraintError') {
          alert('Non puoi eliminare questa materia, ci sono ancora dei voti relativi ad essa.')
          return
        } else if (err) {
          alert('Si è verificato un problema nell\'eliminazione della materia.')
          return
        }

        this.subjects = SubjectsStore.data.subjects
      })
    }
  }
}
</script>

<style>
.tabs-component-tabs {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 7.5px;
  list-style: none;
}

@media screen and (max-width: 1700px) {
  .tabs-component-tabs {
  grid-template-columns: repeat(6, 1fr);
  }
}

@media screen and (max-width: 1500px) {
  .tabs-component-tabs {
  grid-template-columns: repeat(5, 1fr);
  }
}

@media screen and (max-width: 1300px) {
  .tabs-component-tabs {
  grid-template-columns: repeat(4, 1fr) calc(1vw + 10px);
  }
}

@media screen and (max-width: 800px) {
  .tabs-component-tabs {
    grid-template-columns: 1fr;
    margin-bottom: 10px;
  }
}

.tabs-component-tab {
  list-style: none;
  display: flex;
}

.tabs-component-tab-a {
  background: white;
  padding: 15px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 2px 1px rgba(0, 0, 0, 0.025);
  text-decoration: none;
  color: inherit;
  background: #f2f2f2;
  border: 1px solid #ddd;
  border-bottom: none;
  width: 100%;
}

@media screen and (max-width: 800px) {
  .tabs-component-tab-a {
    border-radius: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.04);
  }
}

.tabs-component-tab.is-active .tabs-component-tab-a {
  background: white;
  border: none;
}

.tabs-component-panels {
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.025);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  z-index: -10;
}

@media screen and (max-width: 800px) {
  .tabs-component-panels {
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.04);
    border-radius: 20px;
  }
}

.tabs-component-panel {
  padding: 20px;
  background: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 10;
}

@media screen and (max-width: 800px) {
  .tabs-component-panel {
    border-radius: 20px;
  }
}

.area-container:not(:last-child) {
  margin-bottom: 25px;
}

.switch-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #7a7a7a;
}

.switch {
  width: 40px;
  height: 28px;
  position: relative;
  cursor: pointer;
}

.switch.enabled .guide {
  background: rgba(255, 115, 0, 0.5);
}

.switch.enabled .toggle {
  background: rgb(255, 81, 0);
  transform: translateX(20px);
}

.switch:active .toggle {
  background: #f6f6f6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.36), 0 0 1px rgba(0, 0, 0, 0.12);
}

.switch .guide {
  position: absolute;
  width: 34px;
  height: 14px;
  top: 5px;
  left: 2px;
  background: rgba(34, 31, 31, 0.26);
  border-radius: 7px;
  transition: background 0.15s ease;
  will-change: background;
}

.switch .toggle {
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  top: 2px;
  left: 0;
  background: #f1f1f1;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.24), 0 0 1px rgba(0, 0, 0, 0.12);
  transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
  will-change: background, box-shadow, transform;
}

button:not(:last-child){
  margin-right: 10px;
}

.info:not(:last-child) {
  margin-bottom: 10px;
}

.subject {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.subject-name {
  flex-grow: 1;
  margin-right: 15px;
}

.subject {
  margin-bottom: 5px;
}

.subject + button {
  margin-top: 15px;
}

.delete-button {
  cursor: pointer;
}
</style>
