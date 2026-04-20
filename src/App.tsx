import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Zap, Activity, ChevronRight, Command, X } from 'lucide-react';

type ProjectId = 'alpha' | 'beta' | 'gamma' | 'delta' | 'epsilon' | 'zeta' | 'eta' | 'theta';

interface RevenueMeta {
  mrr: number;
  stage: string;
  target: number;
  currency: string;
}

const revenueMeta: Record<ProjectId, RevenueMeta> = {
  alpha: { mrr: 125000, stage: 'Scaling', target: 500000, currency: 'USD' },
  beta: { mrr: 45000, stage: 'Market Fit', target: 100000, currency: 'USD' },
  gamma: { mrr: 12000, stage: 'Early Traction', target: 50000, currency: 'USD' },
  delta: { mrr: 0, stage: 'Development', target: 10000, currency: 'USD' },
  epsilon: { mrr: 8500, stage: 'Beta', target: 20000, currency: 'USD' },
  zeta: { mrr: 210000, stage: 'Mature', target: 500000, currency: 'USD' },
  eta: { mrr: 3400, stage: 'Launch', target: 15000, currency: 'USD' },
  theta: { mrr: 0, stage: 'Ideation', target: 5000, currency: 'USD' },
};

interface Task {
  id: string;
  title: string;
  projectId: ProjectId;
  priority: 'low' | 'medium' | 'high' | 'now';
  laneId: string;
}

const LANES = [
  { id: 'forge', name: 'The Forge' },
  { id: 'lab', name: 'The Lab' },
  { id: 'assembly', name: 'The Assembly' },
  { id: 'grid', name: 'The Grid' },
  { id: 'launchpad', name: 'The Launchpad' },
  { id: 'market', name: 'The Market' },
  { id: 'engine', name: 'The Engine' },
  { id: 'orbit', name: 'The Orbit' },
  { id: 'archive', name: 'The Archive' },
  { id: 'vault', name: 'The Vault' },
];

const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Finalize Swarm Logic', projectId: 'alpha', priority: 'now', laneId: 'assembly' },
  { id: 't2', title: 'Design Neural Components', projectId: 'beta', priority: 'high', laneId: 'lab' },
  { id: 't3', title: 'Optimize Quantum Queries', projectId: 'gamma', priority: 'medium', laneId: 'grid' },
  { id: 't4', title: 'Holographic API Specs', projectId: 'delta', priority: 'low', laneId: 'forge' },
  { id: 't5', title: 'Deploy Cognitive Models', projectId: 'epsilon', priority: 'high', laneId: 'launchpad' },
  { id: 't6', title: 'Analyze Q3 Market Data', projectId: 'zeta', priority: 'now', laneId: 'engine' },
  { id: 't7', title: 'Synthesize Voice Samples', projectId: 'eta', priority: 'medium', laneId: 'market' },
  { id: 't8', title: 'Draft Identity Whitepaper', projectId: 'theta', priority: 'low', laneId: 'forge' },
];

const PROJECTS: Record<ProjectId, { name: string; description: string }> = {
  alpha: { name: 'Autonomous Agent Swarm', description: 'Multi-agent orchestration platform.' },
  beta: { name: 'Neural UI Generator', description: 'AI-driven interface generation.' },
  gamma: { name: 'Quantum Data Pipeline', description: 'High-throughput data processing.' },
  delta: { name: 'Holographic Display Interface', description: '3D spatial computing UI.' },
  epsilon: { name: 'Cognitive Search Engine', description: 'Context-aware enterprise search.' },
  zeta: { name: 'Predictive Market Analyzer', description: 'Financial forecasting models.' },
  eta: { name: 'Synthetic Voice Synthesizer', description: 'Ultra-realistic TTS engine.' },
  theta: { name: 'Decentralized Identity Protocol', description: 'Web3 identity verification.' },
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [isSpawnOpen, setIsSpawnOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskProject, setNewTaskProject] = useState<ProjectId>('alpha');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');
  const [selectedProject, setSelectedProject] = useState<ProjectId | null>(null);

  const handleSpawnTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: `t${Date.now()}`,
      title: newTaskTitle,
      projectId: newTaskProject,
      priority: newTaskPriority,
      laneId: 'forge',
    };
    
    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
    setIsSpawnOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-amber-500/30 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="flex-none border-b border-white/5 bg-black/50 backdrop-blur-md z-20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_15px_rgba(255,191,0,0.3)]">
            <Command className="w-4 h-4 text-black" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-widest uppercase text-white">teamDNA v2</h1>
            <p className="text-[10px] text-neutral-500 tracking-wider uppercase">Founder Operating System</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSpawnOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-medium transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(255,191,0,0.15)]"
          >
            <Plus className="w-3 h-3" />
            <span>Spawn Task</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar: Project Matrix & Revenue Meta */}
        <aside className="w-80 flex-none border-r border-white/5 bg-[#0a0a0a] overflow-y-auto hide-scrollbar flex flex-col">
          <div className="p-6">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-6">The 8-Project Matrix</h2>
            <div className="space-y-4">
              {(Object.entries(PROJECTS) as [ProjectId, {name: string, description: string}][]).map(([id, project]) => {
                const rev = revenueMeta[id];
                const isSelected = selectedProject === id;
                return (
                  <motion.div 
                    key={id}
                    onClick={() => setSelectedProject(isSelected ? null : id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-500 ${isSelected ? 'bg-white/5 border-amber-500/30 shadow-[0_0_30px_rgba(255,191,0,0.05)]' : 'bg-transparent border-white/5 hover:border-white/10'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium text-white">{project.name}</h3>
                      <div className={`w-2 h-2 rounded-full ${rev.mrr > 0 ? 'bg-amber-500 shadow-[0_0_8px_rgba(255,191,0,0.5)]' : 'bg-neutral-700'}`} />
                    </div>
                    <p className="text-xs text-neutral-500 mb-4 line-clamp-2">{project.description}</p>
                    
                    {/* Revenue Meta Engine */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-neutral-600 uppercase tracking-wider mb-1">MRR</p>
                        <p className="text-xs font-mono text-amber-400/90">${rev.mrr.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-neutral-600 uppercase tracking-wider mb-1">Stage</p>
                        <p className="text-xs text-neutral-400">{rev.stage}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Kanban Board: 10-Section Architecture */}
        <main className="flex-1 overflow-x-auto hide-scrollbar bg-[#050505]">
          <div className="flex h-full p-6 gap-6 w-max">
            {LANES.map(lane => (
              <div key={lane.id} className="w-[320px] flex flex-col h-full">
                <div className="flex items-center justify-between mb-6 px-2">
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-neutral-400">{lane.name}</h3>
                  <span className="text-xs font-mono text-neutral-600">
                    {tasks.filter(t => t.laneId === lane.id).length}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4 px-2 pb-20">
                  <AnimatePresence>
                    {tasks
                      .filter(t => t.laneId === lane.id)
                      .filter(t => selectedProject ? t.projectId === selectedProject : true)
                      .map(task => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          key={task.id}
                          className={`p-5 rounded-xl bg-[#0a0a0a] border transition-all duration-500 group ${
                            task.priority === 'now' 
                              ? 'border-amber-500/50 wow-glow' 
                              : 'border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <span className={`text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider font-medium ${
                              task.priority === 'now' ? 'bg-amber-500/20 text-amber-400' :
                              task.priority === 'high' ? 'bg-red-500/10 text-red-400' :
                              task.priority === 'medium' ? 'bg-blue-500/10 text-blue-400' :
                              'bg-neutral-800 text-neutral-400'
                            }`}>
                              {task.priority}
                            </span>
                            <span className="text-[10px] text-neutral-600 uppercase tracking-wider">
                              {task.projectId}
                            </span>
                          </div>
                          <h4 className="text-sm text-neutral-200 font-medium leading-relaxed mb-4">
                            {task.title}
                          </h4>
                          
                          {/* Task Actions (Mock) */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="text-[10px] text-neutral-500 hover:text-white uppercase tracking-wider flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              Process
                            </button>
                            <button className="text-[10px] text-neutral-500 hover:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                              Advance
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Interactive BBOY Form (Spawn Task) */}
      <AnimatePresence>
        {isSpawnOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSpawnOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-sm font-semibold tracking-widest uppercase text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Spawn Task
                </h2>
                <button onClick={() => setIsSpawnOpen(false)} className="text-neutral-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <form onSubmit={handleSpawnTask} className="p-6 space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-2">Task Designation</label>
                  <input 
                    type="text" 
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    placeholder="Enter task parameters..."
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-neutral-700"
                    autoFocus
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-2">Project Matrix</label>
                    <select 
                      value={newTaskProject}
                      onChange={e => setNewTaskProject(e.target.value as ProjectId)}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all appearance-none"
                    >
                      {Object.entries(PROJECTS).map(([id, p]) => (
                        <option key={id} value={id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-2">Priority Level</label>
                    <select 
                      value={newTaskPriority}
                      onChange={e => setNewTaskPriority(e.target.value as Task['priority'])}
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-all appearance-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="now">NOW (Critical)</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-3 bg-white text-black text-sm font-semibold rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Initialize Task
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
