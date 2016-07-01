'use strict'

var Hero = function (name) {
    this.name = name;
    this.animationQueue = [];//This will be used to store a skill/idle/attack animation sequence.
    this.equippedItems = {
        helmet: {},
        offHand: {},
        wrist:{},
        chest: {},
        boots: {},
        weapon: {},
        special: {},
    };
    this.baseStats = {
        primary: {
            strength: 1,
            speed: 1,
            persistence: 1,
            intelligence: 1
        },
        secondary: {
            evasion: 0,
            criticalChance: 0,
            criticalDamage: 50, //value will be percentage so 50 will be equal to 150% dmg when crit
        }
    };
    this.equipStats = {//Split in 2 sections for easier stat updating later on..
        primary: {},//Strength/Persistence/Speed etc.
        secondary: {}//Critical rate/Gold Find/Magic Find/Dodge etc.
    };
    this.totalStats = {
        primary: {},
        secondary: {}
        };
    this.currentAnimation = "powerUp";

};

Hero.prototype = function () {
    var init = function () {
        //Call this function once when creating a new character/hero with this object constructor
        //key is equal to primary/secondary
        for (var key in this.baseStats) {
            if (this.baseStats.hasOwnProperty(key)) {
                for (var stat_key in this.baseStats[key]) {
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
        this.updateTotalStats();
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
        this.equipStats.primary = {};
        this.equipStats.secondary = {};
        for (var key in this.equippedItems) {
            if (this.equippedItems.hasOwnProperty(key)) {
                var item = this.equippedItems[key].stats;
                for (var stat_property in item) {
                    if (item.hasOwnProperty(stat_property)) {
                        var stat = item[stat_property];
                        for (var itemStat in stat) {
                            if (stat.hasOwnProperty(itemStat)) {
                                var value = stat[itemStat];
                                if (this.baseStats.primary[itemStat] !== undefined) {
                                    //If equipped item stat matches a property of base stat i.e. Strength/Intelligence
                                    if (this.equipStats.primary[itemStat] !== undefined) {
                                        this.equipStats.primary[itemStat] += value;
                                    }
                                    else {
                                        this.equipStats.primary[itemStat] = value;
                                    };
                                }
                                else if (this.baseStats.secondary[itemStat] !== undefined) {
                                    //Else if stat is not base i.e. Critical Chance/Gold Find/Dodge
                                    if (this.equipStats.secondary[itemStat] !== undefined) {
                                        this.equipStats.secondary[itemStat] += value;
                                    }
                                    else {
                                        //this basically create a property and assign first value
                                        //unlike above where its incremented by a value of stat
                                        //incrementing won't work if property does not exist yet
                                        //but we can assign a value and create a property at the same time.
                                        this.equipStats.secondary[itemStat] = value;
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
                    };
                };
                //The reason for using a variable to store total stat is so the values will reset to 0
                //so each time you call this function to update values they will be added from 0
                //since we are adding up stats from each equipped item using loops, this will help in future
                //if we change//add/remove stats/item slots etc.
                
            };
            this.updateTotalStats();
        };
    },
    updateTotalStats = function () {
        for (var key in this.baseStats.primary) {
            if (this.baseStats.primary.hasOwnProperty(key)) {
                //Update primary stat like strength/speed/intelligence
                this.totalStats.primary[key] =
                    this.baseStats.primary[key] +
                    (this.equipStats.primary[key] || 0); // That is good stuff :O if primary[key] is undefined then put 0 instead...
            };
        };
        for (var key_secondary in this.baseStats.secondary) {
            if (this.baseStats.secondary.hasOwnProperty(key_secondary)) {
                //Update total secondary stats like critical/dodge
                this.totalStats.secondary[key_secondary] =
                    this.baseStats.secondary[key_secondary] +
                    (this.equipStats.secondary[key_secondary] || 0); // Same as above, good stuff :P
            };
        };
    },
    addAnimation = function (animationArray) {
        //animationArray will be an array which contains arrays which are basically a sequence of animation to be played
        //This function will be called to push a predefined animation(argument of this function) to "this" object animationQueue
        this.animationQueue.push(animationArray);


    },
    draw = function (ctx, img) {
        for (var key in this.animationList) {
            var name = this.animationList[key].name;
            if (key == this.currentAnimation) {
                var anim = this.animationList[key][0];
                var frame = anim.currentFrame;
                var speed = anim.speed;
                var a = anim.animation[frame].anim;//array with each animation frame value(this is single frame, and thats what we need)
                ctx.drawImage(img, a[0], a[1], a[2], a[3], 100, 100, a[2], a[3]);


                if (speed === anim.currentSpeed) {
                    anim.currentFrame++;
                    if (anim.currentFrame === anim.animation.length) {
                        anim.currentFrame = 0;
                    };
                    anim.currentSpeed = 0;
                }
                else {
                    anim.currentSpeed++;
                }
                break;
            }
        }
        //Draw animation
        //Do 0, cuz its queue, and we will delete first element after its over playing
        //This is a single animation sequence, which can contain few frames, combining few of those will make a full animation
        /* for (var i = 0; i < this.animationQueue[0].length; i++) {
             var singleAnimation = this.animationQueue[0][i];
             for (var j = 0; j < singleAnimation.length; j++) {
                 //This will loop through each sequence
                 var seq = singleAnimation[j];
                 //sx & sy = clipping
                 //swidth & sheight = size of clipped img
                 //x & y = coords on canvas
 
 
 
                 if (seq.delay > 0) {
                     seq.delay--;//if its 0 then animation will be played
                 }
                 else {
                     seq.timer--;//if its 0 then animation will stop playing and we remove it
                     ctx.drawImage(img, seq.frame * seq.sw + seq.sx, seq.sy, seq.sw, seq.sh,
                         seq.dx, seq.dy, seq.dw, seq.dh);
 
                     if (seq.frame <= seq.maxFrame && seq.frame >= 0) {
                         if (seq.currentSpeed >= seq.speed) {
                             if (seq.playForward === true) {
                                 seq.frame++;
                             }
                             else {
                                 seq.frame--;
                             }
                             seq.currentSpeed = 0;
                         }
                         else {
                             seq.currentSpeed++;
                         }
                     }
                     if (seq.frame > seq.maxFrame || seq.frame < 0) {
                         if (seq.repeat === true) {
                             seq.playForward = !seq.playForward;
                             if (seq.frame < 0) {
                                 seq.frame = 0
                             }
                             else {
                                 seq.frame = seq.maxFrame - 1;
                             }
                         }
                         else {
                             seq.frame = 0;
                         }
                     }
                     var test = 0;
                     if (test < 20) {
                         test++;
                         console.log(seq.frame);
                     }
                     //add code to remove this animation queue and add break after drawing
                     if (seq.timer < 1) {
                         //remove animation
                     }
                 }
             }
         }*/
        // ctx.drawImage(img, 110 * frame, 0, 116, 142, x, y, 116, 142);
    }


    return {
        //return methods so they can be called
        init:init,
        attack: attack,
        equip: equip,
        unequip: unequip,
        addStat: addStat,
        addExperience: addExperience,
        updateEquipStats: updateEquipStats,
        updateTotalStats: updateTotalStats,
        addAnimation: addAnimation,
        draw: draw
    }
}();

//create heroes, might put this somewhere else.

var goku = new Hero("Goku");

goku.animationList = {};
//so how does it work? It is an array with an objects which have different properties for each frame/frames
//this might not be necessary but currently I can't find any good sprites so most of them have different sized frames
//each object have at least 1 frame...Each object could perhaps be nested in another object which has other properties like "repeat"
//animation property will hold 2 values x/y position on image, while object holds width/height needed to draw it.
goku.animationList.idle = [//might be a good idea to set up a separate object constructor for this... except basic animations which can be inside hero constructor since they all same for all
    {
        currentFrame: 0,
        currentSpeed: 0,
        speed: 33,
        name:"idle",
        animation:
            [   //[x, y, width, height] <- position on image file...
                { anim: [8, 65, 28, 47] },
                { anim: [43, 66, 31, 46] },
                { anim: [80, 69, 36, 46] }
            ]
    },

];

goku.animationList.powerUp = [
    {
        currentFrame: 0,
        currentSpeed: 0,
        speed: 10,
        name: "powerUp",
        animation:
            [   //[x, y, width, height] <- position on image file...
                { anim: [245, 55, 64, 57] },
                { anim: [314, 55, 64, 57] },
                { anim: [383, 55, 64, 57] }
            ]
    },
]