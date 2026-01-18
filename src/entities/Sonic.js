export default class Sonic extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y)
        this.setScale(4)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body.setMass(10);
        this.body.setSize(22, 26)
        this.body.setOffset(5, 18)
        this.jumpVelocity = -2100;



        this.play({ key: "run", repeat: -1 })
        this.jumpSound = this.scene.sound.add("jump", { volume: 0.5 })
    }

    jump(forceAJump) {

        if (!this.body.blocked.down && !forceAJump) {
            return
        }


        if ("setVelocityY" in this.body) {
            if (!this.jumpSound.isPlaying) {
                this.jumpSound.play();
            }
            this.body.setVelocityY(this.jumpVelocity)
            this.scene.time.delayedCall(100, () => {
                this.play({ key: "jump", repeat: -1 })
            })
        }
    }

}