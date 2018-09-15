// Initializes the `todos` service on path `/todos`
const createService = require('feathers-nedb');
const createModel = require('../../models/todos.model');
const hooks = require('./todos.hooks');

module.exports = async function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/todos', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('todos');

  const todos = [
    { title: 'Learn vue', completed: true },
    { title: 'Learn vuex', completed: true },
    { title: 'Learn feathers', completed: true },
    { title: 'Learn feathers-vuex', completed: false },
  ];

  for (let todo of todos) {
    const found = await service.find({ query: { title: todo.title } });
    if (!found.total) {
      service.create(todo);
    }
  }

  service.hooks(hooks);
};
