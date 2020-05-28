module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/azure-notification-hub-viewer"
      : "/"
};
