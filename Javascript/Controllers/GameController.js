﻿'use strict';

dbcapp.controller(
    'GameController',
    function (
        $scope,
        $interval,
        playerData,
        itemData,
        raceData,
        charCreationData,
        trainingData,
        enemyData,
        skillData,
        $http,
        $attrs
       ) {
        //Loading Json Data
        $http.get('../json/stats.json').success(function (data) {
            $scope.saveList = data;
        });
        $scope.player = playerData;
        $scope.itemList = itemData.items;
        $scope.raceList = raceData;
        $scope.charCreation = charCreationData;
        $scope.training = trainingData;
        $scope.enemies = enemyData;
        $scope.skills = skillData;
        $scope.player.skills.offensive = $scope.skills.offensive;
        $scope.player.skills.defensive = $scope.skills.defensive;
        $scope.currentEnemy = {};
        $scope.currentArea = "";
        $scope.previousMap = "";
        $scope.battleStart = false;//Used to hide map and open battle screen

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
                state: false,
            },
            startMenu: {
                state: true,
            },
            mainScreen:{
                stat:false,
            },
            charSelect: {
                state: false,
                toggle: function () {
                    this.state = !this.state;
                    $scope.gameMenu.startMenu.state = !this.state;
                }
            },
            charCreate: {
                state: false,
                toggle: function () {
                    this.state = !this.state;
                    $scope.gameMenu.startMenu.state = !this.state;
                }
            }
        };

        $scope.currentMap = {
            main: true,
            gokuHouse: false,
            satanCity: false,
            baseruCity: false,
            westCapitol: false
        }
        //Crete character submit button
        $scope.submitCharacter = function () {
            $scope.gameMenu.loadingScreen.state = false;
            $scope.gameMenu.startMenu.state = false;
            $scope.gameMenu.charCreate.state = false;
            $scope.gameMenu.charSelect.state = false;
            $scope.gameMenu.mainScreen.state = true;
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

        //I am using this with html area map when clicking on an element.
        $scope.consoleInfo = function (item) {
            console.log(item.target.title);
        };
        $scope.startBattle = function (mapId, enemyId, map) {
            $scope.currentEnemy = $scope.enemies[mapId].enemyList[enemyId];
            $scope.currentArea = $scope.enemies[mapId].area;
            $scope.previousMap = map;
            $scope.currentMap[map] = false;
            $scope.toggleBattleStart();
        };
        $scope.toggleBattleStart = function () {
            $scope.battleStart = !$scope.battleStart;
        };
        $scope.battle = function () {
            var player = $scope.player;
            var enemy = $scope.currentEnemy;
            var playerAttackInterval = $interval(function () {
                console.log('player dead: ' + player.isDead)
                if (player.isDead === true || enemy.hp <= 0) {
                    console.log('Player or enemy is dead');
                    player.isDead = false;
                    player.health.value = player.maxHealth.value;
                    //Stop interval
                    $interval.cancel(playerAttackInterval);
                    $interval.cancel(enemyAttackInterval);
                }
                else {
                    console.log('player turn ');
                    $scope.playerTurn();
                }
            }, 500);
            var enemyAttackInterval = $interval(function () {
                if (enemy.hp > 0 && player.isDead === false) {
                    console.log('enemy attack');
                    $scope.enemyTurn();
                }
                else {
                    //Stop interval
                    $interval.cancel(enemyAttackInterval);
                    $interval.cancel(playerAttackInterval);
                }
            }, 600);
        };
        $scope.playerTurn = function () {
            var player = $scope.player;
            var enemy = $scope.currentEnemy;
            var skill = player.skills.offensive;
            for (var key in skill) {
                if (skill.hasOwnProperty(key)) {
                    var random = Math.floor((Math.random() * 100) + 1);
                    if (skill[key].chance >= random) {
                        console.log('Player used ' + skill[key].name + " and dealt: " + skill[key].damage())
                        enemy.hp -= skill[key].damage();
                    }
                    console.log("Else use basic attack to damage enemy");
                    //enemy.hp -= player.secondaryStats.damage.value();
                }
            }
        };
        $scope.enemyTurn = function () {
            var player = $scope.player;
            var enemy = $scope.currentEnemy;
            var skill = player.skills.defensive;
            var dmgReduce = 0;
            var enemyDamage = 0;
            for (var key in skill) {
                if (skill.hasOwnProperty(key)) {
                    var random = Math.floor((Math.random() * 100) + 1);
                    if (skill[key].chance >= random) {
                        console.log('Player use ' + skill[key].name + " " + "and reduce damage taken by: " + skill[key].damageReduction);
                        dmgReduce = skill[key].damageReduction;
                    };
                };
            };
            enemyDamage = 100 - (100 * (dmgReduce / 100));
            player.health.value -= enemyDamage;
            console.log('Enemy Dealt ' + enemyDamage)
            if (player.health.value <= 0) {
                player.isDead = true;
            };
        };
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