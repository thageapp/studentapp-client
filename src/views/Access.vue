<template>
  <div class="authentication-page-wrapper" @keyup.enter="access">
    <div class="authentication-page">
      <div class="top-bar">
        <h2>{{ title }}</h2>

        <router-link to="/" class="go-back">
          <div>
            <i data-feather="arrow-left"></i>
            <span>Torna indietro</span>
          </div>
        </router-link>
      </div>

      <div class="authentication-form-container">
        <div class="authentication-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="email" type="email" placeholder="Esempio: email@esempio.it" id="email" required>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" placeholder="La tua password" id="password" required>
          </div>
        </div>

        <div class="error" v-if="error.show">
          {{ error.message }}
        </div>

        <div class="buttons-wrapper">
          <button @click="access">Accedi</button>

          <router-link to="/registrazione">
            <button class="btn-grey">Registrati</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudentsController from '@/controllers/students'

export default {
  name: 'accesso',
  data () {
    return {
      title: 'Accesso',
      email: '',
      password: '',
      error: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    checkForm () {
      if (!this.email.length) {
        this.error = {
          show: true,
          message: 'Inserisci l\'email.'
        }
        return false
      }

      if (!this.validateEmail(this.email)) {
        this.error = {
          show: true,
          message: 'Inserisci un\'email valida.'
        }
        return false
      }

      if (!this.password.length) {
        this.error = {
          show: true,
          message: 'Inserisci la password.'
        }
        return false
      }

      return true
    },
    // Calls the store method to access and saves the token and student object
    access () {
      if (!this.checkForm()) {
        return false
      }

      StudentsController.methods.access(
        this.email,
        this.password, (result, error) => {
          if (result) {
            StudentsController.methods.setToken(result.data.token)
            StudentsController.methods.setStudent(result.data.student)
            this.$router.push('banco')
            return
          }

          if (error.response.status === 403) {
            // The student is not registered
            this.error = {
              show: true,
              message: 'Devi registrarti prima di effettuare l\'accesso.'
            }
          } else {
            // The credentials are wrong
            this.error = {
              show: true,
              message: 'Le credenziali sono errate.'
            }
          }
        })
    }
  }
}
</script>

<style scoped>
.authentication-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  margin: 0 auto;
}

.top-bar {
  width: 45vw;
}

.authentication-form-container {
  height: fit-content;
  width: 45vw;
}

@media screen and (max-width: 1200px) {
  .top-bar {
    width: 60vw;
  }

  .authentication-form-container {
    width: 60vw;
  }
}

@media screen and (max-width: 1000px) {
  .top-bar {
    width: 75vw;
  }

  .authentication-form-container {
    width: 75vw;
  }
}

@media screen and (max-width: 800px) {
  .top-bar {
    width: 100%;
  }

  .authentication-form-container {
    width: 100%;
  }
}

.authentication-form {
  grid-template-columns: 1fr;
}

.error {
  color: rgb(253, 70, 70);
}
</style>
