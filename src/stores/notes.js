/* global localStorage */

import http from '@/http'

// A shared store for notes data and methods
const NotesStore = {
  data: {
    notes: []
  },
  methods: {
    // Get all notes for the logged student
    fetchNotes (callback) {
      http.get('/notes/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          const notes = response.data

          http.get('/noteTypes', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
            .then(response => {
              const noteTypes = response.data

              let returnNotes = notes.map(note => {
                for (let noteType of noteTypes) {
                  if (note.note_type === noteType.id) {
                    return {
                      ...note,
                      note_type: noteType.name
                    }
                  }
                }
              })

              // Order by date dascending
              NotesStore.data.notes = returnNotes.sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
              })

              return callback()
            })
            .catch(error => {
              if (!error.response) {
                alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
              } else {
                alert('Si è verificato un problema nel reperire i dati dei promemoria, prova a ricaricare la pagina.')
              }
            })
        })
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            alert('Si è verificato un problema nel reperire i dati dei promemoria, prova a ricaricare la pagina.')
          }
        })
    },
    // Get a note by its id
    fetchNote (id, callback) {
      http.get(`/notes/${id}`, {
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
            alert('Si è verificato un problema nel reperire i dati del promemoria, riprova.')
          }
        })
    },
    // Add a note for the logged student
    addNote (note, date, noteType, callback) {
      http.post('/notes', {
        note,
        date,
        noteType
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          NotesStore.methods.fetchNotes(callback)
        })
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            callback(error)
          }
        })
    },
    // Update a note for the logged student
    updateNote (id, note, date, noteType, callback) {
      http.put(`/notes/${id}`, {
        note,
        date,
        noteType
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          NotesStore.methods.fetchNotes(callback)
        })
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            callback(error)
          }
        })
    },
    // Delete a note by its id
    deleteNote (id, callback) {
      http.delete(`/notes/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          NotesStore.methods.fetchNotes(callback)
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

export default NotesStore
