/* global localStorage */

import http from '@/http'

// A shared store for grades data and methods
const GradesStore = {
  data: {
    grades: []
  },
  methods: {
    // Get all grades for the logged student
    fetchGrades (callback) {
      http.get(`/grades/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          const grades = response.data

          http.get('/gradeTypes', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(response => {
              const gradeTypes = response.data

              let returnGrades = grades.map(grade => {
                for (let gradeType of gradeTypes) {
                  if (grade.grade_type === gradeType.id) {
                    return {
                      ...grade,
                      grade_type: gradeType.name
                    }
                  }
                }
              })

              // Order by date dascending
              GradesStore.data.grades = returnGrades.sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
              })

              return callback()
            })
            .catch(error => {
              if (!error.response) {
                alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
              } else {
                alert('Si è verificato un problema nel reperire i dati dei voti, prova a ricaricare la pagina.')
              }
            })
        })
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            alert('Si è verificato un problema nel reperire i dati dei voti, prova a ricaricare la pagina.')
          }
        })
    },
    // Get a grade by its id
    fetchGrade (id, callback) {
      http.get(`/grades/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          callback(response.data)
        })
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            alert('Si è verificato un problema nel reperire i dati del voto, riprova.')
          }
        })
    },
    // Add a grade for a certain subject of the logged student
    addGrade (grade, subjectId, date, gradeType, callback) {
      http.post(`/grades/`, {
        grade,
        date,
        gradeType,
        subjectId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          GradesStore.methods.fetchGrades(callback)
        })
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            alert('Si è verificato un problema nella creazione del voto, riprova.')
          }
        })
    },
    // Update a grade for a certain subject of the logged student
    updateGrade (id, grade, date, subjectId, gradeType, callback) {
      http.put(`/grades/${id}`, {
        grade,
        date,
        subjectId,
        gradeType
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          GradesStore.methods.fetchGrades(callback)
        })
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            callback(error)
          }
        })
    },
    // Delete a grade by its id
    deleteGrade (id, callback) {
      http.delete(`/grades/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          GradesStore.methods.fetchGrades(callback)
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

export default GradesStore
