import feathersVuex from "feathers-vuex";
import feathersClient from "@/feathers";

const { service } = feathersVuex(feathersClient, { idField: "_id" });
const servicePath = "users";

const servicePlugin = service(servicePath, {
  instanceDefaults: {
    email: "",
    firstName: "",
    lastName: "",
    get displayName() {
      return `${this.firstName} ${this.lastName}`;
    }
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

console.log("users service loaded");
