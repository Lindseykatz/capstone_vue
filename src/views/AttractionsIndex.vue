<template>
  <div class="attractions-index">
    <h3>
      This page shows all attractions. There will be a searchbar at the top and you will have to search for the city to
      find the attractions.
    </h3>
    <div>
      <input type="text" placeholder="Search" v-model="cityFilter" />
      <button v-on:click="runSearch()">Submit</button>
    </div>
    Attractions:
    <div v-for="attraction in filteredAttractions">
      <h2>{{ attraction.name }}</h2>
      <img v-bind:src="attraction.main_image_url" v-bind:alt="attraction.name" />
      <p>
        Address: {{ attraction.street_address }}, {{ attraction.city_name }}, {{ attraction.state }}
        {{ attraction.country }} {{ attraction.postal_code }}
      </p>
      <router-link v-bind:to="`/attractions/${attraction.id}`">More info</router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      attractions: [],
      cities: [{ id: 1, city_name: "Chicago" }, { id: 2, city_name: "Barcelona" }],
      cityFilter: "",
      cityFilterId: null
    };
  },
  created: function() {
    axios.get("/api/attractions").then(response => {
      this.attractions = response.data;
      console.log(this.attractions);
    });
  },
  methods: {
    runSearch: function() {
      var matchedCities = this.cities.filter(city => city.city_name === this.cityFilter);
      if (matchedCities.length > 0) {
        console.log(this.cityFilter, matchedCities[0].city_name);
        this.cityFilterId = matchedCities[0].id;
      }
    }
  },
  computed: {
    filteredAttractions: function() {
      if (this.cityFilterId) {
        return this.attractions.filter(attraction => attraction.city_name === this.cityFilter);
        // THE LONG WAY
        // var result = [];
        // this.attractions.forEach(function(attraction) {
        //   if (some condition) {
        //     result.push(attraction)
        //   }
        // })
        // return result;

        // THE SHORT WAY
        // return this.attactions.filter(attraction => ???)
      } else {
        return [];
      }
    }
  }
};
</script>
