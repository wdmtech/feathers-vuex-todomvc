<template>
  <div class="todos">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo"
               autofocus autocomplete="off"
               placeholder="What needs to be done?"
               v-model="newTodo"
               @keyup.enter="addTodo">
      </header>
      <section class="main" v-show="todos.length" v-cloak>
        <input class="toggle-all" type="checkbox" v-model="allDone">
        <ul class="todo-list">
          <li v-for="todo in filteredTodos"
              class="todo"
              :key="todo.id"
              :class="{ completed: todo.completed, editing: todo == editedTodo }">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed">
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input class="edit" type="text"
                   v-model="todo.title"
                   v-todo-focus="todo == editedTodo"
                   @blur="doneEdit(todo)"
                   @keyup.enter="doneEdit(todo)"
                   @keyup.esc="cancelEdit(todo)">
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length" v-cloak>
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
    </span>
        <ul class="filters">
          <li><a href="#/all" :class="{ selected: visibility == 'all' }">All</a></li>
          <li><a href="#/active" :class="{ selected: visibility == 'active' }">Active</a></li>
          <li><a href="#/completed" :class="{ selected: visibility == 'completed' }">Completed</a></li>
        </ul>
        <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
          Clear completed
        </button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Written by <a href="http://evanyou.me" target="_blank">Evan You</a></p>
      <p>Part of <a href="http://todomvc.com" target="_blank">TodoMVC</a></p>
      <p>Built with
        <a href="https://vuejs.org" target="_blank">vue</a> and
        <a href="https://feathers-plus.github.io/v1/feathers-vuex" target="_blank">feathers-vuex</a> and
        <a href="https://feathersjs.com" target="_blank">feathers</a>
      </p>
      <p>Source <a href="https://github.com/wdmtech/feathers-vuex-todomvc" target="_blank">View on GitHub</a></p>
    </footer>
  </div>
</template>

<script>
import TodosMixin from "@/mixins/TodosMixin";

// visibility filters
let filters = {
  all(todos) {
    return todos;
  },
  active(todos) {
    return todos.filter(function(todo) {
      return !todo.completed;
    });
  },
  completed(todos) {
    return todos.filter(function(todo) {
      return todo.completed;
    });
  }
};

export default {
  name: "Todos",
  mixins: [TodosMixin],
  mounted() {
    // handle routing
    const onHashChange = () => {
      let visibility = window.location.hash.replace(/#\/?/, "");
      if (filters[visibility]) {
        this.visibility = visibility;
      } else {
        window.location.hash = "";
        this.visibility = "all";
      }
    };

    window.addEventListener("hashchange", onHashChange);
    onHashChange();
  },
  data() {
    return {
      newTodo: "",
      editedTodo: null,
      visibility: "all"
    };
  },
  computed: {
    todos() {
      return this.listTodos;
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return filters.active(this.todos).length;
    },
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.todos.forEach(function(todo) {
          todo.completed = value;
        });
      }
    }
  },
  filters: {
    pluralize(n) {
      return n === 1 ? "item" : "items";
    }
  },
  directives: {
    "todo-focus"(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  },
  methods: {
    addTodo() {
      let value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }

      const { Todo } = this.$FeathersVuex;
      let todo = new Todo({ title: value, completed: false });
      todo.save({});

      this.newTodo = "";
    },
    removeTodo(todo) {
      todo.remove({});
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();

      todo.save({});

      if (!todo.title) {
        this.removeTodo(todo);
      }
    },
    cancelEdit(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },
    removeCompleted() {
      this.todos
        .filter(todo => todo.completed)
        .forEach(todo => todo.remove({}));
    }
  }
};
</script>

<style>
@import url(https://unpkg.com/todomvc-app-css@2.0.6/index.css);
</style>
