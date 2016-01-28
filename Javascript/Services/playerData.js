'use strict';

dbcapp.factory(
    'playerData',
    function ($http) {
        
        var player = {
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
            health: { name: "Life Points", value: 10, description: 'Life Force, if it becomes 0, you die' },
            maxHealth: { name: "Max Life Points", value: 10 },
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
            inventorySlot: 30,
            itemId: 0,
        };
        return player;
    });