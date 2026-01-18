import Motobug from "../entities/Motobug";
import Sonic from "../entities/Sonic";
import Ring from "../entities/Ring";
import { selectSpawner } from "../utils";
import { maniaTextConfig } from "../constants";
export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "game" })
    }

    create() {

        this.cityAmbience = this.sound.add("city", { volume: 0.2, loop: true });
        this.cityAmbience.play();

        const centerPos = { x: this.scale.width / 2, y: this.scale.height / 2 }
        let comboMultiplier = 0;
        const maxSpeed = 0.7;

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
            ...maniaTextConfig,
            fontSize: 64
        })

        this.multiplierText = this.add.text(0, 0, "", {
            ...maniaTextConfig,
            fontSize: 48,
            color: "#ffff00"
        })


        this.howToPlayText = this.add.text(centerPos.x, centerPos.y, "PRESS SPACE OR TAP TO JUMP", {
            ...maniaTextConfig,
            fontSize: 48
        })


        this.howToPlayText.setOrigin(0.5)


        const groundGroup = this.physics.add.staticGroup();
        this.ground = groundGroup.create(960, 920)
        this.ground.setSize(1920, 160);
        this.ground.setVisible(false)


        this.sonic = new Sonic(this, 200, 750)

        this.physics.add.collider(this.sonic, this.ground, () => {
            if (this.sonic.body.blocked.down && this.sonic.anims.currentAnim.key !== "run") {
                this.sonic.play({ key: "run", repeat: -1 })
                comboMultiplier = 0;
            }
        })


        const jumpLogic = () => {
            if (this.howToPlayText) {
                this.howToPlayText.destroy()
            }
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

            if (this.sonic.body.blocked.down) {
                this.sound.play("hurt", { volume: 0.5 });
                this.cityAmbience.stop();
                this.registry.set("score", this.score)
                this.scene.start("gameover")
                return
            }
            this.sound.play("destroy", { volume: 0.5 });


            this.sound.play("hyper-ring", { volume: 0.5 });

            motobug.destroy();

            const baseScore = 10;
            comboMultiplier += 1
            if (comboMultiplier > 1) {
                this.multiplierText.setText(`+${baseScore}`)

            } else {
                this.multiplierText.setText(`x${comboMultiplier}`)
            }
            this.score += baseScore * comboMultiplier
            this.scoreText.setText(`SCORE: ${this.score}`)
            this.sonic.jump(true)
            this.time.delayedCall(700, () => {
                this.multiplierText.setText("")
            })

        })

        this.physics.add.collider(this.sonic, this.rings, (player, ring) => {
            this.sound.play("ring", { volume: 0.5 });
            ring.destroy();
            this.score += 1
            this.scoreText.setText(`SCORE: ${this.score}`)
        })


        this.time.delayedCall(1000, () => {
            spawnObstaclesPeriodically()
        })

        const increaseGameSpeed = () => {
            if (this.speed > maxSpeed) {
                return
            }
            this.speed += 0.02
            this.time.delayedCall(Phaser.Math.Between(1000, 2000), () => {
                increaseGameSpeed()
            })
        }
        increaseGameSpeed()
    }

    update(_, delta) {

        this.multiplierText.setPosition(this.sonic.x + 70, this.sonic.y - 100);


        this.background.tilePositionX += 0.05 * delta;
        this.platforms.tilePositionX += this.speed * delta;


        for (const motobug of this.motobugs.children) {

            if (motobug.x < 0) {
                motobug.destroy()
                continue;
            }
            const speedBoost = this.speed
                < 0.4 ? 6 : 5;

            motobug.x -= speedBoost * this.speed * delta;
        }

        for (const ring of this.rings.children) {
            if (ring.x < 0) {
                ring.destroy()
                continue;
            }
            ring.x -= 4 * this.speed * delta;
        }
    }
}