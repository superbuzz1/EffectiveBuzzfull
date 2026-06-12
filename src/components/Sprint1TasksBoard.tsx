import React, { useState } from 'react';
import { 
  CheckSquare, Clock, AlertCircle, Plus, Search, 
  MoreHorizontal, PlayCircle, PlusCircle, LayoutGrid, List,
  Filter, Calendar, ChevronRight, Activity, GitCommit, Users
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  points: number;
  tags: string[];
}

const initialTasks: Task[] = [
  {
    id: "TASK-1001",
    title: "Implement Stripe Webhook Listener",
    description: "Write Stripe endpoints to handle invoice.paid and customer.subscription.created events for tenant workspace provisioning.",
    status: 'progress',
    priority: 'critical',
    assignee: "Alex",
    points: 5,
    tags: ["Backend", "Billing"]
  },
  {
    id: "TASK-1002",
    title: "Configure Next.js / Vite Auth Guard",
    description: "Secure routing layer enforcing JWT verification before accessing /dashboard features.",
    status: 'backlog',
    priority: 'high',
    assignee: "Sarah",
    points: 3,
    tags: ["Frontend", "Security"]
  },
  {
    id: "TASK-1003",
    title: "Design Marketing Landing Page",
    description: "Create polished 'Hero' component with copy targeting outbound sales agencies and CRM synchronization features.",
    status: 'review',
    priority: 'medium',
    assignee: "David",
    points: 5,
    tags: ["Frontend", "Design"]
  },
  {
    id: "TASK-1004",
    title: "Provision PostgreSQL Production DB",
    description: "Set up Railway/Supabase instance and migrate initial Prisma schema defining Tenant, User, and Prospect models.",
    status: 'done',
    priority: 'high',
    assignee: "Alex",
    points: 2,
    tags: ["DevOps", "Database"]
  },
  {
    id: "TASK-1005",
    title: "Integrate Gemini Outbound Agent",
    description: "Draft system prompt and tool calling functions for the AI to analyze prospect data and generate custom cold email text.",
    status: 'backlog',
    priority: 'critical',
    assignee: "Mike",
    points: 8,
    tags: ["AI", "Backend"]
  },
  {
    id: "TASK-1006",
    title: "Implement Zero-Trust RBAC Middleware",
    description: "Intercept all requests verifying role 'Admin', 'Member', or 'Owner' against the current workspace UUID.",
    status: 'progress',
    priority: 'high',
    assignee: "Sarah",
    points: 5,
    tags: ["Backend", "Security"]
  }
];

const priorityConfig = {
  low: { color: 'text-slate-400 bg-slate-400/10 border-slate-400/20', label: 'Low' },
  medium: { color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', label: 'Medium' },
  high: { color: 'text-amber-400 bg-amber-400/10 border-amber-400/20', label: 'High' },
  critical: { color: 'text-red-400 bg-red-400/10 border-red-400/20', label: 'Critical' }
};

export default function Sprint1TasksBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  const columns: { id: Task['status']; title: string; glow: string }[] = [
    { id: 'backlog', title: 'Backlog', glow: 'from-slate-500/10' },
    { id: 'progress', title: 'In Progress', glow: 'from-indigo-500/10' },
    { id: 'review', title: 'In Review', glow: 'from-amber-500/10' },
    { id: 'done', title: 'Done', glow: 'from-emerald-500/10' }
  ];

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(t => t.status === status);
  };

  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0);
  const completedPoints = getTasksByStatus('done').reduce((sum, t) => sum + t.points, 0);
  const completionPercentage = Math.round((completedPoints / totalPoints) * 100) || 0;

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <Activity className="w-4 h-4" />
            Active Sprint Execution
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            Sprint 1: Core System Viability
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Execute the absolute minimum viable architecture required to cross the 'First-Dollar' threshold. 
            Focused exclusively on user authentication, baseline AI agent functionality, and the Stripe billing hook.
          </p>
        </div>

        {/* Sprint Dashboard Metrics */}
        <div className="flex items-center gap-8 bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">Velocity</span>
            <div className="text-lg font-bold text-white font-mono flex items-center gap-2">
              {completedPoints} <span className="text-sm text-slate-500 font-normal">/ {totalPoints} SP</span>
            </div>
          </div>
          
          <div className="w-px h-8 bg-slate-800"></div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider">
              <span>Sprint Progress</span>
              <span className="text-emerald-400">{completionPercentage}%</span>
            </div>
            <div className="w-32 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 mt-1">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="bg-[#0b101b] border border-slate-800 pl-9 pr-4 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors w-64"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#0b101b] hover:bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-sm font-semibold text-slate-300 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-[#0b101b] border border-slate-800 rounded-lg p-1">
            <button 
              onClick={() => setView('kanban')}
              className={`p-1.5 rounded-md transition-colors ${view === 'kanban' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all">
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {view === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
          {columns.map(col => {
            const colTasks = getTasksByStatus(col.id);
            return (
              <div key={col.id} className={`flex flex-col rounded-xl border border-slate-800 bg-[#0d131f] overflow-hidden`}>
                {/* Column Header */}
                <div className={`p-4 border-b border-slate-800 bg-gradient-to-b ${col.glow} to-transparent flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-slate-200 uppercase font-mono tracking-wider">
                      {col.title}
                    </h3>
                    <span className="flex items-center justify-center bg-slate-900 border border-slate-700 text-xs text-slate-400 font-mono font-bold rounded-full w-6 h-6">
                      {colTasks.length}
                    </span>
                  </div>
                  <button className="text-slate-500 hover:text-slate-300">
                    <PlusCircle className="w-4 h-4" />
                  </button>
                </div>

                {/* Column Tasks */}
                <div className="p-3 bg-slate-950/20 flex-1 space-y-3 min-h-[500px]">
                  {colTasks.map(task => (
                    <div 
                      key={task.id} 
                      className="group bg-[#0b101b] border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 shadow-sm hover:shadow-xl transition-all relative"
                    >
                      {/* Priority strip */}
                      <div className={`absolute top-0 left-0 bottom-0 w-1 rounded-l-xl opacity-20 ${task.priority === 'critical' ? 'bg-red-500' : task.priority === 'high' ? 'bg-amber-500' : 'bg-slate-500'}`}></div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold font-mono text-indigo-400 tracking-wider">
                            {task.id}
                          </span>
                          <span className={`text-[10px] font-mono font-bold uppercase rounded-md px-2 py-0.5 border ${priorityConfig[task.priority].color}`}>
                            {priorityConfig[task.priority].label}
                          </span>
                        </div>

                        <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                          {task.title}
                        </h4>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {task.tags.map(tag => (
                            <span key={tag} className="text-[9px] uppercase font-mono bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-300 font-mono border border-slate-700">
                              {task.assignee.charAt(0)}
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium">
                              {task.assignee}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] font-mono font-bold text-slate-400">
                              {task.points}
                            </span>
                            
                            {/* Actions Dropdown (Simulated with states) */}
                            <select 
                              className="w-5 h-5 opacity-0 absolute right-4 bottom-3 cursor-pointer z-10 block"
                              value={task.status}
                              onChange={(e) => moveTask(task.id, e.target.value as any)}
                            >
                              <option value="backlog">Move to Backlog</option>
                              <option value="progress">Move to In Progress</option>
                              <option value="review">Move to Review</option>
                              <option value="done">Move to Done</option>
                            </select>
                            <button className="text-slate-500 group-hover:text-slate-300 transition-colors pointer-events-none">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="border border-dashed border-slate-800 rounded-xl h-24 flex items-center justify-center text-xs font-mono text-slate-600 bg-slate-900/10">
                      Drop tasks here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-[#0d131f] border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                <th className="p-4">Ticket</th>
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Assignee</th>
                <th className="p-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {tasks.map(task => (
                <tr key={task.id} className="hover:bg-slate-900/30 transition-colors group">
                  <td className="p-4">
                    <span className="text-[11px] font-bold font-mono text-indigo-400 tracking-wider">
                      {task.id}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-sm text-slate-200">{task.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      {task.tags.map(tag => (
                        <span key={tag} className="text-[9px] uppercase font-mono text-slate-500">#{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <select 
                      value={task.status}
                      onChange={(e) => moveTask(task.id, e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                    >
                      <option value="backlog">Backlog</option>
                      <option value="progress">In Progress</option>
                      <option value="review">In Review</option>
                      <option value="done">Done</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-mono font-bold uppercase rounded-md px-2 py-0.5 border inline-block ${priorityConfig[task.priority].color}`}>
                      {priorityConfig[task.priority].label}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-300 font-mono border border-slate-700">
                        {task.assignee.charAt(0)}
                      </div>
                      <span className="text-xs text-slate-300 font-medium">
                        {task.assignee}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono text-xs font-bold text-slate-400">
                    {task.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
