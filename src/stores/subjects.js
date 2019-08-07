/* global localStorage */

import http from '@/http'

// A collection of methods for managing the subjects
const SubjectsStore = {
  data: {
    subjects: []
  },
  methods: {
    // Add a subject for the logged student
    addSubject (name, callback) {
      http.post('/subjects', {
        name
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          SubjectsStore.methods.fetchSubjects(callback)
        })
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            callback(error)
          }
        })
    },
    // Get all subjects for the logged student
    fetchSubjects (callback) {
      http.get(`/subjects/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          const subjects = response.data

          SubjectsStore.data.subjects = subjects

          return callback()
        })
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            alert('Si è verificato un problema nel reperire i dati delle materie, prova a ricaricare la pagina.')
          }
        })
    },
    // Delete a subject by its id
    deleteSubject (id, callback) {
      http.delete(`/subjects/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          SubjectsStore.methods.fetchSubjects(callback)
        })
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            callback(error)
          }
        })
    }
  }
}

export default SubjectsStore
