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
                },
                jungle: {
                    minExp: 0,
                    maxExp: 100,
                    level: 0,
                    map:
                        {
                            woods: {
                                name: "Woods",
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
                            swamp: {
                                name: "Swamp",
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
                            tropicalForest: {
                                name: "Tropical Forest",
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
                        },
                },
                rocky: {
                    minExp: 0,
                    maxExp: 100,
                    level: 0,
                    map:
                        {
                            hill: {
                                name: "Hill",
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
                            cave: {
                                name: "Cave",
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
                            mountain: {
                                name: "Mountain",
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
                            volcano: {
                                name: "Volcano",
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
                        },
                },
                desert: {
                    minExp: 0,
                    maxExp: 100,
                    level: 0,
                    map:
                        {
                            rock: {
                                name: "Rock",
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
                            desert: {
                                name: "Desert",
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
                            tundra: {
                                name: "Tundra",
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
                        },
                },
                space: {
                    minExp: 0,
                    maxExp: 100,
                    level: 0,
                    map:
                        {
                            gravityChamber: {
                                name: "Gravity Chamber",
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
                            moon: {
                                name: "Moon",
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
                            outerSpace: {
                                name: "Outer Space",
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
                        },
                },

            },
            moves: []
        };
        return training;
    });