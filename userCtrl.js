let userData = require("./userData.json");

module.exports = {
  getUsers: (req, res) => {
    const { age, email, favorites } = req.query;

    let newUserData = userData.filter(user => {
      let keep = true;

      if (favorites && keep) {
        keep = user.favorites.includes(favorites);
      }
      if (age && keep) {
        keep = user.age < age;
      }
      if (email && keep) {
        keep = user.email === email;
      }

      return keep;
    });

    res.send(newUserData).status(200);
  },
  getUserById: (req, res) => {
    const { id } = req.params;

    let user = userData.filter(user => user.id === parseInt(id));
    user = user[0];

    user ? res.send(user).status(200) : res.sendStatus(404);
  },
  getAdmins: (req, res) => {
    res.send(userData.filter(user => user.type === "admin")).status(200);
  },
  getNonAdmins: (req, res) => {
    res.send(userData.filter(user => user.type !== "admin")).status(200);
  },
  getByType: (req, res) => {
    const { type } = req.params;
    res.send(userData.filter(user => user.type === type)).status(200);
  },
  removeUser: (req, res) => {
    const { id } = req.params;

    userData = userData.filter(user => user.id !== parseInt(id));

    res.send(userData).status(200);
  },
  updateUser: (req, res) => {
    const { id } = req.params;

    userData = userData.map(user => {
      if (user.id !== parseInt(id)) {
        return user;
      } else {
        return { ...req.body, id: parseInt(id) };
      }
    });

    res.send(userData).status(200);
  },
  createUser: (req, res) => {
    userData = [
      ...userData,
      { ...req.body, id: userData[userData.length - 1].id + 1 }
    ];

    res.send(userData).status(200);
  }
};
