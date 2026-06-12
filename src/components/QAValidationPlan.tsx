import React, { useState } from 'react';
import { 
  ShieldCheck, Fingerprint, Lock, Boxes, Users, Megaphone, 
  Bot, CreditCard, Mail, BarChart3, Server, Activity, 
  CheckCircle2, XCircle, AlertCircle, FileCheck
} from 'lucide-react';

const testSuites = [
  {
    id: 'auth',
    title: 'Authentication Tests',
    icon: Fingerprint,
    color: 'text-blue-400',
    cases: [
      {
        name: 'Login with Valid Credentials',
        expected: 'User receives valid JWT and is routed to default workspace dashboard.',
        failure: 'Token is missing, expiration is set incorrectly, or routing fails.'
      },
      {
        name: 'Session Expiry Handling',
        expected: 'Expired JWT triggers automatic logout and redirects to /login with session expired message.',
        failure: 'Application attempts to use expired token leading to unhandled 401s.'
      }
    ]
  },
  {
    id: 'authorization',
    title: 'Authorization Tests',
    icon: Lock,
    color: 'text-rose-400',
    cases: [
      {
        name: 'Role Upgrades (Admin)',
        expected: 'User with Admin role can invite members and change workspace settings.',
        failure: 'Member role successfully executes Admin-level API mutations.'
      },
      {
        name: 'Billing Access (Owner)',
        expected: 'Only the workspace Owner role can construct Stripe Checkout sessions.',
        failure: 'Admin or Member roles can access the billing portal URL.'
      }
    ]
  },
  {
    id: 'isolation',
    title: 'Workspace Isolation Tests',
    icon: Boxes,
    color: 'text-indigo-400',
    cases: [
      {
        name: 'Cross-Tenant Object Access',
        expected: 'Requesting a CRM lead ID belonging to Tenant B while authenticated as Tenant A returns 404 Not Found.',
        failure: 'Returns 403 (leaking object existence) or 200 (catastrophic breach).'
      },
      {
        name: 'Cross-Tenant Analytics',
        expected: 'Dashboard aggregates distinct data isolated strictly to the active `tenantId`.',
        failure: 'Dashboard queries omit `tenantId` where clause, leaking global platform stats.'
      }
    ]
  },
  {
    id: 'crm',
    title: 'CRM Tests',
    icon: Users,
    color: 'text-emerald-400',
    cases: [
      {
        name: 'Bulk CSV Import',
        expected: 'Processing 10,000 row CSV asynchronously completes within 30s. Invalid rows are logged and skipped.',
        failure: 'Memory limit exceeded, process crashes, or invalid rows halt the entire batch.'
      },
      {
        name: 'Lead State Transitions',
        expected: 'Lead moving from `Prospect` to `Qualified` triggers audit log event and updates pipeline metrics.',
        failure: 'State mismatch between UI and database, or missing audit trail.'
      }
    ]
  },
  {
    id: 'campaign',
    title: 'Campaign Tests',
    icon: Megaphone,
    color: 'text-amber-400',
    cases: [
      {
        name: 'Sequence Scheduling',
        expected: 'Emails schedule according to timezone preferences (e.g., Send at 9 AM EST).',
        failure: 'Emails dispatch immediately or calculate UTC offset incorrectly.'
      },
      {
        name: 'Dynamic Variable Substitution',
        expected: '{{first_name}} and {{company}} correctly map to CRM data during generation.',
        failure: 'Emails sent with literal "{{first_name}}" strings to prospects.'
      }
    ]
  },
  {
    id: 'ai',
    title: 'AI Agent Tests',
    icon: Bot,
    color: 'text-violet-400',
    cases: [
      {
        name: 'Gemini Context Boundaries',
        expected: 'Agent refuses to generate text outside of professional sales context regardless of prompt injection.',
        failure: 'Agent generates restricted content or reveals system prompts.'
      },
      {
        name: 'Automated Lead Qualification',
        expected: 'AI correctly classifies reply intent (Positive, Negative, Unsubscribe) with >90% accuracy.',
        failure: 'Positive replies marked as bounces; angry replies marked as qualified.'
      }
    ]
  },
  {
    id: 'billing',
    title: 'Billing Tests',
    icon: CreditCard,
    color: 'text-teal-400',
    cases: [
      {
        name: 'Stripe Webhook Processing',
        expected: 'invoice.paid event correctly updates Tenant subscription end date in DB.',
        failure: 'Webhook endpoint fails unauthenticated, or signature verification bypassed.'
      },
      {
        name: 'Subscription Downgrade Limitation',
        expected: 'Tenant moving to Free tier loses access to AI Agents upon current period end.',
        failure: 'Tenant retains premium features indefinitely without active payment.'
      }
    ]
  },
  {
    id: 'email',
    title: 'Email Tests',
    icon: Mail,
    color: 'text-cyan-400',
    cases: [
      {
        name: 'SMTP Relay Authentication',
        expected: 'IMAP/SMTP connection succeeds utilizing OAuth2 for Google Workspace.',
        failure: 'App stores plaintext passwords, or OAuth token refresh fails silently.'
      },
      {
        name: 'Bounce Handling',
        expected: 'Hard bounces automatically flag CRM lead as "Invalid Email" and halt sequences.',
        failure: 'System repeatedly attempts to message bounced addresses, destroying domain reputation.'
      }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics Tests',
    icon: BarChart3,
    color: 'text-fuchsia-400',
    cases: [
      {
        name: 'Real-time Event Ingestion',
        expected: 'Email opens and link clicks register in TimescaleDB/Postgres within 500ms.',
        failure: 'Event duplication or heavy lock contention during high-volume send events.'
      }
    ]
  },
  {
    id: 'api',
    title: 'API Tests',
    icon: Server,
    color: 'text-slate-400',
    cases: [
      {
        name: 'Rate Limiting',
        expected: 'API limits >100 requests/min per IP, returning HTTP 429 Too Many Requests.',
        failure: 'No limits enforced, making application vulnerable to basic DoS/scraping.'
      },
      {
        name: 'Pagination Structure',
        expected: 'GET /api/leads respects `limit` and `cursor`, returning consistent NextPage tokens.',
        failure: 'Query returns 10,000 records causing OOM, or offset pagination misses records during concurrent writes.'
      }
    ]
  },
  {
    id: 'load',
    title: 'Load Tests',
    icon: Activity,
    color: 'text-orange-400',
    cases: [
      {
        name: 'Concurrent AI Generations',
        expected: 'System maintains <2s P95 latency while 50 users simultaneously trigger Gemini generation.',
        failure: 'Database connection pool instantly exhausts, failing over to 503s.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Security Tests',
    icon: ShieldCheck,
    color: 'text-red-400',
    cases: [
      {
        name: 'XSS Prevention',
        expected: 'Lead names containing `<script>` tags render safely as strings in the DOM.',
        failure: 'React `dangerouslySetInnerHTML` misused, executing arbitrary alert().'
      },
      {
        name: 'CORS Configuration',
        expected: 'API rejects preflight requests from unauthorized origins.',
        failure: 'API returns `Access-Control-Allow-Origin: *` unconditionally.'
      }
    ]
  }
];

export default function QAValidationPlan() {
  const [activeSuite, setActiveSuite] = useState(testSuites[0].id);

  const currentSuite = testSuites.find(s => s.id === activeSuite)!;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-2">
          <FileCheck className="w-4 h-4" />
          Master Quality Assurance Protocol
        </div>
        <h1 className="text-3xl font-bold font-display text-white tracking-tight">
          System Validation Plan
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-3xl leading-relaxed">
          Comprehensive test strategy engineered by the QA Lead and SRE teams to validate security, data isolation, performance bounds, and core functionalities of the EffectiveBuzz platform before Closed Beta launch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1 bg-[#0b101b] border border-slate-800 p-2 rounded-xl h-[600px] overflow-y-auto custom-scrollbar">
          {testSuites.map((suite) => (
            <button
              key={suite.id}
              onClick={() => setActiveSuite(suite.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all focus:outline-none ${
                activeSuite === suite.id 
                  ? 'bg-slate-800/80 shadow-sm border border-slate-700 font-medium' 
                  : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-300 border border-transparent'
              }`}
            >
              <suite.icon className={`w-4 h-4 shrink-0 ${activeSuite === suite.id ? suite.color : 'text-slate-500'}`} />
              <span className={`truncate ${activeSuite === suite.id ? 'text-white' : ''}`}>{suite.title}</span>
            </button>
          ))}
        </div>

        {/* Test Details View */}
        <div className="lg:col-span-3 bg-[#0b101b] border border-slate-800 rounded-xl overflow-hidden h-[600px] flex flex-col">
          <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/40 flex items-center gap-3">
            <div className={`p-2.5 rounded-lg bg-slate-950 border border-slate-800`}>
              <currentSuite.icon className={`w-5 h-5 ${currentSuite.color}`} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{currentSuite.title}</h2>
              <p className="text-xs text-slate-500 font-mono tracking-wider uppercase mt-0.5">Automated & Manual Validation Specs</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {currentSuite.cases.map((testCase, idx) => (
              <div key={idx} className="bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-800/60 bg-slate-900/30">
                  <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                    <span className="text-slate-500 font-mono text-[10px]">TC-{idx + 1}</span>
                    {testCase.name}
                  </h3>
                </div>
                
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Expected Result */}
                  <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold font-mono text-emerald-500 uppercase tracking-wider">Expected Result</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {testCase.expected}
                    </p>
                  </div>

                  {/* Failure Condition */}
                  <div className="bg-rose-950/10 border border-rose-900/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span className="text-xs font-bold font-mono text-rose-500 uppercase tracking-wider">Failure Condition</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {testCase.failure}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
