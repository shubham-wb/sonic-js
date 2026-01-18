import Motobug from "../entities/Motobug";
import Sonic from "../entities/Sonic";
import Ring from "../entities/Ring";
import { selectSpawner } from "../utils";
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


        this.scoreText = this.add.text(20, 20, `SCORE: ${this.score}`, {
            fontFamily: "mania",
            resolution: 4,
            fontSize: 64
        })


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
        this.rings = this.add.group()


        const spawnMotobugs = () => {
            this.motobugs.add(new Motobug(this, new Phaser.Math.Vector2(1950, 780)))
        }



        const spawnRings = () => {
            this.rings.add(new Ring(this, new Phaser.Math.Vector2(1950, 780)))
        }



        const spawnObstaclesPeriodically = () => {
            const spawners = [spawnMotobugs, spawnRings]
            const spawnerWeights = [0.6, 0.4]


            const chosenSpawner = selectSpawner(spawners, spawnerWeights)


            chosenSpawner()

            this.time.delayedCall(Phaser.Math.Between(500, 1500), () => {
                spawnObstaclesPeriodically()
            })

        }

        this.physics.add.collider(this.sonic, this.motobugs, (player, motobug) => {

        })
        this.physics.add.collider(this.sonic, this.rings, (player, ring) => {

        })
        spawnObstaclesPeriodically()
    }

    update(_, delta) {
        this.background.tilePositionX += 0.05 * delta;
        this.platforms.tilePositionX += this.speed * delta;


        for (const motobug of this.motobugs.children) {
            motobug.x -= 6 * this.speed * delta;
        }

        for (const ring of this.rings.children) {
            ring.x -= 4 * this.speed * delta;
        }
    }
}