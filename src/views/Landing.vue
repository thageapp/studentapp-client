<template>
  <div id="home">
    <div class="logo-wrapper">
      <img src="@/assets/header-icon.svg" alt="Logo">
    </div>

    <div class="buttons-wrapper">
      <router-link class="mrg-right" to="/accesso">
        <button class="btn-grey">Accedi</button>
      </router-link>

      <router-link to="/registrazione">
        <button class="btn-grey">Registrati</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'accesso',
  data () {
    return {
      title: 'Accesso'
    }
  }
}
</script>

<style scoped>
#home {
  user-select: none !important;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(255, 113, 0);
  background: -moz-linear-gradient(
    211deg,
    rgba(255, 123, 0, 1) 0%,
    rgba(212, 58, 44, 1) 100%
  );
  background: -webkit-linear-gradient(
    211deg,
    rgba(255, 123, 0, 1) 0%,
    rgba(212, 58, 44, 1) 100%
  );
  background: linear-gradient(
    211deg,
    rgba(255, 123, 0, 1) 0%,
    rgba(212, 58, 44, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff7b00",endColorstr="#d43a2c",GradientType=1);
}

.logo-wrapper {
  margin-bottom: 10px;
}

img {
  width: 225px;
  min-width: 100px;
}

button {
  background: rgba(255, 255, 255, .90);
  font-weight: 600;
  text-transform: uppercase;
  color: #111;
  border-radius: 5px;
  padding: 10px 15px;
}

button:hover {
  background: rgba(255, 255, 255, .95);
}

button:active {
  background: rgba(255, 255, 255, 1);
}

.mrg-right {
  margin-right: 20px;
}
</style>
