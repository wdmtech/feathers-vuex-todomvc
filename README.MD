# Feathers-vuex TodoMVC demo

I built this because there seems to be a need for examples containing actual implementation of Feathers with Vue and Feathers-vuex.

The [Models and Instances API](https://feathers-plus.github.io/v1/feathers-vuex/model-classes.html) is used to create/remove/edit todos, and there is also an example [implementation](https://github.com/wdmtech/feathers-vuex-todomvc/blob/master/client/src/mixins/TodosMixin.js) that illustrates receiving events from the server on the client   

# Get started

Clone this repo

`git clone git@github.com:wdmtech/feathers-vuex-todomvc.git`

## Server (Feathers)

`cd server`

`npm install`

`npm run start`

## Client (Vue)

`cd client`

`npm install`

`npm run serve` or `vue ui` if you have [vue-cli 3](https://cli.vuejs.org/) or later

# Still to do

[] Filter todos using reactive live queries
