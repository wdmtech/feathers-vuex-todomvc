import feathersVuex from "feathers-vuex";
import feathersClient from "@/feathers";

const { service } = feathersVuex(feathersClient, { idField: "_id" });
const servicePath = "todos";

const servicePlugin = service(servicePath, {
  instanceDefaults: {
    _id: null,
    title: "",
    completed: null
  }
});

feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
});

export default servicePlugin;

console.log("todos service loaded");
