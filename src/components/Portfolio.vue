<template>
<div class="stocks">
    <v-container grid-list-xl fluid>
    <v-layout row wrap justify-center>
        <app-owned-stock v-for="stock in $store.state.ownedStocks" :key="stock.name" :name="stock.name" :ownedQuantity="stock.quantity"></app-owned-stock>
    </v-layout>
    </v-container>
</div>
</template>

<script>
import OwnedStock from "./OwnedStock";
export default {
  components: {
    appOwnedStock: OwnedStock
  }
};
</script>
