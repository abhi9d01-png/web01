import React from 'react';
import { createRoot } from 'react-dom/client';
import { Preloader } from './components/preloader.jsx';
import './styles.css';

const featured = [
  { name: 'Home-lab', detail: 'Documentation of my homelab project', kind: 'Self-hosting · 2026', color: 'peach', url: 'https://github.com/abhi9d01-png/Home-lab' },
  { name: 'web01', detail: 'Personal portfolio and IT engineering showcase', kind: 'Frontend · 2026', color: 'sage', url: 'https://github.com/abhi9d01-png/web01' },
  { name: 'DevBuddy', detail: 'A developer-focused project and learning space', kind: 'Developer tools · 2026', color: 'blue', url: 'https://github.com/abhi9d01-png/DevBuddy' },
];

const otherWork = [
  { name: 'RouteGuard', type: 'Network security', year: '2026', summary: 'A project exploring safer routes and network protection.', url: 'https://github.com/abhi9d01-png/RouteGuard' },
  { name: 'Home-lab', type: 'Self-hosting', year: '2026', summary: 'Documentation of my homelab project.', url: 'https://github.com/abhi9d01-png/Home-lab' },
  { name: 'web01', type: 'Frontend', year: '2026', summary: 'Personal portfolio and IT engineering showcase.', url: 'https://github.com/abhi9d01-png/web01' },
  { name: 'DevBuddy', type: 'Developer tools', year: '2026', summary: 'A developer-focused project and learning space.', url: 'https://github.com/abhi9d01-png/DevBuddy' },
];

function SectionLabel({ children }) {
  return <p className="section-label">{children}</p>;
}

function DraggableProjectStack() {
  const stackRef = React.useRef(null);
  const dragRef = React.useRef(null);
  const [offsets, setOffsets] = React.useState({});
  const [cardOrder, setCardOrder] = React.useState(featured.map((project) => project.name));

  function moveCard(projectName, x, y) {
    setOffsets((current) => ({
      ...current,
      [projectName]: { x, y },
    }));
  }

  function bringToFront(projectName) {
    setCardOrder((current) => [
      ...current.filter((name) => name !== projectName),
      projectName,
    ]);
  }

  function startDragging(event, projectName) {
    if (event.button !== 0 || !stackRef.current) return;
    event.preventDefault();
    const card = event.currentTarget;
    const currentOffset = offsets[projectName] ?? { x: 0, y: 0 };
    dragRef.current = {
      pointerId: event.pointerId,
      projectName,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: currentOffset.x,
      offsetY: currentOffset.y,
      cardRect: card.getBoundingClientRect(),
    };
    card.setPointerCapture(event.pointerId);
    bringToFront(projectName);
  }

  function dragCard(event) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId || !stackRef.current) return;
    const frame = stackRef.current.getBoundingClientRect();
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    const boundedX = Math.min(
      frame.right - drag.cardRect.right,
      Math.max(frame.left - drag.cardRect.left, deltaX),
    );
    const boundedY = Math.min(
      frame.bottom - drag.cardRect.bottom,
      Math.max(frame.top - drag.cardRect.top, deltaY),
    );
    moveCard(drag.projectName, drag.offsetX + boundedX, drag.offsetY + boundedY);
  }

  function stopDragging(event) {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  }

  function nudgeCard(event, projectName) {
    const directions = {
      ArrowLeft: [-16, 0],
      ArrowRight: [16, 0],
      ArrowUp: [0, -16],
      ArrowDown: [0, 16],
    };
    const direction = directions[event.key];
    if (!direction || !stackRef.current) return;
    event.preventDefault();
    const card = event.currentTarget;
    const frame = stackRef.current.getBoundingClientRect();
    const bounds = card.getBoundingClientRect();
    const currentOffset = offsets[projectName] ?? { x: 0, y: 0 };
    const deltaX = Math.min(frame.right - bounds.right, Math.max(frame.left - bounds.left, direction[0]));
    const deltaY = Math.min(frame.bottom - bounds.bottom, Math.max(frame.top - bounds.top, direction[1]));
    moveCard(projectName, currentOffset.x + deltaX, currentOffset.y + deltaY);
    bringToFront(projectName);
  }

  return (
    <div className="project-stack" ref={stackRef} aria-label="Draggable featured project cards">
      <p className="stack-hint">Drag a card to explore</p>
      {featured.map((project, index) => {
        const offset = offsets[project.name] ?? { x: 0, y: 0 };
        return (
          <article
            className={`project-card ${project.color}`}
            key={project.name}
            tabIndex={0}
            aria-label={`${project.name}. Drag to move, or use the arrow keys.`}
            onPointerDown={(event) => startDragging(event, project.name)}
            onPointerMove={dragCard}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onKeyDown={(event) => nudgeCard(event, project.name)}
            style={{
              '--drag-x': `${offset.x}px`,
              '--drag-y': `${offset.y}px`,
              '--card-rotation': `${[-7, 5, -2][index]}deg`,
              zIndex: cardOrder.indexOf(project.name) + 1,
            }}
          >
            <div className={`project-card-art artwork art-${index + 1}`} aria-hidden="true">
              <span className="art-shape shape-one" />
              <span className="art-shape shape-two" />
              <span className="art-caption">{['take it easy', 'find your people', 'rest is part of it'][index]}</span>
            </div>
            <div className="project-card-meta">
              <span>Selected work</span>
              <span>0{index + 1} / 03</span>
            </div>
            <a className="project-card-link" href={project.url} target="_blank" rel="noreferrer">
              <h3>{project.name}</h3>
              <p>{project.detail}</p>
              <span className="project-card-kind">{project.kind}<span aria-hidden="true"> ↗</span></span>
            </a>
          </article>
        );
      })}
    </div>
  );
}

function App() {
  const [preloaderVisible, setPreloaderVisible] = React.useState(true);
  const [portfolioVisible, setPortfolioVisible] = React.useState(false);
  const transitionTimersRef = React.useRef([]);
  const transitionStartedRef = React.useRef(false);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPortfolioVisible(true);
      setPreloaderVisible(false);
      return undefined;
    }

    return () => {
      transitionTimersRef.current.forEach(window.clearTimeout);
      transitionTimersRef.current = [];
    };
  }, []);

  const handlePreloaderSequenceStart = React.useCallback(() => {
    if (transitionStartedRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    transitionStartedRef.current = true;
    transitionTimersRef.current = [
      window.setTimeout(() => setPortfolioVisible(true), 1500),
      window.setTimeout(() => setPreloaderVisible(false), 2000),
    ];
  }, []);

  React.useEffect(() => {
    if (!preloaderVisible) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [preloaderVisible]);

  return (
    <>
    <div
      className={`portfolio-content${portfolioVisible ? ' portfolio-content--visible portfolio-content--revealing' : ''}`}
      aria-hidden={!portfolioVisible}
      inert={!portfolioVisible}
    >
    <main>
      <header className="topbar wrap">
        <a className="wordmark" href="#top" aria-label="Abhir, home">A<span>✳</span></a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Say hello <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="desk-collage" aria-hidden="true">
          <img className="desk-object collage-base" src="/photo/hero-collage.png" alt="" />
          <img className="desk-object coffee-object" src="/photo/cup_stain-removebg-preview.png" alt="" />
          <img className="desk-object film-object" src="/photo/cmaera_rol-removebg-preview.png" alt="" />
          <img className="desk-object lighter-object" src="/photo/lighter-removebg-preview.png" alt="" />
        </div>
        <img className="hero-right-collage" src="/photo/hero-right-still-life.png" alt="" aria-hidden="true" />
        <div className="hero-center">
          <h1>Abhiraj</h1>
          <p className="hero-role">Software Developer &amp; Network Engineer</p>
          <p className="hero-motto"><em>Verb &amp; Noun</em></p>
          <p className="hero-copy">a thoughtful process of crafting experiences that engage people,<br className="desktop-break"/> shape clarity, and spark delights.</p>
        </div>
        <a className="scroll-cue" href="#work" aria-label="Scroll to work"><span>⌄</span><span>⌄</span></a>
      </section>

      <section className="work-section wrap" id="work">
        <SectionLabel>Recently made <span aria-hidden="true">▶</span></SectionLabel>
        <div className="project-showcase">
          <DraggableProjectStack />
        </div>
      </section>

      <section className="other-section wrap">
        <SectionLabel>Other work <span aria-hidden="true">⁕</span></SectionLabel>
        <div className="work-list">
          {otherWork.map((item, index) => (
            <a className="work-row" href={item.url} target="_blank" rel="noreferrer" key={item.name}>
              <span className="row-index">0{index + 1}</span>
              <span className="row-main"><strong>{item.name}</strong><span>{item.summary}</span></span>
              <span className="row-type">{item.type}</span>
              <span className="row-year">{item.year}</span>
              <span className="row-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="about-section wrap" id="about">
        <div><SectionLabel>A little about me <span aria-hidden="true">⌘</span></SectionLabel></div>
        <div className="about-body">
          <p className="about-lead">Hi, I’m Abhiraj somewhere between a curious mind and a terminal full of unfinished ideas.</p>
          <p>I like understanding how things work, imagining how they could work better, and building things that bring those ideas to life. From writing code to obsessing over the little details of a design, I’m drawn to the space where logic meets creativity.</p>
          <p>Most of what I make starts with a question, a random thought, or a <em>“what if?”</em></p>
          <p>I’m still figuring things out, one experiment at a time. This is where I put the things I build, the ideas I chase, and a little bit of the person behind them.</p>
          <p className="signoff"><strong>Curious by nature. Building by choice.</strong></p>
          <div className="contact-links" id="contact">
            <div><a href="https://www.linkedin.com/in/abhiraj-singh-94763b357/?isSelfProfile=true" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/something.dummm?cplk=Z2ljbWYwd3JiNWs=" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://github.com/abhi9d01-png" target="_blank" rel="noreferrer">GitHub ↗</a></div>
            <a href="mailto:get.abhirajsingh@gmail.com">E-mail: get.abhirajsingh@gmail.com ↗</a>
          </div>
        </div>
      </section>
    </main>
    </div>
    {preloaderVisible && (
      <Preloader onSequenceStart={handlePreloaderSequenceStart} />
    )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
