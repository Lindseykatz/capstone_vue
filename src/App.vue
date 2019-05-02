<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="header_content d-flex flex-row align-items-center justify-content-start">
              <div class="header_content_inner d-flex flex-row align-items-end justify-content-start">
                <div class="logo"><img src="/white.png" width="200" height="200" alt="" /></div>
                <!-- <a href="/">NEXT</a> -->
                <nav class="main_nav">
                  <ul class="d-flex flex-row align-items-start justify-content-start">
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/attractions">Attractions</router-link></li>
                    <li v-if="!jwt"><router-link to="/signup">Signup</router-link></li>
                    <li v-if="!jwt"><router-link to="/login">Login</router-link></li>
                    <li v-if="jwt"><router-link to="/trips">Trips</router-link></li>
                    <li v-if="jwt"><router-link to="/logout">Logout</router-link></li>
                  </ul>
                </nav>

                <!-- Hamburger -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="header_social d-flex flex-row align-items-center justify-content-start">
        <ul class="d-flex flex-row align-items-start justify-content-start">
          <li>
            <a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-dribbble" aria-hidden="true"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-behance" aria-hidden="true"></i></a>
          </li>
          <li>
            <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
          </li>
        </ul>
      </div>
    </header>

    <router-view v-on:changeJwt="setJwt()" />

    <!-- Footer -->
    <footer class="footer">
      <div class="col text-center">
        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
        Copyright &copy; All rights reserved | This template is made with
        <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com/" target="_blank">Colorlib</a>
        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
      </div>
    </footer>
  </div>
</template>

<style></style>

<script>
export default {
  data: function() {
    return {
      jwt: null
    };
  },
  created: function() {
    this.jwt = localStorage.jwt;
    console.log("My jwt is", this.jwt);
  },
  methods: {
    setJwt: function() {
      this.jwt = localStorage.jwt;
    }
  }
};
</script>
