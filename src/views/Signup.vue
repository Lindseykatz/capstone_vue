<template>
  <div>
    <div class="home">
      <div class="background_image" style="background-image:url(mountain.jpeg)">
        <div class="home_slider_content_container">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="home_slider_content">
                  <div class="home_title"><h2>Signup</h2></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="signup">
      <div class="container">
        <form v-on:submit.prevent="submit()">
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="name" />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" class="form-control" v-model="email" />
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
          <div class="form-group">
            <label>Password confirmation:</label>
            <input type="password" class="form-control" v-model="passwordConfirmation" />
          </div>
          <div class="form-group">
            <label>Date of birth:</label>
            <input type="text" class="form-control" v-model="dateOfBirth" />
          </div>
          <div class="form-group">
            <label>Avatar:</label>
            <br />
            <!-- will want to add in drop down box to select which avatar and associate it to avatar id -->
            <!-- <input type="text" class="form-control" v-model="avatarId" /> -->

            <!-- <input type="radio" id="one" value="1" v-model="avatarId" />
          <label for="one">One</label>
          <br />
          <input type="radio" id="two" value="2" v-model="avatarId" />
          <label for="two">Two</label>
          <br /> -->
            <span v-for="avatar in avatars">
              <input type="radio" v-bind:id="`avatar-${avatar.id}`" v-bind:value="avatar.id" v-model="avatarId" />
              <label v-bind:for="`avatar-${avatar.id}`">
                <img v-bind:src="`http://localhost:3000/${avatar.url}`" v-bind:alt="avatar.description" width="60" />
              </label>
            </span>
          </div>
          <!-- <span>Picked: {{ avatarId }}</span> -->
          <div class="form-group">
            <label>Current City:</label>
            <input type="text" class="form-control" v-model="currentCity" />
          </div>
          <input type="submit" class="btn btn-primary" value="Submit" />
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      dateOfBirth: "",
      avatarId: "",
      currentCity: "",
      avatars: [],
      errors: []
    };
  },
  created: function() {
    axios.get("/api/avatars").then(response => {
      this.avatars = response.data;
    });
    // change this to an axios request to GET "/api/avatars"...
    // this.avatars = [
    //   { id: 1, description: "Man 1", url: "man.png" },
    //   { id: 2, description: "Man 2", url: "man (1).png" },
    //   { id: 3, description: "Man 3", url: "man (2).png" }
    // ];
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        date_of_birth: this.dateOfBirth,
        avatar_id: this.avatarId,
        current_city: this.currentCity
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
