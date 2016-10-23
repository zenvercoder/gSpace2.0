var knex = require('./knex');
var moment = require('moment');

function Meetups() {
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
            'comments.id as comments_id',
            'comments.body as comments_body',
            'comments.likes as comments_likes',
            'comments.created_on as comments_created_on',
            'comments.updated_on as comments_updated_on',
            'comments_user.username as comments_username',
            'comments_user.avatar_url as comments_avatar_url'
        )
        .then(function (meetups) {
            var mappedMeetups = {};
            meetups.forEach(function (meetup) {
                if (mappedMeetups.hasOwnProperty(meetup.id)) {
                    mappedMeetups[meetup.id].comments.push(extractCommentFromMeetup(meetup));
                } else {
                    meetup.comments = [];
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
                    delete meetup.comments_avatar_url

                    mappedMeetups[meetup.id] = meetup;
                }
            });
            var meetupsArray = Object.keys(mappedMeetups).map(key => mappedMeetups[key]);
            return meetupsArray;
        });
}

var extractCommentFromMeetup = function extractCommentFromMeetup(meetup) {
    if(!meetup.comments_id)
        return;
    var comment = {};
    comment.id = meetup.comments_id;
    comment.body = meetup.comments_body;
    comment.likes = meetup.comments_likes;
    comment.created_on = meetup.comments_created_on;
    comment.updated_on = meetup.comments_updated_on;
    comment.username = meetup.comments_username;
    comment.avatar_url = meetup.comments_avatar_url;
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
