var projectConfig = {
  url: {
    data: "https://data." + process.env.REACT_APP_CLUSTER_NAME + ".hasura-app.io/v1/query",
    auth: "https://auth." + process.env.REACT_APP_CLUSTER_NAME + ".hasura-app.io/v1",
    filestore: "https://filestore." + process.env.REACT_APP_CLUSTER_NAME + ".hasura-app.io/v1/file",
    logout: "https://t47d."+ process.env.REACT_APP_CLUSTER_NAME + ".hasura-app.io/dlogout"
  }
}

const saveOffline = (authToken) => {
  window.localStorage.setItem('authToken', authToken);
}

const getSavedToken = () => {
  return window.localStorage.getItem('authToken');
}

module.exports = {
  projectConfig,
  saveOffline,
  getSavedToken
};
//https://t47d.anthology78.hasura-app.io/dlogin'