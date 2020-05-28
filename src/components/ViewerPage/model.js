import request from "../../modules/request";
import LoginDialog from "../LoginDialog";

export default {
  name: "viewer-page",
  components: {
    LoginDialog
  },
  data() {
    return {
      showLoginDialog: true,
      registrations: [],
      search: "",
      showSnackbar: "",
      message: ""
    };
  },
  computed: {
    searchedRegistrations() {
      if (this.search.length) {
        const keywords = this.search.split(" ").filter(keyword => !!keyword);
        return this.registrations.filter(registration =>
          keywords.every(
            keyword =>
              registration.id === keyword ||
              registration.tags.some(tag => tag === keyword)
          )
        );
      }
      return this.registrations;
    }
  },
  methods: {
    async init() {
      this.registrations = await request.getRegistrations();
    },
    copyTag(tag) {
      navigator.clipboard.writeText(tag).then(() => {
        this.showSnackbar = true;
        this.message = "Tag copied.";
      });
    }
  }
};
