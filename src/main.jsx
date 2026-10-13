import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const featured = [
  { name: 'Good Days', detail: 'A calmer way to plan your week', kind: 'Product design · 2025', color: 'peach', eyebrow: 'A kinder kind of planning', headline: 'Make room for a good day.', note: 'Your week, with a little more breathing room.', tiles: ['Today, gently', 'A small win', 'Make some space'] },
  { name: 'Common Ground', detail: 'Making local discovery feel personal', kind: 'Digital experience · 2024', color: 'sage', eyebrow: 'Find your people', headline: 'Good things are closer.', note: 'Places and people worth getting to know.', tiles: ['Around the corner', 'Saved for later', 'This weekend'] },
  { name: 'Small Hours', detail: 'A little space for better sleep', kind: 'Concept · 2024', color: 'blue', eyebrow: 'An evening ritual', headline: 'Let the day settle.', note: 'Tiny rituals for slower evenings and softer mornings.', tiles: ['Unwind', 'A quiet sound', 'Sleep well'] },
];

const otherWork = [
  { name: 'Field Notes', type: 'Brand & web', year: '2023', summary: 'A home for curious people who like to get outside.' },
  { name: 'Soft Signal', type: 'Interface design', year: '2023', summary: 'A quieter, more thoughtful way to keep in touch.' },
  { name: '100 Days of Play', type: 'Daily practice', year: '2022', summary: 'Small experiments in shape, color, and interaction.' },
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
            <h3>{project.name}</h3>
            <p>{project.detail}</p>
            <span className="project-card-kind">{project.kind}<span aria-hidden="true"> ↗</span></span>
          </article>
        );
      })}
    </div>
  );
}

function App() {
  return (
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
            <a className="work-row" href="#contact" key={item.name}>
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
  );
}

createRoot(document.getElementById('root')).render(<App />);
