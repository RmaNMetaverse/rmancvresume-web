import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Youtube, Moon, Sun, Printer, MapPin } from 'lucide-react';
import profileImg from '../public/profile.jpg';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Floating Action Buttons (Hidden on Print) */}
      <div className="fixed top-6 right-6 flex gap-3 no-print z-50">
        <button 
          onClick={handlePrint}
          className={`p-3 rounded-full shadow-lg transition-transform hover:scale-110 ${darkMode ? 'bg-slate-800 text-blue-400 border border-slate-700' : 'bg-white text-blue-600 border border-gray-200'}`}
          title="Print / Save as PDF"
        >
          <Printer size={20} />
        </button>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full shadow-lg transition-transform hover:scale-110 ${darkMode ? 'bg-slate-800 text-yellow-400 border border-slate-700' : 'bg-white text-slate-800 border border-gray-200'}`}
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8 lg:py-12">
        <div className={`shadow-2xl overflow-hidden print-border ${darkMode ? 'bg-slate-800 shadow-slate-900/50' : 'bg-white shadow-gray-200/50'}`}>
          
          <div className="flex flex-col md:flex-row">
            
            {/* LEFT SIDEBAR */}
            <div className={`md:w-1/3 p-8 md:p-10 ${darkMode ? 'bg-slate-800/80' : 'bg-gray-50'}`}>
              
              {/* Profile Image & Name */}
              <div className="flex flex-col items-center mb-8">
                <div className={`w-40 h-40 rounded-full overflow-hidden border-4 mb-4 ${darkMode ? 'border-blue-500/30' : 'border-blue-100'} shadow-inner flex items-center justify-center bg-gray-200`}>
                  <img 
                    src={profileImg} 
                    alt="Arman Jangmiri" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-center uppercase print-heading">Arman Jangmiri</h1>
                <h2 className={`text-lg font-medium mt-2 tracking-widest text-center uppercase ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  Creative Technologist
                </h2>
              </div>

              {/* Contact Info */}
              <div className="mb-10 space-y-4 text-sm">
                <ContactItem icon={<Phone size={18} />} text="+989124150452" href="tel:+989124150452" darkMode={darkMode} />
                <ContactItem icon={<Mail size={18} />} text="RmaN.Metaverse@Gmail.com" href="mailto:RmaN.Metaverse@Gmail.com" darkMode={darkMode} />
                <ContactItem icon={<MapPin size={18} />} text="Tehran, Iran" darkMode={darkMode} />    
                <ContactItem icon={<Linkedin size={18} />} text="LinkedIn Profile" href="https://linkedin.com/in/armanjangmiri" darkMode={darkMode} />
                <ContactItem icon={<Youtube size={18} />} text="YouTube Channel" href="https://YouTube.com/RmaNYouTube" darkMode={darkMode} />
              </div>

              {/* About Me */}
              <div className="mb-10 page-break-inside-avoid">
                <SidebarHeading title="About Me" darkMode={darkMode} />
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Arman Jangmiri, Born in 1990. Creative technologist, creating interactive worlds through 3D, Game Dev, Web Development, Programming, Virtual Mixed Reality, and Design, Production, Music/Sound. 
                  <br/><br/>
                  Fascinated at the crossroads where modern technology meets modern art. Constantly learning new tech tools and bringing imaginative concepts to life.
                </p>
              </div>

              {/* Skills */}
              <div className="mb-10 page-break-inside-avoid">
                <SidebarHeading title="Skills" darkMode={darkMode} />
                <div className="flex flex-wrap gap-2">
                  <SkillTag text="Virtual Production" darkMode={darkMode} />
                  <SkillTag text="VR / AR / MR" darkMode={darkMode} />
                  <SkillTag text="Prompt Engineering" darkMode={darkMode} />
                  <SkillTag text="Agentic Development" darkMode={darkMode} />
                  <SkillTag text="Network" darkMode={darkMode} />
                  <SkillTag text="Web Design (WordPress)" darkMode={darkMode} />
                  <SkillTag text="Git / Version Control" darkMode={darkMode} />
                </div>
              </div>

              {/* Tools */}
              <div className="mb-10 page-break-inside-avoid">
                <SidebarHeading title="Tools" darkMode={darkMode} />
                <ul className={`text-sm space-y-2 list-disc list-inside ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  <li>Web Dev/Tool Dev (JS, Python, PHP, WordPress)</li>              
                  <li>Game Engines & 3D Software (Unreal,Unity,Blender,C4D)</li>
                  <li>Music Production + Sound Design (Ableton,Cubase)</li>
                  <li>GenAI (ComfyUI,Higgsfield,Google Flow,...)</li>
                  
                </ul>
              </div>

              {/* Languages & Interests */}
              <div className="page-break-inside-avoid">
                <SidebarHeading title="Languages" darkMode={darkMode} />
                <p className={`text-sm mb-6 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Farsi (Native) • English • German • Turkish • Chinese (Mandarin)
                </p>
                
                <SidebarHeading title="Interests" darkMode={darkMode} />
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Technology • Science • Gaming • Cinema • Electronic Music
                </p>
              </div>

            </div>

            {/* RIGHT MAIN CONTENT */}
            <div className="md:w-2/3 p-8 md:p-10 md:border-l border-gray-200 dark:border-slate-700">
              
              {/* TECH Section */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-8 print-heading">
                  <div className={`h-8 w-2 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
                  <h2 className="text-3xl font-bold tracking-wider uppercase">Tech Experience</h2>
                </div>



                <div className="space-y-8">
                  <ExperienceItem 
                    year="2013 - 2017 & 2026"
                    title="Web App Development / Web Design"
                    company="@itdprose & @Moses VP | Tehran, Iran"
                    description={<>
                      <strong>Front-End:</strong> Tailwind,Threejs,Javascript/jQuery, WordPress<br/>
                      <strong>Backend:</strong> Node.js/Express, Nginx, PHP<br/>
                      <strong>Database:</strong> Oracle PLSQL/Oracle, Postgres, MySQL, SQLite<br/>
                      <strong>Host:</strong> Linux (Debian Based), sysadmin<br/>
                      <strong>Vibe Coding/Agentic Dev:</strong> Claude Code, Codex, Antigravity
                    </>}
                    darkMode={darkMode}
                  />                

                  <ExperienceItem 
                    year="2022 - 2026"
                    title="Unreal Engine Virtual Production"
                    company="@IRIB, @VCast, @RASTAR | Tehran, Iran"
                    description={<>
                      LED-Wall ICVFX technician for Moses Project. Role: Virtual Production Technician, Live Camera Tracking (MoSys). Developing custom blueprints & Tools.<br/>
                      Green Screen Virtual Production Technician @RASTAR, setting up first fully Green Screen Virtual Production Studio Setup.
                    </>}
                    darkMode={darkMode}
                  />

                  <ExperienceItem 
                    year="2024 - 2026"
                    title="GenAI & AI Content Creator"
                    company="@MosesVP, @Freelancing"
                    description={<>
                      <strong>Platform/Tools:</strong> ComfyUI, Higgsfield, Google Flow, Adobe Firefly<br/>
                      <strong>Models:</strong> Seedance, Veo, Kling,...<br/>                    
                    </>}
                    darkMode={darkMode}
                  />

                  <ExperienceItem 
                    year="2017 - 2018 & 2026"
                    title="Technical Writer / Tech Support"
                    company="@Coiniran (Remote) & @MosesVP (On-Site)"
                    description={<>
                      <strong>Coiniran:</strong> Blockchain, cryptocurrency & web 3.0 R&D technical writing, articles, guides & tutorials.<br/>
                      <strong>MosesVP:</strong> Tech support for custom-developed internal Asset Manager tool + Implementing.
                    </>}
                    darkMode={darkMode}
                  />
                </div>
              </div>

              {/* ART Section */}
              <div>
                <div className="flex items-center gap-4 mb-8 mt-12 print-heading page-break-inside-avoid">
                  <div className={`h-8 w-2 ${darkMode ? 'bg-purple-500' : 'bg-purple-600'}`}></div>
                  <h2 className="text-3xl font-bold tracking-wider uppercase">Art Experience</h2>
                </div>

                <div className="space-y-8">
                  <ExperienceItem 
                    year="2022 - 2023"
                    title="Unreal Engine 3D Artist"
                    company="@VCast | Tehran, Iran"
                    description="Environment Design, Texturing, custom materials, Lighting & Rendering for Unreal Engine Short Cinematics & TV Series."
                    darkMode={darkMode}
                  />

                  <ExperienceItem 
                    year="2020 - 2022 + 2024 - 2025"
                    title="3D Render Artist & AI Artist"
                    company="@Freelance / Personal"
                    description="Making abstract 3D Art & Renders, for personal projects, freelance customers & NFTs in Cinema4D & Blender. Making AI Art & Videos with ComfyUI & Online AI Tools."
                    darkMode={darkMode}
                  />

                  <ExperienceItem 
                    year="2018 - 2022"
                    title="Music Producer / Sound Designer"
                    company="@Iran Novin"
                    description="Making Custom Music/Sound Design for Visual Media (Logomotion, Motion Graphics, TV/Radio Advertisements)."
                    darkMode={darkMode}
                  />

                  <ExperienceItem 
                    year="2014 - 2022"
                    title="Music Producer"
                    company="@Personal"
                    description="Making & releasing personal electronic music under 'RmaN'. Ending music for BBC Persian's Click special end of the year's episode (Nowrooz 1400)."
                    darkMode={darkMode}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
const ContactItem = ({ icon, text, href, darkMode }) => {
  const content = (
    <>
      <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>{icon}</span>
      <span>{text}</span>
    </>
  );

  if (href) {
    return (
      <div className="flex items-center">
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-3 transition-colors hover:text-blue-500 hover:underline ${darkMode ? 'text-slate-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}`}
        >
          {content}
        </a>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
      {content}
    </div>
  );
};

const SidebarHeading = ({ title, darkMode }) => (
  <h3 className={`text-lg font-bold uppercase tracking-wider mb-4 border-b pb-2 print-heading ${darkMode ? 'border-slate-700 text-slate-200' : 'border-gray-200 text-gray-800'}`}>
    {title}
  </h3>
);

const SkillTag = ({ text, darkMode }) => (
  <span className={`text-xs font-medium px-3 py-1.5 rounded-md ${darkMode ? 'bg-slate-700/50 text-slate-300' : 'bg-gray-200 text-gray-700'}`}>
    {text}
  </span>
);

const ExperienceItem = ({ year, title, company, description, darkMode }) => (
  <div className="relative pl-6 border-l-2 border-gray-300 dark:border-slate-600 page-break-inside-avoid">
    <div className={`absolute w-3 h-3 rounded-full -left-[7px] top-1.5 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} no-print`} />
    
    <div className={`text-sm font-bold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{year}</div>
    <h4 className="text-xl font-bold mb-1">{title}</h4>
    <div className={`text-sm font-semibold mb-3 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>{company}</div>
    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-600'} print-text-sm`}>
      {description}
    </p>
  </div>
);
