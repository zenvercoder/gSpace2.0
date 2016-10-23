exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('comments').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('comments').insert({
                    users_id: '3',
                    meetups_id: '1',
                    body: 'Test comment 1',
                    likes: 4,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    users_id: '3',
                    meetups_id: '1',
                    body: 'Test comment 2',
                    likes: 4,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    users_id: '3',
                    meetups_id: '1',
                    body: 'Test comment  3',
                    likes: 4,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    users_id: '3',
                    meetups_id: '1',
                    body: 'Test comment 4',
                    likes: 4,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    users_id: '1',
                    meetups_id: '2',
                    body: 'Test comment 5',
                    likes: 3,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    users_id: '2',
                    meetups_id: '3',
                    body: 'Test comment  6',
                    likes: -4,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    users_id: '3',
                    meetups_id: '4',
                    body: 'Test comment 7',
                    likes: 10,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    users_id: '3',
                    meetups_id: '5',
                    body: 'Test comment 8',
                    likes: 0,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                }),
                knex('comments').insert({
                    users_id: '4',
                    meetups_id: '5',
                    body: 'Test comment 9',
                    likes: 14,
                    created_on: '2006-04-10T13:40:23.83-05:00',
                    updated_on: '2006-04-10T13:42:23.83-05:00'
                })
            ]);
        });
};
