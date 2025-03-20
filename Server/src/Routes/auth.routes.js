const {
  onRegister,
  onLogin,
  onForget,
  onResetPassword,
} = require("../Controllers/auth.controllers");

module.exports = (app) => {
  app.post("/register", onRegister);
  app.post("/login", onLogin);
  app.post("/forget", onForget);
  app.post("/reset", onResetPassword);
};
