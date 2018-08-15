<template>
    <div class="home">
      <v-container class="text-center">
        <v-card class="pa-3">
          <v-container>
        <h1 class="text-xs-center primary--text display-2 mb-3">Trade or View your Portfolio</h1>
        <p class="subheading text-xs-center">You may Save and Load your Data
            <br>
            Click on 'End Day' to begin a new day!
        </p>
        <v-divider class="mb-3"></v-divider>
        <h3 class="subheading text-xs-center"><strong>Your funds: {{$store.state.funds}}</strong></h3>
          </v-container>

        </v-card>

      </v-container>
    </div>
</template>

<script>
export default {
  data() {
    return {
      funds: 0
    };
  }
};
</script>

