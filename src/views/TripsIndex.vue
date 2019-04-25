<template>
  <div class="trips-index">
    <h3>When a user logs in, this page will show all of that user's itineraries, past and upcoming.</h3>
    My Trips:
    <div v-for="trip in trips">
      <h2>City: {{ trip.city }}</h2>
      <router-link v-bind:to="`/trips/${trip.id}`"> {{ trip.name }}</router-link>
      <p>Start Date: {{ trip.start_date }}</p>
      <p>End Date: {{ trip.end_date }}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: function() {
    return {
      trips: []
    };
  },
  created: function() {
    // RUBY WEB REQUEST
    // response = HTTP.get("/api/products")
    // @recipes = response.data;
    // JAVASCRIPT WEB REQUEST
    axios.get("/api/trips").then(response => {
      this.trips = response.data;
      console.log(this.trips);
    });
  },
  methods: {}
};
</script>
