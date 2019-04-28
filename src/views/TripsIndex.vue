<template>
  <div class="trips-index">
    <h3>When a user logs in, this page will show all of that user's itineraries, past and upcoming.</h3>
    <h1>New Trip</h1>
    <!--     <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul> -->
    <form v-on:submit.prevent="createTrip()">
      <div>
        Trip Name:
        <input type="text" v-model="newTripName" />
        Trip Dates:
        <div class="datepicker-trigger">
          <input
            type="text"
            id="datepicker-trigger"
            placeholder="Select dates"
            :value="formatDates(dateOne, dateTwo)"
          />

          <AirbnbStyleDatepicker
            :trigger-element-id="'datepicker-trigger'"
            :mode="'range'"
            :fullscreen-mobile="true"
            :date-one="dateOne"
            :date-two="dateTwo"
            @date-one-selected="
              val => {
                dateOne = val;
              }
            "
            @date-two-selected="
              val => {
                dateTwo = val;
              }
            "
          />
        </div>
        City:
        <select v-model="city_id">
          <option value="" disabled="disabled" selected="selected"> Select City:</option>
          <option v-for="city in cities" v-bind:value="city.id">{{ city.city_name }}</option>
        </select>
        <!-- <p>(you selected the city id of {{ city_id }})</p> -->
      </div>
      <input type="submit" value="Create trip" />
    </form>
    <h1>My Trips:</h1>
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
import format from "date-fns/format";

export default {
  data: function() {
    return {
      trips: [],
      newTripName: "",
      city_id: "",
      dateFormat: "D MMM",
      dateOne: "",
      dateTwo: "",
      cities: [{ id: 1, city_name: "Chicago" }, { id: 2, city_name: "Barcelona" }]
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
  methods: {
    createTrip: function() {
      console.log("Create the trip...");
      this.errors = [];
      var params = {
        trip_name: this.newTripName,
        start_date: this.dateOne,
        end_date: this.dateTwo,
        city_id: this.city_id
      };
      axios
        .post("/api/trips", params)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/trips/" + response.data.id);
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
      // TODO: make web request for cities
    },
    formatDates(dateOne, dateTwo) {
      let formattedDates = "";
      if (dateOne) {
        formattedDates = format(dateOne, this.dateFormat);
      }
      if (dateTwo) {
        formattedDates += " - " + format(dateTwo, this.dateFormat);
      }
      return formattedDates;
    }
  }
};
</script>
