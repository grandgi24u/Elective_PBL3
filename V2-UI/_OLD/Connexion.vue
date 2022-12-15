<template>
  <form @submit="login()">
    <!-- Email input -->
    <div class="form-outline mb-4">
      <input type="text"  class="form-control" name="id" id="identifiant" />
      <label class="form-label" for="identifiant">id</label>
    </div>
    <!-- Password input -->
    <div class="form-outline mb-4">
      <input type="password" class="form-control" name="mdp" id="motDePasse"/>
      <label class="form-label" for="motDePasse">mdp</label>
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: 'login',
  methods: {
    login: () => {
      axios.post('http://localhost:3000/users/auth', { id: "6394a7ba05bff3c5dac6e184", password: "azerty1234"})
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    }
  }
}
</script>