'use strict';

dbcapp.factory(
    'enemyData',
    function () {
        var enemies = getEnemies();

        return enemies;
    });

var areaList = [
{
    name: "Goku House", nameProperty: "gokuHouse", isUnlocked: true, enemies: [
        ['Bandit', 1, 1, 10], ['Wolf', 2, 2, 50], ['Bear', 3, 5, 100],
    ]
},
{
    name: "Satan City", nameProperty: "satanCity", isUnlocked: false, enemies: [
        ['Spider', 1, 1, 10], ['Snake', 2, 2, 50], ['Boar', 3, 5, 100],
    ]
}
];

function getEnemies() {
    var enemyInfo = {};
    var enemyByArea = [];
    var newEnemy = function (name, id, level, hp) {
        this.name = name;
        this.id = id;
        this.level = level;
        this.hp = hp;
        this.maxHp = hp;
    };
    for (var i = 0; i < areaList.length; i++) {
        var area = areaList[i];
        var enemyL = areaList[i].enemies;
        enemyByArea[i] = {};
        enemyByArea[i].area = area.name;
        enemyByArea[i].isUnlocked = area.isUnlocked;
        enemyByArea[i].enemyList = [];
        for (var j = 0; j < enemyL.length; j++) {
            var enemy = enemyL[j];
            enemyInfo[enemy + i + j] = new newEnemy(enemy[0], enemy[1], enemy[2], enemy[3]);
        };
        for (var key in enemyInfo) {
            var item = enemyInfo[key];
            enemyByArea[i].enemyList.push(item);
        }
        enemyInfo = {};
    }
    return enemyByArea;
};