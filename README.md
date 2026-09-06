# Retro CRT Terminal Task Tracker

A highly stylized, browser-based task management application featuring a tactile mechanical hardware UI and an immersive retro CRT monitor aesthetic. Built with React, Tailwind CSS, and Framer Motion.

## Features

- **CRT Terminal UI:** Immersive retro display with scanlines, static noise overlays, vignette, and phosphor glow effects.
- **Dynamic Glitch Animations:** Authentic horizontal tracking tears and brightness flickering when switching pages.
- **Dual Display Modes:** Toggle between Standard (Green Phosphor) and Late Night (Red Phosphor) themes.
- **Hardware-Style Controls:** Tactile, mechanical "recessed" buttons for pagination and system toggles.
- **Data Portability (Import / Export):** Export your active checklist to a `.txt` file, and seamlessly import markdown-style checklists back into the terminal.
- **Offline-First:** All tasks and field notes are securely persisted in your browser's local storage.
- **Field Notes:** A built-in scratchpad matching the terminal's typography and glow for quick operational notes.

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) installed on your local machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```

2. Navigate into the project directory:
   ```bash
   cd crt-task-tracker
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The compiled assets will be output to the `dist` directory.

## License

This project is open-source and available under the [MIT License](LICENSE).
