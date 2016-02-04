'use strict';

dbcapp.factory(
    'skillData',
    function (playerData) {
        var player = playerData;
        var skillList = {
            offensive: {
                strongPunch: {
                    name: "Strong Punch",
                    levelReq: 1,
                    damage: function () {
                        return Math.floor(1.5 * player.totalStats.strength());
                    },
                    chance: 60
                },
                strongKick: {
                    name: "Strong Kick",
                    levelReq: 2,
                    damage: function () {
                        return Math.floor(1.8 * player.totalStats.strength());
                    },
                    chance: 50
                }
            },
            defensive: [
                {
                    name: "Evade",
                    levelReq: 1,
                    damageReduction: 40,//if 100 then dodge
                    chance: 40
                },
                {
                    name: "Block",
                    levelReq: 1,
                    damageReduction: 80,
                    chance: 60
                }
            ]
        };
        return skillList;
    });