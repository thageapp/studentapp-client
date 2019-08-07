<template>
  <div id="app">
    <div id="hamburger" v-if="$route.path !== '/' && $route.path !== '/registrazione' && $route.path !== '/accesso'" @click="activeNavbar = !activeNavbar">
      <i data-feather="menu"></i>
    </div>

    <div v-if="$route.path !== '/' && $route.path !== '/registrazione' && $route.path !== '/accesso'" id="nav" :class="{ active: activeNavbar }" @click="activeNavbar ? activeNavbar = !activeNavbar : activeNavbar = activeNavbar">
      <div class="logo-wrapper">
        <img src="@/assets/header-icon.svg" alt="Logo">
      </div>

      <router-link class="nav-link" to="/banco">
        <span><i data-feather="home"></i></span>
        <span>Il tuo banco</span>
      </router-link>

      <router-link class="nav-link" to="/voti">
        <span><i data-feather="hash"></i></span>
        <span>I tuoi voti</span>
      </router-link>

      <router-link class="nav-link" to="/agenda">
        <span><i data-feather="book"></i></span>
        <span>La tua agenda</span>
      </router-link>

      <router-link class="nav-link" to="/profilo">
        <span><i data-feather="user"></i></span>
        <span>Il tuo profilo</span>
      </router-link>

      <div class="nav-link" @click="logout">
        <span><i data-feather="arrow-left"></i></span>
        <span>Logout</span>
      </div>

      <hr class="close-hr">

      <div class="nav-link close">
        <span><i data-feather="x"></i></span>
        <span>chiudi</span>
      </div>
    </div>

    <div @click="activeNavbar ? activeNavbar = !activeNavbar : activeNavbar = activeNavbar">
      <router-view />
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons'
import StudentsStore from '@/controllers/students'

export default {
  data () {
    return {
      activeNavbar: false,
      student: JSON.parse(localStorage.getItem('student') || '{}')
    }
  },
  methods: {
    logout () {
      StudentsStore.methods.logout()
    }
  },
  mounted () {
    feather.replace()

    if (!(localStorage.getItem('token') && localStorage.getItem('token').length > 50 && typeof JSON.parse(localStorage.getItem('student')) === 'object' && localStorage.getItem('isStudentLoggedIn') === 'true')) {
      localStorage.setItem('token', '')
      localStorage.setItem('student', '')
      localStorage.setItem('isStudentLoggedIn', 'false')
    }
  },
  updated () {
    feather.replace()
  }
}
</script>

<style>
/*
  Montserrat fofm
*/

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600&display=swap");

/*
  Basic reset
*/

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/*
  Basic styles
*/

body {
  background-color: rgb(242, 242, 242);
}

hr {
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.75);
  margin-bottom: 10px;
}

button {
  border: none;
  padding: 10px;
  color: #fff;
  font-weight: 400;
  outline: none;
  cursor: pointer;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 90%;
  background: rgb(255, 113, 0);
  background: -moz-linear-gradient(
    211deg,
    rgba(255, 113, 0, 1) 0%,
    rgba(217, 48, 31, 1) 100%
  );
  background: -webkit-linear-gradient(
    211deg,
    rgba(255, 113, 0, 1) 0%,
    rgba(217, 48, 31, 1) 100%
  );
  background: linear-gradient(
    211deg,
    rgba(255, 113, 0, 1) 0%,
    rgba(217, 48, 31, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff7100",endColorstr="#d9301f",GradientType=1);
}

button.btn-grey {
  background: grey;
  background: -moz-linear-gradient(
    211deg,
    rgb(139, 139, 139) 0%,
    rgb(105, 105, 105) 100%
  );
  background: -webkit-linear-gradient(
    211deg,
    rgb(139, 139, 139) 0%,
    rgb(105, 105, 105) 100%
  );
  background: linear-gradient(
    211deg,
    rgb(139, 139, 139) 0%,
    rgb(105, 105, 105) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#8b8b8b",endColorstr="#696969",GradientType=1);
}

h1,
h2 {
  margin-bottom: 25px;
  font-weight: 600;
}

h3,
h4,
h5,
h6 {
  margin-bottom: 15px;
  font-weight: 500;
}

/*
  Vue app styles
*/

#app {
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: grid;
  font-weight: 400;
  grid-template-columns: 1fr 5fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

@media screen and (max-width: 1400px) {
  #app {
    grid-template-columns: 1fr 4fr;
  }
}

@media screen and (max-width: 1200px) {
  #app {
    grid-template-columns: 1fr 3fr;
  }
}

@media screen and (max-width: 1000px) {
  #app {
    grid-template-columns: 1fr 2fr;
  }
}

@media screen and (max-width: 800px) {
  #app {
    grid-template-columns: 2fr 3fr;
  }
}

@media screen and (max-width: 600px) {
  #app {
    display: block;
  }
}

/*
  Side navigation
*/

#nav {
  overflow-y: scroll;
  user-select: none !important;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  background: rgb(255, 113, 0);
  background: -moz-linear-gradient(
    211deg,
    rgba(255, 113, 0, 1) 0%,
    rgba(217, 48, 31, 1) 100%
  );
  background: -webkit-linear-gradient(
    211deg,
    rgba(255, 113, 0, 1) 0%,
    rgba(217, 48, 31, 1) 100%
  );
  background: linear-gradient(
    211deg,
    rgba(255, 113, 0, 1) 0%,
    rgba(217, 48, 31, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff7100",endColorstr="#d9301f",GradientType=1);
}

@media screen and (max-width: 600px) {
  #nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 50vw;
    display: none;
    z-index: -1;
  }

  #nav.active {
    display: block;
    z-index: 20;
  }
}

@media screen and (max-width: 400px) {
  #nav {
    width: 75vw;
  }
}

@media screen and (max-width: 262px) {
  #nav {
    width: 100vh;
  }
}

#nav .logo-wrapper {
  margin-bottom: 10px;
}

#nav img {
  min-width: 100px;
  max-width: 180px;
  margin-left: -5px;
}

#nav .nav-link {
  display: block;
  padding: 17.5px 0;
  border-radius: 5px;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 85%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
}

#nav .nav-link span:first-child {
  margin-right: 15px;
}

#hamburger {
  display: none;
  position: absolute;
  top: 10px;
  left: 20px;
  height: 32px;
  width: 32px;
  z-index: 15;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.close, .close span, .close-hr, #hamburger svg {
  display: none;
}

@media screen and (max-width: 600px) {
  .close, .close span, .close-hr, #hamburger, #hamburger svg {
    display: block;
  }

  .close {
    cursor: pointer;
  }
}

#class {
  font-weight: 500;
  font-size: 115%;
}

#logout-button {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 95%;
  margin-top: 5px;
  cursor: pointer;
}

/*
  Views styles
*/

.page {
  padding: 20px;
  height: 100vh;
  overflow-y: scroll;
}

@media screen and (max-width: 600px) {
  .page {
    position: fixed;
    width: 100%;
    height: 100vh;
    margin-top: 35px;
    padding-bottom: 55px;
  }
}

/*
  Top bar
*/

.top-bar {
  display: flex;
  justify-content: space-between;
}

.add-button {
  cursor: pointer;
}

.go-back {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: black;
  text-decoration: none;
  font-size: 115%;
}

.go-back div {
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.go-back span {
  margin-left: 10px;
}

@media screen and (max-width: 400px) {
  .go-back span {
    display: none;
  }
}

/*
  Small cards
*/

.cards-container {
  width: 100%;
  border-radius: 15px;
  display: grid;
  grid-gap: 20px;
}

.small-card {
  padding: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.075);
  display: flex;
}

.modify-button {
  color: black;
  margin-right: 4px;
  margin-top: -10px;
  font-weight: 500;
  cursor: pointer;
  font-size: 115%;
}

.card-date-type {
  font-size: 90%;
  color: #686868;
}

/*
  Modals
*/

.modal-content {
  padding: 20px;
  height: 100%;
}

.modal-content .buttons-container {
    display: flex;
    flex-direction: column;
  }

.modal-content   button {
  margin-bottom: 10px;
  margin-right: 0 !important;
}

.modal-content .add-button {
  color: rgb(255, 102, 0);
  margin-top: 10px;
}

.modal-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

/*
  Forms
*/

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group label {
  margin-bottom: 10px;
}

.form-group input {
  outline: none;
  border: 1px solid #ddd;
  padding: 5px;
  font-size: 100%;
  border-radius: 5px;
}

/*
  Authentication page
*/

.authentication-page-wrapper {
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
}

.authentication-page {
  padding: 20px;
}

.authentication-form-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.04);
  background: #fff;
  border-radius: 20px;
}

.authentication-form-container button {
  margin-top: 10px;
  width: 100%;
}

.authentication-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

@media screen and (max-width: 1000px) {
  .authentication-form {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
