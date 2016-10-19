var app = angular.module("gspace", ["ngMaterial", "ngResource"])
    .config(function ($mdThemingProvider, $mdIconProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('orange');

        $mdIconProvider
            .defaultIconSet('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.svg', 24);

    });

app.factory('MeetupsDS', function ($resource) {
    var data = $resource('/meetups/:meetup', {meetup: '@meetup'}, {
        update:{
            method:'PUT'
        }
    });
    return data;
});

app.controller('MeetupsController', function ($scope, $mdDialog, MeetupsDS) {
    var originatorEv;
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
        $scope.sorting.columnName = by;
        $scope.sorting.desc = false;
    };

});


