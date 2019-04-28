<!-- <template>
  <div class="itinerary-items-edit">
    <div>
      <h4>Edit</h4>
      Title:
      <input type="text" v-model="recipe.title" />
      Chef:
      <input type="text" v-model="recipe.chef" />
      Prep time:
      <input type="text" v-model="recipe.prep_time" />
      Ingredients:
      <input type="text" v-model="recipe.ingredients" />
      Directions:
      <input type="text" v-model="recipe.directions" />
      Image url:
      <input type="text" v-model="recipe.image_url" />
      <button v-on:click="updateRecipe(recipe)">Update recipe</button>
      <router-link to="/">Cancel</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      recipe: {}
    };
  },
  created: function() {
    axios.get("/api/recipes/" + this.$route.params.id).then(response => {
      this.recipe = response.data;
    });
  },
  methods: {
    updateRecipe: function(recipe) {
      var params = {
        body_title: recipe.title,
        body_chef: recipe.chef,
        body_ingredients: recipe.ingredients,
        body_directions: recipe.directions
      };
      axios.patch("/api/recipes/" + recipe.id, params).then(response => {
        console.log("Successfully updated", response.data);
        recipe = response.data;
        this.$router.push("/");
      });
    }
  }
};
</script>
 -->
