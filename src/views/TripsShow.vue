<template>
  <div class="trips-show">
    <h3>
      When a user clicks on a specific trip, this page will show the activities in that trip.
    </h3>
    <h2>{{ this.trip.name }}</h2>
    <div v-for="itinerary_item in trip.itinerary_items">
      <h3>Attraction: {{ itinerary_item.attraction_name }}</h3>
      <p>Start Date & Time: {{ itinerary_item.start_datetime }}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: function() {
    return {
      itinerary_items: [],
      trip: {}
    };
  },
  created: function() {
    axios.get("/api/trips/" + this.$route.params.id).then(response => {
      this.trip = response.data;
      console.log(this.trip);
      console.log(this.trip.itinerary_items);
    });
  },
  methods: {}
};
</script>
