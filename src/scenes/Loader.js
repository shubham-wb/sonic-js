export default class Loader extends Phaser.Scene {
    constructor() {
        super({ key: "loader" })
    }

    preload() {
        this.load.spritesheet("sonic", "./graphics/sonic.png", {
            frameWidth: 32,
            frameHeight: 44
        })
        this.load.spritesheet("motobug", "./graphics/motobug.png", {
            frameWidth: 48,
            frameHeight: 30,
        })
        this.load.spritesheet("ring", "./graphics/ring.png", {
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.image("platforms", "./graphics/platforms.png")
        this.load.image("chemical-bg", "./graphics/chemical-bg.png")

        this.load.audio("jump", "./sounds/Jump.wav");
        this.load.audio("ring", "./sounds/Ring.wav");
        this.load.audio("destroy", "./sounds/Destroy.wav");
        this.load.audio("hyper-ring", "./sounds/HyperRing.wav")
        this.load.audio("music", "./sounds/Hurt.wav")
        this.load.audio("city", "./sounds/city.mp3")
    }

    create() {
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("sonic", {
                start: 0,
                end: 7
            }),
            frameRate: 30,
        });
        this.anims.create({
            key: "motobug-run",
            frames: this.anims.generateFrameNumbers("motobug", {
                start: 0,
                end: 4
                ,
            }),
            frameRate: 8
        })
        this.anims.create({
            key: "ring-spin",
            frames: this.anims.generateFrameNumbers("ring", {
                start: 0,
                end: 15
            }),
            frameRate: 20
        })
        this.scene.start("game")

    }


}