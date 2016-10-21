var express = require('express');
var router = express.Router();
var queries = require('../database/queries/meetups_queries');
var moment = require('moment');

/* GET home page. */
router.get('/', function (req, res, next) {
    queries.getMeetups()
        .then(function (data) {
            res.send(data);
        })
        .catch(function (error) {
            return next(error);
        })
});

router.get('/:id', function (req, res, next) {
    queries.getMeetup(req.params.id)
        .then(function (data) {
            res.send(data);
        })
        .catch(function (error) {
            return next(error);
        })
});


router.post('/', function (req, res, next) {

    queries.addMeetup(req.body)
        .then(function (arrayOfInsertedIDs) {
            return queries.getMeetup(arrayOfInsertedIDs[0]);
        })
        .then(function(meetup){
            res.send(meetup);
        })
        .catch(function (error) {
            return next(error);
        })
});

//
// router.post('/:id/edit', function (req, res, next) {
//     var id = req.params.id;
//     var title = req.body.title;
//     var description = req.body.description;
//     var location = req.body.location;
//     var time = req.body.time;
//
//     queries.updateMeetup(id, description, title, location, time)
//         .then(function () {
//             res.redirect('/meetups')
//         })
//         .catch(function (error) {
//             return next(error);
//         })
// });
//
// router.post('/:id/delete', function (req, res, next) {
//     queries.getMeetup(req.params.id)
//         .then(function (data) {
//             if (req.user.id == data[0].users_id) {
//                 return data;
//             } else {
//                 throw Error("cannot delete meetups created by other users");
//             }
//         })
//         .then(function (data) {
//             return queries.deleteMeetup(req.params.id);
//         })
//         .then(function (data) {
//             res.redirect('/meetups')
//         })
//         .catch(function (error) {
//             return next(error);
//         })
// });

module.exports = router;
