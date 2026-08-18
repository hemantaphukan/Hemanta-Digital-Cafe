/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  BarChart2, 
  Settings, 
  ExternalLink, 
  Plus, 
  X, 
  Link as LinkIcon,
  Globe,
  Layout,
  Command,
  FileText,
  Zap,
  HardDrive,
  Cpu,
  ShieldCheck,
  User,
  Sun,
  Moon,
  Smartphone,
  Printer,
  Download,
  Monitor,
  Shield
} from 'lucide-react';

interface TabLink {
  id: string;
  title: string;
  url: string;
  icon: React.ReactNode;
}

const DEFAULT_LINKS: TabLink[] = [
  { id: 'dashboard', title: 'Business Tools', url: 'https://ais.studio', icon: <Home className="w-5 h-5" /> },
  { id: 'pucc-apply', title: 'PUCC Apply Online', url: 'https://form.jotform.com/260033901392449', icon: <FileText className="w-5 h-5" /> },
];

export default function App() {
  const [links, setLinks] = useState<TabLink[]>(DEFAULT_LINKS);
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_LINKS[0].id);
  const [isAdding, setIsAdding] = useState(false);
  const [newTab, setNewTab] = useState({ title: '', url: '' });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const activeLink = links.find(l => l.id === activeTab) || links[0];

  const addTab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTab.title) return;
    
    const id = Date.now().toString();
    const link: TabLink = {
      id,
      title: newTab.title,
      url: newTab.url || '#',
      icon: <Command className="w-5 h-5" />
    };
    
    setLinks([...links, link]);
    setActiveTab(id);
    setNewTab({ title: '', url: '' });
    setIsAdding(false);
  };

  const removeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (links.length <= 1) return;
    
    const newLinks = links.filter(l => l.id !== id);
    setLinks(newLinks);
    if (activeTab === id) {
      setActiveTab(newLinks[0].id);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col overflow-hidden transition-colors duration-300">
      {/* Header Navigation */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between flex-shrink-0 z-30 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">L</div>
          <span className="font-semibold text-lg tracking-tight dark:text-white">LinkHub v1.0</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            System Operational
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400">
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Tab Navigation Bar */}
      <nav className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center flex-shrink-0 overflow-x-auto no-scrollbar z-20 transition-colors">
        <div className="flex gap-8 h-full">
          {links.map((link) => (
            <div
              key={link.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveTab(link.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveTab(link.id);
                }
              }}
              className={`h-full border-b-2 px-2 flex items-center gap-2 transition-all group relative whitespace-nowrap cursor-pointer select-none ${
                activeTab === link.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              <span className={activeTab === link.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-300'}>
                {React.cloneElement(link.icon as React.ReactElement, { className: 'w-4 h-4' })}
              </span>
              <span className="text-sm">{link.title}</span>
              
              {links.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => removeTab(link.id, e)}
                  className={`ml-1 p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                    activeTab === link.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  title="Close tab"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="ml-auto pl-4">
          <button 
            onClick={() => setIsAdding(true)}
            className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 rounded px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-all flex items-center gap-2"
          >
            <Plus className="w-3 h-3" />
            Add Tab
          </button>
        </div>
      </nav>

      {/* Main Viewport */}
      <main className="flex-1 p-8 overflow-y-auto transition-colors">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{activeLink.title} Overview</h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Operational view and resource configuration for this module.</p>
                </div>
                
                {activeLink.url && activeLink.url !== '#' && (
                  <a 
                    href={activeLink.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-200 dark:shadow-none self-start md:self-auto"
                  >
                    <span>Open External Resource</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {activeTab === 'dashboard' ? (
                <div className="grid grid-cols-12 gap-6">
                  {/* Left Column: Primary Cards */}
                  <div className="col-span-12 lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                          e-Stamp Online Login
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">
                          Direct access to the SHCIL e-Stamping Online Portal and digital services.
                        </p>
                        <a 
                          href="https://www.shcilestamp.com/OnlineStamping/OlnEsi" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Open Portal
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">PUCC Fine Check</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Check and pay Pollution Under Control Certificate fines online.</p>
                        <a 
                          href="https://puc.parivahan.gov.in/puc/views/OnlineFinePayment.xhtml" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Check Fines
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">PUCC Mobile Link Check</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Check PUC certificate history and mobile link status online.</p>
                        <a 
                          href="https://puc.parivahan.gov.in/puc/views/PucCertificateHistory.xhtml" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Check History
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <Printer className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">Print Portal Login</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Access Rekha Print member portal and print authentication.</p>
                        <a 
                          href="https://rekhaprint.info/members/login" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Open Login
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <Printer className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">Print Portal Server-2 Login</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Access Dukang Print Server-2 member portal and user login.</p>
                        <a 
                          href="https://dukang.in/login" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Open Login
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <Printer className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">Print Portal Server-3 Login</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Access Service to Point Server-3 authentication and print portal.</p>
                        <a 
                          href="https://servicetopoint.com/web/index.php/auth/login.php" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Open Login
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">Vehicle Mobile Linking</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Access Vahan online portal for vehicle mobile number update and linking services.</p>
                        <a 
                          href="https://vahan.parivahan.gov.in/vahanservice/vahan/ui/statevalidation/homepage.xhtml" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Link Mobile
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <Download className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">Aadhaar Download</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Download official e-Aadhaar card online from UIDAI myAadhaar portal.</p>
                        <a 
                          href="https://myaadhaar.uidai.gov.in/genricDownloadAadhaar/en" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Download Aadhaar
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <ShieldCheck className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">Aadhaar Status Check</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Check enrollment and update status of your Aadhaar card on UIDAI portal.</p>
                        <a 
                          href="https://myaadhaar.uidai.gov.in/CheckAadhaarStatus/en" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Check Status
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">CSC DigitalSeva Login</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Access the official CSC Digital Seva Portal for e-governance and citizen services.</p>
                        <a 
                          href="https://digitalseva.csc.gov.in/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Open Login
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <Monitor className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">Cyber Cafe Tools</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Access AK Print Hub services and online cyber cafe tools portal.</p>
                        <a 
                          href="https://akprinthub.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Open Portal
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">Car & Bike Insurance</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Access PBPartners for motor insurance quotes and instant policy issuance.</p>
                        <a 
                          href="https://www.pbpartners.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Get Insurance
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">PUCC Apply Online</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Submit online application form for Pollution Under Control Certificate.</p>
                        <a 
                          href="https://form.jotform.com/260033901392449" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Apply Online
                        </a>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mb-4 flex items-center justify-center">
                          <Smartphone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">Aadhaar Mobile No. Check</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 mt-1">Verify Aadhaar validity and check linked mobile number status on UIDAI portal.</p>
                        <a 
                          href="https://myaadhaar.uidai.gov.in/check-aadhaar-validity/en" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                        >
                          Check Mobile No.
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Status & Progress */}
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm transition-colors">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Module Status</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Core Engine</span>
                          </div>
                          <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded tracking-wider uppercase transition-colors">ACTIVE</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Secure Tunnel</span>
                          </div>
                          <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded tracking-wider uppercase transition-colors">STABLE</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800 dark:bg-slate-900 rounded-xl p-6 text-white shadow-lg border border-transparent dark:border-slate-800 transition-colors">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Provisioning Progress</h4>
                      <div className="text-3xl font-bold mb-4 tracking-tighter tabular-nums">76% <span className="text-sm font-medium text-slate-500 ml-1">ALLOCATED</span></div>
                      <div className="w-full bg-slate-700 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '76%' }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="bg-blue-500 h-full"
                        />
                      </div>
                      <p className="mt-6 text-[10px] text-slate-500 leading-relaxed italic border-t border-slate-700 dark:border-slate-800 pt-4 font-medium uppercase tracking-tight">
                        "Next automated sync cycle scheduled for 18:00 UTC."
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/20 rounded-xl flex items-center justify-center text-teal-600 dark:text-teal-400">
                        {React.cloneElement(activeLink.icon as React.ReactElement, { className: 'w-6 h-6' })}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{activeLink.title} Portal</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{activeLink.url}</p>
                      </div>
                    </div>
                    <a 
                      href={activeLink.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-md shadow-blue-200 dark:shadow-none"
                    >
                      <span>Open in New Window</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="w-full h-[700px] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 shadow-inner relative">
                    <iframe 
                      src={activeLink.url} 
                      title={activeLink.title}
                      className="w-full h-full border-0"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Status Bar */}
      <footer className="h-8 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter transition-colors">
        <div className="flex gap-6">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Region: CLOUD-RUN-H1
          </div>
          <div className="flex items-center gap-1.5">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
             Encryption: AES-256
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-slate-300 dark:text-slate-600" />
            V-Path Integrated
          </div>
          <span className="text-slate-300 dark:text-slate-800">|</span>
          <div className="flex items-center gap-1.5">
            Admin: LinkHub_Agent_01
            <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
            Session Active
          </div>
        </div>
      </footer>

      {/* Add Tab Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"
            />
            <motion.form
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onSubmit={addTab}
              className="relative bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-md shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Provision New Tab</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Configure module metadata and target endpoint.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                    Module Label
                  </label>
                  <input
                    autoFocus
                    type="text"
                    placeholder="e.g. Analytics Portal"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300 dark:text-white"
                    value={newTab.title}
                    onChange={(e) => setNewTab({ ...newTab, title: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                    Source URL Reference
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                      <LinkIcon className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                    </div>
                    <input
                      type="text"
                      placeholder="https://console.example.com"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300 dark:text-white"
                      value={newTab.url}
                      onChange={(e) => setNewTab({ ...newTab, url: e.target.value })}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 flex items-center gap-1.5 font-medium px-1 italic">
                    <ShieldCheck className="w-3 h-3" />
                    SSL certificate verification will be requested on launch.
                  </p>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={!newTab.title}
                className="w-full bg-blue-600 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl mt-10 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200 dark:shadow-none"
              >
                Provision Module
              </button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


