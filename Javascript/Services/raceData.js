'use strict';

dbcapp.factory(
    'raceData',
    function ($http) {
        var raceList = {};
        $http.get('json/races.json').success(function (data) {
            raceList = data;
        });
        return raceList;
    });