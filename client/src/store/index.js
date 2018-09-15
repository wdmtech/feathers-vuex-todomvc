import Vue from "vue";
import Vuex from "vuex";
import feathersVuex from "feathers-vuex";
import feathersClient from "@/feathers";

const {
  // service,
  // auth,
  FeathersVuex
} = feathersVuex(feathersClient, {
  idField: "_id"
});

Vue.use(FeathersVuex);
Vue.use(Vuex);

const requireModule = require.context(
  // The relative path holding the service modules
  "./services",
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports)
  /.js$/
);
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default);

export default new Vuex.Store({
  plugins: [
    // Use the spread operator to register all of the imported plugins
    ...servicePlugins
    // auth({ userService: 'users' }), // Populates user object on successful auth
    // service('another-service'),
  ]
});
