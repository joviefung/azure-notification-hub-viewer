import request from "../../modules/request";

export default {
  name: "login-dialog",
  props: {
    value: Boolean
  },
  data() {
    return {
      notificationHubName: "",
      connectionString: ""
    };
  },
  computed: {
    valid() {
      return this.notificationHubName.length && this.connectionString.length;
    }
  },
  methods: {
    ok() {
      request.init(this.notificationHubName, this.connectionString);
      this.$emit("ready", false);
      this.$emit("input", false);
    }
  }
};
