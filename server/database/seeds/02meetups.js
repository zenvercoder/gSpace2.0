exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meetups').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('meetups').insert({
          id: 1,
          users_id: '6',
          title: 'BBQ',
          likes: 6,
          description: 'Bring Smores if you know whats good for you.',
          location: 'Caties place',
          start_date: '2017-01-10T13:40:23.83-05:00'
        }),
        knex('meetups').insert({
          id: 2,
          users_id: '2',
          title: 'Success isnt about being the best. Its about always getting better',
          likes: 6,
          description: 'Everyone of us is shadowed by an illusory person: a false self. We are not very good at recognizing illusions, least of all the ones we cherish about ourselves.',
          location: 'In a Galaxy Far Far Away',
          start_date: '2016-11-10T13:40:23.83-05:00'
        }),
        knex('meetups').insert({
          id: 3,
          users_id: '1',
          title: 'Unobtanium Now Obtainable',
          likes: 5,
          description: 'Since the late 1950s aerospace engineers have used the term unobtainium when referring to unusual or costly materials. In this meetup, we will talk about where to obtain unobtanium',
          location: 'Pandora',
          start_date: '2016-12-10T13:40:23.83-05:00'
        }),
        knex('meetups').insert({
          id: 4,
          users_id: '3',
          title: 'Ten step to overcoming fear',
          likes: 7,
          description: 'But nobody ever mentions the twelfth ingredient: Fear, Some people think Chuck Norris is a myth. However, some people are really myths Chuck Norris is my Homeboy.  ',
          location: 'D Qar',
          start_date: '2016-12-09T13:40:23.83-05:00'
        }),
        knex('meetups').insert({
          id: 5,
          users_id: '4',
          title: 'Duck Face is so hawt right now',
          likes: 0,
          description: 'We will talk about how to make better duck faces',
          location: 'Florence, Italy',
          start_date: '2017-01-11T13:40:23.83-05:00'
        }),
        knex('meetups').insert({
          id: 6,
          users_id: '5',
          title: 'Nope, nope, nope',
          likes: 5,
          description: 'At this meetup, we will count all the nopes',
          location: 'Nopetown',
          start_date: '2016-11-30T13:40:23.83-05:00'
        })
      ])
          .then(function(){
            return knex.raw('ALTER SEQUENCE meetups_id_seq RESTART WITH 10;')
          })
    });
};
