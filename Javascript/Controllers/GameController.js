'use strict';

dbcapp.controller(
    'GameController',
    function (
        $scope,
        $interval,
        $http
       ) {

        //Loading Json Data
        $http.get('json/stats.json').success(function (data) {
            $scope.saveList = data;
        });
        $http.get('json/races.json').success(function (data) {
            $scope.raceList = data;
        });
        $http.get('json/masters.json').success(function (data) {
            $scope.masterList = data;
        });

        //Initial Objects
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
            startMenu: {
                state: false,
            },
            charSelect: {
                state: false,
                toggle: function () {
                    this.state = !this.state;
                    $scope.gameMenu.startMenu.state = !this.state;
                }
            },
            charCreate: {
                state: true,
                toggle: function () {
                    this.state = !this.state;
                    $scope.gameMenu.startMenu.state = !this.state;
                }
            }
        };
    });