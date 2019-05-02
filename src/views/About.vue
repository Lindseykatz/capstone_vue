<template>
  <div class="schedule">
    <vue-cal
      :time-from="0 * 60"
      :time-to="24 * 60"
      hide-view-selector
      editable-events
      :events="events"
      class="vuecal--full-height-delete"
      :min-date="minDate"
      :max-date="maxDate"
    >
    </vue-cal>
    <!-- 
    <v-btn @click="customEventCreation">button</v-btn> -->
  </div>
</template>
<style>
.vuecal__event {
  cursor: pointer;
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
</style>
<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  components: { VueCal },
  data: () => ({
    selectedEvent: {},
    showDialog: false,
    events: [
      {
        start: "2019-05-01 14:00",
        end: "2019-05-01 18:00",
        title: "Need to go shopping",
        icon: "shopping_cart", // Custom attribute.
        content: "Click to see my shopping list",
        contentFull:
          "My shopping list is rather long:<br><ul><li>Avocadoes</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>", // Custom attribute.
        class: "leisure"
      },
      {
        start: "2019-05-04 10:00",
        end: "2019-05-04 15:00",
        title: "Golf with John",
        icon: "golf_course", // Custom attribute.
        content: "Do I need to tell how many holes?",
        contentFull: "Okay.<br>It will be a 18 hole golf course.", // Custom attribute.
        class: "sport"
      }
    ]
  }),
  computed: {
    minDate() {
      let now = new Date();
      let date = new Date(now);
      date.setDate(now.getDate() - 15);
      return date;
    },
    maxDate() {
      let now = new Date();
      let date = new Date(now);
      date.setDate(now.getDate() + 15);
      return date;
    }
  },
  methods: {
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
    }
  }
};
</script>
