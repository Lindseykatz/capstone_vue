<template>
  <div class="trips-show">
    <h3>
      When a user clicks on a specific trip, this page will show the activities in that trip.
    </h3>
    <h2>{{ this.trip.name }}</h2>
    <div v-for="itinerary_item in trip.itinerary_items">
      <h3>Attraction: {{ itinerary_item.attraction_name }}</h3>
      <p>Start Date & Time: {{ itinerary_item.start_datetime }}</p>
      <!--       <router-link v-bind:to="`/itinerary_item/${itinerary_item.id}/edit`">Edit</router-link> -->
    </div>
    <h3>Add New Itinerary Item! Use a v-on:click here</h3>
    <div>
      Attraction Id: <input type="text" v-model="AttractionId" /> Start Date & Time:
      <input type="text" v-model="newStartDateTime" />
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: function() {
    return {
      itinerary_items: [],
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
    });
  },
  methods: {
    // createPhoto: function() {
    //   var params = {
    //     name: this.newAttractionName
    //   };
    //   axios.post("/api/photos", params).then(response => {
    //     this.photos.push(response.data);
    //     this.newPhotoName = "";
    //     this.newPhotoWidth = "";
    //     this.newPhotoHeight = "";
    //   });
    // }
  }
};
</script>
