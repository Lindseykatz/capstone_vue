<template>
  <div>
    <div class="home">
      <!-- Home Slider -->
      <div class="home_slider_container">
        <div class="owl-carousel owl-theme home_slider">
          <!-- Slide -->
          <div class="owl-item">
            <div class="background_image" style="background-image:url(images/home_slider.jpg)"></div>
            <div class="home_slider_content_container">
              <div class="container">
                <div class="row">
                  <div class="col">
                    <div class="home_slider_content">
                      <div class="home_title"><h2>Your next adventure awaits</h2></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide -->
          <div class="owl-item">
            <div class="background_image" style="background-image:url(images/home_slider.jpg)"></div>
            <div class="home_slider_content_container">
              <div class="container">
                <div class="row">
                  <div class="col">
                    <div class="home_slider_content">
                      <div class="home_title"><h2>Your next adventure awaits</h2></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Slide -->
          <div class="owl-item">
            <div class="background_image" style="background-image:url(images/home_slider.jpg)"></div>
            <div class="home_slider_content_container">
              <div class="container">
                <div class="row">
                  <div class="col">
                    <div class="home_slider_content">
                      <div class="home_title"><h2>Your next adventure awaits</h2></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home_search">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="home_search_container">
              <div class="home_search_title">Search for your trip</div>
              <div class="home_search_content">
                <div class="d-flex flex-lg-row align-items-start justify-content-lg-between justify-content-start">
                  <div>
                    <h4>City:</h4>
                    <input type="text" placeholder="Enter city" style="margin-right:20px; " required="required" />
                    <button v-on:click="`/attractions`" class="btn btn-info">
                      search attractions
                    </button>
                  </div>
                  <!-- TODO: Take you to Attractions page where the city is searched -->
                  <div class="datepicker-trigger">
                    <h4>Dates:</h4>
                    <input
                      type="text"
                      id="datepicker-trigger"
                      placeholder="Select dates"
                      style="margin-right:20px;"
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
                    <button class="btn btn-info">create itinerary</button>
                  </div>

                  <!-- TODO: Take you to the Itinerary create page where the city is already created -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import format from "date-fns/format";
/* global setupTheme */
export default {
  data: function() {
    return {
      dateFormat: "D MMM",
      dateOne: "",
      dateTwo: ""
    };
  },
  name: "home",
  mounted: function() {
    setupTheme();
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
      // axios
      //   .post("/api/trips", params)
      //   .then(response => {
      //     console.log("Success", response.data);
      //     this.$router.push("/trips/" + response.data.id);
      //   })
      //   .catch(error => {
      //     console.log(error.response.data.errors);
      //     this.errors = error.response.data.errors;
      //   });
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
