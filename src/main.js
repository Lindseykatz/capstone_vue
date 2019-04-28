import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import AirbnbStyleDatepicker from "vue-airbnb-style-datepicker";
import "vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css";

// see docs for available options
const datepickerOptions = {};

// make sure we can use it in our components
Vue.use(AirbnbStyleDatepicker, datepickerOptions);

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

var isToday = require("date-fns/is_today");
isToday(new Date());

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
