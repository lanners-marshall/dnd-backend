
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'bob', 'email': 'bob@yahoo.com', 'password': '12345'},
        {id: 2, username: 'steven', 'email': 'steven@yahoo.com', 'password': '12345'},
        {id: 3, username: 'jessica', 'email': 'jessica@yahoo.com', 'password': '12345'}
      ]);
    });
};
