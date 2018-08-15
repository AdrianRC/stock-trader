<template>
    <v-flex xs12 sm6 md3>
        <v-card>
            <v-card-title primary-title>
                <div class="headline">{{ name }}</div>
                <v-spacer></v-spacer>
                <v-icon :class="color">{{ icon }}</v-icon>
                <div :class="color" class="mr-1">{{ priceDifference }}</div>
                <div>${{ price }}</div>
            </v-card-title>
            <v-card-actions>
                <v-dialog v-model="dialog" persistent max-width="500px">
                    <v-btn flat slot="activator" class="primary--text">Buy</v-btn>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ name }}</span>
                            <v-spacer></v-spacer>
                            <v-icon :class="color">{{ icon }}</v-icon>
                            <div :class="color" class="mr-1">{{ priceDifference }}</div>
                            <div>{{ price }}</div>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field label="Quantity" hint="Desired Quantity of Stocks" required v-model="quantity"></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <div>Total: {{price}} x {{quantity}} = {{price * quantity}}</div>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="buyStocks()">Buy</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      quantity: 0
    };
  },
  props: ["price", "name", "prevPrice"],
  methods: {
    buyStocks() {
      if (
        this.quantity > 0 &&
        this.$store.state.funds > this.price * this.quantity
      ) {
        this.$store.dispatch("buyStocks", {
          name: this.name,
          quantity: Number.parseInt(this.quantity),
          total: this.price * this.quantity
        });
      }
      this.dialog = false;
    }
  },
  computed: {
    color() {
      if (this.price > this.prevPrice) {
        return "green--text";
      } else if (this.price < this.prevPrice) {
        return "red--text";
      } else {
        return "gray--text";
      }
    },
    icon() {
      if (this.color === "green--text") {
        return "arrow_drop_up";
      } else if (this.color === "red--text") {
        return "arrow_drop_down";
      } else {
        return "";
      }
    },
    priceDifference() {
      if (this.price === this.prevPrice) {
        return "";
      }
      return this.price - this.prevPrice;
    }
  }
};
</script>