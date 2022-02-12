namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    game.reset()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    list2 = [assets.image`Blue Rocket`, assets.image`Stealth`, assets.image`Dart10`]
    projectile = sprites.createProjectileFromSprite(list2._pickRandom(), mySprite, 0, -150)
    projectile.startEffect(effects.ashes)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite3, otherSprite3) {
    info.changeLifeBy(-1)
    otherSprite3.destroy(effects.disintegrate, 200)
    scene.cameraShake(4, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    otherSprite.destroy()
    statusbar.value = 100
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite2, otherSprite2) {
    sprite2.destroy(effects.fire, 100)
    otherSprite2.destroy()
    info.changeScoreBy(1)
    if (info.score() == 10) {
        info.changeScoreBy(5)
        mySprite.sayText("+5 Level-Up Bonus", 2000, false)
        enemySpeed = 70
    }
    if (info.score() == 25) {
        info.changeScoreBy(5)
        mySprite.sayText("+5 Level-Up Bonus", 2000, false)
        enemySpeed = 70
    }
    if (info.score() == 40) {
        info.changeScoreBy(5)
        mySprite.sayText("+5 Level-Up Bonus", 2000, false)
        enemySpeed = 70
    }
    if (info.score() == 50) {
        mySprite.sayText("You're a Master", 2000, false)
        enemySpeed = 70
        game.over(true)
    }
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
let myEnemy: Sprite = null
let myFuel: Sprite = null
let projectile: Sprite = null
let list2: Image[] = []
let enemySpeed = 0
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`Galaxy`)
scroller.scrollBackgroundWithSpeed(0, 10)
mySprite = sprites.create(assets.image`Rocket`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
animation.runImageAnimation(
mySprite,
assets.animation`Flying Rocket`,
100,
true
)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -25, 0)
enemySpeed = 50
game.onUpdateInterval(5000, function () {
    myFuel = sprites.createProjectileFromSide(assets.image`Fuel`, 0, 80)
    myFuel.x = randint(5, 155)
    myFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(2000, function () {
    myEnemy = sprites.createProjectileFromSide(assets.image`UFO`, 0, enemySpeed)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    myEnemy,
    assets.animation`Flying UFO`,
    200,
    true
    )
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
