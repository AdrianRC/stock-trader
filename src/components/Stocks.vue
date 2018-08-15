<template>
<div class="stocks">
    <v-container grid-list-xl fluid>
    <v-layout row wrap justify-center>
        <app-stock v-for="stock in $store.state.stocks" :key="stock.name" :name="stock.name" :price="stock.price" :prevPrice="stock.prevPrice"></app-stock>
    </v-layout>
    </v-container>
</div>
</template>

<script>
import Stock from "./Stock";
export default {
  components: {
    appStock: Stock
  }
};
</script>
