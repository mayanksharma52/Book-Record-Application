const express = require("express");

const { users } = require("../data/users.json");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    data: users,
  });
});

/**
 * Routes Created /users
 * method: Post
 * description: Create a new user
 * response: json
 * Access: public
 * Parameters: none
 */
router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => parseInt(each.id) === parseInt(id));

  if (user) {
    return res.status(400).json({
      status: false,
      message: "User already exists",
    });
  }

  const newUser = {
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  };

  users.push(newUser);

  return res.status(201).json({
    status: true,
    message: "User created successfully",
    data: users,
  });
});

/**
 * Routes Created /users/(id)
 * method: Get
 * description: get singke users
 * response: json
 * Access: public
 * Parameters: Id
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => parseInt(user.id) === parseInt(id));
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "user not found",
    });
  }
  return res.status(200).json({
    status: true,
    data: user,
  });
});

/**
 * Routes Created /users/(id)
 * method: PUT
 * description: Update a user
 * response: json
 * Access: public
 * Parameters: Id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => parseInt(each.id) === parseInt(id));
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "user not found",
    });
  } else {
    const updatedUser = users.map((each) => {
      if (parseInt(each.id) === parseInt(id)) {
        return { ...each, ...data };
      }
      return each;
    });
    return res.status(201).json({
      status: true,
      message: "user updated successfully",
      data: updatedUser,
    });
  }
});
/**
 * Routes Created /users/(id)
 * method: DELETE
 * description: Delete a user
 * response: json
 * Access: public
 * Parameters: Id
 */

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((each) => parseInt(each.id) === parseInt(id));
  if (index === -1) {
    return res.status(404).json({
      status: false,
      message: "user not found",
    });
  }
  const deleted = users.splice(index, 1);
  return res.status(201).json({
    status: true,
    message: "user deleted successfully",
    deleteddata: deleted,
    remainingData: users,
  });
});

/**
 * Routes Created /subscription-detail/{id}
 * method: GET
 * description: Get a subscription detail with id
 * response: json
 * Access: public
 * Parameters: Id
 */

router.get("/subscription-detail/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => parseInt(user.id) === parseInt(id));
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "user not found",
    });
  }
  const getdateinDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };
  const subscriptionType = (date) => {
    if (user.subscriptionDate === "Basic") {
      date = date + 30;
    } else if (user.subscriptionDate === "Standard") {
      date = date + 60;
    } else if (user.subscriptionDate === "Premium") {
      date = date + 90;
    }
    return date;
  };
  let returnDate = getdateinDays(user.returnDate);
  let subscriptionDate = getdateinDays(user.subscriptionDate);
  let currentDate = getdateinDays();
  let subscriptionExpired = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpired <= currentDate,
    daysLeftForExpiration:
      subscriptionExpired <= currentDate
        ? 0
        : subscriptionExpired - currentDate,
    fine:
      returnDate <= currentDate
        ? subscriptionExpired <= currentDate
          ? 100
          : 50
        : 0,
  };
  return res.status(200).json({
    status: true,
    data: data,
  });
});

module.exports = router;
