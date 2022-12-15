<template>
  <div>
    <h1>User list</h1>
    <div v-for="user in users">
      <div>{{user.name}}</div>
      <div>{{user.email}}</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'UserList',
  data() {
    return {
      users: []
    };
  },
  mounted() {
    axios.get('http://localhost:3000/users')
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
}
</script>