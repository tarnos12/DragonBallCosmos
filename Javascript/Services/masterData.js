'use strict';

dbcapp.factory(
    'masterData',
    function ($http) {
        var masterList = {};
        $http.get('json/masters.json').success(function (data) {
            masterList = data;
        });
        return masterList;
    });