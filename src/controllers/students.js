import http from '../http'

// A collection of methods for managing the access of a student that use localStorage as the storage
const StudentsController = {
  methods: {
    // Saves the token to localStorage
    setToken (token) {
      localStorage.setItem('token', token)

      if (token) {
        localStorage.setItem('isStudentLoggedIn', 'true')
      } else {
        localStorage.setItem('isStudentLoggedIn', 'false')
      }
    },
    // Saves the student's data to localStorage
    setStudent (student) {
      localStorage.setItem('student', JSON.stringify(student))
    },
    // Logs out the student
    logout () {
      localStorage.setItem('token', '')
      localStorage.setItem('student', '')
      localStorage.setItem('isStudentLoggedIn', 'false')
      window.location = '/'
    },
    // Sends a request to register the student to the server
    register (name, surname, birthDate, gender, email, phoneNumber, className, password, callback) {
      http.post('/students/register', {
        name,
        surname,
        birthDate,
        gender,
        email,
        phoneNumber,
        className,
        password
      })
        .then(response => {
          callback(response)
        })
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            callback(null, error)
          }
        })
    },
    // Sends a request to the server to log in the student and gets a token to keep the user logged in
    access (email, password, callback) {
      http.post('/students/access', {
        email,
        password
      })
        .then(response => callback(response))
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            callback(null, error)
          }
        })
    },
    // Delete a student by its id
    deleteStudent () {
      http.delete(`/students/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(() => {
          StudentsController.methods.logout()
        })
        .catch(error => {
          if (!error.response) {
            alert('Ci sono problemi di connessione al server, ricontrolla la tua connessione ad Internet.')
          } else {
            alert('Si è verificato un problema nell\'eliminazione dello studente, riprova.')
          }
        })
    }
  }
}

export default StudentsController
