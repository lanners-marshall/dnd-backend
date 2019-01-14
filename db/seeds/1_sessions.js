
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sessions').del()
    .then(function () {
      // Inserts seed entries
      return knex('sessions').insert([
        //bob's sessions
        {id: '61c762e7-a111-6ae0-2f72-a23c1c212b87', session_name: 'darkest dungeon', user_id: 'a843be94-0313-8f6b-e9cb-e82aa1b126d7'},
        {id: '69059176-333c-2b66-1ab1-78b25c46e604', session_name: 'mad tower', user_id: 'a843be94-0313-8f6b-e9cb-e82aa1b126d7'},
        {id: '61ab82bd-07e3-2750-d9f8-13fc2ef59e34', session_name: 'crazy tower', user_id: 'a843be94-0313-8f6b-e9cb-e82aa1b126d7'},
        //steven's sessions
        {id: '506a347c-147d-7ba9-df6e-c81cf5400ef5', session_name: 'dark swamp', user_id: 'ca082b87-5bea-1f75-6cd5-35aaf908ef14'},
        {id: '5789aba5-cefa-ef24-88f4-69050cc1e05c', session_name: 'desert of fear', user_id: 'ca082b87-5bea-1f75-6cd5-35aaf908ef14'},
        {id: '0e0a4e96-fd43-1df2-95c5-df21d0fd3600', session_name: 'wild ocean', user_id: 'ca082b87-5bea-1f75-6cd5-35aaf908ef14'},
        //jessica's sessions
        {id: '15186fa7-0412-ac03-b7a6-992311e78cc9', session_name: 'wild forest', user_id: 'f2209cdd-586d-6d80-5a48-c8a88526d292'},
        {id: '19366053-ebfd-6819-40a7-422832131245', session_name: 'city of fear', user_id: 'f2209cdd-586d-6d80-5a48-c8a88526d292'}
      ]);
    });
};