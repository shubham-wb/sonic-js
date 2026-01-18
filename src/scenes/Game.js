import Motobug from "../entities/Motobug";
import Sonic from "../entities/Sonic";
export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "game" })
    }

    create() {
        const centerPos = { x: this.scale.width / 2, y: this.scale.height / 2 }
        this.score = 0;
        this.speed = 0.1;

        this.background = this.add.tileSprite(0, -100, 0, 0, "chemical-bg")
        this.background.setScale(2);
        this.background.setOrigin(0);
        this.background.setAlpha(0.8)

        this.platforms = this.add.tileSprite(0, -950, 0, 0, "platforms")
        this.platforms.setScale(4)
        this.platforms.setOrigin(0);


        const groundGroup = this.physics.add.staticGroup();
        this.ground = groundGroup.create(960, 920)
        this.ground.setSize(1920, 160);
        this.ground.setVisible(false)


        this.sonic = new Sonic(this, 200, 750)
        this.physics.add.collider(this.sonic, this.ground, () => {
            if (this.sonic.body.blocked.down && this.sonic.anims.currentAnim.key !== "run") {
                this.sonic.play({ key: "run", repeat: -1 })
            }
        })


        const jumpLogic = () => {
            this.sonic.jump()
        }

        this.input.keyboard.on('keydown-SPACE', jumpLogic)
        this.input.on("pointerdown", jumpLogic)

        this.motobugs = this.add.group()

        const spawnMotobugs = () => {
            this.motobugs.add(new Motobug(this, new Phaser.Math.Vector2(1950, 780)))
        }


        const spawnObstaclesPeriodically = () => {
            spawnMotobugs()
            this.time.delayedCall(Phaser.Math.Between(500, 1500), () => {
                spawnObstaclesPeriodically()
            })

        }

        this.physics.add.collider(this.sonic, this.motobugs, (player, motobug) => {

        })
        spawnObstaclesPeriodically()
    }

    update(_, delta) {
        this.background.tilePositionX += 0.05 * delta;
        this.platforms.tilePositionX += this.speed * delta;


        for (const motobug of this.motobugs.children) {
            motobug.x -= this.speed * delta;
        }
    }
}