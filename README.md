# Instructions


```console
yarn re
```

on terminal will run 

```console
knex migrate:rollback && knex migrate:latest && knex seed:run
```

to get you all set up

**Crud for users**

CREATE
post /users/register

this will create a new user for the database
and will return a Jason Web Token to be used for authentication

CREATE
post /users/login

this will log in the user and provide a Jason Web Token to be used for authentication


READ
get /users/:id

this will get the users info along with their created sessions and session ids

example response:

```javascript
{
    "sessions": [
        {
            "session_name": "darkest dungeon",
            "session_id": 1
        },
        {
            "session_name": "mad tower",
            "session_id": 2
        },
        {
            "session_name": "crazy tower",
            "session_id": 3
        }
    ],
    "by_user": "bob",
    "email": "bob@yahoo.com"
}
```

UPDATE
put /users/:id

this will update the users name and or email

DELETE
delete /users/:id

this will delete the user, the users's sessions, and the users's sessions's encounters

**Crud for sessions**

CREATE
post /sessions

this will create a new session for the database, the users id will passed in in the request body to be assigned to the session for knowing who the session belongs to

READ
get /sessions/:id

this will get us the session info along with all the encounters for the session

example response:

```javascript
{
    "session_encounters": [
        {
            "encounter_name": "fight 1 dungeon",
            "monsters": "test monsters",
            "session_id": 1
        },
        {
            "encounter_name": "fight 2 dungeon",
            "monsters": "test monsters",
            "session_id": 1
        }
    ]
}
```

UPDATE
put /sessions/:id

this will update the sessions name and

DELETE
delete /sessions/:id

this will delete the session and all encounters for the session

**Crud for encounters**

CREATE
post /encounters

this create a new encounter for the session includes encounter_name, monsters.
Mosters will have to be sent in as a string with JSON.stringify() then later turned into an object with JSON.parse() to be displayed in the view


READ
get /encounters/:id

example response:

```javascript
[
    {
        "id": 8,
        "encounter_name": "fight 3 city of fear",
        "session_id": 8,
        "monsters": '[{name: "big monster", xp: 2000 }, {name: "small monster", xp: '200'}]'
    }
]
```

UPDATE
put /encounters/:id

this can currently update the encounter name. Future possibility to update the monster file

DELETE
delete /encounters/:id

this will remove the current encounter

