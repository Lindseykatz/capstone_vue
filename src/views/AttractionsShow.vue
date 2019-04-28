<template>
  <div class="attractions-show">
    <h3>
      This page shows the details for a specific attraction. This will show all comments and pictures. Also, there will
      be a button to add this attraction to a user's itinerary.
    </h3>
    <h2>{{ this.attraction.name }}</h2>
    <img v-bind:src="this.attraction.main_image_url" v-bind:alt="attraction.name" />
    <p>
      Address: {{ this.attraction.street_address }}, {{ this.attraction.city_name }}, {{ this.attraction.state }}
      {{ this.attraction.country }} {{ this.attraction.postal_code }}
    </p>
    <p>Description: {{ this.attraction.description }}</p>
    <p>Average Time Spent: {{ this.attraction.average_time_minutes_spent }} minutes</p>

    <!-- TODO: Add users' comments and pictures -->
    <!-- TODO: Add button to add this attraction to my itinerary. Must be logged in in order for this button to work. -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      attraction: {}
    };
  },
  created: function() {
    axios.get("/api/attractions/" + this.$route.params.id).then(response => {
      this.attraction = response.data;
      console.log(this.attraction);
    });
  },
  methods: {}
};
</script>
