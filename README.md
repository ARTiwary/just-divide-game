# 🎮 Just Divide Game

A fun and interactive number puzzle game built with **React**, where players strategically place tiles and use division logic to clear the board and score points.

---

## 🧠 Concept

The goal is simple:

* Place number tiles on a 4×4 grid
* Merge tiles using **division rules**
* Clear tiles and maximize your score

### 🔢 Merge Rules

* Same numbers → both disappear → score increases
* Divisible numbers → larger ÷ smaller

  * If result = 1 → both disappear
  * Else → replaced with result

---

## ✨ Features

* 🎯 Drag & Drop + Touch support
* 🧩 Smart merge logic (division-based gameplay)
* 💡 Hint system for possible moves
* ♻️ Undo functionality
* 🗑️ Trash system (limited deletes)
* 📦 Keep slot to store tiles
* ⏱️ Timer tracking
* 🏆 Best score saved (localStorage)
* 📈 Level progression system
* 📱 Responsive UI

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

### 1. Clone the repo

```bash
git clone https://github.com/ARTiwary/just-divide-game.git
cd just-divide-game
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project

```bash
npm start
```

---

## 🛠️ Tech Stack

* React (Hooks)
* JavaScript (ES6+)
* CSS (Custom styling, no frameworks)

---

## 📸 Screenshots (Recommended)

Add screenshots for better presentation:

### Suggested images:

* 🟩 Gameplay grid
* 🟪 Drag & drop action
* 🟥 Game over screen
* 🟦 Mobile view

> Save them in a `/screenshots` folder and reference like:

```md
![Gameplay](./screenshots/gameplay.png)
```

---

## 🎨 UI Highlights

* Custom animated UI
* Soft pastel theme with playful design
* Fully custom-built components (no UI libraries)
* Unique cat mascot created using pure CSS


## 👨‍💻 Author

Developed by **Ayush Raj Tiwary**

---

## 📄 License

This project is open-source and available under the MIT License.
