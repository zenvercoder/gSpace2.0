var app = angular.module("gspace", ["ngMaterial", "ngResource", "ngMessages"])
    .config(function ($mdThemingProvider, $mdIconProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('orange');

        $mdIconProvider
            .defaultIconSet('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.svg', 24);

    });

app.factory('MeetupsDS', function ($resource) {
    var data = $resource('/meetups/:meetup', {meetup: '@meetup'}, {
        update: {
            method: 'PUT'
        }
    });
    return data;
});

app.controller('DialogController', function ($scope, $mdDialog) {
    $scope.meetup = {};

    $scope.save = function () {
        $mdDialog.hide($scope.meetup);
    }

    $scope.cancel = function(){
        $mdDialog.cancel();
    }
});

app.controller('MeetupsController', function ($scope, $mdDialog, MeetupsDS) {
    // used for the dropdown menu
    var originatorEv;

    $scope.showForm = function(){
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: '../form.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
        })
            .then(function(newMeetup) {

                console.log("newMeetup " + newMeetup);
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    $scope.menuItems = [
        {key: 'date', label: 'Date'},
        {key: 'title', label: 'Title'},
        {key: 'votes', label: 'Votes'}
        ];

    $scope.sorting = {
        columnName: 'date',
        desc: true
    };

    $scope.meetups = MeetupsDS.query();

    $scope.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    $scope.sort = function sort(by) {
        if ($scope.sorting.columnName == by) {
            $scope.sorting.desc = !$scope.sorting.desc;
        } else {
            $scope.sorting.desc = true;
        }
        $scope.sorting.columnName = by;
    };

    $scope.upvote = function(meetup){
        likes = meetup.likes++;
    };

    $scope.downvote = function(meetup){
        likes = meetup.likes--;
    };
});


