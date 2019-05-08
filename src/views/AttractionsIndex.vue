<template>
  <div>
    <!-- Home -->

    <div class="home">
      <div class="background_image" style="background-image:url(images/about.jpg)">
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
            <div class="attractions-index">
              <br />
              <h5>
                Search for a city:
              </h5>
              <div>
                <input type="text" style="margin-right:10px;" placeholder="Search" v-model="cityFilter" />
                <button v-on:click="runSearch()" class="btn btn-info">Submit</button>
              </div>
              <div v-for="attraction in filteredAttractions">
                <h2>{{ attraction.name }}</h2>
                <img v-bind:src="attraction.main_image_url" width="300px" height="200px" v-bind:alt="attraction.name" />
                <p>
                  Address: {{ attraction.street_address }}, {{ attraction.city_name }}, {{ attraction.state }}
                  {{ attraction.country }} {{ attraction.postal_code }}
                </p>
                <router-link v-bind:to="`/attractions/${attraction.id}`">More info</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row about_row"></div>
      </div>
    </div>
  </div>
</template>
<!-- TODO: Show 10 attractions on a page at a time -->
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
