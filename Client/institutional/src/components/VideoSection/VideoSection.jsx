import "./VideoSection.css";

function VideoSection() {
  return (
    <section className="video-section">
      <div className="video-wrapper">
        <iframe
          src="https://www.youtube.com/embed/a2Ms3xIsx-Y?autoplay=1&mute=1&loop=1&playlist=a2Ms3xIsx-Y&controls=0&showinfo=0&rel=0&modestbranding=1"
          title="Showreel Agencia"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}

export default VideoSection;
