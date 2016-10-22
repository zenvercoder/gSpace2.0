exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('comments').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('comments').insert({
                    id: 1,
                    type: 'meetups',
                    // uid: '3',
                    users_id: '3',
                    meetups_id: '1',
                    body: 'ohai',
                    likes: 4,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    id: 2,
                    type: 'meetups',
                    // uid: '3',
                    users_id: '1',
                    meetups_id: '2',
                    body: 'comment id:2, meetups id: 2, users_id: 1',
                    likes: 3,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    id: 3,
                    type: 'meetups',
                    // uid: '3',
                    users_id: '2',
                    meetups_id: '3',
                    body: 'comment id: 3, users_id: 2, meetups_id: 3',
                    likes: -4,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    id: 4,
                    type: 'meetups',
                    // uid: '3',
                    users_id: '3',
                    meetups_id: '4',
                    body: 'comment id: 4, users_id: 3, meetups_id: 4',
                    likes: 10,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    id: 5,
                    type: 'meetups',
                    // uid: '3',
                    users_id: '3',
                    meetups_id: '6',
                    body: 'comment id: 5, users_id: 3, meetups_id: 4',
                    likes: 0,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    id: 6,
                    type: 'meetups',
                    // uid: '3',
                    users_id: '4',
                    meetups_id: '5',
                    body: 'comment id: 4, users_id: 4, meetups_id: 5',
                    likes: 14,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                })
                    .then(function(){
                        return knex.raw('ALTER SEQUENCE comments_id_seq RESTART WITH 7;')
                    })
            ]);
        });
};
