<template>
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
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: function() {
    return {
      trip: {},
      AttractionId: "",
      newStartDateTime: ""
    };
  },
  created: function() {
    axios.get("/api/trips/" + this.$route.params.id).then(response => {
      this.trip = response.data;
      console.log(this.trip);
      console.log(this.trip.itinerary_items);
      console.log(this.trip.city_attractions);
    });
  },
  methods: {
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
