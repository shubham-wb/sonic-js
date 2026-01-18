import { maniaTextConfig, RANKS } from "../constants";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "gameover" });
    }

    addScoreText(posX, posY, text) {
        this.add
            .text(posX, posY, text, {
                ...maniaTextConfig,
                fontSize: 64,
            })
            .setOrigin(0.5);
    }

    addScoreBox(posX, posY, rankText) {
        const box = this.add.rectangle(posX, posY, 500, 500, "#000000");
        box.setOrigin(0.5);
        box.setStrokeStyle(4, 0xffffff);
        const rank = this.add.text(box.x, box.y, rankText, {
            ...maniaTextConfig,
            fontSize: 128,
        });
        rank.setOrigin(0.5);
    }

    create() {
        const score = this.registry.get("score");
        const bestScoreData = localStorage.getItem("best-score");
        let bestScore = JSON.parse(bestScoreData)?.value ?? 0;

        if (bestScore < score) {
            localStorage.setItem("best-score", JSON.stringify({ value: score }));
            bestScore = score;
        }

        let currentRank = "F";
        let bestRank = "F";

        for (const grade in RANKS) {
            const value = RANKS[grade];
            if (value < score) currentRank = grade;
            if (value < bestScore) bestRank = grade;
        }

        const centerPos = { x: this.scale.width / 2, y: this.scale.height / 2 };
        const gameOverText = this.add.text(centerPos.x, 100, "GAME OVER!", {
            ...maniaTextConfig,
            fontSize: 96,
        });
        gameOverText.setOrigin(0.5);

        this.addScoreText(centerPos.x - 500, 250, `CURRENT SCORE : ${score}`);
        this.addScoreText(centerPos.x + 500, 250, `BEST SCORE : ${bestScore}`);
        this.addScoreBox(centerPos.x - 500, 600, currentRank);
        this.addScoreBox(centerPos.x + 500, 600, bestRank);

        this.time.delayedCall(1000, () => {
            this.add
                .text(centerPos.x, 950, "Press Space/Click/Touch to Play Again", {
                    ...maniaTextConfig,
                    fontSize: 64,
                })
                .setOrigin(0.5);

            const restartGame = () => {
                this.scene.start("game");
            };
            this.input.keyboard.on("keydown-SPACE", restartGame);
            this.input.on("pointerdown", restartGame);
        });
    }
}