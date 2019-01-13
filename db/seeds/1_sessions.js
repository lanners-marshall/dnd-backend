
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sessions').del()
    .then(function () {
      // Inserts seed entries
      return knex('sessions').insert([
        //bob's sessions
        {id: 1, session_name: 'darkest dungeon', user_id: 1},
        {id: 2, session_name: 'mad tower', user_id: 1},
        {id: 3, session_name: 'crazy tower', user_id: 1},
        //steven's sessions
        {id: 4, session_name: 'dark swamp', user_id: 2},
        {id: 5, session_name: 'desert of fear', user_id: 2},
        {id: 6, session_name: 'wild ocean', user_id: 2},
        //jessica's sessions
        {id: 7, session_name: 'wild forest', user_id: 3},
        {id: 8, session_name: 'city of fear', user_id: 3}
      ]);
    });
};