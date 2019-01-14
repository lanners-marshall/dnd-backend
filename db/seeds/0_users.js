
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 'a843be94-0313-8f6b-e9cb-e82aa1b126d7', username: 'bob', 'email': 'bob@yahoo.com', 'password': '12345'},
        {id: 'ca082b87-5bea-1f75-6cd5-35aaf908ef14', username: 'steven', 'email': 'steven@yahoo.com', 'password': '12345'},
        {id: 'f2209cdd-586d-6d80-5a48-c8a88526d292', username: 'jessica', 'email': 'jessica@yahoo.com', 'password': '12345'}
      ]);
    });
};
