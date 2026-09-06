import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Check, Terminal, Moon, Sun, Download, Upload } from 'lucide-react';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type Category = {
  id: string;
  title: string;
  tasks: Task[];
};

const INITIAL_DATA: Category[] = [
  {
    id: "phase1",
    title: "Phase 1 — Project Foundation",
    tasks: [
      { id: "p1-1", text: "Godot 4.6.3 project launches successfully.", completed: true },
      { id: "p1-2", text: "PC-first 16:9 layout established.", completed: true },
      { id: "p1-3", text: "Reusable crew data and crew cards created.", completed: true },
      { id: "p1-4", text: "Four prototype crew members implemented.", completed: true },
      { id: "p1-5", text: "One Fractured Asteroid Survey mission created.", completed: true },
      { id: "p1-6", text: "Project scope and deferred ideas recorded in PROJECT_HANDOFF.md.", completed: true },
    ]
  },
  {
    id: "phase2",
    title: "Phase 2 — Assignment System",
    tasks: [
      { id: "p2-1", text: "Two assignment slots.", completed: true },
      { id: "p2-2", text: "Assign and remove crew.", completed: true },
      { id: "p2-3", text: "Prevent duplicate assignments.", completed: true },
      { id: "p2-4", text: "Prevent assignment beyond two slots.", completed: true },
      { id: "p2-5", text: "Allow only available crew.", completed: true },
      { id: "p2-6", text: "Calculate combined Science and Mobility.", completed: true },
      { id: "p2-7", text: "Show mission requirements without blocking underqualified teams.", completed: true },
      { id: "p2-8", text: "Reusable roster scrolling at 1280×720.", completed: true },
    ]
  },
  {
    id: "phase3",
    title: "Phase 3 — Deployment and Timer",
    tasks: [
      { id: "p3-1", text: "Start Mission requires two assigned crew.", completed: true },
      { id: "p3-2", text: "Assigned crew become DEPLOYED.", completed: true },
      { id: "p3-3", text: "Assignment controls lock during deployment.", completed: true },
      { id: "p3-4", text: "Deterministic 20-second mission timer.", completed: true },
      { id: "p3-5", text: "Visible progress percentage and remaining time.", completed: true },
      { id: "p3-6", text: "Scripted interruption at exactly 50%.", completed: true },
      { id: "p3-7", text: "Mission progress pauses at exactly 10 seconds remaining.", completed: true },
      { id: "p3-8", text: "Acknowledgement resumes from the exact paused point.", completed: true },
      { id: "p3-9", text: "Interruption triggers only once per deployment.", completed: true },
      { id: "p3-10", text: "Prototype Reset restores the test state.", completed: true },
      { id: "p3-11", text: "Mission completion at 100% remains intentionally unfinished.", completed: true },
    ]
  },
  {
    id: "phase4",
    title: "Phase 4 — Initial Comms Presentation",
    tasks: [
      { id: "p4-1", text: "Reusable CommsOverlay.", completed: true },
      { id: "p4-2", text: "Deterministic slot-one transmitter.", completed: true },
      { id: "p4-3", text: "Initials portrait placeholder.", completed: true },
      { id: "p4-4", text: "Crew name and mission transmission.", completed: true },
      { id: "p4-5", text: "Opaque charcoal modal.", completed: true },
      { id: "p4-6", text: "Background dimming.", completed: true },
      { id: "p4-7", text: "Left-aligned dialogue.", completed: true },
      { id: "p4-8", text: "Clear Acknowledge priority.", completed: true },
      { id: "p4-9", text: "Prototype Reset separated into a quiet footer.", completed: true },
      { id: "p4-10", text: "Manual visual inspection completed successfully.", completed: true },
    ]
  },
  {
    id: "phase5",
    title: "Phase 5 — Selected Crew Clarity (In Progress)",
    tasks: [
      { id: "p5-1", text: "Subtle occupied-slot highlighting.", completed: false },
      { id: "p5-2", text: "REMOVE CREW before deployment.", completed: false },
      { id: "p5-3", text: "Amber emphasis for the available removal action.", completed: false },
      { id: "p5-4", text: "CREW LOCKED during active or paused missions.", completed: false },
      { id: "p5-5", text: "Neutral appearance for empty slots.", completed: false },
      { id: "p5-6", text: "Automated checks for empty, removable, and locked states.", completed: false },
      { id: "p5-7", text: "Updated handoff and complete test-suite result.", completed: false },
    ]
  },
  {
    id: "phase5-check",
    title: "First Check When You Return",
    tasks: [
      { id: "p5c-1", text: "Assign one crew member and confirm the occupied slot becomes visually distinct.", completed: false },
      { id: "p5c-2", text: "Confirm the active button reads REMOVE CREW.", completed: false },
      { id: "p5c-3", text: "Remove the crew member and confirm the slot returns to neutral.", completed: false },
      { id: "p5c-4", text: "Assign two crew and start the mission.", completed: false },
      { id: "p5c-5", text: "Confirm both actions change to CREW LOCKED.", completed: false },
      { id: "p5c-6", text: "Confirm the occupied highlighting remains visible during deployment.", completed: false },
      { id: "p5c-7", text: "Trigger the interruption and ensure those locked states remain correct behind it.", completed: false },
      { id: "p5c-8", text: "Reset and confirm both slots return to their empty state.", completed: false },
    ]
  },
  {
    id: "phase6",
    title: "Phase 6 — Command Choices (Next)",
    tasks: [
      { id: "p6-1", text: "Replace the acknowledgement-only interaction with the three authored responses.", completed: false },
      { id: "p6-2", text: "Follow the second signal.", completed: false },
      { id: "p6-3", text: "Withdraw immediately.", completed: false },
      { id: "p6-4", text: "Hold position and launch the survey drone.", completed: false },
      { id: "p6-5", text: "Present choices as vertically stacked, wrapped buttons.", completed: false },
      { id: "p6-6", text: "Give all narrative choices equal visual weight.", completed: false },
      { id: "p6-7", text: "Record a stable choice ID.", completed: false },
      { id: "p6-8", text: "Close the overlay after selection.", completed: false },
      { id: "p6-9", text: "Resume or terminate mission progression according to the selected command.", completed: false },
      { id: "p6-10", text: "Prevent multiple selections.", completed: false },
      { id: "p6-11", text: "Preserve reset and replay behavior.", completed: false },
    ]
  },
  {
    id: "phase7",
    title: "Phase 7 — Mission Resolution",
    tasks: [
      { id: "p7-1", text: "Transition out of MISSION ACTIVE at 100%.", completed: false },
      { id: "p7-2", text: "Determine the outcome from team stats, selected choice, and relevant traits.", completed: false },
      { id: "p7-3", text: "Keep outcomes authored and deterministic.", completed: false },
      { id: "p7-4", text: "Handle immediate withdrawal correctly.", completed: false },
      { id: "p7-5", text: "Handle prototype drone availability and use.", completed: false },
      { id: "p7-6", text: "Return deployed crew to the appropriate status.", completed: false },
      { id: "p7-7", text: "Prevent the mission from remaining stuck at 0s REMAINING.", completed: false },
    ]
  },
  {
    id: "phase8",
    title: "Phase 8 — Consequences and Operation Report",
    tasks: [
      { id: "p8-1", text: "Display success, partial success, withdrawal, or failure.", completed: false },
      { id: "p8-2", text: "Name the selected command.", completed: false },
      { id: "p8-3", text: "Explain the relevant team stats.", completed: false },
      { id: "p8-4", text: "Explain any trait interaction.", completed: false },
      { id: "p8-5", text: "Apply and display readiness changes.", completed: false },
      { id: "p8-6", text: "Apply and display trust changes.", completed: false },
      { id: "p8-7", text: "Show the 300-credit reward or why it was reduced/lost.", completed: false },
      { id: "p8-8", text: "Ensure consequences are understandable without hidden randomness.", completed: false },
    ]
  },
  {
    id: "phase9",
    title: "Phase 9 — Replay and First Milestone Audit",
    tasks: [
      { id: "p9-1", text: "Replay the complete loop without restarting Godot.", completed: false },
      { id: "p9-2", text: "Verify every command choice reaches a valid result.", completed: false },
      { id: "p9-3", text: "Verify trust affects one later line or small replay modifier.", completed: false },
      { id: "p9-4", text: "Check 1280×720, 1600×900, and 1920×1080.", completed: false },
      { id: "p9-5", text: "Perform normal GUI inspection.", completed: false },
      { id: "p9-6", text: "Check runtime errors and warnings.", completed: false },
      { id: "p9-7", text: "Update the final milestone handoff.", completed: false },
      { id: "p9-8", text: "Confirm every First Playable Dispatch Loop completion criterion.", completed: false },
    ]
  },
  {
    id: "after-loop",
    title: "After the First Playable Loop",
    tasks: [
      { id: "al-1", text: "Character portraits and communication poses", completed: false },
      { id: "al-2", text: "Sector-map graphics and mission markers", completed: false },
      { id: "al-3", text: "Finalized terminal typography and framing", completed: false },
      { id: "al-4", text: "Animation, signal interference, and restrained glow", completed: false },
      { id: "al-5", text: "Sound design and voice presentation", completed: false },
      { id: "al-6", text: "Additional missions and relationship scenes", completed: false },
      { id: "al-7", text: "Mining, navigation, probes, wormholes, K₃ mechanics, observer effects, AI Voyager systems, and fleet management.", completed: false },
    ]
  }
];

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLateNight, setIsLateNight] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notes, setNotes] = useState("");
  const [newTaskText, setNewTaskText] = useState("");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [newTaskCategory, setNewTaskCategory] = useState("phase1");
  const [projectName, setProjectName] = useState("Project Handoff");
  const [isEditingName, setIsEditingName] = useState(false);
  const [backupStatus, setBackupStatus] = useState<string | null>(null);
  const [pendingBackupData, setPendingBackupData] = useState<any | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const savedData = localStorage.getItem('project-handoff-tasks');
    if (savedData) {
      try {
        setCategories(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved tasks", e);
        setCategories(INITIAL_DATA);
      }
    } else {
      setCategories(INITIAL_DATA);
    }
    
    const savedNightMode = localStorage.getItem('project-night-mode');
    if (savedNightMode === 'true') {
      setIsLateNight(true);
    }

    const savedNotes = localStorage.getItem('project-handoff-notes');
    if (savedNotes) {
      setNotes(savedNotes);
    }

    const savedProjectName = localStorage.getItem('project-handoff-name');
    if (savedProjectName) {
      setProjectName(savedProjectName);
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('project-handoff-tasks', JSON.stringify(categories));
    }
  }, [categories, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('project-night-mode', isLateNight.toString());
    }
  }, [isLateNight, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('project-handoff-notes', notes);
    }
  }, [notes, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('project-handoff-name', projectName);
    }
  }, [projectName, isLoaded]);

  const toggleTask = (categoryId: string, taskId: string) => {
    setCategories(prev => prev.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          tasks: category.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return category;
    }));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    setCategories(prev => prev.map(category => {
      if (category.id === newTaskCategory) {
        return {
          ...category,
          tasks: [
            ...category.tasks,
            {
              id: `custom-${Date.now()}`,
              text: newTaskText.trim(),
              completed: false
            }
          ]
        };
      }
      return category;
    }));
    
    setNewTaskText("");
  };

  const playMechanicalClick = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const bufferSize = audioCtx.sampleRate * 0.05;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const bandpass = audioCtx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 800;
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
      noise.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start();
    } catch (e) {
      console.warn("Audio error", e);
    }
  };

  const handlePrevPage = () => {
    playMechanicalClick();
    setCurrentPageIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    playMechanicalClick();
    setCurrentPageIndex(prev => Math.min(categories.length - 1, prev + 1));
  };

  const handleExport = () => {
    let content = `${projectName}\n\n`;
    categories.forEach(cat => {
      content += `${cat.title}\n`;
      cat.tasks.forEach(t => {
        content += `- [${t.completed ? 'x' : ' '}] ${t.text}\n`;
      });
      content += "\n";
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '_').toLowerCase()}_export.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const lines = text.split('\n');
        let currentCategory: Category | null = null;
        const newCategories: Category[] = [];

        for (let i = 0; i < lines.length; i++) {
          let line = lines[i].trim();
          if (!line) continue;
          
          if (i === 0 && !/^([-*]|\d+\.)\s+/.test(line) && !line.includes('[')) {
             setProjectName(line);
             continue;
          }

          const isTask = /^([-*]|\d+\.)\s+/.test(line);
          
          if (isTask) {
            let completed = false;
            let taskText = line.replace(/^([-*]|\d+\.)\s+/, '');
            
            if (taskText.startsWith('[x] ') || taskText.startsWith('[X] ')) {
              completed = true;
              taskText = taskText.substring(4);
            } else if (taskText.startsWith('[ ] ')) {
              taskText = taskText.substring(4);
            }
            
            if (!currentCategory) {
              currentCategory = { id: `cat-${Date.now()}`, title: 'Imported Tasks', tasks: [] };
              newCategories.push(currentCategory);
            }
            
            currentCategory.tasks.push({
              id: `task-${Date.now()}-${Math.random()}`,
              text: taskText,
              completed
            });
          } else {
            currentCategory = {
              id: `cat-${Date.now()}-${Math.random()}`,
              title: line,
              tasks: []
            };
            newCategories.push(currentCategory);
          }
        }

        if (newCategories.length > 0) {
          setCategories(newCategories);
          setCurrentPageIndex(0);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportBackup = () => {
    const backupData = {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      projectName,
      categories,
      notes,
      isLateNight,
      currentPageIndex
    };
    
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_backup.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const data = JSON.parse(text);
        
        if (data.schemaVersion !== 1 || !data.categories || !data.projectName) {
          setBackupStatus("ERROR: INVALID BACKUP SCHEMA");
          setTimeout(() => setBackupStatus(null), 4000);
          return;
        }

        setPendingBackupData(data);
        setBackupStatus(null);
      } catch (err) {
        setBackupStatus("ERROR: MALFORMED JSON DATA");
        setTimeout(() => setBackupStatus(null), 4000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const confirmImportBackup = () => {
    if (!pendingBackupData) return;
    
    const { projectName: pName, categories: pCats, notes: pNotes, isLateNight: pNight, currentPageIndex: pIndex } = pendingBackupData;
    
    setProjectName(pName);
    setCategories(pCats);
    setNotes(pNotes || "");
    setIsLateNight(!!pNight);
    
    const safeIndex = Math.max(0, Math.min(pCats.length - 1, pIndex || 0));
    setCurrentPageIndex(safeIndex);
    
    localStorage.setItem('project-handoff-tasks', JSON.stringify(pCats));
    localStorage.setItem('project-handoff-notes', pNotes || "");
    localStorage.setItem('project-handoff-name', pName);
    localStorage.setItem('project-night-mode', (!!pNight).toString());
    
    setPendingBackupData(null);
    setBackupStatus("BACKUP RESTORED SUCCESSFULLY");
    setTimeout(() => setBackupStatus(null), 3000);
  };

  const cancelImportBackup = () => {
    setPendingBackupData(null);
    setBackupStatus(null);
  };

  useEffect(() => {
    if (categories[currentPageIndex]) {
      setNewTaskCategory(categories[currentPageIndex].id);
    }
  }, [currentPageIndex, categories]);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-2 sm:p-4 lg:p-8">
      <div className="metal-surface w-full max-w-6xl rounded-[2rem] p-4 sm:p-6 lg:p-8 flex flex-col gap-6 relative shadow-2xl">
        <div className="metal-texture-noise"></div>
        
        {/* CRT Monitor Area */}
        <div className={`crt-container w-full flex flex-col relative transition-colors duration-700 h-[65vh] ${isLateNight ? 'crt-theme-red text-red-500' : 'crt-theme-green text-green-500'}`}>
          <div className="crt-overlay"></div>
          <div className="crt-static"></div>
          <div className="crt-vignette"></div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={categories[currentPageIndex]?.id || 'empty'}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, skewX: 3, filter: 'brightness(2.5)' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { 
                opacity: [0, 1, 0.4, 1, 0.9, 1],
                skewX: [3, -2, 1.5, -0.5, 0],
                x: [4, -3, 2, -1, 0],
                y: [5, -2, 1, -1, 0],
                filter: [
                  'brightness(2.5) hue-rotate(15deg)', 
                  'brightness(0.5)', 
                  'brightness(1.8)', 
                  'brightness(0.9)', 
                  'brightness(1)'
                ]
              }}
              exit={shouldReduceMotion ? { opacity: 0, transition: { duration: 0.15 } } : { opacity: 0, x: -4, y: -5, filter: 'brightness(3)', transition: { duration: 0.15 } }}
              transition={shouldReduceMotion ? { duration: 0.3 } : { duration: 0.35, times: [0, 0.2, 0.4, 0.6, 1], ease: "easeInOut" }}
              className="relative z-10 p-4 sm:p-8 overflow-y-auto w-full h-full flex flex-col custom-scrollbar"
            >
              
              {/* Header */}
            <header className={`flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 ${isLateNight ? 'border-red-500/50' : 'border-green-500/50'} pb-6 mb-10 mt-2`}>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <motion.div 
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <Terminal className={`w-8 h-8 sm:w-12 sm:h-12 ${!isLateNight ? 'text-glow' : 'text-glow-red'}`} />
                </motion.div>
                <div className="flex-1">
                  {isEditingName ? (
                    <input
                      autoFocus
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      onBlur={() => setIsEditingName(false)}
                      onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingName(false); }}
                      className={`text-2xl sm:text-4xl font-bold tracking-tight uppercase bg-black/40 border ${isLateNight ? 'border-red-500/50 text-red-500 focus:ring-red-500/30' : 'border-green-500/50 text-green-500 focus:ring-green-500/30'} rounded px-2 outline-none w-full max-w-[280px]`}
                    />
                  ) : (
                    <motion.h1 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      onClick={() => setIsEditingName(true)}
                      className={`text-2xl sm:text-4xl font-bold tracking-tight uppercase cursor-pointer hover:opacity-80 transition-opacity ${!isLateNight ? 'text-glow text-green-500' : 'text-glow-red text-red-500'}`}
                      title="Click to edit project name"
                    >
                      {projectName}
                    </motion.h1>
                  )}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-xs sm:text-sm mt-1 flex items-center gap-2 opacity-80"
                  >
                    <span className={`inline-block w-2 h-4 ${isLateNight ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                    SYSTEM_STATUS: ONLINE | SYNC: LOCAL
                  </motion.div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-4 sm:mt-0 flex-wrap justify-end">
                <label className={`cursor-pointer flex items-center gap-2 px-3 py-2 border ${isLateNight ? 'border-red-500/50 hover:bg-red-500/10' : 'border-green-500/50 hover:bg-green-500/10'} transition-colors uppercase text-xs sm:text-sm rounded-sm`} title="Import Markdown Handoff">
                  IMPORT TXT
                  <input type="file" accept=".txt" className="hidden" onChange={handleImport} />
                </label>
                <button
                  onClick={handleExport}
                  className={`flex items-center gap-2 px-3 py-2 border ${isLateNight ? 'border-red-500/50 hover:bg-red-500/10' : 'border-green-500/50 hover:bg-green-500/10'} transition-colors uppercase text-xs sm:text-sm rounded-sm`}
                  title="Export Markdown Handoff"
                >
                  EXPORT TXT
                </button>
                <div className={`hidden lg:block mx-1 w-px h-6 opacity-30 ${isLateNight ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <label className={`cursor-pointer flex items-center gap-2 px-3 py-2 border ${isLateNight ? 'border-red-500/50 hover:bg-red-500/10' : 'border-green-500/50 hover:bg-green-500/10'} transition-colors uppercase text-xs sm:text-sm rounded-sm`} title="Import JSON Backup">
                  <Upload className="w-4 h-4 hidden sm:block" />
                  RESTORE
                  <input type="file" accept=".json" className="hidden" onChange={handleImportBackup} />
                </label>
                <button
                  onClick={handleExportBackup}
                  className={`flex items-center gap-2 px-3 py-2 border ${isLateNight ? 'border-red-500/50 hover:bg-red-500/10' : 'border-green-500/50 hover:bg-green-500/10'} transition-colors uppercase text-xs sm:text-sm rounded-sm`}
                  title="Export JSON Backup"
                >
                  <Download className="w-4 h-4 hidden sm:block" />
                  BACKUP
                </button>
                <div className={`hidden sm:block mx-1 w-px h-6 opacity-30 ${isLateNight ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <button
                  onClick={() => setIsLateNight(!isLateNight)}
                  className={`flex items-center gap-2 px-3 py-2 border ${isLateNight ? 'border-red-500/50 hover:bg-red-500/10' : 'border-green-500/50 hover:bg-green-500/10'} transition-colors uppercase text-xs sm:text-sm rounded-sm ml-0 sm:ml-2`}
                  aria-label="Toggle Late Night Mode"
                >
                  {isLateNight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {isLateNight ? 'STD' : 'NIGHT'}
                </button>
              </div>
            </header>
            
            {backupStatus && (
              <div className={`mb-6 p-4 border font-bold text-sm tracking-wider uppercase animate-pulse ${isLateNight ? 'bg-red-950/40 border-red-500 text-red-500 text-glow-red' : 'bg-green-950/40 border-green-500 text-green-500 text-glow'}`}>
                {backupStatus}
              </div>
            )}

            {pendingBackupData && (
              <div className={`mb-6 p-6 border rounded-sm flex flex-col gap-4 ${isLateNight ? 'bg-black/80 border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-black/80 border-green-500/80 shadow-[0_0_15px_rgba(34,197,94,0.2)]'}`}>
                <h3 className={`text-lg font-bold uppercase tracking-widest flex items-center gap-2 ${isLateNight ? 'text-red-400' : 'text-green-400'}`}>
                  <Terminal className="w-5 h-5" />
                  WARNING: OVERWRITE DETECTED
                </h3>
                <p className="opacity-80 text-sm font-mono leading-relaxed">
                  You are about to restore a complete project backup. This will permanently overwrite the current active session data.
                  <br /><br />
                  <span className="opacity-60 text-xs">TARGET:</span> {pendingBackupData.projectName}
                  <br />
                  <span className="opacity-60 text-xs">TIMESTAMP:</span> {new Date(pendingBackupData.exportedAt).toLocaleString()}
                </p>
                <div className="flex gap-4 mt-2">
                  <button onClick={confirmImportBackup} className={`px-4 py-2 border font-bold uppercase text-xs transition-colors ${isLateNight ? 'bg-red-500/20 border-red-500 hover:bg-red-500/40' : 'bg-green-500/20 border-green-500 hover:bg-green-500/40'}`}>
                    CONFIRM OVERWRITE
                  </button>
                  <button onClick={cancelImportBackup} className={`px-4 py-2 border font-bold uppercase text-xs transition-colors ${isLateNight ? 'border-red-500/40 text-red-500/60 hover:bg-red-500/10' : 'border-green-500/40 text-green-500/60 hover:bg-green-500/10'}`}>
                    ABORT
                  </button>
                </div>
              </div>
            )}

            {/* Task List */}
            <div className="flex-1 pb-16">
              {categories.length > 0 && categories[currentPageIndex] && (() => {
                const category = categories[currentPageIndex];
                const completedCount = category.tasks.filter(t => t.completed).length;
                const totalCount = category.tasks.length;
                const isFullyComplete = completedCount === totalCount && totalCount > 0;
                
                return (
                  <section className="relative">
                    {/* Category Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <h2 className={`text-xl sm:text-2xl font-bold border-l-4 pl-3 uppercase tracking-wider
                          ${isFullyComplete 
                            ? (isLateNight ? 'border-red-500/50 text-red-500/70' : 'border-green-500/50 text-green-500/70') 
                            : (isLateNight ? 'border-red-500 text-red-400' : 'border-green-500 text-green-400')}
                          ${!isFullyComplete ? (isLateNight ? 'text-glow-red' : 'text-glow') : ''}
                        `}>
                          {category.title}
                          {isFullyComplete && !category.title.includes('✅') && " ✅"}
                        </h2>
                        <div className={`flex-1 border-t border-dashed ${isLateNight ? 'border-red-500/30' : 'border-green-500/30'}`} />
                        <div className={`text-sm font-bold px-2 py-1 rounded ${isLateNight ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                          [{completedCount}/{totalCount}]
                        </div>
                      </div>

                      {/* Tasks Container */}
                      <div className={`border p-4 rounded-sm ${isLateNight ? 'bg-red-950/10 border-red-500/20' : 'bg-green-950/10 border-green-500/20'}`}>
                        <div className="grid gap-2">
                          {category.tasks.map((task) => (
                            <TaskItem 
                              key={task.id} 
                              task={task} 
                              onToggle={() => toggleTask(category.id, task.id)}
                              isLateNight={isLateNight}
                            />
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                })()}
            </div>
            
            {/* Footer */}
            <footer className={`mt-8 pt-8 border-t text-center text-xs opacity-60 pb-8 ${isLateNight ? 'border-red-500/30' : 'border-green-500/30'}`}>
              <p>End of file. All data persisted locally.</p>
            </footer>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hardware Control Strip (Pagination) */}
        <div className="pagination-recess rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-zinc-600/20 border-l border-zinc-700/30 relative z-10 text-zinc-300 shadow-[20px_20px_60px_-10px_rgba(0,0,0,0.8)]">
          <button 
            onClick={handlePrevPage} 
            disabled={currentPageIndex === 0}
            className="mech-btn-amber font-bold uppercase text-sm px-8 py-5 rounded-sm flex-shrink-0"
          >
            &lt; PREV
          </button>

          <div className="flex-1 flex justify-center items-center gap-3 sm:gap-5 flex-wrap px-4">
            {categories.map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="text-[11px] font-sans text-zinc-500 font-bold leading-none tracking-tighter">{(i + 1).toString().padStart(2, '0')}</div>
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-black transition-all duration-300 relative
                  ${currentPageIndex === i 
                    ? 'bg-amber-400 shadow-[10px_10px_20px_rgba(251,191,36,0.3),0_0_10px_rgba(251,191,36,0.9),inset_0_2px_4px_rgba(255,255,255,0.6)]' 
                    : 'bg-amber-950/60 shadow-inner opacity-60'}
                `} />
              </div>
            ))}
          </div>

          <button 
            onClick={handleNextPage} 
            disabled={currentPageIndex === categories.length - 1}
            className={`${isLateNight ? 'mech-btn-amber' : 'mech-btn'} font-bold uppercase text-sm px-8 py-5 rounded-sm flex-shrink-0`}
          >
            NEXT &gt;
          </button>
        </div>

        {/* Metallic Control Panel */}
        <div className="metal-panel-inset rounded-xl p-4 sm:p-6 flex flex-col md:flex-row gap-6 border-t border-zinc-600/20 border-l border-zinc-700/30 relative z-10 text-zinc-300">
          
          {/* Notes Section */}
          <div className="flex-1 flex flex-col h-56 md:h-auto">
            <h3 className="text-zinc-400 font-bold mb-3 uppercase tracking-widest text-xs font-sans flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(255,0,0,0.8)]"></div>
              Field Notes
            </h3>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter operation notes..."
              className={`flex-1 w-full bg-[#050a05] border border-zinc-700/50 rounded p-3 text-sm font-mono placeholder-zinc-700 focus:outline-none transition-all resize-none shadow-inner ${isLateNight ? 'text-red-500 text-glow-red focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30' : 'text-green-500 text-glow focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30'}`}
            />
          </div>

          {/* Add New Task Section */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-zinc-400 font-bold mb-3 uppercase tracking-widest text-xs font-sans flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80 shadow-[0_0_5px_rgba(245,158,11,0.8)]"></div>
              Mission Data Entry
            </h3>
            <form onSubmit={handleAddTask} className="flex flex-col gap-4 flex-1 bg-black/40 border border-zinc-700/50 rounded p-4 shadow-inner justify-between">
              <div className="flex flex-col gap-3">
                <select 
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className={`w-full bg-black/60 border border-zinc-700 rounded p-2 text-sm font-mono text-zinc-300 focus:outline-none ${isLateNight ? 'focus:border-red-500/50' : 'focus:border-green-500/50'}`}
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
                <input 
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Task description..."
                  className={`w-full bg-black/60 border border-zinc-700 rounded p-2 text-sm font-mono text-zinc-300 placeholder-zinc-600 focus:outline-none transition-all ${isLateNight ? 'focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30' : 'focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30'}`}
                />
              </div>
              <button 
                type="submit"
                disabled={!newTaskText.trim()}
                className="w-full mt-auto bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:hover:bg-zinc-800 text-zinc-300 border border-zinc-600 rounded p-2 text-sm font-bold uppercase tracking-wider transition-colors active:scale-[0.98]"
              >
                Insert Record
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function TaskItem({ 
  task, 
  onToggle, 
  isLateNight 
}: {
  key?: React.Key;
  task: Task;
  onToggle: () => void;
  isLateNight: boolean;
}) {
  return (
    <motion.button
      layout
      onClick={onToggle}
      className={`group flex items-start gap-4 p-3 text-left w-full transition-all duration-300 relative rounded-sm
        ${task.completed ? 'bg-transparent opacity-60' : (isLateNight ? 'hover:bg-red-500/10 bg-red-500/5' : 'hover:bg-green-500/10 bg-green-500/5')}
      `}
      whileTap={{ scale: 0.99 }}
    >
      {/* Checkbox */}
      <div className={`mt-0.5 flex-shrink-0 w-6 h-6 border-2 flex items-center justify-center transition-colors
        ${task.completed 
          ? (isLateNight ? 'border-amber-500 bg-amber-950/20' : 'border-red-500 bg-red-950/20')
          : (isLateNight ? 'border-red-500 group-hover:border-red-400' : 'border-green-500 group-hover:border-green-400')}
      `}>
        <AnimatePresence>
          {task.completed && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Check strokeWidth={4} className={`w-4 h-4 ${isLateNight ? 'text-amber-500 text-glow-amber' : 'text-red-500 text-glow-red'}`} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Task Text */}
      <div className="flex-1 relative overflow-hidden">
        <span className={`text-sm sm:text-base transition-all duration-300 inline-block
          ${task.completed 
            ? (isLateNight ? 'text-red-600/70' : 'text-green-600/70')
            : (isLateNight ? 'text-red-400' : 'text-green-400')}
        `}>
          {task.text}
        </span>
        
        {/* Strikethrough Animation */}
        <AnimatePresence>
          {task.completed && (
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`absolute top-1/2 left-0 h-0.5 -mt-[1px] ${isLateNight ? 'bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.8)]' : 'bg-red-500 shadow-[0_0_5px_rgba(255,0,0,0.8)]'}`}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
