'use strict';

dbcapp.factory(
    'trainingData',
    function (playerData) {
        console.log(playerData);
        var player = playerData;
        var training = {
            stat: {
                aquatic: {
                    minExp: 0,
                    maxExp: 100,
                    level: 0,
                    map:
                        {
                            beach: {
                                name: "Beach",
                                levelReq: 0,
                                statGain: {
                                    speed: function () {
                                        return (5 + (player.totalStats.intelligence() / 5)); // Determine speed of training this stat?
                                    },
                                    persistence: function () {
                                        return (2 + (player.totalStats.intelligence() / 10)); // Determine speed of training this stat?
                                    }
                                }
                            },
                            river: {
                                name: "River",
                                levelReq: 5,
                                statGain: {
                                    speed: function () {
                                        return (5 + (player.totalStats.intelligence() / 5)); // Determine speed of training this stat?
                                    },
                                    persistence: function () {
                                        return (2 + (player.totalStats.intelligence() / 10)); // Determine speed of training this stat?
                                    }
                                }
                            },
                            waterfall: {
                                name: "Waterfall",
                                levelReq: 10,
                                statGain: {
                                    speed: function () {
                                        return (5 + (player.totalStats.intelligence() / 5)); // Determine speed of training this stat?
                                    },
                                    persistence: function () {
                                        return (2 + (player.totalStats.intelligence() / 10)); // Determine speed of training this stat?
                                    }
                                }
                            },
                            ocean: {
                                name: "Ocean",
                                levelReq: 20,
                                statGain: {
                                    speed: function () {
                                        return (5 + (player.totalStats.intelligence() / 5)); // Determine speed of training this stat?
                                    },
                                    persistence: function () {
                                        return (2 + (player.totalStats.intelligence() / 10)); // Determine speed of training this stat?
                                    }
                                }
                            },
                        },
                }
            },
            moves: []
        };
        return training;
    });