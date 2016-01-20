'use strict';

dbcapp.factory(
    'masterData',
    function ($http) {
        var masterList = {
            masters: {}
        };
        $http.get(
            'json/masters.json'
        ).success(function (data) {
            masterList.masters = data;
        }).error(function (error) {
            console.log(error)
        });
        return masterList;
    });