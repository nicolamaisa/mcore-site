import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatedMcoreLogo } from "./components/animated-mcore-logo";

const LABS_URL = "https://labs.mcore.it/?entry=mcore";
type ModalName = "vision" | "contact" | null;

export default function App() {
  const [modal, setModal] = useState<ModalName>(null);
  const [leaving, setLeaving] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  function enterLabs(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (leaving) return;
    setLeaving(true);
    timeoutRef.current = window.setTimeout(() => window.location.assign(LABS_URL), 2050);
  }

  return (
    <div className="mcore-page">
      <header className="site-header">
        <a className="brand" href="#main" aria-label="MCORE, vai al contenuto">
          <span className="brand-mark"><AnimatedMcoreLogo /></span>
          <span className="brand-name">MCORE</span>
        </a>

        <nav className="main-nav" aria-label="Navigazione principale">
          <a href={LABS_URL} onClick={enterLabs}>MCORE Labs</a>
          <button type="button" onClick={() => setModal("vision")}>Chi siamo</button>
          <button type="button" onClick={() => setModal("contact")}>Contatti</button>
        </nav>

        <p className="editorial-label">Prodotti Digitali.<br />Sviluppo Software.</p>
      </header>

      <main id="main" className="scene">
        <section className="copy-column" aria-labelledby="hero-title">
          <p className="eyebrow">Motion at the core</p>
          <h1 id="hero-title">Il centro<span className="dot">.</span><br /><span className="blue">Che mette</span><br />in moto il resto<span className="dot">.</span></h1>
          <p className="supporting-copy">MCORE è una realtà indipendente che crea e sviluppa prodotti digitali.<br />Dà alle idee il tempo, la struttura e la continuità per diventare reali.</p>
          <div className="divider" aria-hidden="true"><span /></div>
          <div className="labs-entry">
            <h2><span>/</span> MCORE <strong>Labs</strong></h2>
            <p>Software, prodotti e sistemi digitali.</p>
            <a href={LABS_URL} onClick={enterLabs}>Entra nel laboratorio <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <div className="mark-column" aria-hidden="true">
          <AnimatedMcoreLogo />
          <p>Indipendente,<br />per scelta.</p>
        </div>
      </main>

      <footer className="site-footer">
        <p className="footer-manifesto">Idee<br />Prodotti<br />Continuità</p>
        <span className="footer-rule" aria-hidden="true" />
        <p>MCORE di Nicola Maisano · P. IVA IT 05229040232 · <a href="mailto:mcore@pec.it">mcore@pec.it</a></p>
      </footer>

      {modal && <Modal type={modal} onClose={() => setModal(null)} />}
      {leaving && <LabsTransition />}
    </div>
  );
}

function Modal({ type, onClose }: { type: Exclude<ModalName, null>; onClose: () => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Contatto MCORE — ${String(data.get("name") ?? "")}`);
    const body = encodeURIComponent(`Nome: ${String(data.get("name") ?? "")}\nEmail: ${String(data.get("email") ?? "")}\n\n${String(data.get("message") ?? "")}`);
    window.location.href = `mailto:info@mcore.it?subject=${subject}&body=${body}`;
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Chiudi">×</button>
        <p className="eyebrow">MCORE / {type === "vision" ? "Chi Siamo" : "Contatti"}</p>
        {type === "vision" ? (
          <>
            <h2 id="modal-title"><span className="blue">MCORE</span>, senza sovrastrutture<span className="dot">.</span></h2>
            <p className="modal-copy">MCORE di Nicola Maisano è una realtà indipendente italiana attiva nello sviluppo di software e prodotti digitali.<br /><br />
            Nasce per costruire e far crescere progetti proprietari nel tempo, con attenzione al prodotto, alla tecnologia e all’utilità concreta.<br /><br />
            MCORE Labs è il primo spazio pubblico del progetto: il laboratorio in cui prendono forma software, strumenti e nuovi prodotti digitali.<br /><br />
            Accanto ai propri prodotti, MCORE può collaborare su selezionati progetti di sviluppo software e consulenza tecnica.
            </p>
          </>
        ) : (
          <>
            <h2 id="modal-title">Parliamone<span className="dot">.</span></h2>
            <a className="modal-email" href="mailto:info@mcore.it">info@mcore.it</a>
            <form className="contact-form" onSubmit={submit}>
              <label>Nome<input name="name" required autoComplete="name" /></label>
              <label>Email<input name="email" type="email" required autoComplete="email" /></label>
              <label>Messaggio<textarea name="message" required rows={3} /></label>
              <button type="submit">Invia il messaggio <span aria-hidden="true">→</span></button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function LabsTransition() {
  return (
    <div className="labs-transition" role="status" aria-live="polite" aria-label="Apertura di MCORE Labs">
      <span className="transition-mark"><AnimatedMcoreLogo /></span>
      <div className="ribbon-loader" aria-hidden="true"><i /><i /><i /><i /></div>
      <img src="/logo-mcore-labs.svg" className="transition-labs-logo" alt="MCORE Labs" />
    </div>
  );
}
