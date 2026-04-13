import { useState } from "react";
import "./VideoSection.css";

function VideoSection() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="video-section">
      {!loaded && <div className="video-placeholder" />}

      <div className={`video-wrapper ${loaded ? "visible" : ""}`}>
        <iframe
          src="https://www.youtube.com/embed/a2Ms3xIsx-Y?autoplay=1&mute=1&loop=1&playlist=a2Ms3xIsx-Y&controls=0&rel=0&modestbranding=1"
          title="Showreel Agencia"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          loading="lazy"
          onLoad={() => setLoaded(true)}
        ></iframe>
      </div>
    </section>
  );
}

export default VideoSection;
