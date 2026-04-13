import { useEffect, useState } from "react";
import "./ManifestoTicker.css";

const phrases = [
  "Somos un punto que conecta.",
  "Comunicación con sentido.",
  "Procesos a medida. Marcas con identidad.",
  "Cercana, humana, creativa y estratégica.",
  "CABE existe. Y evoluciona.",
  "Ideas con propósito. Marcas con alma."
];

function ManifestoTicker() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); 
  // typing | pause | deleting

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout;

    if (phase === "typing") {
      if (text.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, 65);
      } else {
        timeout = setTimeout(() => setPhase("pause"), 1200);
      }
    }

    else if (phase === "pause") {
      timeout = setTimeout(() => setPhase("deleting"), 600);
    }

    else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length - 1));
        }, 35);
      } else {
        // 👇 AHORA también espera antes de cambiar frase
        timeout = setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setPhase("typing");
        }, 200);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, phraseIndex]);

  return (
    <section className="manifesto">
      <div className="typewriter">
        {text}
        <span className="cursor">|</span>
      </div>
    </section>
  );
}

export default ManifestoTicker;
