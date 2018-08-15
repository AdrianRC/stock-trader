import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import firebase from "../firebase";

const getRandom = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const saveState = state => {
  console.log(state);
  return firebase
    .database()
    .ref("state")
    .set({
      stocks: state.stocks,
      ownedStocks: state.ownedStocks,
      funds: state.funds
    });
};

const loadState = () => {
  return firebase
    .database()
    .ref("/state")
    .once("value");
};

export const store = new Vuex.Store({
  state: {
    funds: 1000,
    stocks: [
      {
        name: "BMW",
        price: "75",
        prevPrice: "75"
      },
      {
        name: "Google",
        price: "114",
        prevPrice: "114"
      },
      {
        name: "Apple",
        price: "312",
        prevPrice: "312"
      },
      {
        name: "Twitter",
        price: "9",
        prevPrice: "9"
      }
    ],
    ownedStocks: []
  },
  getters: {},
  mutations: {
    buyStocks(state, payload) {
      const stock = state.ownedStocks.find(
        stock => stock.name === payload.name
      );
      if (stock) {
        stock.quantity += payload.quantity;
      } else {
        state.ownedStocks.push({
          name: payload.name,
          quantity: payload.quantity
        });
      }
      state.funds -= payload.total;
    },
    sellStocks(state, payload) {
      const stockPos = state.ownedStocks.findIndex(
        stock => stock.name === payload.name
      );
      const ownedStock = state.ownedStocks[stockPos];
      const reference = state.stocks.find(stock => stock.name === payload.name);
      ownedStock.quantity -= payload.quantity;
      if (ownedStock.quantity === 0) {
        state.ownedStocks.splice(stockPos, 1);
      }
      state.funds += reference.price * payload.quantity;
    },
    endDay(state) {
      for (const stock of state.stocks) {
        const min = stock.price * 0.8;
        const max = stock.price * 1.2;
        stock.prevPrice = stock.price;
        stock.price = getRandom(min, max);
      }
    },
    loadData(state, payload) {
      state.stocks = payload.stocks;
      state.ownedStocks = payload.ownedStocks;
      state.funds = payload.funds;
    }
  },
  actions: {
    buyStocks({ commit }, payload) {
      commit("buyStocks", payload);
    },
    sellStocks({ commit }, payload) {
      commit("sellStocks", payload);
    },
    endDay({ commit }) {
      commit("endDay");
    },
    saveData(context) {
      saveState(context.state).then(console.log("Stocks Saved"));
    },
    loadData({ commit }) {
      loadState().then(snapshot => {
        commit("loadData", snapshot.val());
      });
    }
  }
});
