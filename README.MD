![logo.png](logo.png)

# Feathers-vuex TodoMVC demo

This project takes the existing [Vue]([Vue](https://vuejs.org)) [TodoMVC demo](https://vuejs.org/v2/examples/todomvc.html) and adds [Feathers](https://featherjs.com), and [Feathers-vuex](https://feathers-plus.github.io/v1/feathers-vuex) awesomeness!

I built this because there seemed to be a need for examples containing actual implementation of Feathers with Vue and Feathers-vuex.

The [Models and Instances API](https://feathers-plus.github.io/v1/feathers-vuex/model-classes.html) is used to create/remove/edit todos, and there is also an example [implementation](https://github.com/wdmtech/feathers-vuex-todomvc/blob/master/client/src/mixins/TodosMixin.js) that illustrates receiving events from the server on the client.  

# How to get started

First, clone this repo

`git clone git@github.com:wdmtech/feathers-vuex-todomvc.git`

## Server (Feathers)

`cd server`

`npm install`

`npm run start`

## Client (Vue)

`cd client`

`npm install`

`npm run serve` or `vue ui` if you have [vue-cli 3](https://cli.vuejs.org/) or later.

Navigate to the url displayed (default `localhost:8080`) to view in your browser.

# Still to do - contributions welcome!

- [ ] Filter todos using reactive live queries
