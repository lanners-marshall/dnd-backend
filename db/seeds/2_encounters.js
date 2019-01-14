
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('encounters').del()
    .then(function () {
      // Inserts seed entries
      return knex('encounters').insert([
        //darkest dungeon encounters by user bob
        {id: 'a07b3424-fb5b-98f3-8cda-63c2b9681e80', encounter_name: 'fight 1 dungeon', monsters: 'test monsters', session_id: '61c762e7-a111-6ae0-2f72-a23c1c212b87'},
        {id: '39fcad70-c1e6-f257-83da-cc1a6985fba8', encounter_name: 'fight 2 dungeon', monsters: 'test monsters', session_id: '61c762e7-a111-6ae0-2f72-a23c1c212b87'},
        //mad tower encounter by user bob
        {id: 'a96e9b29-bd2b-4339-c8e0-e3ee4b132b1c', encounter_name: 'fight 1 mad tower', monsters: 'test monsters', session_id: '69059176-333c-2b66-1ab1-78b25c46e604'},
        //dark swamp encounters by user steven
        {id: '0c1fb7a3-703e-f91f-d57e-ec60a838965a', encounter_name: 'fight 1 dark swamp', monsters: 'test monsters', session_id: '506a347c-147d-7ba9-df6e-c81cf5400ef5'},
        {id: 'f7f1e4d4-c937-b2ed-76e1-3cb71f0333d3', encounter_name: 'fight 2 dark swamp', monsters: 'test monsters', session_id: '506a347c-147d-7ba9-df6e-c81cf5400ef5'},
 
        //city of fear encounters by user jessica
        {id: 'b604d1a5-48d9-7fae-1e9b-12859d4ccaf9', encounter_name: 'fight 1 city of fear', monsters: 'test monsters', session_id: 'f2209cdd-586d-6d80-5a48-c8a88526d292'},
        {id: '72e28d29-56e1-e2f6-1f97-9f5a6cfa6781', encounter_name: 'fight 2 city of fear', monsters: 'test monsters', session_id: 'f2209cdd-586d-6d80-5a48-c8a88526d292'},
        {id: '083f816e-266a-c491-0496-bc392e133122', encounter_name: 'fight 3 city of fear', monsters: 'test monsters', session_id: 'f2209cdd-586d-6d80-5a48-c8a88526d292'}

      ]);
    });
};