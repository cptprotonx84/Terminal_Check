# Terminal Check

A highly stylized, browser-based task management application featuring a tactile mechanical hardware UI and an immersive retro CRT monitor aesthetic. Built with React 19, Tailwind CSS, and Framer Motion.

## Features

- **CRT Terminal UI:** Immersive retro display with scanlines, static noise overlays, vignette, and phosphor glow effects.
- **Dynamic Glitch Animations:** Authentic horizontal tracking tears and brightness flickering when switching pages. Respects `prefers-reduced-motion` for accessibility.
- **Dual Display Modes:** Toggle between Standard (Green Phosphor) and Late Night (Red Phosphor) themes.
- **Hardware-Style Controls:** Tactile, mechanical "recessed" buttons for pagination and system toggles.
- **JSON Backup System:** Perform lossless backups of your entire session to a `.json` file (`schemaVersion: 1`), and restore it at any time with validation and safety checks.
- **Markdown Handoff (Import / Export):** Export your active checklist to a `.txt` file, and seamlessly import markdown-style checklists back into the terminal for human-readable handoffs.
- **Offline-First:** All tasks, project names, and field notes are securely persisted in your browser's local storage automatically.
- **Field Notes:** A built-in scratchpad matching the terminal's typography and glow for quick operational notes.

## Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 4
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) installed on your local machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cptprotonx84/Terminal_Check.git
   ```

2. Navigate into the project directory:
   ```bash
   cd Terminal_Check
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

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

## Persistence and Data Portability

- **Local Storage:** The application auto-saves changes locally.
- **JSON Backup:** Use the `BACKUP` and `RESTORE` controls to download a comprehensive `.json` file containing the precise state of all tasks, categories, and settings.
- **Markdown Handoff:** Use `EXPORT TXT` and `IMPORT TXT` to transfer data via simplified text formats.

## License

This project is open-source and available under the [MIT License](LICENSE).
