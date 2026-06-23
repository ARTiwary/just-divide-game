# 🎮 Just Divide Game

An interactive number puzzle game built with **React**, where players place tiles on a 4×4 grid and use division-based logic to clear the board and score points.
🔗 Live Demo: https://artiwary-just-divide-game-8x56.vercel.app/  
---

## 🧠 Overview

Just Divide is a logic puzzle game where numbers interact using mathematical rules.
The goal is to clear tiles strategically and achieve the highest score possible in one go.

---

## 🎯 Objective

* Place number tiles on the grid
* Use division-based merging logic
* Manage space using KEEP and TRASH
* Survive as long as possible and maximize score

---

## 🔢 Merge Rules

* Same numbers → both tiles are removed and score increases
* If numbers are divisible:

  * Larger ÷ smaller
  * If result = 1 → both disappear
  * Else → larger tile becomes result

---

## ✨ Features 

* 🎯 Drag & Drop + Touch support
* 🧩 Custom division-based merge system
* 💡 Hint system for valid moves
* ♻️ Undo functionality
* 🗑️ Limited trash system
* 📦 Keep slot system
* ⏱️ Timer tracking
* 🏆 Best score saved (localStorage)
* 📈 Level progression
* 📱 Fully responsive UI

---

## 🕹️ Controls

| Action       | Control           |
| ------------ | ----------------- |
| Place Tile   | Drag & Drop / Tap |
| Keep Tile    | Drag to KEEP      |
| Delete Tile  | Drag to TRASH     |
| Undo         | `Z`               |
| New Game     | `R`               |
| Toggle Hints | `G`               |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash id="clone2"
git clone https://github.com/ARTiwary/just-divide-game.git
cd just-divide-game
```

### 2. Install dependencies

```bash id="install2"
npm install
```

### 3. Run the project

```bash id="run2"
npm start
```

---

## 🛠️ Tech Stack

* React (Hooks)
* JavaScript (ES6+)
* CSS (Custom styling)

---

## 📸 UI Preview

### 🎮 Gameplay Screen

![Gameplay Screenshot](./eklavaya/screenshots/gameplay.png)

---

## 📌 Future Improvements

* 🔊 Sound effects
* 🌐 Online leaderboard
* 🎵 Background music
* 🎯 Difficulty levels
* 📲 PWA support

---

## 👨‍💻 Author

**Ayush Tiwary**

---

## 📄 License

This project is open-source. 
