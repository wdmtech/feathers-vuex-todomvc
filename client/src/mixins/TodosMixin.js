import { mapState, mapGetters, mapActions } from "vuex";
import feathersClient from "@/feathers";

export default {
  computed: {
    ...mapState("todos", {
      areTodosLoading: "isFindPending",
      todosPagination: "pagination"
    }),
    ...mapGetters("todos", {
      findTodosInStore: "find",
      listTodos: "list"
    })
  },
  methods: {
    ...mapActions("todos", {
      findTodos: "find"
    })
  },
  async created() {
    console.log("TodosMixin was loaded");

    feathersClient.service("todos").on("created", data => {
      console.log(`Todo created - ${data.title}`);
    });

    try {
      await this.findTodos({});
      console.log("found todos");
    } catch (e) {
      console.error(e);
    }
  }
};
