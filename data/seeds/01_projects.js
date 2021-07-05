
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {ProjectName: 'Create an Database',Description:"Develop a database for the api"},
        {ProjectName: 'Create the API',Description:"Develop an api for the database"},
        {ProjectName: 'Get Rich',Description:"big money very good"}
      ]);
    });
};
