# Sonic JS

A Sonic-inspired endless runner game built with Phaser 4 and Vite.

## 🎮 Game Description

Play as Sonic in an endless runner through Chemical Plant Zone! Jump over Motobugs, collect rings, and build up your combo multiplier to achieve the highest score possible. The game features authentic Sonic sprites and progressively increasing difficulty.

## 🕹️ How to Play

- **Press SPACE** or **TAP/CLICK** to make Sonic jump
- Jump on Motobugs to destroy them and earn points
- Collect rings for bonus points
- Build up combo multipliers by destroying multiple enemies in succession
- Avoid touching enemies while grounded or it's game over!
- The game speed increases as your score grows

## ✨ Features

- **Authentic Sonic Assets**: Classic sprites and animations from the Sonic series
- **Dynamic Difficulty**: Game speed increases as you progress
- **Combo System**: Build multipliers by chaining enemy defeats
- **Multiple Collectibles**: Motobugs to destroy and rings to collect
- **Responsive Controls**: Play with keyboard (SPACE) or mouse/touch
- **Atmospheric Audio**: Background city ambience

## 🛠️ Technologies

- **Phaser 4**: Game framework (RC5)
- **Vite**: Build tool and dev server
- **JavaScript**: ES6+ module syntax

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sonic-js
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Building for Production

Build the game for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
sonic-js/
├── public/
│   ├── fonts/          # Game fonts
│   ├── graphics/       # Sprite sheets and images
│   └── sounds/         # Audio files
├── src/
│   ├── entities/       # Game entities (Sonic, Motobug, Ring)
│   ├── scenes/         # Game scenes (Loader, Game)
│   ├── constants.js    # Game constants
│   ├── utils.js        # Utility functions
│   ├── main.js         # Game initialization
│   └── style.css       # Styles
├── index.html          # Entry HTML file
└── package.json        # Dependencies and scripts
```

## 🎯 Game Mechanics

- **Base Score**: 10 points per Motobug defeated
- **Ring Score**: 1 point per ring collected
- **Combo Multiplier**: Increases with consecutive enemy defeats
- **Speed Progression**: Game speed increases with score up to a maximum threshold
- **Spawn System**: Randomly spawns Motobugs (60%) and Rings (40%)

## 🎨 Credits

Built using Sonic the Hedgehog assets and inspired by the classic Sonic games.

## 📄 License

This is a fan project for educational purposes.
