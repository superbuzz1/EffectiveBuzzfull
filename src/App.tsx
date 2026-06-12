import React, { useState } from 'react';
import { Network, Server, Database, Layers, ShieldCheck, Heart, Sparkles, Sliders, Settings, MessageSquare, Compass, BarChart, BookOpen, AlertTriangle, Cpu, Mail, GitPullRequest, CreditCard, Shield, Users, Building2, Globe, Landmark, Award, DollarSign, Activity, TrendingUp, Coins } from 'lucide-react';
import MarketingPage from './components/MarketingPage';
import Dashboard from './components/Dashboard';
import DocsPage from './components/DocsPage';
import AdminConsole from './components/AdminConsole';
import StatusMonitor from './components/StatusMonitor';
import ArchitectureHub from './components/ArchitectureHub';
import ResearchAgentDocs from './components/ResearchAgentDocs';
import LeadScoringAgentDocs from './components/LeadScoringAgentDocs';
import OutreachAgentDocs from './components/OutreachAgentDocs';
import ReplyAnalysisAgentDocs from './components/ReplyAnalysisAgentDocs';
import QualificationAgentDocs from './components/QualificationAgentDocs';
import WorkflowAutomationEngine from './components/WorkflowAutomationEngine';
import StripeBillingArchitecture from './components/StripeBillingArchitecture';
import SaaSSecurityArchitecture from './components/SaaSSecurityArchitecture';
import SaaSDevOpsArchitecture from './components/SaaSDevOpsArchitecture';
import AuthServicePlayground from './components/AuthServicePlayground';
import WorkspaceServicePlayground from './components/WorkspaceServicePlayground';
import UserServicePlayground from './components/UserServicePlayground';
import ProspectCRMPlayground from './components/ProspectCRMPlayground';
import CompanyManagementPlayground from './components/CompanyManagementPlayground';
import FounderDashboard from './components/FounderDashboard';
import GlobalGTMAdvisor from './components/GlobalGTMAdvisor';
import StrategicMoatAdvisor from './components/StrategicMoatAdvisor';
import ExecutiveBoardReport from './components/ExecutiveBoardReport';
import StrategicActionPlan from './components/StrategicActionPlan';
import CPOQuarterlyRoadmap from './components/CPOQuarterlyRoadmap';
import CROGrowthPlan from './components/CROGrowthPlan';
import BoardStrategicReset from './components/BoardStrategicReset';
import COOWeeklyOperatingPlan from './components/COOWeeklyOperatingPlan';
import ProductCouncilReport from './components/ProductCouncilReport';
import GrowthCouncilReport from './components/GrowthCouncilReport';
import EngineeringCouncilReport from './components/EngineeringCouncilReport';
import QuarterlyBoardReport from './components/QuarterlyBoardReport';
import DigitalTwinConsole from './components/DigitalTwinConsole';
import DecisionFrameworkConsole from './components/DecisionFrameworkConsole';
import PredictiveIntelligenceConsole from './components/PredictiveIntelligenceConsole';
import CapitalAllocationConsole from './components/CapitalAllocationConsole';
import CorporateOptimizationConsole from './components/CorporateOptimizationConsole';
import SelfImprovingAgentConsole from './components/SelfImprovingAgentConsole';
import RevenueKnowledgeGraphConsole from './components/RevenueKnowledgeGraphConsole';
import ExperimentationPlatformConsole from './components/ExperimentationPlatformConsole';
import CompetitiveIntelligenceConsole from './components/CompetitiveIntelligenceConsole';
import ContinuousRoadmapConsole from './components/ContinuousRoadmapConsole';
import MarketplaceStrategyConsole from './components/MarketplaceStrategyConsole';
import AgentMarketplaceConsole from './components/AgentMarketplaceConsole';
import RevenueIntelligenceNetworkConsole from './components/RevenueIntelligenceNetworkConsole';
import VerticalExpansionRoadmapConsole from './components/VerticalExpansionRoadmapConsole';
import GlobalStrategyMasterPlanConsole from './components/GlobalStrategyMasterPlanConsole';
import ActiveExecutionPlanConsole from './components/ActiveExecutionPlanConsole';
import SaaSGrowthAdvisorConsole from './components/SaaSGrowthAdvisorConsole';
import SaaSOperationRoadmapConsole from './components/SaaSOperationRoadmapConsole';
import SaaSCustomerGrowthConsole from './components/SaaSCustomerGrowthConsole';
import VCAuditExecutionConsole from './components/VCAuditExecutionConsole';
import SaaS90DayOperatingPlanConsole from './components/SaaS90DayOperatingPlanConsole';
import LaunchSprintGenerator from './components/LaunchSprintGenerator';
import Sprint1TasksBoard from './components/Sprint1TasksBoard';
import Sprint1TaskPrioritization from './components/Sprint1TaskPrioritization';
import Sprint1Task1Spec from './components/Sprint1Task1Spec';
import Sprint1Task1Code from './components/Sprint1Task1Code';
import Sprint1Task1CodeReview from './components/Sprint1Task1CodeReview';
import ProductionCodeReviewReport from './components/ProductionCodeReviewReport';
import QAValidationPlan from './components/QAValidationPlan';
import StagingDeploymentAssessment from './components/StagingDeploymentAssessment';
import StagingDeploymentRunbook from './components/StagingDeploymentRunbook';
import ClosedBetaReadinessReview from './components/ClosedBetaReadinessReview';
import ClosedBetaLaunchPlaybook from './components/ClosedBetaLaunchPlaybook';
import BetaFeedbackAnalysis from './components/BetaFeedbackAnalysis';
import FirstPayingCustomerPlan from './components/FirstPayingCustomerPlan';
import FirstPayingCustomerCallScript from './components/FirstPayingCustomerCallScript';
import FirstPayingCustomerPostMortem from './components/FirstPayingCustomerPostMortem';
import First1kMRRPlan from './components/First1kMRRPlan';
import EarlyTractionRoadmap from './components/EarlyTractionRoadmap';
import CustomerAcquisitionSystem from './components/CustomerAcquisitionSystem';
import CustomerFeedbackIntelligenceSystem from './components/CustomerFeedbackIntelligenceSystem';
import ProductIterationFlywheel from './components/ProductIterationFlywheel';
import EffectiveBuzzGrowthOS from './components/EffectiveBuzzGrowthOS';
import WeeklyExecutionLoop from './components/WeeklyExecutionLoop';
import PathToPMFRoadmap from './components/PathToPMFRoadmap';
import RealityBasedCTOReview from './components/RealityBasedCTOReview';
import CurrentBusinessStatus from './components/CurrentBusinessStatus';
import ComprehensiveStatusReport from './components/ComprehensiveStatusReport';
import ChromeExtensionArchitecture from './components/ChromeExtensionArchitecture';
import AIStudioExecutionLoop from './components/AIStudioExecutionLoop';
import WeeklyRealityReview from './components/WeeklyRealityReview';
import GrowthFunnel from './components/GrowthFunnel';
import EffectiveBuzzOperatingSystem from './components/EffectiveBuzzOperatingSystem';
import { Beaker, ShieldAlert, Briefcase, Store, FileText, Target, CheckSquare, ListOrdered, FileCode2, TerminalSquare, FileCheck2, Cloud, ServerCog, Rocket, PlayCircle, Trophy, PhoneCall, Focus, Waypoints, Magnet, Brain, GitMerge, Compass, CalendarDays, Zap, Crown, Search, Activity, Cpu, FileWarning, Chrome, RefreshCw, CalendarSync, Filter, Terminal } from 'lucide-react';

export default function App() {
  // Navigation Routing States
  const [activeTab, setActiveTab ] = useState<'auth' | 'workspace' | 'user' | 'prospect' | 'company' | 'marketing' | 'saas' | 'architecture' | 'docs' | 'admin' | 'status' | 'agent' | 'workflow' | 'billing' | 'security' | 'devops' | 'founder' | 'global' | 'moat' | 'board' | 'plan' | 'cpo' | 'cro' | 'board_reset' | 'coo_operating_plan' | 'product_council_report' | 'growth_council_report' | 'engineering_council_report' | 'quarterly_board_report' | 'digital_twin_architecture' | 'executive_decision_framework' | 'predictive_intelligence' | 'capital_allocation' | 'corporate_optimization' | 'self_improving_agent_ecosystem' | 'revenue_knowledge_graph' | 'growth_experimentation_platform' | 'competitive_intelligence' | 'continuous_strategic_roadmap' | 'marketplace_strategy' | 'agent_marketplace' | 'revenue_intelligence' | 'vertical_expansion' | 'global_strategy' | 'execution_plan' | 'saas_growth' | 'saas_operator_roadmap' | 'customer_growth' | 'vc_audit' | 'saas_90day_plan' | 'launch_sprint_generator' | 'sprint_1_tasks' | 'sprint_1_prioritization' | 'sprint_1_task_1_spec' | 'sprint_1_task_1_code' | 'sprint_1_task_1_codereview' | 'production_code_review' | 'qa_validation_plan' | 'staging_assessment' | 'staging_runbook' | 'closed_beta_readiness' | 'closed_beta_launch_playbook' | 'beta_feedback_analysis' | 'first_paying_customer' | 'first_paying_customer_script' | 'first_paying_customer_post_mortem' | 'first_1k_mrr' | 'early_traction_roadmap' | 'customer_acquisition_system' | 'customer_feedback_intelligence_system' | 'product_iteration_flywheel' | 'growth_operating_system' | 'weekly_execution_loop' | 'path_to_pmf_roadmap' | 'reality_based_cto_review' | 'current_business_status' | 'next_action_engine' | 'comprehensive_status_report' | 'chrome_extension_architecture' | 'ai_studio_execution_loop' | 'weekly_reality_review' | 'growth_funnel' | 'effective_buzz_os'>('effective_buzz_os');
  const [agentSuiteTab, setAgentSuiteTab] = useState<'research' | 'scoring' | 'outreach' | 'reply' | 'qualification'>('qualification');

  // Global Context State (shared across components to showcase full-stack modularity)
  const [currentRole, setCurrentRole] = useState<'Owner' | 'Admin' | 'Member' | 'Agent'>('Admin');
  const [tenantsVersion, setTenantsVersion] = useState<number>(0);
  const [selectedTenant, setSelectedTenant] = useState({
    id: "tenant-1",
    name: "Acme Corp",
    plan: "Professional"
  });

  const handleTenantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "tenant-1") {
      setSelectedTenant({ id: "tenant-1", name: "Acme Corp", plan: "Professional" });
    } else if (val === "tenant-2") {
      setSelectedTenant({ id: "tenant-2", name: "GrowthX Studio", plan: "Growth" });
    } else if (val === "tenant-3") {
      setSelectedTenant({ id: "tenant-3", name: "Enterprise Flow", plan: "Enterprise" });
    } else {
      setSelectedTenant({ id: "tenant-custom", name: "Custom Partner", plan: "Growth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-gray-100 flex flex-col font-sans">
      {/* Dynamic Header */}
      <header className="border-b border-gray-800 bg-[#0d131f]/95 sticky top-0 z-30 backdrop-blur">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('marketing')}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center text-sm shadow-md shadow-emerald-500/10 transition-transform group-hover:scale-105 duration-200">
                EB
              </div>
              <div>
                <span className="font-display font-bold text-white text-base tracking-tight leading-none block">
                  EffectiveBuzz <span className="text-emerald-400 text-xs font-mono font-medium ml-1">SaaS</span>
                </span>
                <span className="text-[10px] text-gray-400 font-mono italic leading-none block mt-0.5">
                  AI-Powered Outbound Sales Platform
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Context Control Hub when inside app dashboards */}
            {activeTab !== 'marketing' && (
              <div className="hidden md:flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-lg p-1.5 px-3 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-500 uppercase font-mono font-bold">Tenant Space:</span>
                  <select 
                    value={selectedTenant.id}
                    onChange={handleTenantChange}
                    className="bg-transparent text-white border-none rounded focus:outline-none focus:ring-0 font-display font-medium text-xs cursor-pointer"
                  >
                    <option value="tenant-1">Acme Corp (Pro)</option>
                    <option value="tenant-2">GrowthX Studio (Growth)</option>
                    <option value="tenant-3">Enterprise Flow (Enterprise)</option>
                  </select>
                </div>
                <span className="text-gray-700">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-500 uppercase font-mono font-bold">RBAC role:</span>
                  <select
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value as any)}
                    className="bg-transparent text-emerald-300 font-bold border-none rounded focus:outline-none focus:ring-0 text-xs cursor-pointer uppercase"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                    <option value="Agent">Agent</option>
                  </select>
                </div>
              </div>
            )}

            {/* Quick action button */}
            <button
              onClick={() => setActiveTab('architecture')}
              className="text-xs bg-indigo-500 hover:bg-indigo-400 hover:shadow-indigo-500/10 transition-all font-semibold text-white px-3.5 py-1.5 rounded-lg border border-indigo-500/10 shadow flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              Blueprint Drawer
            </button>
          </div>
        </div>
      </header>

      {/* Main Body Columns */}
      <div className="max-w-[1500px] mx-auto w-full px-4 sm:px-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">
        
        {/* Navigation Sidebar Panel */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 h-fit bg-[#0d131f] border border-[#1f2937] rounded-xl p-4 space-y-5 shadow-xl">
          <div>
            <span className="text-[10px] uppercase font-mono text-gray-400 tracking-wider font-bold block mb-1">
              Active Portals & Blueprints
            </span>
            <p className="text-xs text-gray-500 leading-relaxed">
              Explore the functional modules designed for the EffectiveBuzz system architecture.
            </p>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: 'auth', label: '0a. Core Auth Service Workbench', icon: ShieldCheck, desc: 'Production JWT, PBKDF2 Password hashing, & RBAC Gateway.' },
              { id: 'workspace', label: '0b. Enterprise Workspace Service', icon: Layers, desc: 'Multi-Tenant Workspaces, invitations lifecycle, & RBAC role assignments.' },
              { id: 'user', label: '0c. User Management Console', icon: Settings, desc: 'User Profiles, Prefs, Activity auditing, and hierarchical Tenant Team.' },
              { id: 'prospect', label: '0d. Multi-Tenant Prospect CRM', icon: Users, desc: 'Create, update, soft delete, notes tracking, and CSV/Bulk imports isolated per tenant.' },
              { id: 'company', label: '0e. Dynamic Company Scorecard', icon: Building2, desc: 'Assess firmographics, track notes logs, parse bulk uploads, and test dynamic scoring algorithms.' },
              { id: 'marketing', label: '1. Marketing & Stripe Plan', icon: Sparkles, desc: 'Public value site with sliding rate estimators.' },
              { id: 'saas', label: '2. SaaS Campaign Console', icon: MessageSquare, desc: 'Manage outbound loops & Gemini copilot outreach.' },
              { id: 'workflow', label: '3. Workflow Automation Engine', icon: GitPullRequest, desc: 'Design, test, and audit rule-action DAGs.' },
              { id: 'billing', label: '4. Stripe Billing Architecture', icon: CreditCard, desc: 'Setup subscription plans, webhooks, & usage metrics.' },
              { id: 'devops', label: '5. Production DevOps Design', icon: Server, desc: 'Coolify orchestration, Docker networking, pg RLO backups, and dynamic disaster failover.' },
              { id: 'security', label: '6. SaaS Security Design', icon: Shield, desc: 'Threat models STRIDE, JWT tokens, RBAC permissions, and isolation.' },
              { id: 'architecture', label: '7. Technical Blueprints', icon: Network, desc: 'High-level maps, ERD states, and node topographies.' },
              { id: 'docs', label: '8. REST API Documentation', icon: BookOpen, desc: 'Swagger endpoint playground & schema browsers.' },
              { id: 'admin', label: '9. Tenant & RBAC Admin', icon: Sliders, desc: 'Configure tenant profiles & user security parameters.' },
              { id: 'status', label: '10. SLA & Status Monitors', icon: BarChart, desc: 'Track pings, latency overhead, & incident log history.' },
              { id: 'agent', label: '11. AI Agent Suite Specs', icon: Cpu, desc: 'Specifications & sandbox for Research & Scoring Agents.' },
              { id: 'founder', label: '12. Founder Financial Cockpit', icon: BarChart, desc: 'Core 10 metrics: MRR, ARR, CAC, LTV, Churn, NRR, Activation, and cash runway.' },
              { id: 'global', label: '13. Global GTM Advisor', icon: Globe, desc: 'Strategic ICPs, region physical pods, pricing parities, & compliance plans.' },
              { id: 'moat', label: '14. 5-Year Strategic Moat', icon: Shield, desc: 'Interactive strategy planner, brand defensibility, and competitive simulator.' },
              { id: 'board', label: '15. Board Advisory Report', icon: Landmark, desc: 'Executive board report co-signed by ELT (CEO, CFO, CPO, CTO, COO, CRO).' },
              { id: 'plan', label: '16. Strategic Action Plan', icon: Award, desc: 'Elite SaaS Strategy, product roadmap, GTM focus, and ROI ranked decisions.' },
              { id: 'cpo', label: '17. CPO Quarterly Roadmap', icon: Compass, desc: 'Interactive analysis of feature requests, usage analytics, customer feedback, & churn.' },
              { id: 'cro', label: '18. CRO Revenue Growth Plan', icon: DollarSign, desc: 'Interactive analysis of sales pipelines, pricing scales, win rates, and expansion triggers.' },
              { id: 'board_reset', label: '19. Board Strategic Reset', icon: Landmark, desc: 'Operational audit and chronological 1, 3, and 5-Year corporate horizon plan.' },
              { id: 'coo_operating_plan', label: '20. COO Weekly Operating Plan', icon: Activity, desc: 'Operational metrics audit, support queues, and weekly team priorities.' },
              { id: 'product_council_report', label: '21. Product Council Report', icon: Compass, desc: 'Prioritizing tracks (Build Now/Next/Later/Do Not) co-signed by CPO, CTO, CS, and CRO.' },
              { id: 'growth_council_report', label: '22. Growth Council Report', icon: TrendingUp, desc: 'Growth strategies (Acquisition/Conversion/Retention/Expansion) prioritized by ROI.' },
              { id: 'engineering_council_report', label: '23. Engineering Council Report', icon: Cpu, desc: 'Technical audits, infrastructure overhead, and strategic engineering prioritization priorities.' },
              { id: 'quarterly_board_report', label: '24. Quarterly Board Report', icon: Landmark, desc: 'Critical risks, opportunities, capital allocations, hiring, & product roadmaps.' },
              { id: 'digital_twin_architecture', label: '25. Enterprise Digital Twin', icon: Network, desc: 'Real-time corporate twin modeling entity schema, streams ingest, simulations & forecasts.' },
              { id: 'executive_decision_framework', label: '26. Executive Decision Framework', icon: Sliders, desc: 'Comprehensive operational roadmap ranking choices by Impact, Risk, and Expected Effort.' },
              { id: 'predictive_intelligence', label: '27. Predictive Intelligence Core', icon: TrendingUp, desc: 'Interactive prognostics forecasting tool mapping statistical churn and confidence bands.' },
              { id: 'capital_allocation', label: '28. Capital Allocation Core', icon: Coins, desc: 'CFO dynamic allocation simulator computing SaaS Magic Number & exit valuation.' },
              { id: 'corporate_optimization', label: '29. Operations Optimizer Core', icon: Sliders, desc: 'CEO / CTO / CRO corporate prioritized roadmap filter, ranking cost & returns.' },
              { id: 'self_improving_agent_ecosystem', label: '30. AGI Agent Self-Improvement', icon: Cpu, desc: 'Closed-loop multi-agent learning engine routing customer success & revenues.' },
              { id: 'revenue_knowledge_graph', label: '31. Revenue Knowledge Graph', icon: Network, desc: 'Model CRM schema, query multi-hop pipelines & live AI triplet extraction.' },
              { id: 'growth_experimentation_platform', label: '32. Growth Experimentation', icon: Beaker, desc: 'Setup A/B tests, manage linear canaries, & see real-time statistical significance.' },
              { id: 'competitive_intelligence', label: '33. Competitive Intelligence', icon: ShieldAlert, desc: 'Continuously monitors competitors, market trends, AI benchmarks, and customer demand.' },
              { id: 'continuous_strategic_roadmap', label: '34. Board Strategic Roadmap', icon: Briefcase, desc: 'Founder prioritizations (Build Next, Stop, Invest, Automate, Delegate) ranked by Revenue Impact.' },
              { id: 'marketplace_strategy', label: '35. Marketplace Strategist Core', icon: Store, desc: 'Pivoting EffectiveBuzz SaaS to matching network of agencies, SDRs & AI Prompt creators.' },
              { id: 'agent_marketplace', label: '36. AI Agent Marketplace', icon: Cpu, desc: 'Architecting secure packaging, distribution splits, evaluation limits, and sandboxing.' },
              { id: 'revenue_intelligence', label: '37. Revenue Intelligence Network', icon: Database, desc: 'Securing multi-tenant datasharing protocols, anonymization filters, and cohort benchmarks.' },
              { id: 'vertical_expansion', label: '38. Vertical Expansion Roadmap', icon: Building2, desc: 'SaaS, Healthcare, Fintech, Real Estate, and Agencies ICP specifications, pricing tiers, and launch Gantt simulator.' },
              { id: 'global_strategy', label: '39. Strategic Master Plan', icon: Globe, desc: 'CEO 5-year scaling targets, CTO cloud enclaves, and CSO defensible market moats.' },
              { id: 'execution_plan', label: '40. 12-Month Execution Plan', icon: FileText, desc: 'Interactive tactical timeline, hiring roadmap, simulation curves, risks, and criteria.' },
              { id: 'saas_growth', label: '41. SaaS Growth Playbook', icon: TrendingUp, desc: 'Founder daily activities, optimal pricing models, sales pipelines, and $10k MRR runway.' },
              { id: 'saas_operator_roadmap', label: '42. $0 to $100k ARR Roadmap', icon: Compass, desc: 'Operational milestones, monthly targets, customer metrics, hiring and system scale tracks.' },
              { id: 'customer_growth', label: '43. 1,000-Customer GTM Loop', icon: Users, desc: 'CRO-driven acquisition, viral footer, partner commission systems, and diagnostic calendars.' },
              { id: 'vc_audit', label: '44. VC & Technical Audit', icon: ShieldAlert, desc: 'Brutally honest execution review, top 20 failures/risks/opportunities, and what to build next.' },
              { id: 'saas_90day_plan', label: '45. ELT 90-Day Operating Plan', icon: Target, desc: 'Cross-functional master-agenda (Revenue, Customer, Product, Engineering and GTM) signed by ELT.' },
              { id: 'launch_sprint_generator', label: '46. Launch Sprint Generator', icon: Sparkles, desc: 'Repository deep-analysis scanner & interactive pre-launch sprint engine featuring Gemini intelligence.' },
              { id: 'sprint_1_tasks', label: '47. Sprint 1 Tasks', icon: CheckSquare, desc: 'Interactive Sprint 1 Jira-style Kanban board tracing launch-critical paths and velocity.' },
              { id: 'sprint_1_prioritization', label: '48. Sprint 1 Priority Plan', icon: ListOrdered, desc: 'Executive task prioritization logic, constraints mapping, and execution path.' },
              { id: 'sprint_1_task_1_spec', label: '49. Task #1 Specification', icon: FileCode2, desc: 'Principal-level architecture design and schemas for provisioning the production database.' },
              { id: 'sprint_1_task_1_code', label: '50. Production Code', icon: TerminalSquare, desc: 'Generated, production-ready TypeScript files for Task #1 execution.' },
              { id: 'sprint_1_task_1_codereview', label: '51. PR Code Review', icon: GitPullRequest, desc: 'Automated staff-level code review and static analysis for PR #104.' },
              { id: 'production_code_review', label: '52. Production Review', icon: FileCheck2, desc: 'Comprehensive cross-functional Staff-level review matrix.' },
              { id: 'qa_validation_plan', label: '53. QA Validation Plan', icon: ShieldCheck, desc: 'Master testing strategy validating security, performance, and functional bounds.' },
              { id: 'staging_assessment', label: '54. Staging Assessment', icon: Cloud, desc: 'DevOps & SRE deployment readiness assessment for Staging.' },
              { id: 'staging_runbook', label: '55. Staging Runbook', icon: ServerCog, desc: 'Complete deployment execution plan utilizing Coolify, Docker, Postgres, and Redis.' },
              { id: 'closed_beta_readiness', label: '56. Closed Beta Review', icon: Rocket, desc: 'Go/No-Go assessment for initial cohort onboarding.' },
              { id: 'closed_beta_launch_playbook', label: '57. Closed Beta Plan', icon: PlayCircle, desc: 'Execution playbook for targeting, onboarding, and converting the first 50 users.' },
              { id: 'beta_feedback_analysis', label: '58. Beta Feedback', icon: MessageSquare, desc: 'Analysis of qualitative and quantitative signals from the Beta cohort.' },
              { id: 'first_paying_customer', label: '59. First Customer', icon: Trophy, desc: 'Tactical execution plan to convert the highest engaged Beta user.' },
              { id: 'first_paying_customer_script', label: '60. Call Script', icon: PhoneCall, desc: 'The 10-minute cadence script to convert a highly engaged beta user.' },
              { id: 'first_paying_customer_post_mortem', label: '61. Customer Post-Mortem', icon: Focus, desc: 'Deconstruct mechanics of the first closed-won deal.' },
              { id: 'first_1k_mrr', label: '62. Path to $1k MRR', icon: TrendingUp, desc: 'GTM growth mechanisms, pricing, and distribution to hit first revenue milestone.' },
              { id: 'early_traction_roadmap', label: '63. Traction Roadmap', icon: Waypoints, desc: 'Sequential execution plan from first sale to $1k MRR and retention optimization.' },
              { id: 'customer_acquisition_system', label: '64. Acquisition Playbook', icon: Magnet, desc: 'Repeatable system to acquire customers #2 through #10.' },
              { id: 'customer_feedback_intelligence_system', label: '65. Feedback Intelligence', icon: Brain, desc: 'Framework to convert customer feedback into product prioritization.' },
              { id: 'product_iteration_flywheel', label: '66. Growth Flywheel', icon: GitMerge, desc: 'Continuous loop linking customer feedback, product iterations, and revenue growth.' },
              { id: 'growth_operating_system', label: '67. Growth OS', icon: Compass, desc: 'Executive operating system scaling from 0 to 1k customers.' },
              { id: 'weekly_execution_loop', label: '68. Weekly Exec Loop', icon: CalendarDays, desc: 'Strict weekly cadence connecting data, feedback, and growth experiments.' },
              { id: 'path_to_pmf_roadmap', label: '69. PMF Roadmap', icon: Crown, desc: 'Linear sequential milestones required to reach Product-Market Fit.' },
              { id: 'reality_based_cto_review', label: '70. CTO Review', icon: Search, desc: 'Reality-based assessment of bottlenecks, risks, and ROI.' },
              { id: 'current_business_status', label: '71. Current Status', icon: Activity, desc: 'Snapshot of active users, revenue, blockes, and reality.' },
              { id: 'next_action_engine', label: '72. Next Action Engine', icon: Cpu, desc: 'State-driven engine calculating the exact next highest ROI action.' },
              { id: 'comprehensive_status_report', label: '73. Status Report', icon: FileWarning, desc: 'Comprehensive telemetry and execution plans based on current reality.' },
              { id: 'chrome_extension_architecture', label: '74. Extension Arch', icon: Chrome, desc: 'Execution Phase: Chrome Extension architecture to solve UX friction.' },
              { id: 'ai_studio_execution_loop', label: '75. AI Studio Loop', icon: RefreshCw, desc: 'The continuous operational rhythm for leveraging AI Studio.' },
              { id: 'weekly_reality_review', label: '76. Weekly Reality', icon: CalendarSync, desc: 'Strict data-driven evaluation of the current week to isolate immediate constraints.' },
              { id: 'growth_funnel', label: '77. Growth Funnel', icon: Filter, desc: 'The sequential stages of SaaS maturation and revenue growth.' },
              { id: 'effective_buzz_os', label: '78. Operating System', icon: Terminal, desc: 'The fundamental meta-framework generating growth and product.' }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-3 group ${
                    activeTab === tab.id
                      ? 'bg-slate-900 border-slate-700 text-white shadow-md'
                      : 'border-transparent text-gray-400 hover:bg-slate-900/40 hover:text-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    activeTab === tab.id ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-950/60 text-gray-500 group-hover:text-gray-300'
                  } border border-slate-800`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold block leading-none">{tab.label}</span>
                    <span className="text-[10px] text-gray-400 block mt-1 leading-normal font-sans">{tab.desc}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Quick Note alerts about deployment integrity */}
          <div className="bg-[#182235]/40 border border-[#1f2937] p-3.5 rounded-lg text-xs leading-relaxed text-gray-300 space-y-2">
            <span className="text-[9px] font-mono text-[#818cf8] font-bold block uppercase tracking-wider">ENVIRONMENT LOG:</span>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Express full-stack backend running globally on Port 3000. Real-time REST endpoints are active and transacting.
            </p>
          </div>
        </aside>

        {/* Console Working Canvas column */}
        <main className="lg:col-span-9 space-y-6">
          <div className="bg-[#0d131f] border border-[#1f2937] p-6 lg:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
            
            {/* TAB RENDERING SWITCHER CONTAINER */}
            {activeTab === 'auth' && (
              <AuthServicePlayground />
            )}

            {activeTab === 'workspace' && (
              <WorkspaceServicePlayground />
            )}

            {activeTab === 'user' && (
              <UserServicePlayground />
            )}

            {activeTab === 'prospect' && (
              <ProspectCRMPlayground />
            )}

            {activeTab === 'company' && (
              <CompanyManagementPlayground />
            )}

            {activeTab === 'marketing' && (
              <MarketingPage onStartApp={() => setActiveTab('saas')} />
            )}

            {activeTab === 'saas' && (
              <Dashboard 
                currentTenant={selectedTenant}
                rbacRole={currentRole}
              />
            )}

            {activeTab === 'workflow' && (
              <WorkflowAutomationEngine />
            )}

            {activeTab === 'billing' && (
              <StripeBillingArchitecture />
            )}

            {activeTab === 'devops' && (
              <SaaSDevOpsArchitecture />
            )}

            {activeTab === 'security' && (
              <SaaSSecurityArchitecture />
            )}

            {activeTab === 'architecture' && (
              <ArchitectureHub />
            )}

            {activeTab === 'docs' && (
              <DocsPage />
            )}

            {activeTab === 'admin' && (
              <AdminConsole 
                currentRole={currentRole}
                onChangeRole={(role) => setCurrentRole(role)}
                onTenantAdded={() => setTenantsVersion(prev => prev + 1)}
              />
            )}

            {activeTab === 'status' && (
              <StatusMonitor />
            )}

            {activeTab === 'founder' && (
              <FounderDashboard />
            )}

            {activeTab === 'global' && (
              <GlobalGTMAdvisor />
            )}

            {activeTab === 'moat' && (
              <StrategicMoatAdvisor />
            )}

            {activeTab === 'board' && (
              <ExecutiveBoardReport />
            )}

            {activeTab === 'plan' && (
              <StrategicActionPlan />
            )}

            {activeTab === 'cpo' && (
              <CPOQuarterlyRoadmap />
            )}

            {activeTab === 'cro' && (
              <CROGrowthPlan />
            )}

            {activeTab === 'board_reset' && (
              <BoardStrategicReset />
            )}

            {activeTab === 'coo_operating_plan' && (
              <COOWeeklyOperatingPlan />
            )}

            {activeTab === 'product_council_report' && (
              <ProductCouncilReport />
            )}

            {activeTab === 'growth_council_report' && (
              <GrowthCouncilReport />
            )}

            {activeTab === 'engineering_council_report' && (
              <EngineeringCouncilReport />
            )}

            {activeTab === 'quarterly_board_report' && (
              <QuarterlyBoardReport />
            )}

            {activeTab === 'digital_twin_architecture' && (
              <DigitalTwinConsole />
            )}

            {activeTab === 'executive_decision_framework' && (
              <DecisionFrameworkConsole />
            )}

            {activeTab === 'predictive_intelligence' && (
              <PredictiveIntelligenceConsole />
            )}

            {activeTab === 'capital_allocation' && (
              <CapitalAllocationConsole />
            )}

            {activeTab === 'corporate_optimization' && (
              <CorporateOptimizationConsole />
            )}

            {activeTab === 'self_improving_agent_ecosystem' && (
              <SelfImprovingAgentConsole />
            )}

            {activeTab === 'revenue_knowledge_graph' && (
              <RevenueKnowledgeGraphConsole />
            )}

            {activeTab === 'growth_experimentation_platform' && (
              <ExperimentationPlatformConsole />
            )}

            {activeTab === 'competitive_intelligence' && (
              <CompetitiveIntelligenceConsole />
            )}

            {activeTab === 'continuous_strategic_roadmap' && (
              <ContinuousRoadmapConsole />
            )}

            {activeTab === 'marketplace_strategy' && (
              <MarketplaceStrategyConsole />
            )}

            {activeTab === 'agent_marketplace' && (
              <AgentMarketplaceConsole />
            )}

            {activeTab === 'revenue_intelligence' && (
              <RevenueIntelligenceNetworkConsole />
            )}

            {activeTab === 'vertical_expansion' && (
              <VerticalExpansionRoadmapConsole />
            )}

            {activeTab === 'global_strategy' && (
              <GlobalStrategyMasterPlanConsole />
            )}

            {activeTab === 'execution_plan' && (
              <ActiveExecutionPlanConsole />
            )}

            {activeTab === 'saas_growth' && (
              <SaaSGrowthAdvisorConsole />
            )}

            {activeTab === 'saas_operator_roadmap' && (
              <SaaSOperationRoadmapConsole />
            )}

            {activeTab === 'customer_growth' && (
              <SaaSCustomerGrowthConsole />
            )}

            {activeTab === 'vc_audit' && (
              <VCAuditExecutionConsole />
            )}

            {activeTab === 'saas_90day_plan' && (
              <SaaS90DayOperatingPlanConsole />
            )}

            {activeTab === 'launch_sprint_generator' && (
              <LaunchSprintGenerator />
            )}

            {activeTab === 'sprint_1_tasks' && (
              <Sprint1TasksBoard />
            )}

            {activeTab === 'sprint_1_prioritization' && (
              <Sprint1TaskPrioritization />
            )}

            {activeTab === 'sprint_1_task_1_spec' && (
              <Sprint1Task1Spec />
            )}

            {activeTab === 'sprint_1_task_1_code' && (
              <Sprint1Task1Code />
            )}

            {activeTab === 'sprint_1_task_1_codereview' && (
              <Sprint1Task1CodeReview />
            )}

            {activeTab === 'production_code_review' && (
              <ProductionCodeReviewReport />
            )}

            {activeTab === 'qa_validation_plan' && (
              <QAValidationPlan />
            )}

            {activeTab === 'staging_assessment' && (
              <StagingDeploymentAssessment />
            )}

            {activeTab === 'staging_runbook' && (
              <StagingDeploymentRunbook />
            )}

            {activeTab === 'closed_beta_readiness' && (
              <ClosedBetaReadinessReview />
            )}

            {activeTab === 'closed_beta_launch_playbook' && (
              <ClosedBetaLaunchPlaybook />
            )}

            {activeTab === 'beta_feedback_analysis' && (
              <BetaFeedbackAnalysis />
            )}

            {activeTab === 'first_paying_customer' && (
              <FirstPayingCustomerPlan />
            )}

            {activeTab === 'first_paying_customer_script' && (
              <FirstPayingCustomerCallScript />
            )}

            {activeTab === 'first_paying_customer_post_mortem' && (
              <FirstPayingCustomerPostMortem />
            )}

            {activeTab === 'first_1k_mrr' && (
              <First1kMRRPlan />
            )}

            {activeTab === 'early_traction_roadmap' && (
              <EarlyTractionRoadmap />
            )}

            {activeTab === 'customer_acquisition_system' && (
              <CustomerAcquisitionSystem />
            )}

            {activeTab === 'customer_feedback_intelligence_system' && (
              <CustomerFeedbackIntelligenceSystem />
            )}

            {activeTab === 'product_iteration_flywheel' && (
              <ProductIterationFlywheel />
            )}

            {activeTab === 'growth_operating_system' && (
              <EffectiveBuzzGrowthOS />
            )}

            {activeTab === 'weekly_execution_loop' && (
              <WeeklyExecutionLoop />
            )}

            {activeTab === 'path_to_pmf_roadmap' && (
              <PathToPMFRoadmap />
            )}

            {activeTab === 'reality_based_cto_review' && (
              <RealityBasedCTOReview />
            )}

            {activeTab === 'current_business_status' && (
              <CurrentBusinessStatus />
            )}

            {activeTab === 'next_action_engine' && (
              <NextActionEngine />
            )}

            {activeTab === 'comprehensive_status_report' && (
              <ComprehensiveStatusReport />
            )}

            {activeTab === 'chrome_extension_architecture' && (
              <ChromeExtensionArchitecture />
            )}

            {activeTab === 'ai_studio_execution_loop' && (
              <AIStudioExecutionLoop />
            )}

            {activeTab === 'weekly_reality_review' && (
              <WeeklyRealityReview />
            )}

            {activeTab === 'growth_funnel' && (
              <GrowthFunnel />
            )}

            {activeTab === 'effective_buzz_os' && (
              <EffectiveBuzzOperatingSystem />
            )}

            {activeTab === 'agent' && (
              <div className="space-y-6">
                {/* Secondary Navigation switcher for different Agents */}
                <div className="bg-[#0d131f] border border-zinc-800 p-1.5 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                  <button 
                    onClick={() => setAgentSuiteTab('research')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      agentSuiteTab === 'research' 
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10' 
                        : 'text-gray-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                  >
                    <Cpu className="w-4 h-4 shrink-0" />
                    Market Intelligence Agent
                  </button>
                  <button 
                    onClick={() => setAgentSuiteTab('scoring')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      agentSuiteTab === 'scoring' 
                        ? 'bg-indigo-400 text-slate-950 shadow-md shadow-indigo-450/10' 
                        : 'text-gray-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                  >
                    <Sliders className="w-4 h-4 shrink-0" />
                    Predictive Lead Scoring Agent
                  </button>
                  <button 
                    onClick={() => setAgentSuiteTab('outreach')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      agentSuiteTab === 'outreach' 
                        ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/10' 
                        : 'text-gray-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    Outreach Copywriter Agent
                  </button>
                  <button 
                    onClick={() => setAgentSuiteTab('reply')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      agentSuiteTab === 'reply' 
                        ? 'bg-purple-400 text-slate-950 shadow-md shadow-purple-400/10' 
                        : 'text-gray-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    AI Reply Analysis Agent
                  </button>
                  <button 
                    onClick={() => setAgentSuiteTab('qualification')}
                    className={`py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      agentSuiteTab === 'qualification' 
                        ? 'bg-indigo-400 text-slate-950 shadow-md shadow-indigo-400/10' 
                        : 'text-gray-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    AI Qualification Agent
                  </button>
                </div>
                
                {agentSuiteTab === 'research' && (
                  <ResearchAgentDocs />
                )}
                {agentSuiteTab === 'scoring' && (
                  <LeadScoringAgentDocs />
                )}
                {agentSuiteTab === 'outreach' && (
                  <OutreachAgentDocs />
                )}
                {agentSuiteTab === 'reply' && (
                  <ReplyAnalysisAgentDocs />
                )}
                {agentSuiteTab === 'qualification' && (
                  <QualificationAgentDocs />
                )}
              </div>
            )}

          </div>
        </main>

      </div>

      <footer className="border-t border-gray-800 bg-[#070b13] py-6 text-center text-xs text-gray-500 font-mono">
        <p>© 2026 EffectiveBuzz Outbound Platforms Inc. All Rights Reserved. Complies with SOC2 multi-tenant criteria.</p>
      </footer>
    </div>
  );
}
