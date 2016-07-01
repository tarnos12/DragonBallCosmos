'use strict';

dbcapp.factory(
    'itemData',
    function ($http) {
        var itemList = {
            items: {}
        };
        $http.get('json/items.json').success(function (data) {
            itemList.items = data;
        });
        window.itemList = itemList;
        return itemList;
    });
