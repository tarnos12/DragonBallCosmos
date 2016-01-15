'use strict';

dbcapp.controller(
    'GameController',
    function (
        $scope,
        $interval,
        $http
       ) {
        $http.get('json/stats.json').success(function (data) {
            $scope.saveList = data;
        });
        $http.get('json/races.json').success(function (data) {
            $scope.raceList = data;
        });
        $http.get('json/masters.json').success(function (data) {
            $scope.masterList = data;
        });
        $scope.player = {
            name: "",
            race: "",
            gender: "",
            master: "",
        };
        $scope.genderList = ['Male', 'Female']
        $scope.gameMenu = {
            loadingScreen: {
                state: true,
            },
            startMen: {
                state: true,
            },
            charSelect: {
                state: false,
                toggle: function () {
                    this.state = !this.state;
                    $scope.gameMenu.startMen.state = !this.state;
                }
            },
            charCreate: {
                state: false,
                toggle: function () {
                    this.state = !this.state;
                    $scope.gameMenu.charSelect.state = !this.state;
                }
            }
        };
    });