<template>
  <div class="authentication-page-wrapper" @keyup.enter="registration">
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
            <label for="name">Nome</label>
            <input v-model="name" type="text" placeholder="Il tuo nome..." id="name" required>
          </div>

          <div class="form-group">
            <label for="surname">Cognome</label>
            <input v-model="surname" type="text" placeholder="Il tuo cognome..." id="surname" required>
          </div>

          <div class="form-group">
            <label for="birthDate">Data di nascita</label>
            <input type="text" v-model="birthDate" id="birthDate" placeholder="GG/MM/AAAA" required>
          </div>

          <div class="form-group">
            <label for="gender">Sesso</label>
            <select v-model="gender" placeholder="Il tuo sesso..." id="gender" required>
              <option value="1">M</option>
              <option value="2">F</option>
            </select>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input v-model="email" type="email" placeholder="Esempio: email@esempio.it" id="email" required>
          </div>

          <div class="form-group">
            <label for="phoneNumber">Numero di telefono</label>
            <input v-model="phoneNumber" type="number" placeholder="Esempio: 3210123456" id="phoneNumber" min="10" max="10" required>
          </div>

          <div class="form-group">
            <label for="className">Classe, indirizzo, articolazione</label>
            <input v-model="className" type="text" placeholder="Esempio: IV A LSA" id="className" required>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" min="8" placeholder="Una password sicura" id="password" required>
          </div>
        </div>

        <div class="error" v-if="error.show">
          {{ error.message }}
        </div>

        <div class="buttons-wrapper">
          <button @click="registration">Registrati</button>

          <router-link to="/accesso">
            <button class="btn-grey">Accedi</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import StudentsController from '@/controllers/students'

export default {
  name: 'registrazione',
  data () {
    return {
      title: 'Registrazione',
      name: '',
      surname: '',
      birthDate: '',
      gender: 1,
      email: '',
      phoneNumber: 0,
      className: '',
      password: '',
      error: {
        show: false,
        message: ''
      }
    }
  },
  methods: {
    // Validate the form inputs
    checkForm () {
      if (!this.name.length) {
        this.error = {
          show: true,
          message: 'Inserisci il tuo nome.'
        }
        return false
      }

      if (!this.surname.length) {
        this.error = {
          show: true,
          message: 'Inserisci il tuo cognome.'
        }
        return false
      }

      if (!this.birthDate.length) {
        this.error = {
          show: true,
          message: 'Inserisci la tua data di nascita.'
        }
        return false
      }

      if (!moment(this.birthDate, 'DD/MM/YYYY', true).isValid()) {
        this.error = {
          show: true,
          message: 'La data di nascita deve essere nel formato GG/MM/YYYY. Ad esempio 19/03/2001 per il 19 marzo 2001.'
        }
        return false
      }

      if (this.gender.length < 1) {
        this.error = {
          show: true,
          message: 'Il campo del sesso deve essere M o F.'
        }
        return false
      }

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

      if (!this.phoneNumber.length) {
        this.error = {
          show: true,
          message: 'Inserisci il numero di telefono.'
        }
        return false
      }

      if (this.phoneNumber.length !== 10) {
        this.error = {
          show: true,
          message: 'Inserisci un numero di telefono di 10 cifre.'
        }
        return false
      }

      if (!this.className.length) {
        this.error = {
          show: true,
          message: 'Inserisci il nome della classe.'
        }
        return false
      }

      if (this.className.length > 10) {
        this.error = {
          show: true,
          message: 'Il nome della classe non può eccedere i 10 caratteri.'
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
    // Calls the store method to register and saves the token and student object
    registration () {
      if (!this.checkForm()) {
        return false
      }

      StudentsController.methods.register(
        this.name,
        this.surname,
        this.toIsoDate(this.birthDate),
        this.gender,
        this.email,
        this.phoneNumber,
        this.className,
        this.password, (result, error) => {
          if (result) {
            StudentsController.methods.setToken(result.data.token)
            StudentsController.methods.setStudent(result.data.student)
            this.$router.push('banco')
            return
          }

          this.error = {
            show: true,
            message: 'Un utente ha già utilizzato l\'indirizzo email o il numero di telefono inserito.'
          }
        })
    }
  }
}
</script>

<style scoped>
.buttons-wrapper {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 6fr 1fr;
}

@media screen and (max-width: 1200px) {
  .buttons-wrapper {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 5fr 1fr;
  }
}

@media screen and (max-width: 1000px) {
  .buttons-wrapper {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 4fr 1fr;
  }
}

@media screen and (max-width: 800px) {
  .buttons-wrapper {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 3fr 1fr;
  }
}

@media screen and (max-width: 600px) {
  .buttons-wrapper {
    display: grid;
    grid-gap: unset;
    grid-template-columns: 1fr;
  }
}
</style>
