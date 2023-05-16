const resources = {
  messages: {
    error: {
      generic: (err) => {
        return `An error has occurred ${err}.`;
      },
      notFound: "Resource not found.",
      unauthorized: "Unauthorized access.",
      validation: "Validation error.",
      conflict: "Resource already exists.",
    },
    success: {
      created: "Resource created successfully.",
      updated: "Resource updated successfully.",
      deleted: "Resource deleted successfully.",
      fetched: "Here is the resource data you wanted",
    },
  },
  status: {
    success: "success",
    fail: "fail",
  },
};

module.exports = resources;
