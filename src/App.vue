<template>
  <v-app>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
      disable-route-watcher
    >
      <v-list dense>
        <v-list-tile v-for="link in navigation" :key="link.name" @click.stop="endDay(link.name)" :to="link.route">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ link.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="save('Save')">
          <v-list-tile-action>
            <v-icon>save</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Save</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>file_download</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="save('Load')">
            <v-list-tile-title>Load</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/" tag="span" style="cursor: pointer">
        <v-toolbar-title>Stock Trader</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items v-for="link in navigation" :key="link.name" class="hidden-sm-and-down">
          <v-btn flat :to="link.route" @click="endDay(link.name)">{{ link.name }}</v-btn>
      </v-toolbar-items>
      <v-menu open-on-hover class="hidden-sm-and-down">
          <v-btn flat slot="activator">
            <span>Save &amp; Load</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile v-for="item in items" :key="item" @click="save(item)">
              <v-list-tile-title v-text="item"></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      <v-toolbar-items>
        <v-btn flat>Funds: ${{ $store.state.funds }}</v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <v-content>
      <v-container fluid>
        <transition name="slide" type="animation" mode="out-in">
        <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    funds: 0,
    navigation: [
      { name: "Portfolio", route: "/portfolio", icon: "book" },
      { name: "Stocks", route: "/stocks", icon: "show_chart" },
      { name: "End Day", route: "", icon: "weekend" }
    ],
    items: ["Save", "Load"]
  }),
  props: {
    source: String
  },
  methods: {
    endDay(name) {
      if (name === "End Day") {
        this.$store.dispatch("endDay");
      }
      this.drawer = false;
    },
    save(name) {
      if (name === "Save") {
        this.$store.dispatch("saveData");
      } else if (name === "Load") {
        this.$store.dispatch("loadData");
      }
      this.drawer = false;
    }
  }
};
</script>

<style scoped>
.slide-enter {
}

.slide-enter-active {
  animation: slide-in 0.25s;
}

.slide-leave {
}

.slide-leave-active {
  animation: slide-out 0.25s;
}

@keyframes slide-in {
  from {
    transform: translatex(-100px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(100px);
  }
}
</style>
