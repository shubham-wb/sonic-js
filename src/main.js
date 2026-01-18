import Phaser from "phaser"
import Loader from "./scenes/Loader"
import Game from "./scenes/Game"
import GameOver from "./scenes/GameOver"
const config = {
  width: 1920,
  height: 1080,
  backgroundColor: "#000000",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  parent: "game",
  scene: [Loader, Game, GameOver],
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 4000
      },
      debug: false
    }
  }
}

new Phaser.Game(config)