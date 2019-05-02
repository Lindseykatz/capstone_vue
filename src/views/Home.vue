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
                <form action="#" class="home_search_form" id="home_search_form">
                  <div class="d-flex flex-lg-row align-items-start justify-content-lg-between justify-content-start">
                    <input type="text" class="search_input search_input_1" placeholder="City" required="required" />
                    <button class="home_search_button">search attractions</button>
                    <!-- TODO: Take you to Attractions page where the city is searched -->
                    <div class="datepicker-trigger">
                      <input
                        type="text"
                        id="datepicker-trigger"
                        placeholder="Select dates"
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
                    </div>
                    <button class="home_search_button">create itinerary</button>
                    <!-- TODO: Take you to the Itinerary create page where the city is already created -->
                  </div>
                </form>
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
