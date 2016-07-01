'use strict';

dbcapp.factory(
    'playerData',
    function ($http) {

        var player = new Player("Tester");
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
    this.team = []; //Store our characters or "active" members, we can have some other array to store all other characters we arent using
    this.currentTeamTab = 0; //This will be used to display info about currenty selected hero from our team, it will work like a tab
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
            itemDataInv = itemList.items;
            var id = this.itemId;
            var item = addItem(itemDataInv, id);
            this.itemId++;
            this.inventory.push(item);
        },
        //Add item for testing purposes.
       addItem = function(itemData, id) {
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
    },

     filterItemId = function (obj, id) {
        var item = obj.filter(function (e) {
            return e.id === id;
        })[0];
        return item;
    },
        unequip = function (type) {
            var item = this.team[this.currentTeamTab].equippedItems[type];
            item.isEquipped = false;
            this.inventory.push(item);
            this.team[this.currentTeamTab].equippedItems[type] = {};

            this.team[this.currentTeamTab].updateEquipStats();
        },
        equip = function (type, id) {
            var inventoryObj = this.inventory;
            var item = filterItemId(inventoryObj, id);
            var equippedItem = this.team[this.currentTeamTab].equippedItems[type];
            if (equippedItem.isEquipped === true) {
                var that = this;
                this.unequip(equippedItem.itemType, that);
            };
            item.isEquipped = true;
            this.team[this.currentTeamTab].equippedItems[type] = item;
            var index = this.inventory.indexOf(item, 0);
            if (index > -1) {
                this.inventory.splice(index, 1);
            };
            this.team[this.currentTeamTab].updateEquipStats();
        }
    return {
        // return methods so they can be used outside after creating an object like add:add, attack:attack
        // can use custom name like playerAdd:add, where add is a method and playerAdd is a method we return
        //other methods which are not returned can still be used by functions, but cannot be called directly outside.
        //so if there are 2 methods add and substract and you return add:add, then you can only call Object.add();
        //and your add method can use/call substract but you are unable to do Object.substract();
        buy: buy,
        sell: sell,
        sortInventory: sortInventory,
        addItemInventory: addItemInventory,//this is for testing only, as it adds random item to inventory
        equip: equip,
        unequip:unequip
    }
}();
