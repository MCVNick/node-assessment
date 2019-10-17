const express = require("express");
const { json } = require("express");

const userCtrl = require("./userCtrl");

const app = express();
app.use(json());

const PORT = 3000;
app.listen(PORT, console.log("listening on port", PORT));

app.get("/api/user", userCtrl.getUsers);
app.get("/api/user/:id", userCtrl.getUserById);
app.get("/api/admin", userCtrl.getAdmins);
app.get("/api/nonadmin", userCtrl.getNonAdmins);
app.get("/api/type/:type", userCtrl.getByType);
app.delete("/api/user/:id", userCtrl.removeUser);
app.put("/api/user/:id", userCtrl.updateUser);
app.post("/api/user", userCtrl.createUser);
