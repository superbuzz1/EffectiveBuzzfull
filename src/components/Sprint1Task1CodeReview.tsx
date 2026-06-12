import React, { useState } from 'react';
import { 
  GitPullRequest, CheckCircle2, MessageSquare, Shield, 
  Database, Server, HardDrive, Terminal, GitCommit,
  Check, ArrowRight, Play, Activity
} from 'lucide-react';

const pipelineSteps = [
  { id: '37.1', title: 'Repository Audit', status: 'done' },
  { id: '37.2', title: 'Closed Beta Plan', status: 'done' },
  { id: '37.3', title: 'Launch Sprint Generator', status: 'done' },
  { id: '37.4', title: 'Sprint 1 Tasks', status: 'done' },
  { id: '37.5', title: 'Task Prioritization', status: 'done' },
  { id: '37.6', title: 'Implementation Spec', status: 'done' },
  { id: '37.7', title: 'Production Code', status: 'done' },
  { id: '37.8', title: 'Code Review', status: 'current' },
  { id: '37.9', title: 'QA Validation', status: 'pending' },
  { id: '38.0', title: 'Staging Deployment', status: 'pending' },
  { id: '38.1', title: 'Closed Beta', status: 'pending' },
];

const reviewComments = [
  {
    file: 'prisma/schema.prisma',
    icon: Database,
    color: 'text-amber-400',
    comments: [
      {
        line: 23,
        author: 'Staff Architect AI',
        type: 'suggestion',
        text: 'Consider adding an index on `tenantId` in the User model to optimize query performance when fetching all users for a specific tenant.',
        code: '@@index([tenantId])',
        status: 'resolved'
      },
      {
        line: 12,
        author: 'Security AI',
        type: 'approval',
        text: 'Schema correctly utilizes gen_random_uuid() for primary keys preventing enumeration attacks. Foreign key constraints are sound.',
        status: 'approved'
      }
    ]
  },
  {
    file: 'src/lib/db.ts',
    icon: HardDrive,
    color: 'text-blue-400',
    comments: [
      {
        line: 15,
        author: 'Core Eng AI',
        type: 'approval',
        text: 'Singleton pattern flawlessly implemented. This correctly addresses connection limit exhaustion typically caused by hot-module reloading in local development environments.',
        status: 'approved'
      }
    ]
  },
  {
    file: 'src/server/routes/health.ts',
    icon: Server,
    color: 'text-emerald-400',
    comments: [
      {
        line: 18,
        author: 'SRE AI',
        type: 'approval',
        text: 'Excellent use of 503 Service Unavailable when the database connection is dropped. Container orchestrators (k8s/docker) will correctly cycle this pod upon probing this endpoint.',
        status: 'approved'
      }
    ]
  },
  {
    file: 'tests/integration/db.test.ts',
    icon: Shield,
    color: 'text-rose-400',
    comments: [
      {
        line: 45,
        author: 'QA Automation AI',
        type: 'approval',
        text: 'Integration tests correctly validate cascading deletions on the Tenant object enforcing data hygiene.',
        status: 'approved'
      }
    ]
  }
];

export default function Sprint1Task1CodeReview() {
  const [activeFile, setActiveFile] = useState(reviewComments[0]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
            <GitPullRequest className="w-4 h-4" />
            Automated Pull Request Review
          </div>
          <h1 className="text-3xl font-bold font-display text-white tracking-tight">
            PR #104: Provision PostgreSQL Production DB
          </h1>
          <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
            Staff-level static analysis and programmatic code review. Validating architectural compliance against the implementation specification prior to QA rendering.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 rounded-lg">
          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          <div>
            <div className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-wider">Review Status</div>
            <div className="text-lg font-bold text-emerald-400">Approved for QA</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar: Pipeline Progression */}
        <div className="lg:col-span-1 border border-slate-800 bg-[#0b101b] rounded-xl p-4 flex flex-col h-[650px] overflow-hidden">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">
            <Activity className="w-4 h-4" />
            Release Path
          </div>
          <div className="relative flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-0.5">
            <div className="absolute left-3.5 top-2 bottom-2 w-px bg-slate-800/80 -z-10"></div>
            {pipelineSteps.map((step, idx) => (
              <div 
                key={step.id} 
                className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${step.status === 'current' ? 'bg-indigo-500/10 border border-indigo-500/30' : 'border border-transparent'}`}
              >
                <div className={`mt-0.5 w-6 h-6 rounded-full flex justify-center items-center shrink-0 border ${
                  step.status === 'done' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' :
                  step.status === 'current' ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.2)]' :
                  'bg-slate-900 border-slate-700 text-slate-600'
                }`}>
                  {step.status === 'done' ? <Check className="w-3.5 h-3.5" /> : 
                   step.status === 'current' ? <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div> : 
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold ${
                      step.status === 'done' ? 'text-emerald-500' :
                      step.status === 'current' ? 'text-indigo-400' :
                      'text-slate-500'
                    }`}>
                      {step.id}
                    </span>
                  </div>
                  <div className={`text-xs font-medium truncate ${
                    step.status === 'done' ? 'text-slate-300' :
                    step.status === 'current' ? 'text-indigo-200' :
                    'text-slate-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Code Review Details */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {/* File Selection Tabs */}
          <div className="flex gap-2 p-1.5 bg-[#0b101b] border border-slate-800 rounded-lg overflow-x-auto">
            {reviewComments.map((file) => (
              <button
                key={file.file}
                onClick={() => setActiveFile(file)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md justify-center text-sm font-medium transition-all whitespace-nowrap outline-none ${
                  activeFile.file === file.file
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <file.icon className={`w-4 h-4 ${activeFile.file === file.file ? file.color : 'text-slate-500'}`} />
                <span className="font-mono text-xs">{file.file.split('/').pop()}</span>
                <span className="flex items-center justify-center bg-slate-900 border border-slate-700 text-[10px] font-mono font-bold text-slate-400 w-5 h-5 rounded-full ml-1">
                  {file.comments.length}
                </span>
              </button>
            ))}
          </div>

          {/* Active File Review Comments */}
          <div className="bg-[#0b101b] border border-slate-800 rounded-xl flex-1 p-6 relative overflow-hidden">
            
            <div className="flex items-center gap-2 text-sm font-mono text-slate-400 mb-6 border-b border-slate-800 pb-4">
              <Terminal className="w-4 h-4" />
              Reviewing file: <span className="text-white">{activeFile.file}</span>
            </div>

            <div className="space-y-6">
              {activeFile.comments.map((comment, index) => (
                <div key={index} className="flex gap-4">
                  {/* Left gutter/Avatar */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  {/* Comment Bubble */}
                  <div className={`flex-1 rounded-xl border p-4 ${
                    comment.type === 'approval' ? 'bg-emerald-950/10 border-emerald-900/40' : 
                    'bg-slate-900 border-slate-700'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-200">{comment.author}</span>
                        <span className="text-xs text-slate-500 font-mono">on line {comment.line}</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                        comment.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                        'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                      }`}>
                        {comment.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {comment.text}
                    </p>

                    {comment.code && (
                      <div className="bg-[#0d131f] border border-indigo-500/30 rounded-lg p-3 font-mono text-xs text-indigo-300 mb-4 flex items-start gap-2">
                        <GitCommit className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] text-indigo-500/70 uppercase font-bold tracking-widest mb-1">Suggested Change</div>
                          <code>{comment.code}</code>
                        </div>
                      </div>
                    )}
                    
                    {comment.type === 'suggestion' && (
                      <div className="flex items-center gap-2 border-t border-slate-800/80 pt-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-indigo-400" />
                        </div>
                        <span className="text-xs font-medium text-slate-400">Committed by author</span>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute right-6 bottom-6 flex justify-end">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold font-mono tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2">
                Launch QA Validation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
          </div>

        </div>

      </div>

    </div>
  );
}
