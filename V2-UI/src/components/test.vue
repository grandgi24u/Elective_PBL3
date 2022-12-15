<template>
  <div class="hello">
    <h1>Get all users</h1>
    <table class="table table-bordered table-striped">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">nom</th>
        <th scope="col">email</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in getUsers" :key="user._id">
        <td>{{ user._id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
      </tr>
      </tbody>
    </table>
    <h1>Get all users</h1>
    <table class="table table-bordered table-striped">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">nom</th>
        <th scope="col">email</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user._id">
        <td>{{ user._id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
      </tr>
      </tbody>
    </table>
    <h1>Get specifique user</h1>
    <div>
      {{ testUser._id }} {{ testUser.name }} {{ testUser.email }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const getUsers = computed(() => {
  return store.getters.getUsers;
});
const users = computed(() => {
  return store.state.users;
});
const testUser = computed(() => {
  return store.getters.getOneUser("639b72cb0d81d23bcb7487f9");
});
onMounted(() => {
  store.dispatch("fetchUsers");
});
</script>