const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
// Function sqlForPartialUpdate accepts two parameters, firstly the data you want to update and secondly the SQL query you want to perform.
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // The data we want to update is sent in the form of an object, because we're working with JSON.
  // Our const, keys, contains the keys to the key-value-pairs we sent. Object.keys returns an array.
  const keys = Object.keys(dataToUpdate);
  // If there are no keys to our object we will return an error stating as such.
  if (keys.length === 0) throw new BadRequestError("No data");

  // Example: {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  // Next we'll use the map method to create a new array populated with the results of a function we'll perform on it.
  // Here we're performing our SQL query. So we pass in the query (jsToSql) and we perform it on the colName (column name), so we're passing a query that expects a column name, and we're assigning it a new value determined by its index.
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );
  // Returns the values as a new object.
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
