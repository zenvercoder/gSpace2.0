var app = angular.module("gspace", ["ngMaterial", "ngResource"])
    .config(function ($mdThemingProvider, $mdIconProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('orange');

        $mdIconProvider
            .defaultIconSet('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.svg', 24);

    });


app.service('MeetupsDS', function ($resource) {
    var service = this;

    service.getMeetups = function () {
        return $resource('/meetups', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        }).query();
    };

    return service;
});

app.controller('MeetupsController', function ($scope, $mdDialog, MeetupsDS) {
    var originatorEv;
    $scope.sorting = {
        columnName: 'date',
        desc: true
    };

    $scope.meetups = MeetupsDS.getMeetups();

    $scope.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    $scope.sort = function sort(by) {
        $scope.sorting.columnName = by;
        $scope.sorting.desc = false;
    }

});


