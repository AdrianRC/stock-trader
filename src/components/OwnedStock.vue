<template>
    <v-flex xs12 sm6 md3>
        <v-card>
            <v-card-title primary-title>
                <div class="headline">{{ name }}</div>
                <v-spacer></v-spacer>
                <div>
                    <span class="mr-1">Owned: {{ ownedQuantity }}</span>
                    <span>Value: ${{ price }}</span>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-dialog v-model="dialog" persistent max-width="500px">
                    <v-btn flat slot="activator" class="primary--text">sell</v-btn>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ name }}</span>
                            <v-spacer></v-spacer>
                            <div>
                                <span class="mr-1">Owned: {{ ownedQuantity }}</span>
                                <span>Value: ${{ price }}</span>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field label="Quantity" hint="Desired Quantity of Stocks" required v-model="sellingQuantity"></v-text-field>
                                    </v-flex>
                                    <v-flex xs6>
                                        <div>Total: {{price}} x {{sellingQuantity}} = {{price * sellingQuantity}}</div>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="sellStocks()">Sell</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
export default {
  props: ["name", "ownedQuantity"],
  data() {
    return {
      dialog: false,
      sellingQuantity: 0
    };
  },
  methods: {
    sellStocks() {
      if (
        this.sellingQuantity > 0 &&
        this.sellingQuantity <= this.ownedQuantity
      ) {
        this.$store.dispatch("sellStocks", {
          name: this.name,
          quantity: this.sellingQuantity
        });
        this.dialog = false;
      }
    }
  },
  computed: {
    price() {
      const price = this.$store.state.stocks.find(
        stock => stock.name === this.name
      ).price;
      return price;
    }
  }
};
</script>