var app = angular.module("gspace", ["ngMaterial"])
    .config(function ($mdThemingProvider, $mdIconProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('orange');

        $mdIconProvider
            .defaultIconSet('node_modules/material-design-icons/iconfont/MaterialIcons-Regular.svg', 24);

    });

app.controller('MeetupsController', function($scope, $mdDialog){
    var originatorEv;
    $scope.sorting = {
        columnName: 'date',
        desc: true
    };

    $scope.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    $scope.sort = function sort(by){
        $scope.sorting.columnName = by;
        $scope.sorting.desc = false;
    }

});


