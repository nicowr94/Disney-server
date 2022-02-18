db.getCollection("users").aggregate([
  {
    $lookup: {
      from: "logs",
      localField: "email",
      foreignField: "email",
      as: "logs",
    },
  },

  {
    $project: {
      name: "$name",
      email: "$email",
      lastLog: { $arrayElemAt: ["$logs", -1] },
    },
  },

  {
    $project: {
      name: "$name",
      email: "$lastLog.email",
      device: "$lastLog.device",
      createdAt: "$lastLog.createdAt",
    },
  },
]);
