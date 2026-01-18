export default class Ring extends Phaser.GameObjects.Sprite {
    constructor(scene, pos) {
        super(scene, pos.x, pos.y);
        this.setScale(4)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.body.setSize(17, 16)
        this.body.setOffset(-5, 0);
        this.body.setAllowGravity(false)

        this.play({ key: "ring-spin", repeat: -1 })

    }
}