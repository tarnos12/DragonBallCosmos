'use strict';

dbcapp.factory(
    'itemData',
    function ($http) {
    var itemList;
    $http.get('json/items.json').success(function (data) {
        itemList = data;
        console.log(itemList);
    })
    return itemList;
})