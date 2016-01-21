'use strict';

dbcapp.factory(
    'charCreationData',
    function ($http) {
        var charCreation = {
            masters: {},
            characterTypes: {},
            genders: {}
        };

        $http.get(
            'json/masters.json'
        ).success(function (data) {
            charCreation.masters = data;
        }).error(function (error) {
            console.log(error)
        });

        $http.get('json/characterTypeList.json').success(function (data) {
            charCreation.characterTypes = data;
        }).error(function (error) {
            console.log(error)
        });

        charCreation.genders = ['Male', 'Female'];

        return charCreation;
    });