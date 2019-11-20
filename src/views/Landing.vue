<template>
  <div id="home">
    <div class="logo-wrapper">
      Thage
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
  background: rgb(97, 216, 0);
  background: -moz-linear-gradient(
    211deg,
    rgba(97, 216, 0, 1) 0%,
    rgba(80, 179, 0, 1) 100%
  );
  background: -webkit-linear-gradient(
    211deg,
    rgba(97, 216, 0, 1) 0%,
    rgba(80, 179, 0, 1) 100%
  );
  background: linear-gradient(
    211deg,
    rgba(97, 216, 0, 1) 0%,
    rgba(80, 179, 0, 1) 100%
  );
}

.logo-wrapper {
  margin-bottom: 15px;
  color: white;
  font-size: 200%;
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
