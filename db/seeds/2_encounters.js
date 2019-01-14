exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('encounters').del()
    .then(function () {
      // Inserts seed entries
      return knex('encounters').insert([
        //darkest dungeon encounters by user bob
        {id: 1, encounter_name: 'fight 1 dungeon', monsters: 'test monsters', session_id: 1},
        {id: 2, encounter_name: 'fight 2 dungeon', monsters: 'test monsters', session_id: 1},
        //mad tower encounter by user bob
        {id: 3, encounter_name: 'fight 1 mad tower', monsters: 'test monsters', session_id: 2},
        //dark swamp encounters by user steven
        {id: 4, encounter_name: 'fight 1 dark swamp', monsters: 'test monsters', session_id: 4},
        {id: 5, encounter_name: 'fight 2 dark swamp', monsters: 'test monsters', session_id: 4},
 
        //city of fear encounters by user jessica
        {id: 6, encounter_name: 'fight 1 city of fear', monsters: 'test monsters', session_id: 8},
        {id: 7, encounter_name: 'fight 2 city of fear', monsters: 'test monsters', session_id: 8},
        {id: 8, encounter_name: 'fight 3 city of fear', monsters: 'test monsters', session_id: 8}

      ]);
    });
};