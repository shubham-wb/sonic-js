export default class Sonic extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y)
        this.setScale(4)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body.setMass(10);
        this.body.setSize(10, 10)
        this.play({ key: "run", repeat: -1 })

    }

}