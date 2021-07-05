
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {ResourceName: 'a laptop'},
        {ResourceName: 'a person'},
        {ResourceName: 'a tool',Description:"for when the pizza party doesn't work"},
        {ResourceName: 'a meeting room'},
        {ResourceName: 'a software license'},
        {ResourceName: 'a pizza party',Description:"for when workers are threatening to form a union"}
      ]);
    });
};
