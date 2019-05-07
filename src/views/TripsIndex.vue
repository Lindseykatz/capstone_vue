<template>
  <div>
    <div class="home">
      <div class="background_image" style="background-image:url(/plane.jpeg)"></div>
      <div class="home_slider_content_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_slider_content">
                <div class="home_title"><h2>Trips</h2></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="about">
      <div class="container">
        <div class="row">
          <div class="col text-center">
            <div class="trips">
              <div class="trips-index">
                <h5></h5>
                <h3>New Trip</h3>
                <!--     <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul> -->
                <form v-on:submit.prevent="createTrip()">
                  <div>
                    <ul>
                    <li> Trip Name: </li>
                      <li>
                      <input type="text" v-model="newTripName" />
                      </li>
                    <li> Dates:
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
                    </li>
                    <li>
                    City:
                  </li>
                  <li>
                    <select v-model="city_id">
                      <option value="" disabled="disabled" selected="selected"> Select City:</option>
                      <option v-for="city in cities" v-bind:value="city.id">{{ city.city_name }}</option>
                    </select>
                    <!-- <p>(you selected the city id of {{ city_id }})</p> -->
                  </li>
                </ul>
                                  </div>
                  <input type="submit" value=" Create new trip " />

                </form>
                <h3>Trips:</h3>
                  <div v-for="trip in trips">
                    <div class="card-deck" >
                      <div class="card mb-4">
                        <img class="card-img-top" v-if="trip.city_id === 1" src="chicago.jpg" alt="Card image cap" />
                        <img class="card-img-top" v-if="trip.city_id === 2" src="barcelona.jpg" alt="Card image cap" />
                        <div class="card-text">
                          <router-link v-bind:to="`/trips/${trip.id}`"> {{ trip.name }}</router-link>
                        <p class="card-text">
                          <ul>City: {{ trip.city }}</ul>
                          <ul>From: {{ trip.start_date }} to {{ trip.end_date }}</ul>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- TODO: Add Past Trips, Upcoming Trips -->
<!--                 <div v-for="trip in trips">
                  <h4>
                    <router-link v-bind:to="`/trips/${trip.id}`"> {{ trip.name }}</router-link>
                  </h4>
                  <p>City: {{ trip.city }}</p>
                  <p>From: {{ trip.start_date }} to {{ trip.end_date }}</p>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row about_row"></div>
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
      current_user: "",
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
