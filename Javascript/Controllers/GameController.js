'use strict';

dbcapp.controller(
    'GameController',
    function (
        $scope,
        $interval,
        playerData,
        itemData,
        raceData,
        charCreationData,
        $http
       ) {
        $scope.itemList = itemData.items;
        $scope.raceList = raceData;
        $scope.charCreation = charCreationData;

        //Loading Json Data
        $http.get('../json/stats.json').success(function (data) {
            $scope.saveList = data;
        });
        $scope.player = playerData;
        //Initial Objects
       
        $scope.random = function () {
            var randomHp = Math.floor(Math.random() * 10 + 1);
            var randomEnergy = Math.floor(Math.random() * 10 + 1);
            $scope.player.health.value = randomHp;
            $scope.player.energy.value = randomEnergy;
        };
        //Can be used for dynamic
        $scope.tabs = [
            { title: 'Battle', content: 'Views/battle.html' },
            { title: 'Training', content: 'Views/training.html', disabled: false },
            { title: 'Mission', content: 'Views/mission.html', disabled: false },
            { title: 'Map', content: 'Views/map.html', disabled: false }
        ];
        //Initialize player inventory
        
        
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
        //Crete character submit button
        $scope.submitCharacter = function () {
            $scope.gameMenu.loadingScreen.state = false;
            $scope.gameMenu.startMenu.state = false;
            $scope.gameMenu.charCreate.state = false;
            $scope.gameMenu.charSelect.state = false;
        };

        $scope.selectRace = function (raceClass, name) {
            $scope.selectedRace = {
                cssClass: raceClass,
                name: name
            }

            $scope.raceSelected = true;
        };

        $scope.raceSelectBack = function () {
            $scope.raceSelected = !$scope.raceSelected;
        };

        $scope.addItemInventory = function () {
            var itemDataInv = {};
            itemDataInv = itemData.items;
            var id = $scope.player.itemId;
            var item = addItem(itemDataInv, id);
            $scope.player.itemId++;
            $scope.player.inventory.push(item);
        }
        $scope.unequip = function (type, id) {
            var item = $scope.player.equippedItems[type];
            item.isEquipped = false;
            $scope.player.inventory.push(item);
            $scope.player.equippedItems[type] = {};
        }
        $scope.equip = function (type, id) {
            var inventoryObj = $scope.player.inventory;
            var item = filterItemId(inventoryObj, id);
            var equippedItem = $scope.player.equippedItems[type];
            if (equippedItem.isEquipped === true) {
                $scope.unequip(equippedItem.itemType, equippedItem.id);
            };
            item.isEquipped = true;
            $scope.player.equippedItems[type] = item;
            var index = $scope.player.inventory.indexOf(item, 0);
            if (index > -1) {
                $scope.player.inventory.splice(index, 1);
            };
        }

    });

//Add item for testing purposes.
function addItem(itemData, id) {
    var item = {};
    var count = 0;
    var randomItem;
    var type;
    var itemReturn = {};
    for (var prop in itemData) {
        if (Math.random() < 1 / ++count) {
            item = itemData[prop];
            type = prop;
        };
    };
    var randomItem = item[Math.floor(Math.random() * item.length)];
    for (var key in randomItem) {
        if (randomItem.hasOwnProperty(key)) {
            itemReturn[key] = {};
            itemReturn[key] = randomItem[key];
        };
    };
    itemReturn['id'] = id;
    itemReturn['itemType'] = type;
    itemReturn['isEquipped'] = false;
    return itemReturn;
};

function filterItemId(obj, id) {
    var item = obj.filter(function (e) {
        return e.id === id;
    })[0];
    return item;
};
//Callback function, calculate equipped items stat for player object inside a controller.
function equipStatTotal(statString, equippedItems) {
    var total = 0;
    for (var key in equippedItems) {
        if (equippedItems.hasOwnProperty(key)) {
            var stat = equippedItems[key].stats[statString];
            if (stat !== undefined) {
                total += stat;
            }
            else {
                equippedItems[key].stats[statString] = 0;
                total += 0;
            };
        };
    };
    return total;
};