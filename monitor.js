function createMonitor(appName, config) {

    var app = angular.module(appName, []);

    app.controller('MonitorController', function ($scope, $interval, RestService) {
        $scope.persons = RestService.query(3).then(function (data) {
            $scope.persons = data.data;
        });

        $scope.title = config.title;
        $scope.filterText = '';

        $interval(function () {
            $scope.persons.push({'name': 'Martin', 'age': parseInt(Math.random() * 20)});
        }, 2000);

    });

    app.service('RestService', function ($http) {
        this.query = function (count) {
            return $http.get('persons.json');
        }
    });

    return app;
}