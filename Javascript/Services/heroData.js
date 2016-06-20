'use strict'

var Hero = function (name) {
    this.name = name;
    this.equippedItems = {
        helmet: {},
        chest: {},
        boots: {},
        weapon: {},
        special: {},
    };
    this.baseStats = {
        primary:{
            strength: 1,
            speed: 1,
            persistence: 1,
            intelligence: 1
        },
        secondary:{
            evasion: 0,
            criticalChance: 0,
            criticalDamage: 50, //value will be percentage so 50 will be equal to 150% dmg when crit
        }
    };
    this.equipStats = {//Split in 2 sections for easier stat updating later on..
        primary: {},//Strength/Persistence/Speed etc.
        secondary: {}//Critical rate/Gold Find/Magic Find/Dodge etc.
    };


};

Hero.prototype = function () {
        var init = function(){
            //Call this function once when creating a new character/hero with this object constructor
            //key is equal to primary/secondary
            for(var key in this.baseStats){
                if(this.baseStats.hasOwnProperty(key)){
                    for(var stat_key in this.baseStats[key]){
                        if (this.baseStats[key].hasOwnProperty(stat_key)) {
                            this.equipStats[key][stat_key] = 0;
                            //This will add all necessary stats to our equipStat property
                            //So we don't have to do anything when adding new properties
                            //We can even reset all values with this.equipStats[key] = {};
                            //Then recreate them again, in case we add/remove some stats
                            //This will allow saved games to work and remove all unecessary stuff
                            //Same can be done to items in Player constructor and Hero constructor
                            //Loop through inventory and hero equipped items, and look for properties which no longer exist
                            
                        };
                    };
                };
            };
        },
        attack = function (enemy) {
        //takes currently selected enemy(random enemy if battles are automatic or enemy choosen by AI which can be done later);

        },
        equip = function (item) {
            //argument is an item id we clicked 
        },
        unequip = function (item) {
            //argument is an item id we clicked
        },
        addStat = function (stat) {
            //add a stat with a button when player level up like player.heroes[0].strength += 10;
            //heroes is an array if we want to have multiple characters for our player.
        },
        addExperience = function (amount) {
            //after battle is won we will call it like Goku.addExperience = Battle.totatExperience / totalCharacters;
            //if we have more than 1 character, exp will be divided maybe.
        },
            //this should be called when player equipped item is changed/unequipped. 
            //player.heroes[0].updateEquipStats(player) or using apply method which learned a bit last time...
            //There is no need for angular to constantly update it.
        updateEquipStats = function () {
                //We loop through all equipped item, so we can update "this" hero stats.
                for (var key in this.equippedItems) {
                    if (this.equippedItems.hasOwnProperty(key)) {
                        var item = this.equippedItems[key];
                        var total_Primary = 0;
                        var total_Secondary = 0;
                        for (var stat_property in item) {
                            if (item.hasOwnProperty(stat_property)) {
                                var stat = item[stat_property];
                                if (this.baseStats.primary[stat_property] !== undefined) {
                                    //If equipped item stat matches a property of base stat i.e. Strength/Intelligence
                                    if (total_Primary[stat_property] !== undefined) {
                                        total_Primary[stat_property] += stat;
                                    }
                                    else {
                                        total_Primary[stat_property] = stat;
                                    };
                                }
                                else if (this.baseStats.secondary[stat_property] !== undefined) {
                                    //Else if stat is not base i.e. Critical Chance/Gold Find/Dodge
                                    this.equipStats.secondary[stat_property] += stat;
                                    if (total_Secondary[stat_property] !== undefined) {
                                        total_Secondary[stat_property] += stat;
                                    }
                                    else {
                                        //this basically create a property and assign first value
                                        //unlike above where its incremented by a value of stat
                                        //incrementing won't work if property does not exist yet
                                        //but we can assign a value and create a property at the same time.
                                        total_Secondary[stat_property] = stat;
                                    };
                                }
                                else {
                                    //This is where we can perhaps add an option to remove a property from an item
                                    //if a property no longer exist in the game since we can add/remove stuff
                                    //we can remove dodge/evasion if it no longer exist etc.
                                }
                                //if hero does not have a property it will create it for us
                                //usefull when we decide to add new property to item like "gold find"
                                //so we don't need to change properties here. We also don't need to save them
                                //We can just recreate them with this function when we load a game etc.
                                //Loop through player.heroes which is an array then loop each hero equipped items.
                            };
                        };

                        //The reason for using a variable to store total stat is so the values will reset to 0
                        //so each time you call this function to update values they will be added from 0
                        //since we are adding up stats from each equipped item using loops, this will help in future
                        //if we change//add/remove stats/item slots etc.
                        for (var primary_key in total_Primary) {
                            if (total_Primary.hasOwnProperty(primary_key)) {
                                this.equipStats.primary[primary_key] = total_Primary[primary_key];
                            };
                        };
                        for (var secondary_key in total_Secondary) {
                            if (total_Secondary.hasOwnProperty(secondary_key)) {
                                this.equipStats.secondary[secondary_key] = total_Secondary[secondary_key];
                            };
                        };
                    };
                };
            
        },
        updateTotalStats = function () {
            for (var key in this.baseStats.primary) {
                if (this.baseStats.primary.hasOwnProperty(key)) {
                    //Update primary stat like strength/speed/intelligence
                    this.totalStats.primary[key] =
                        this.baseStats.primary[key] +
                        this.equipStats.primary[key];
                };
            };
            for (var key_secondary in this.baseStats.secondary) {
                if (this.baseStats.secondary.hasOwnProperty(key_secondary)) {
                    //Update total secondary stats like critical/dodge
                    this.totalStats.secondary[key_secondary] =
                        this.baseStats.secondary[key_secondary] +
                        this.equipStats.secondary[key_secondary];
                };
            };
        }


    return {
        //return methods so they can be called
        attack: attack,
        equip: equip,
        unequip: unequip,
        addStat: addStat,
        addExperience: addExperience,
        updateEquipStats: updateEquipStats,
        updateTotalStats: updateTotalStats
    }
}();