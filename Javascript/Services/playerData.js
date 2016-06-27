'use strict';

dbcapp.factory(
    'playerData',
    function ($http) {

        var player = {
            isDead: false,
            level: 1,
            experience: 0,
            maxExperience: 100,
            inventorySlots: 30,
            itemId: 0,
            skills: [],
            inventory: [],
            equippedItems: {
                helmet: {
                    stats: {}
                },
                weapon: {
                    stats: {}
                },
                chest: {
                    stats: {}
                },
                offHand: {
                    stats: {}
                },
                wrist: {
                    stats: {}
                },
                boots: {
                    stats: {}
                },
                special: {
                    stats: {}
                }
            },
            health: { name: "Life Points", value: 1000, description: 'Life Force, if it becomes 0, you die' },
            maxHealth: { name: "Max Life Points", value: 1000 },
            healthPerCent: function () {
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
                    intelligence: 0
                }
            },
            equipStats: {
                strength: function () {
                    var total = equipStatTotal('strength', player.equippedItems);
                    return total;
                },
                speed: function () {
                    var total = equipStatTotal('speed', player.equippedItems);
                    return total;
                },
                persistence: function () {
                    var total = equipStatTotal('persistence', player.equippedItems);
                    return total;
                },
                intelligence: function () {
                    var total = equipStatTotal('intelligence', player.equippedItems);
                    return total;
                },
            },
            totalStats: {
                strength: function () {
                    return player.baseStats.strength.value + player.race.Stats.strength + player.equipStats.strength();
                },
                speed: function () {
                    return player.baseStats.speed.value + player.race.Stats.speed + player.equipStats.speed();
                },
                persistence: function () {
                    return player.baseStats.persistence.value + player.race.Stats.persistence + player.equipStats.persistence();
                },
                intelligence: function () {
                    return player.baseStats.intelligence.value + player.race.Stats.intelligence + player.equipStats.intelligence();
                },

            },
            gender: "",
            master: "",
            charType: {},
            draw: function (ctx, img, x, y, frame) {
                //116 x 142
                ctx.drawImage(img, 110 * frame, 0, 116, 142, x, y, 116, 142);
            }
        };
        return player;
    });

var Player = function (name) {
    this.name = name;
    this.isDead = false;
    this.gold = 0;
    this.level = 1; //"Account level", heroes will have their own constructor and values.
    this.experience = 0;
    this.maxExperience = 100;
    this.inventorySlots = 30;
    this.inventory = [];
    this.itemId = 0;
};

Player.prototype = function () {
    //here you can add methods like var add = function(){}, separate them with comma
    var buy = function (item) {
        //Buy item, it will be added to everyitem click button like player.buy(this)
    },
        sell = function (item) {
            //Sell item, same as above 
        },
        sortInventory = function (sortBy) {
            //Sort inventory by name/type/value/stat etc. Also inventory can be split into equip/material tabs
        },
        addItemInventory = function () {
            var itemDataInv = {};
            itemDataInv = itemData.items;
            var id = $scope.player.itemId;
            var item = addItem(itemDataInv, id);
            $scope.player.itemId++;
            $scope.player.inventory.push(item);
        },
        unequip = function (type, id) {
            var item = $scope.player.equippedItems[type];
            item.isEquipped = false;
            $scope.player.inventory.push(item);
            $scope.player.equippedItems[type] = {};
        },
        equip = function (type, id) {
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
    return {
        // return methods so they can be used outside after creating an object like add:add, attack:attack
        // can use custom name like playerAdd:add, where add is a method and playerAdd is a method we return
        //other methods which are not returned can still be used by functions, but cannot be called directly outside.
        //so if there are 2 methods add and substract and you return add:add, then you can only call Object.add();
        //and your add method can use/call substract but you are unable to do Object.substract();
        buy: buy,
        sell: sell,
        sortInventory: sortInventory
    }
}();
