let contentful = require("contentful");

let client = contentful.createClient({
  space: "hor06eo7sbnb",
  accessToken: "CFPAT-ELmkjMtHAJQb-1g5rsxlIAP9rZM85YoL9bAllG4-8gk",
});

client.getEntry("forside").then(function (entry) {
  // logs the entry metadata
  console.log(entry.sys);

  // logs the field with ID title
  console.log(entry.fields.productName);
});
