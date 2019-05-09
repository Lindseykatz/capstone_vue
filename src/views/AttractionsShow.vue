<template>
  <div>
    <div class="home">
      <div class="background_image" style="background-image:url(/chi.jpeg)">
        <div class="home_slider_content_container">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="home_slider_content">
                  <div class="home_title"><h2>Attractions</h2></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search -->

    <!-- About -->

    <div class="about">
      <div class="container">
        <div class="row">
          <div class="col text-center">
            <div class="attractions-show">
              <h2>{{ this.attraction.name }}</h2>
              <img v-bind:src="this.attraction.main_image_url" class="attractions-img" v-bind:alt="attraction.name" />
              <p>
                Address: {{ this.attraction.street_address }}, {{ this.attraction.city_name }},
                {{ this.attraction.state }} {{ this.attraction.country }} {{ this.attraction.postal_code }}
              </p>
              <p>Description: {{ this.attraction.description }}</p>
              <p>Average Time Spent: {{ this.attraction.average_time_minutes_spent }} minutes</p>
              <router-link to="/attractions">Back to all attractions</router-link>
              <div v-if="attraction.user_trips && attraction.user_trips.length > 0">
                <!--                 Current user trips: {{ attraction.user_trips }} -->

                <!-- <input type="text" placeholder="Enter a valid trip id" v-model="tripId"> -->
                <select v-model="tripId">
                  <option value="" disabled="disabled" style="margin-right:10px;" selected="selected">
                    Choose itinerary</option
                  >
                  <option v-for="trip in attraction.user_trips" v-bind:value="trip.id"
                    >{{ trip.trip_name }}: {{ trip.start_date }} to {{ trip.end_date }}
                  </option>
                </select>

                <input type="datetime-local" style="margin-right:10px;" v-model="startDateTime" />

                <button v-on:click="addItineraryItem()" class="btn btn-info">Add to my itinerary</button>
              </div>
              <!-- v-if="trip.city_id === 1" -->
              <a
                class="weatherwidget-io"
                href="https://forecast7.com/en/41d88n87d63/chicago/?unit=us"
                data-label_1="CHICAGO"
                data-label_2="WEATHER"
                data-icons="Climacons Animated"
                data-theme="original"
                >CHICAGO WEATHER</a
              >
              <!--     <a
      v-if="trip.city_id === 2"
      class="weatherwidget-io"
      href="https://forecast7.com/en/41d392d17/barcelona/"
      data-label_1="BARCELONA"
      data-label_2="WEATHER"
      data-icons="Climacons Animated"
      data-theme="original"
      >BARCELONA WEATHER</a
    > -->

              <!-- TODO: Add users' comments and pictures -->
              <!-- TODO: Add button to add this attraction to my itinerary. Must be logged in in order for this button to work. -->
            </div>
          </div>
        </div>
        <div class="row about_row"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      attraction: {},
      tripId: "",
      startDateTime: ""
    };
  },
  mounted: function() {
    !(function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = "https://weatherwidget.io/js/widget.min.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
    })(document, "script", "weatherwidget-io-js");
  },
  created: function() {
    axios.get("/api/attractions/" + this.$route.params.id).then(response => {
      this.attraction = response.data;
      console.log(this.attraction);
    });
  },
  methods: {
    addItineraryItem: function() {
      console.log("addItineraryItem");
      var params = {
        attraction_id: this.$route.params.id,
        start_datetime: this.startDateTime,
        trip_id: this.tripId
      };
      axios
        .post("/api/itinerary_items", params)
        .then(response => {
          // this.attraction.push(response.data);
          // console.log(this.trip.itinerary_items);
          console.log("successfully created itinerary_item", response.data);
          // this.startDateTime = "";
          // this.attraction_id = this.$route.params.id;
          this.$router.push("/trips/" + this.tripId);
        })
        .catch(error => {
          console.log(error.response.data.errors);
        });
      // TODO: add in web request, similar to TripsShow
      // If not logged in - prompt an error asking the user to log in
      // If logged in - pull up a dropdown box of the users itineraries
      //  If user picks itinerary with different city id - prompt an error telling the user that the cities don't match
      //  If user picks itinerary with same city id - pull up the date time box
    }
  }
};
</script>
