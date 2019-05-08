<template>
  <div>
    <!-- Header -->

    <!-- Home -->

    <div class="home">
      <div class="background_image" style="background-image:url(boat.jpeg)">
        <div class="home_slider_content_container">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="home_slider_content">
                  <div class="home_title"><h2>Login</h2></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="login">
      <div class="container">
        <form v-on:submit.prevent="submit()">
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" class="form-control" v-model="email" />
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
          <input type="submit" class="btn btn-info" value="Submit" />
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
      email: "lindsey@email.com",
      password: "password",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$emit("changeJwt");
          this.$router.push("/trips");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
