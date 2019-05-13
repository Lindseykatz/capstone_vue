<template>
  <div>
    <div class="home">
      <div class="background_image" style="background-image:url(/greece.jpeg)"></div>
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
    <!-- TODO: current have to refresh the page for this to work - fix this!  -->
    <!--                   v-if="trip.city_id === 1"
              <a
                class="weatherwidget-io"
                href="https://forecast7.com/en/41d88n87d63/chicago/?unit=us"
                data-label_1="CHICAGO"
                data-label_2="WEATHER"
                data-icons="Climacons Animated"
                data-theme="original"
                >CHICAGO WEATHER</a
              > -->
    <!--              v-if="trip.city_id === 2" -->
    <a
      class="weatherwidget-io"
      href="https://forecast7.com/en/41d392d17/barcelona/?unit=us"
      data-label_1="BARCELONA"
      data-label_2="WEATHER"
      data-icons="Climacons Animated"
      data-theme="original"
      >BARCELONA WEATHER</a
    >

    <div class="about">
      <div class="container">
        <div class="row">
          <div class="col text-center">
            <div class="trips">
              <div class="trips-show">
                <h2>
                  {{ this.trip.name }}:
                  {{
                    this.trip.start_date.split("-")[1] +
                      "-" +
                      this.trip.start_date.split("-")[2] +
                      "-" +
                      this.trip.start_date.split("-")[0]
                  }}
                  to
                  {{
                    this.trip.end_date.split("-")[1] +
                      "-" +
                      this.trip.end_date.split("-")[2] +
                      "-" +
                      this.trip.end_date.split("-")[0]
                  }}
                </h2>
                <!--                 <div v-for="itinerary_item in trip.itinerary_items">
                  <h3>Attraction: {{ itinerary_item.attraction_name }}</h3>
                  <p>Start Date & Time: {{ itinerary_item.start_datetime }}</p> -->
                <!--       <router-link v-bind:to="`/itinerary_item/${itinerary_item.id}/edit`">Edit</router-link>
                </div> -->

                <h4>Add New Event:</h4>
                <form v-on:submit.prevent="createItineraryItem()">
                  <div>
                    Attraction:
                    <select v-model="AttractionId">
                      <option value="" disabled="disabled" selected="selected"> </option>
                      <option v-for="city_attraction in trip.city_attractions" v-bind:value="city_attraction.id">
                        {{ city_attraction.name }}
                      </option>
                    </select>
                    <!--         <p>(you selected the attraction id of {{ AttractionId }})</p> -->

                    Start Date & Time:
                    <input type="datetime-local" v-model="newStartDateTime" />
                  </div>
                  <input type="submit" class="btn btn-info" value="Add to itinerary" />
                </form>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row about_row"></div>
    <div class="schedule">
      <vue-cal
        :time-from="6 * 60"
        :time-to="24 * 60"
        hide-view-selector
        editable-events
        :events="itineraryItems"
        style="padding-left: 200px; padding-right: 200px"
        class="vuecal--full-height-delete"
        :selected-date="trip.start_date"
        :min-date="trip.start_date"
        :max-date="trip.end_date"
        @cell-click="selectedDate('cell-click', $event)"
        @event-duration-change="durationChange('event-duration-change', $event)"
        @event-delete="deleteEvent('event-delete', $event)"
        :on-event-click="onEventClick"
      >
      </vue-cal>

      <!--       <v-dialog v-model="showDialog">
        <v-card>
          <v-card-title>
            <strong>{{ selectedEvent.title }}</strong>
            <v-spacer />
            <span>{{ selectedEvent.startDate }}</span>
            <input type="text" v-model="selectedEvent.startDate" />
            <button v-on:click="updateStartDate()">Update date</button>
          </v-card-title>
          <v-card-text>
            <ul>
              <li>From {{ selectedEvent.startTime }} to {{ selectedEvent.endTime }}</li>
              <li>Starts at:</li>
              <input type="text" v-model="selectedEvent.startTime" />
              <button v-on:click="updateStartTime()">Update start time</button>
              <li>Ends at:</li>
              <input type="text" v-model="selectedEvent.endTime" />
              <button v-on:click="updateEndTime()">Update end time</button>
            </ul>
          </v-card-text>
        </v-card>
      </v-dialog> -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="editEventModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <strong style="padding-right: 5px;">{{ selectedEvent.title }}</strong>
              <span>
                {{ selectedEvent.formattedStartDate }} from {{ selectedEvent.startTime }} to
                {{ selectedEvent.endTime }}</span
              >

              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul>
                <li>Date:</li>
                <input type="text" v-model="selectedEvent.startDate" />
                <button class="btn btn-success" style="margin-left:10px;" v-on:click="updateStartDate()">
                  Update date
                </button>
                <li></li>
                <li>Starts at:</li>
                <input type="text" v-model="selectedEvent.startTime" />
                <button class="btn btn-success" style="margin-left:10px;" v-on:click="updateStartTime()">
                  Update start time
                </button>
                <li>Ends at:</li>
                <input type="text" v-model="selectedEvent.endTime" />
                <button class="btn btn-success" style="margin-left:10px;" v-on:click="updateEndTime()">
                  Update end time
                </button>
                <br />
                <br />
                <button class="btn btn-danger" v-on:click="deleteEvent()">Delete</button>
              </ul>
            </div>
            <div class="modal-footer">
              <!--               <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 
    <v-btn @click="customEventCreation">button</v-btn> -->
    </div>
    <!-- <div id="trip_steps">Directions: {{ getDirections() }}</div> -->

    <div id="map"></div>
    <div id="instructions">
      <div v-if="steps.length > 0">
        <h4>Distance</h4>
        <p>{{ (distance / 1609.344).toFixed(2) }} miles</p>
        <h4>Steps</h4>
        <p>Approximately {{ ((distance / 1609.344) * 2400).toFixed(0) }} steps</p>
        <br />
        <h4>Walking Directions</h4>
        <ul>
          <li v-for="step in steps">{{ step }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.vuecal__event {
  cursor: pointer;
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

.mapboxgl-popup {
  max-width: 200px;
}

#instructions {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 360px;
  margin: 20px;
  width: 25%;

  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  overflow-y: scroll;
  font-family: sans-serif;
  font-size: 0.8em;
  line-height: 2em;
}

.duration {
  font-size: 2em;
}

.vuecal__event {
  cursor: pointer;
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

.vuecal__event.restaurants {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}

.vuecal__event.sport {
  background-color: rgba(164, 230, 210, 0.9);
  border: 1px solid rgb(144, 210, 190);
}
.vuecal__event.sights {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
</style>

<script>
/* global mapboxgl, MapboxDirections, mapboxSdk */

import axios from "axios";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  data: function() {
    return {
      map: null,
      mapboxClient: null,
      trip: { itinerary_items: [], start_date: "", end_date: "" },
      steps: [],
      distance: "",
      AttractionId: "",
      newStartDateTime: "",
      newEndDateTime: "",
      selectedEvent: {},
      // showDialog: false,
      itineraryItems: [],
      currentSelectedDate: ""
    };
  },
  mounted: function() {
    axios.get("/api/trips/" + this.$route.params.id).then(response => {
      this.trip = response.data;
      this.currentSelectedDate = this.trip.start_date;

      this.itineraryItems = this.trip.itinerary_items.map(item => {
        console.log("Itemmmm ", item);
        let newItem = { id: item.id };

        console.log("BEGIN FFFFFFF", item.start_datetime);
        let startTimeDate = item.start_datetime.split("T")[0] + " " + item.start_datetime.split("T")[1];
        console.log("FFFFFFFFF", startTimeDate);
        newItem["start"] = startTimeDate;

        let formattedEndDate = "";
        if (item.end_datetime == null) {
          var enddate = new Date(item.start_datetime);
          enddate.setHours(enddate.getHours() + 2);

          console.log("BEGIN UUUUUUUU", enddate.toString("YYYY-M-D H:i"));
          let splitEndDate = enddate.toString("YYYY-M-D H:i").split(" ");
          console.log("UUUUUUUUU", splitEndDate);

          formattedEndDate =
            splitEndDate[3] +
            "-0" +
            parseInt(enddate.getMonth() + 1) +
            "-" +
            splitEndDate[2] +
            " " +
            splitEndDate[4].slice(0, -3);
        } else {
          formattedEndDate = item.end_datetime;
        }

        newItem["end"] = formattedEndDate;
        newItem["title"] = item["attraction_name"];
        newItem["class"] = item["category_name"];

        console.log("New Item ", newItem);

        return newItem;
      });
      // console.log(this.trip);
      console.log(this.trip.itinerary_items);
      // console.log(this.trip.city_attractions);
      // console.log("thing???", this.trip.city_attractions.full_address);

      // console.log(process.env.VUE_APP_MAP_API_KEY);
      mapboxgl.accessToken = process.env.VUE_APP_MAP_API_KEY;
      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      // geocode the city address, then make the map
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [2.1734, 41.3851],
        zoom: 13
      });
      this.map = map;
      this.mapboxClient = mapboxClient;

      this.trip.itinerary_items.forEach(attraction => {
        this.addAttractionToMap(attraction);
      });

      // this.mapboxDirections = new MapboxDirections({
      //   accessToken: mapboxgl.accessToken
      // });
      // map.addControl(this.mapboxDirections, "top-left");

      // mapboxClient.geocoding
      //        .forwardGeocode({
      //          query: this.location.address,
      //          autocomplete: true,
      //          limit: 1
      //        })
      //        .send()
      //        .then(function(response) {
      //          if (response && response.body && response.body.features && response.body.features.length) {
      //            var feature = response.body.features[0];

      //            var map = new mapboxgl.Map({
      //              container: "map",
      //              style: "mapbox://styles/mapbox/streets-v11",
      //              center: feature.center,
      //              zoom: 15,
      //              interactive: false
      //            });
      //            // map.addControl(
      //            //   new MapboxDirections({
      //            //     accessToken: mapboxgl.accessToken
      //            //   }),
      //            //   "top-left"
      //            // );
      //            new mapboxgl.Marker().setLngLat(feature.center).addTo(map);

      //       // map.addControl(
      //       //   new MapboxDirections({
      //       //     accessToken: mapboxgl.accessToken
      //       //   }),
      //       //   "top-left"
      //       // );
    });

    console.log("mounted TripsShow");
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
  // mounted: function() {
  //   setupTheme();
  // },
  computed: {
    // minDate() {
    //   let now = new Date();
    //   let date = new Date(now);
    //   date.setDate(now.getDate() - 15);
    //   return date;
    // },
    // maxDate() {
    //   let now = new Date();
    //   let date = new Date(now);
    //   date.setDate(now.getDate() + 15);
    //   return date;
    // }
  },
  methods: {
    addAttractionToMap: function(attraction) {
      this.mapboxClient.geocoding
        .forwardGeocode({
          query: attraction.full_address,
          autocomplete: false
        })
        .send()
        .then(response => {
          if (response && response.body && response.body.features && response.body.features.length) {
            var feature = response.body.features[0];
            var marker = new mapboxgl.Marker().setLngLat(feature.center).addTo(this.map);
            attraction.center = feature.center;
            var popup = new mapboxgl.Popup({ offset: 25 }).setText(attraction.attraction_name);
            new mapboxgl.Marker()
              .setLngLat(feature.center)
              .setPopup(popup) // sets a popup on this marker
              .addTo(this.map);
          }
          console.log("itinerary items", this.trip.itinerary_items);
        });
    },
    getDirections: function(inputDate) {
      console.log("getDirections", this.trip.itinerary_items);
      // write a loop through this.trip.itinerary_items
      // build a string of lat/longs in this format:
      // var latlngs = ""
      // loop
      //   latlngs += lat + "," + lng + ";"
      //
      var latlngs = [];
      var selectedDate = this.currentSelectedDate.split("T")[0];
      this.trip.itinerary_items.forEach(itineraryItem => {
        var itineraryItemDate = itineraryItem.start_datetime.split(" ")[0].split("T")[0];
        // if (this.currentSelectedDate === itineraryItem.start_datetime.split(" ")[0]) {
        if (selectedDate === itineraryItemDate) {
          // change this to check if itineraryItem's date matches the inputDate
          latlngs.push(`${itineraryItem.center}`);
        }
      });
      console.log("WHAT'S GOING ON", inputDate, latlngs.join(";"));
      axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${latlngs.join(
            ";"
          )}?geometries=geojson&steps=true&access_token=${process.env.VUE_APP_MAP_API_KEY}`
        )
        .then(response => {
          console.log("directions response", response.data);
          // this.getRoute(latlngs);

          var data = response.data.routes[0];
          var route = data.geometry.coordinates;
          var geojson = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route
            }
          };
          // if the route already exists on the map, reset it using setData
          if (this.map.getSource("route")) {
            console.log("reset route", geojson);
            this.map.getSource("route").setData(geojson);
          } else {
            // otherwise, make a new request
            console.log("make new request?", geojson);
            this.map.addLayer({
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: data.geometry.coordinates
                  }
                }
              },
              layout: {
                "line-join": "round",
                "line-cap": "round"
              },
              paint: {
                "line-color": "#3887be",
                "line-width": 5,
                "line-opacity": 0.75
              }
            });

            console.log("first coordinates", data.geometry.coordinates[0]);

            this.map.addLayer({
              id: "point",
              type: "circle",
              source: {
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      properties: {},
                      geometry: {
                        type: "Point",
                        coordinates: data.geometry.coordinates[0]
                      }
                    }
                  ]
                }
              },
              paint: {
                "circle-radius": 10,
                "circle-color": "#3887be"
              }
            });

            console.log("the route is set?", this.map.getSource("route"));
          }
          response.data.routes[0].legs.forEach(leg =>
            leg.steps.forEach(step => this.steps.push(step.maneuver.instruction))
          );
          this.distance = response.data.routes[0].distance;
          // loop through response.data.routes[0].legs.forEach(leg => { ... })
          // do a second loop through leg.steps.forEach(step => { ... step.maneuver.instruction ... })

          // var instructions = document.getElementById("instructions");
          // var steps = this.data.legs[0].steps;

          // var tripInstructions = [];
          // for (var i = 0; i < steps.length; i++) {
          //   tripInstructions.push("<br><li>" + steps[i].maneuver.instruction) + "</li>";
          //   instructions.innerHTML =
          //     '<br><span class="duration">Trip duration: ' +
          //     Math.floor(this.data.duration / 60) +
          //     " min 🚴 </span>" +
          //     tripInstructions;
          //   console.log("trip instructions", this.tripInstructions);
          // }
          // get the sidebar and add the instructions
        });
    },
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
        this.itineraryItems.push(response.data);
        console.log(this.trip.itinerary_items);
        this.AttractionId = "";
        this.newStartDateTime = "";
        this.addAttractionToMap(response.data);
        location.reload(true);
      });
    },
    durationChange: function(eventName, event) {
      var itineraryItem = this.itineraryItems.filter(itineraryItem => {
        return itineraryItem.title === event.title;
        // TODO: fix this so that the title and the start date are the same
      });
      console.log("i found this", itineraryItem);
      var params = {
        end_datetime: event.end
      };
      axios.patch("/api/itinerary_items/" + event.id, params).then(response => {
        console.log("you updated the end date of this event");
        event = response.data;
      });
      console.log(eventName, ": ", event);
    },
    selectedDate: function(eventName, event) {
      console.log(eventName, ": ", event);
      let date = new Date(event);
      let splitDate = date.toString("YYYY-M-D H:i").split(" ");

      this.currentSelectedDate = splitDate[3] + "-0" + parseInt(date.getMonth() + 1) + "-" + splitDate[2];

      console.log("Current selected date", this.currentSelectedDate);
      this.getDirections(this.currentSelectedDate);
    },
    deleteEvent: function() {
      var itineraryItem = this.itineraryItems.filter(itineraryItem => {
        return itineraryItem.title === this.selectedEvent.title;
      });
      var params = {};
      axios.delete("/api/itinerary_items/" + this.selectedEvent.id, params).then(response => {
        console.log("you deleted this event");
        this.selectedEvent = response.data;
        location.reload(true);
      });
      console.log(this.selectedEvent, ": ", event);
    },
    onEventClick(event, e) {
      console.log("On click event ", event);
      this.selectedEvent = event;
      this.selectedEvent.formattedStartDate = this.formatDate(event.startDate);
      $("#editEventModal").modal("show");
      // this.showDialog = true;

      e.stopPropagation();
    },
    updateStartTime: function() {
      var itineraryItem = this.itineraryItems.filter(itineraryItem => {
        console.log("i found this", itineraryItem.title === this.selectedEvent.title, "; ", this.selectedEvent);
        return itineraryItem.title === this.selectedEvent.title;
      });
      var params = {
        start_datetime: this.selectedEvent.startDate + " " + this.selectedEvent.startTime
      };
      axios.patch("/api/itinerary_items/" + this.selectedEvent.id, params).then(response => {
        console.log("you updated the start time of this event");
        this.selectedEvent = response.data;
        location.reload(true);
        //TODO: need to figure out how to update page without refreshing...
      });
    },
    updateEndTime: function() {
      var itineraryItem = this.itineraryItems.filter(itineraryItem => {
        return itineraryItem.title === this.selectedEvent.title;
      });

      var params = {
        end_datetime: this.selectedEvent.endDate + " " + this.selectedEvent.endTime
      };
      axios.patch("/api/itinerary_items/" + this.selectedEvent.id, params).then(response => {
        console.log("you updated the end time of this event");
        this.selectedEvent = response.data;
        location.reload(true);
        // TODO: need to figure out how to update page without refreshing...
      });
    },
    updateStartDate: function() {
      var itineraryItem = this.itineraryItems.filter(itineraryItem => {
        console.log("i found this", itineraryItem.title === this.selectedEvent.title, "; ", this.selectedEvent);
        return itineraryItem.title === this.selectedEvent.title;
      });
      var params = {
        start_datetime: this.selectedEvent.startDate + " " + this.selectedEvent.startTime,
        end_datetime: this.selectedEvent.startDate + " " + this.selectedEvent.endTime
      };
      axios.patch("/api/itinerary_items/" + this.selectedEvent.id, params).then(response => {
        console.log("you updated the start date of this event");
        this.selectedEvent = response.data;
        location.reload(true);
        // TODO: need to figure out how to update page without refreshing...
      });
    },
    formatDate: function(date) {
      console.log(date);
      var splitDate = date.split("-");
      var formattedDate = splitDate[1] + "-" + splitDate[2] + "-" + splitDate[0];
      return formattedDate;
    }
  }
};
</script>
