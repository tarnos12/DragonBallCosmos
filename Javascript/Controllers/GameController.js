'use strict';

dbcapp.controller(
    'GameController',
    function (
        $scope,
        $interval,
        itemData,
        raceData,
        masterData,
        $http
       ) {
        $scope.itemList = itemData.items;
        $scope.raceList = raceData;
        $scope.masterList = masterData;
        //Loading Json Data
        $http.get('../json/stats.json').success(function (data) {
            $scope.saveList = data;
        });
        $http.get('json/characterTypeList.json').success(function (data) {
            $scope.characterTypeList = data;
        }).error(function (error) {
            console.log(error)
        });
        //Initial Objects
        $scope.player = {
            health: { name: "Life Points", value: 10, description: 'Life Force, if it becomes 0, you die' },
            maxHealth: { name: "Max Life Points", value: 10 },
            healthPerCent: function(){
                return this.health.value / this.maxHealth.value * 100;
            },
            energy: { name: "Ki Points", value: 10, description: 'Energy, required to use various techniques' },
            maxEnergy: { name: "Max Ki Points", value: 10 },
            energyPercent: function () {
                return this.energy.value / this.maxEnergy.value * 100;
            },
            baseStats: {
                strength: { name: "Strength", value: 1, description: 'Increase physical damage' },
                speed: { name: "Speed", value: 1, description: 'Evasion, turn order' },
                persistence: { name: "Persistence", value: 1, description: 'Decrease damage taken' },
                intelligence: { name: "Intelligence", value: 1, description: 'Training Speed' },
            },
            name: "",
            race: {
                Stats: {
                    strength: 0,
                    speed: 0,
                    persistence: 0,
                    intelligence:0
                }
            },
            equipStats:{
                strength: function () {
                    var total = equipStatTotal('strength', $scope.equippedItems);
                    return total;
                },
                speed: function () {
                    var total = equipStatTotal('speed', $scope.equippedItems);
                    return total;
                },
                persistence: function () {
                    var total = equipStatTotal('persistence', $scope.equippedItems);
                    return total;
                },
                intelligence: function () {
                    var total = equipStatTotal('intelligence', $scope.equippedItems);
                    return total;
                },
            },
            totalStats: {
                strength: function () {
                    return $scope.player.baseStats.strength.value + $scope.player.race.Stats.strength + $scope.player.equipStats.strength();
                },
                speed: function () {
                    return $scope.player.baseStats.speed.value + $scope.player.race.Stats.speed + $scope.player.equipStats.speed();
                },
                persistence: function () {
                    return $scope.player.baseStats.persistence.value + $scope.player.race.Stats.persistence + $scope.player.equipStats.persistence();
                },
                intelligence: function () {
                    return $scope.player.baseStats.intelligence.value + $scope.player.race.Stats.intelligence + $scope.player.equipStats.intelligence();
                },

            },
            gender: "",
            master: "",
            charType: {},
            inventorySlot: 30,
            itemId:0,
        };
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
        $scope.playerInventory = [];
        $scope.equippedItems = {
            helmet: {},
            weapon: {},
            chest: {},
            offHand: {},
            wrist: {},
            boots: {},
            special: {}
        };
        

        $scope.genderList = ['Male', 'Female'];

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
            $scope.playerInventory.push(item);
        }
        $scope.unequip = function (type, id) {
            var item = $scope.equippedItems[type];
            item.isEquipped = false;
            $scope.playerInventory.push(item);
            $scope.equippedItems[type] = {};
        }
        $scope.equip = function (type, id) {
            var inventoryObj = $scope.playerInventory;
            var item = filterItemId(inventoryObj, id);
            var equippedItem = $scope.equippedItems[type];
            if (equippedItem.isEquipped === true) {
                $scope.unequip(equippedItem.itemType, equippedItem.id);
            };
            item.isEquipped = true;
            $scope.equippedItems[type] = item;
            var index = $scope.playerInventory.indexOf(item, 0);
            if (index > -1) {
                $scope.playerInventory.splice(index, 1);
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
            var stat = equippedItems[key][statString];
            if (stat !== undefined) {
                total += stat;
            }
            else {
                total += 0;
            };
        };
    };
    return total;
};