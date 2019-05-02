<template>
  <div>
    <div class="home">
      <div class="background_image" style="background-image:url(/images/destination_6.jpg)"></div>
      <div class="home_slider_content_container">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="home_slider_content">
                <div class="home_title"><h2>Itinerary</h2></div>
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
              <div class="trips-show">
                <h3>
                  When a user clicks on a specific trip, this page will show the activities in that trip.
                </h3>
                <h2>{{ this.trip.name }}</h2>
                <h2>Start Date: {{ this.trip.start_date }}</h2>
                <h2>End Date: {{ this.trip.end_date }}</h2>
                <div v-for="itinerary_item in trip.itinerary_items">
                  <h3>Attraction: {{ itinerary_item.attraction_name }}</h3>
                  <p>Start Date & Time: {{ itinerary_item.start_datetime }}</p>
                  <!--       <router-link v-bind:to="`/itinerary_item/${itinerary_item.id}/edit`">Edit</router-link> -->
                </div>

                <h4>Add New Itinerary Item:</h4>
                <form v-on:submit.prevent="createItineraryItem()">
                  <div>
                    Attraction:
                    <select v-model="AttractionId">
                      <option value="" disabled="disabled" selected="selected"> Select Attraction:</option>
                      <option v-for="city_attraction in trip.city_attractions" v-bind:value="city_attraction.id">
                        {{ city_attraction.name }}
                      </option>
                    </select>
                    <!--         <p>(you selected the attraction id of {{ AttractionId }})</p> -->

                    Start Date & Time:
                    <input type="datetime-local" v-model="newStartDateTime" />
                  </div>
                  <input type="submit" value="Add itinerary item to trip" />
                </form>
                <!-- TODO: Add map out my itinerary -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row about_row"></div>
    <div class="schedule">
      <vue-cal
        :time-from="0 * 60"
        :time-to="24 * 60"
        hide-view-selector
        editable-events
        :events="events"
        class="vuecal--full-height-delete"
        :min-date="minDate"
        :max-date="maxDate"
      >
      </vue-cal>
      <!-- 
    <v-btn @click="customEventCreation">button</v-btn> -->
    </div>
    <div id="map"></div>
  </div>
</template>

<style>
.vuecal__event {
  cursor: pointer;
}
.vuecal__menu,
.vuecal__cell-events-count {
  background-color: #42b983;
}
.vuecal__menu li {
  border-bottom-color: #fff;
  color: #fff;
}
.vuecal__menu li.active {
  background-color: rgba(255, 255, 255, 0.15);
}
.vuecal__title {
  background-color: #e4f5ef;
}
.vuecal__cell.today,
.vuecal__cell.current {
  background-color: rgba(240, 240, 255, 0.4);
}
.vuecal:not(.vuecal--day-view) .vuecal__cell.selected {
  background-color: rgba(235, 255, 245, 0.4);
}
.vuecal__cell.selected:before {
  border-color: rgba(66, 185, 131, 0.5);
}

.vuecal__event-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 4px 0 8px;
}

.vuecal__event-time {
  display: inline-block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
  font-style: italic;
}

.vuecal__now-line {
  color: #06c;
}
#map {
  height: 400px;
}
</style>

<script>
/* global mapboxgl, MapboxDirections */

import axios from "axios";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  data: function() {
    return {
      trip: {},
      AttractionId: "",
      newStartDateTime: "",
      selectedEvent: {},
      showDialog: false,
      events: [
        {
          start: "2019-05-01 14:00",
          end: "2019-05-01 18:00",
          title: "Need to go shopping",
          icon: "shopping_cart", // Custom attribute.
          content: "Click to see my shopping list",
          contentFull:
            "My shopping list is rather long:<br><ul><li>Avocadoes</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>", // Custom attribute.
          class: "leisure"
        },
        {
          start: "2019-05-04 10:00",
          end: "2019-05-04 15:00",
          title: "Golf with John",
          icon: "golf_course", // Custom attribute.
          content: "Do I need to tell how many holes?",
          contentFull: "Okay.<br>It will be a 18 hole golf course.", // Custom attribute.
          class: "sport"
        }
      ]
    };
  },
  mounted: function() {
    axios.get("/api/trips/" + this.$route.params.id).then(response => {
      this.trip = response.data;
      console.log(this.trip);
      console.log(this.trip.itinerary_items);
      console.log(this.trip.city_attractions);

      console.log(process.env.VUE_APP_MAP_API_KEY);
      mapboxgl.accessToken = process.env.VUE_APP_MAP_API_KEY;
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-87.6244, 41.8756],
        zoom: 13
      });

      map.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken
        }),
        "top-left"
      );
    });
  },
  // mounted: function() {
  //   setupTheme();
  // },
  computed: {
    minDate() {
      let now = new Date();
      let date = new Date(now);
      date.setDate(now.getDate() - 15);
      return date;
    },
    maxDate() {
      let now = new Date();
      let date = new Date(now);
      date.setDate(now.getDate() + 15);
      return date;
    }
  },
  methods: {
    customEventCreation(event) {
      const date = prompt("Create event on (YYYY-mm-dd)", "2018-11-20");
      // Check if date format is correct.
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        this.$refs.vuecal.createEvent(
          date, // Formatted date.
          12 * 60, // Event start time in minutes.
          // Event props.
          { title: "New Event", content: "yay! 🎉", classes: ["leisure"] }
        );
      } else if (date) alert("Wrong date format.");
    },
    createItineraryItem: function() {
      var params = {
        attraction_id: this.AttractionId,
        start_datetime: this.newStartDateTime,
        trip_id: this.$route.params.id
      };
      axios.post("/api/itinerary_items", params).then(response => {
        this.trip.itinerary_items.push(response.data);
        console.log(this.trip.itinerary_items);
        this.AttractionId = "";
        this.newStartDateTime = "";
      });
    }
  }
};
</script>
