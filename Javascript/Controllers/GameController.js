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
        $http.get('json/characterList.json').success(function (data) {
            $scope.characterTypeList = data;
        }).error(function (error) {
            console.log(error)
        });
        //Initial Objects
        $scope.player = {
            health: { name: "Health", value: 10, description: 'Life Force, if it becomes 0, you die' },
            maxHealth: { name: "Max Health", value: 10 },
            healthPerCent: function(){
                return this.health.value / this.maxHealth.value * 100;
            },
            energy: { name: "Energy", value: 10, description: 'Energy, required to use various techniques' },
            maxEnergy: { name: "Max Energy", value: 10 },
            energyPercent: function () {
                return this.energy.value / this.maxEnergy.value * 100;
            },
            baseStats: {
                force: { name: "Force", value: 1, description: 'Increase physical damage' },
                perseverance: { name: "Perseverance", value: 1, description: 'Reduce damage taken from physical attacks' },
                concentration: { name: "Concentration", value: 1, description: 'Increase critical strike chance' },
                speed: { name: "Speed", value: 1, description: 'Evasion, turn order' },
                resolution: { name: "Resolution", value: 1, description: 'Reduce damage taken from Ki attacks' },
                kiAttacks: { name: "Ki Attacks", value: 1, description: 'Increase damage dealt with Ki attacks' },
            },
            name: "",
            race: {
                Stats: {
                    force: 0,
                    perseverance: 0,
                    concentration: 0,
                    speed: 0,
                    resolution: 0,
                    kiAttacks: 0,
                }
            },
            totalStats: {
                force: function () {
                    return $scope.player.baseStats.force.value + $scope.player.race.Stats.force;
                },
                perseverance: function () {
                    return $scope.player.baseStats.perseverance.value + $scope.player.race.Stats.perseverance;
                },
                concentration: function () {
                    return $scope.player.baseStats.concentration.value + $scope.player.race.Stats.concentration;
                },
                speed: function () {
                    return $scope.player.baseStats.speed.value + $scope.player.race.Stats.speed;
                },
                resolution: function () {
                    return $scope.player.baseStats.resolution.value + $scope.player.race.Stats.resolution;
                },
                kiAttacks: function () {
                    return $scope.player.baseStats.kiAttacks.value + $scope.player.race.Stats.kiAttacks;
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
            belt: {},
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
            var itemDataInv = itemData.items;
            var id = $scope.player.itemId;
            var item = addItem(itemDataInv, id);
            $scope.player.itemId++;
            $scope.playerInventory.push(item);
            console.log(item.id)
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
            item.isEquipped = true;
            var equippedItem = $scope.equippedItems[type];
            if (equippedItem.isEquipped === true) {
                $scope.unequip(equippedItem.itemType, equippedItem.id);
            };
            $scope.equippedItems[type] = item;
            var index = $scope.playerInventory.indexOf(item, 0);
            if (index > -1) {
                $scope.playerInventory.splice(index, 1);
            };
            console.log($scope.equippedItems[type].isEquipped)
        }

    });

//Add item for testing purposes.
function addItem(itemData, id) {
    var item = {};
    var count = 0;
    var randomItem;
    var type;
    for (var prop in itemData) {
        if (Math.random() < 1 / ++count) {
            item = itemData[prop];
            type = prop;
        };
    };
    var randomItem = item[Math.floor(Math.random() * item.length)];
    randomItem['id'] = id;
    randomItem['itemType'] = type;
    randomItem['isEquipped'] = false;
    return randomItem;
};

function filterItemId(obj, id) {
    var item = obj.filter(function (e) {
        return e.id === id;
    })[0];
    return item;
};