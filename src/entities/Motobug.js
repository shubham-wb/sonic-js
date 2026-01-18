export default class Motobug extends Phaser.GameObjects.Sprite {
    constructor(scene, pos) {
        super(scene, pos.x, pos.y);
        this.setScale(4)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.setSize(32, 31)
        this.body.setOffset(0, 0);
        this.body.setAllowGravity(false)


        this.play({ key: "motobug-run", repeat: -1 })
    }

    removeIfOffScreen() { }
}