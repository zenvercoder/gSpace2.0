exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('meetups_comments').del()
        .then(function() {
            return Promise.all([
                // Inserts seed entries
                knex('meetups_comments').insert({
                    id: 1,
                    comments_id: '1',
                    comment: 'ones and zeros',
                    likes: 14,
                    created_on:'2016-11-30T13:40:23.83-05:00',
                    updated_on:'2016-11-30T13:40:23.83-05:00'
                }),
                knex('meetups_comments').insert({
                    id: 2,
                    comments_id: '1',
                    comment: 'javascript is an interpreted language',
                    likes: 2,
                    created_on:'2016-11-30T13:40:23.83-05:00',
                    updated_on:'2016-11-30T13:40:23.83-05:00'
                }),
                knex('meetups_comments').insert({
                    id: 3,
                    comments_id: '1',
                    comment: 'javascript is so hawt rt now',
                    likes: 3,
                    created_on:'2016-11-30T13:40:23.83-05:00',
                    updated_on:'2016-11-30T13:40:23.83-05:00'
                }),
                knex('meetups_comments').insert({
                    id: 4,
                    comments_id: '1',
                    comment: 'google is 18 years old',
                    likes: 16,
                    created_on:'2016-11-30T13:40:23.83-05:00',
                    updated_on:'2016-11-30T13:40:23.83-05:00'
                }),
                knex('meetups_comments').insert({
                    id: 5,
                    comments_id: '1',
                    comment: 'let me fyr',
                    likes: 100000,
                    created_on:'2016-11-30T13:40:23.83-05:00',
                    updated_on:'2016-11-30T13:40:23.83-05:00'
                }),
                knex('meetups_comments').insert({
                    id: 6,
                    comments_id: '1',
                    comment: 'ohai',
                    likes: 12,
                    created_on:'2016-11-30T13:40:23.83-05:00',
                    updated_on:'2016-11-30T13:40:23.83-05:00'
                }),
                knex.raw('ALTER SEQUENCE meetups_id_seq RESTART WITH 7;')

            ]);
        });
};
