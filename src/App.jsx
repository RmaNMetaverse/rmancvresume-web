import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Printer, Pause, Play, Code2, Orbit, AudioLines, Mail, MapPin, Linkedin, Youtube, Github, Instagram, Film, Check, Copy } from 'lucide-react';
import Sculpture from './Sculpture';
import { logoUrl, socialProfiles } from './brand';
const socialIcons = { github: Github, instagram: Instagram, imdb: Film };
import { experience, disciplines } from './data';
const email = 'RmaN.CreaTechs@Gmail.com';
const filters = ['All experience', 'Engineering', 'Art & media', 'Writing & support'];
function PrintResume() {
  return <div className="print-resume">
    {[0, 1].map(page => <section className="paper" key={page}>
      <header className="paper-header">
        <div className="paper-identity"><div className="eyebrow paper-brand"><img src={logoUrl} alt="RmaN logo" /> RmaN / CURRICULUM VITAE</div><h1>Arman Jangmiri<span>.</span></h1><p>Creative technologist · Developer<br />Interactive media artist</p></div>
        <div className="paper-visual">{page === 0 ? <img className="paper-portrait" src={`${import.meta.env.BASE_URL}profile.jpg`} alt="Arman Jangmiri" /> : <img className="paper-logo-emblem" src={logoUrl} alt="RmaN logo" />}<span className="paper-index">0{page + 1} / 02</span></div>
      </header>
      <div className="paper-disciplines"><span><Code2 aria-hidden="true" /> ENGINEERING</span><span><Orbit aria-hidden="true" /> REAL-TIME WORLDS</span><span><AudioLines aria-hidden="true" /> ART & SOUND</span></div>
      {page === 0 ? <><div className="paper-contact"><a href={`mailto:${email}`}><Mail aria-hidden="true" />{email}</a><span><MapPin aria-hidden="true" />Tehran, Iran</span></div><p className="paper-summary">Creative technologist working across full-stack development, real-time 3D, virtual production, generative media, and sound. Combining technical implementation with visual storytelling, infrastructure administration, technical writing, and hands-on support.</p><h2><Code2 aria-hidden="true" />01 / Engineering, production & support</h2></> : <><div className="paper-contact"><a href="https://linkedin.com/in/armanjangmiri"><Linkedin aria-hidden="true" />linkedin.com/in/armanjangmiri</a><a href="https://YouTube.com/RmaNYouTube"><Youtube aria-hidden="true" />youtube.com/RmaNYouTube</a>{socialProfiles.map(profile => { const Icon = socialIcons[profile.icon]; return <a key={profile.name} href={profile.url}><Icon aria-hidden="true" />{profile.printLabel || profile.label}</a>; })}</div><h2><Orbit aria-hidden="true" />02 / Art, media & sound</h2></>}
      {(page === 0 ? experience.filter(x => x.type !== 'Art & media') : experience.filter(x => x.type === 'Art & media')).map(x => <article className="paper-job" key={x.title}><div className="paper-job-heading"><h3>{x.title}</h3><span>{x.date}</span></div><div className="paper-company">{x.company}{x.location && ` · ${x.location}`}</div><p>{x.description} {x.details}</p></article>)}
      {page === 0 ? <div className="paper-skills"><h2>Technical toolkit</h2><p><b>Development & infrastructure</b> / JavaScript, Python, PHP, Node.js, Express, WordPress, Tailwind, Three.js, SQL, Nginx, Linux, networking, Git.</p><p><b>Real-time & production</b> / Unreal Engine, Unity, Blueprints, Mo-Sys, ICVFX, virtual production, VR / AR / MR.</p><p><b>AI-assisted workflows</b> / Prompt engineering, agentic development, Claude Code, Codex, Antigravity.</p></div> : <div className="paper-skills"><h2>Creative toolkit & languages</h2><p><b>Creative & AI media</b> / Blender, Cinema 4D, Ableton, Cubase; DaVinci Resolve, Premiere Pro; Higgsfield, Comfy Cloud, Google Flow, ComfyUI, Adobe Firefly.</p><p><b>Post-production</b> / Video editing in DaVinci Resolve and Premiere Pro; introductory After Effects for basic motion graphics.</p><p><b>Languages</b> / Farsi (native), English, German, Turkish.</p><p><b>Interests</b> / Technology, science, gaming, cinema, electronic music.</p></div>}
      <footer className="paper-footer"><span>ARMAN JANGMIRI / CREATIVE TECHNOLOGIST</span><span className="paper-footer-brand"><img src={logoUrl} alt="" /> ART × TECHNOLOGY × PEOPLE</span></footer>
    </section>)}
  </div>;
}
export default function App() {
  const [filter, setFilter] = useState(filters[0]);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [copied, setCopied] = useState(false);
  const progressRef = useRef(null);
  const [active, setActive] = useState('about');
  useEffect(() => {
    const scroll = () => {
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`;
    };
    window.addEventListener('scroll', scroll, {
      passive: true
    });
    scroll();
    const observer = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    }), {
      rootMargin: '-15% 0px -55% 0px'
    });
    document.querySelectorAll('main section[id]').forEach(el => observer.observe(el));
    return () => {
      window.removeEventListener('scroll', scroll);
      observer.disconnect();
    };
  }, []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }
  return <><div className={`site ${paused ? 'motion-paused' : ''}`}>
    <a className="skip-link" href="#experience">Skip to experience</a>
    <div className="scroll-progress" ref={progressRef} />
    <header className="navigation"><a className="wordmark" href="#about" aria-label="RmaN, back to top"><img className="brand-logo" src={logoUrl} alt="RmaN logo" /><span className="wordmark-caption">ART / CODE / EXPERIENCE</span></a><nav aria-label="Main navigation">{[['about', 'About'], ['experience', 'Experience'], ['practice', 'Practice'], ['contact', 'Contact']].map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav><button className="nav-print" onClick={() => window.print()}><Printer size={15} /><span>Print résumé</span><ArrowUpRight size={14} /></button></header>
    <main>
      <section id="about" className="about-section wrap section-space" aria-labelledby="human-heading"><div className="portrait"><img src={`${import.meta.env.BASE_URL}profile.jpg`} alt="Arman Jangmiri" fetchPriority="high" /><span>THE HUMAN BEHIND THE SYSTEMS ↗</span></div><div className="about-copy"><div className="eyebrow">01 / ALWAYS EXPLORING</div><p className="profile-name">ARMAN JANGMIRI / CREATIVE TECHNOLOGIST</p><h2 id="human-heading">Curiosity is<br />my <span className="serif">operating system.</span></h2><p>I’m fascinated by the place where modern technology meets modern art. Whether I’m creating an interactive world, debugging a tool, writing a guide, or shaping a sound, I’m looking for new ways to turn an idea into something people can experience.</p><div className="about-facts"><div><h3>LANGUAGES</h3><p>Farsi <span>(native)</span> · English · German<br />Turkish</p></div><div><h3>OUTSIDE THE WORK</h3><p>Technology · Science · Gaming<br />Cinema · Electronic music</p></div></div></div></section>
      <section id="creative" className="hero wrap"><div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> BETWEEN ART & TECHNOLOGY</div><h1>Creative mind.<br />Technical <span className="serif">soul.</span></h1><div className="intro"><span className="intro-rule" /><p>I’m <strong>Arman Jangmiri</strong>, a creative technologist.<br />I build the systems, worlds, and experiences<br className="desktop-break" /> where imagination becomes interactive.</p></div><div className="hero-actions"><a href="#experience" className="button primary">Explore my experience <ArrowDown size={17} /></a><a href={`mailto:${email}`} className="text-link">Let’s connect <ArrowUpRight size={17} /></a></div><div className="hero-footnote"><MapPin size={13} /> TEHRAN, IRAN <span>·</span> WORKING ACROSS DISCIPLINES</div></div>
      <div className="experiment"><div className="experiment-top"><span>EXPERIMENT 001 / EXTRUDED IDENTITY</span><span className="live-label"><i /> LIVE</span></div><div className="sculpture"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><Sculpture paused={paused} /><span className="axis axis-top">Y +</span><span className="axis axis-bottom">X +</span><div className="sculpture-caption"><span>FORM 02</span><strong>Relief</strong></div></div><div className="experiment-controls"><span className="experiment-hint">DRAG TO ROTATE · MOUSE OR TOUCH</span><button className="icon-button" aria-label={paused ? 'Resume motion' : 'Pause motion'} onClick={() => setPaused(!paused)}>{paused ? <Play size={16} /> : <Pause size={16} />}</button></div></div>
      <div className="hero-bottom"><span>ENGINEER BY LOGIC. ARTIST BY INSTINCT.</span><a href="#experience">SCROLL TO DISCOVER <ArrowDown size={14} /></a></div></section>
      <div className="discipline-strip" aria-label="Disciplines"><span>CREATIVE DEVELOPMENT</span><i>✳</i><span>REAL-TIME 3D</span><i>✳</i><span>VIRTUAL PRODUCTION</span><i>✳</i><span>GENERATIVE MEDIA</span><i>✳</i><span>SOUND DESIGN</span></div>

      <section id="experience" className="experience-section wrap section-space"><div className="section-heading"><div className="eyebrow">02 / THE JOURNEY</div><h2>A career across<br /><span className="serif">worlds.</span></h2><p>Development. Production. Art. Sound.<br />The common thread is bringing ideas to life.</p></div><div className="experience-toolbar"><div className="filters" role="group" aria-label="Filter experience">{filters.map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}{f === filters[0] && <span>08</span>}</button>)}</div><span className="result-count" aria-live="polite">{filter === filters[0] ? '08' : String(experience.filter(x => x.type === filter).length).padStart(2, '0')} ENTRIES</span></div><div className="timeline">{experience.filter(x => filter === filters[0] || x.type === filter).map(x => <article className="experience-row" key={x.title}><div className="experience-meta"><span className="date">{x.date}</span><span className={`category category-${x.type === 'Art & media' ? 'art' : 'tech'}`}>{x.type}</span></div><div className="experience-body"><div className="job-heading"><h3>{x.title}</h3><span className="job-arrow" aria-hidden="true">↗</span></div><div className="company">{x.company}{x.location && <span> / {x.location}</span>}</div><p>{x.description}</p>{x.details && <details><summary>Role details <span>+</span></summary><p>{x.details}</p></details>}<div className="tags">{x.tags.map(t => <span key={t}>{t}</span>)}</div></div></article>)}</div></section>
      <section id="practice" className="practice wrap section-space"><div className="section-heading"><div className="eyebrow">03 / THE PRACTICE</div><h2>Different disciplines.<br /><span className="muted">One curious mind.</span></h2><p>From a line of code to a world on screen.<br />I connect creative ambition with the technical<br className="desktop-break" /> craft that makes it work.</p></div><div className="practice-grid">{disciplines.map((d, i) => {
              const Icon = [Code2, Orbit, AudioLines][i];
              return <article className="practice-card" key={d.number}><div className="card-top"><Icon size={27} strokeWidth={1.3} /><span>{d.number}</span></div><h3>{d.title}</h3><p>{d.text}</p><div className="tool-list">{d.tools}</div></article>;
            })}</div></section>

      <section id="contact" className="contact-section wrap"><div className="eyebrow">04 / START A CONVERSATION</div><h2>Have something<br /><span className="serif">in mind?</span> <ArrowUpRight aria-hidden="true" /></h2><div className="contact-bottom"><div><p>Let’s connect art, technology, and a good idea.</p><a className="email-link" href={`mailto:${email}`}>{email} <ArrowUpRight size={20} /></a><button className="copy-button" onClick={copyEmail}>{copied ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{copied ? 'Copied to clipboard' : 'Copy email'}</span></button></div><div className="social-links">{socialProfiles.map(profile => { const Icon = socialIcons[profile.icon]; return <a key={profile.name} href={profile.url} target="_blank" rel="noreferrer"><Icon size={17} />{profile.name}<ArrowUpRight size={15} /></a>; })}<a href="https://linkedin.com/in/armanjangmiri" target="_blank" rel="noreferrer"><Linkedin size={17} />LinkedIn<ArrowUpRight size={15} /></a><a href="https://YouTube.com/RmaNYouTube" target="_blank" rel="noreferrer"><Youtube size={17} />YouTube<ArrowUpRight size={15} /></a></div></div></section>
    </main><footer className="site-footer wrap"><a className="wordmark" href="#about"><img className="brand-logo" src={logoUrl} alt="RmaN logo" /></a><span>CREATIVE TECHNOLOGIST / ARMAN JANGMIRI</span><a href="#about">BACK TO TOP ↑</a></footer>
  </div><PrintResume /></>;
}
