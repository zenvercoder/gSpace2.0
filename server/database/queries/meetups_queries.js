var knex = require('./knex');
var moment = require('moment');

function Meetups() {
    // accessing the meetups table in gspace database
    return knex('meetups');
}

function Meetups_Tags() {
    return knex('meetups_tags')
}

function Comments() {
    return knex('comments')
}

function Tags() {
    return knex('tags')
}

function getMeetup(id) {
    return Meetups().where('meetups.id', id).first()
        .join('users', 'meetups.users_id', '=', 'users.id')
        .select(
            'meetups.id',
            'meetups.title',
            'meetups.likes',
            'meetups.description',
            'meetups.location',
            'meetups.start_date',
            'meetups.created_on',
            'meetups.users_id',
            'users.username',
            'users.avatar_url'
        );
}

function getMeetups() {
    return Meetups()
        .join('users', 'meetups.users_id', '=', 'users.id')
        .leftOuterJoin('comments', 'meetups.id', 'comments.meetups_id')
        .join('users as comments_user', 'comments.users_id', '=', 'comments_user.id')
        .select(
            // table.column
            'meetups.id',
            'meetups.title',
            'meetups.likes',
            'meetups.description',
            'meetups.location',
            'meetups.start_date',
            'meetups.created_on',
            'meetups.users_id',
            'users.username',
            'users.avatar_url',
            // "as" creates an alias, so we can say meetups.comments_id
            // instead of meetups.comments.id which would break things
            // meetups.comments.id would just turn into id
            'comments.id as comments_id',
            'comments.body as comments_body',
            'comments.likes as comments_likes',
            'comments.created_on as comments_created_on',
            'comments.updated_on as comments_updated_on',
            'comments_user.username as comments_username',
            'comments_user.avatar_url as comments_avatar_url'
        )
        .then(function (meetups) {
            // initialize empty object for storing unique meetups
            var mappedMeetups = {};
            // meetups = result set
            // forEach = an ES6 built in array function
            meetups.forEach(function (meetup) {
                // if we have seen this meetup using the id as the key
                if (mappedMeetups.hasOwnProperty(meetup.id)) {
                    // extract the comments, add them to existing mappedMeetups.comments[]
                    // not adding the meetup, just the comment
                    // the comments array belongs to a meetup
                    mappedMeetups[meetup.id].comments.push(extractCommentFromMeetup(meetup));
                } else {
                    // we haven't seen this meetup yet, start a new comments array for THIS meetup
                    meetup.comments = [];
                    // used the extractComment function below to grab a comment from the meetup
                    var comment = extractCommentFromMeetup(meetup);
                    if(comment)
                        meetup.comments.push(comment);
                    // remove the source data from meetup to clean it up and reduce network traffic
                    delete meetup.comments_id;
                    delete meetup.comments_body;
                    delete meetup.comments_likes;
                    delete meetup.comments_created_on;
                    delete meetup.comments_updated_on;
                    delete meetup.comments_username;
                    delete meetup.comments_avatar_url;

                    mappedMeetups[meetup.id] = meetup;
                }
            });
            // es6 syntax
            // use the object created above (mappedMeetups)
            // .map() creates a new array (meetupsArray) with the results of
            // calling (key => mappedMeetups[key]) on every element in this array.
            // mappedMeetups is a map with key/value pairs. id = key and meetups = value
            // (key => mappedMeetups[key]) is ES6 syntax

            // function(key){
                // mappedMeetups is a map with key/value pairs. id = key and meetups = value
                // return mappedMeetups[key];
            // }

            // Object.keys(mappedMeetups) gives us an array of meetup keys (id's)
            // we are trying to get rid of extra shit because w/o this
            // for every meetup with six comments, we would have six versions of that meetup.

            var meetupsArray = Object.keys(mappedMeetups).map(key => mappedMeetups[key]);
            // can also say basically the same thing with :
            // var meetupsArray = Object.values(mappedMeetups);

            // for ng-repeat="meetup in meetups" used by index to display all the meetups
            return meetupsArray;
        });
}

var extractCommentFromMeetup = function extractCommentFromMeetup(meetup) {
    // if there is no comment in the data, break out of this function
    if(!meetup.comments_id)
        return;
    // initialize a comment object
    var comment = {};
    // we already accessed the database, did some joins and a select to grab data from specified fields
    // now we are re-packaging the data in a group that makes sense
    // index will now be able to display just the comments for this particular meetup
    comment.id = meetup.comments_id;
    comment.body = meetup.comments_body;
    comment.likes = meetup.comments_likes;
    comment.created_on = meetup.comments_created_on;
    comment.updated_on = meetup.comments_updated_on;
    comment.username = meetup.comments_username;
    comment.avatar_url = meetup.comments_avatar_url;
    // return all of the data we packaged in a single object with keys + values
    // comment.something = the key
    // meetup.comments_somethingElse = the value
    return comment;
}

function addMeetup(meetup) {
    if (!meetup || !meetup.title || !meetup.description || !meetup.location || !meetup.start_date) {
        return;
    }
    return Meetups().insert(meetup)
        .returning('id')
}

function updateMeetup(id, description, title, location, time) {
    return Meetups().where('id', id)
        .update({
            description: description,
            title: title,
            location: location,
            time: time,
        })
}

function deleteMeetup(id) {
    return Meetups().where('id', id)
        .del();
}

module.exports = {
    addMeetup: addMeetup,
    getMeetups: getMeetups,
    getMeetup: getMeetup,
    updateMeetup: updateMeetup,
    deleteMeetup: deleteMeetup
};
