type HeroSectionProps = {
  text: string;
};

export const HeroSection = ({ text }: HeroSectionProps) => (
  <section className="pt-32 pb-32 px-6 max-w-6xl mx-auto">
    <h1 className="hero-text text-5xl md:text-8xl font-bold mb-10 mt-16">
      <span className="reveal-container">
        <span className="reveal-text reveal-delay-1 block">Connect Ideas.</span>
      </span>
      <span className="reveal-container">
        <span className="reveal-text reveal-delay-2 text-gray-400 block">Build Systems.</span>
      </span>
    </h1>
    <div className="reveal-container">
      <p className="reveal-text reveal-delay-3 text-xl md:text-2xl text-gray-500 max-w-2xl font-light leading-relaxed">
        {text}
      </p>
    </div>
    <div className="hero-scene mt-14" aria-hidden="true">
      <div className="hero-ground"></div>
      <div className="hero-path"></div>
      <div className="hero-figure hero-figure--thinker">
        <span className="hero-head"></span>
        <span className="hero-body"></span>
        <span className="hero-arm hero-arm--left"></span>
        <span className="hero-arm hero-arm--right"></span>
        <span className="hero-leg hero-leg--left"></span>
        <span className="hero-leg hero-leg--right"></span>
      </div>
      <div className="hero-figure hero-figure--runner">
        <span className="hero-head"></span>
        <span className="hero-body"></span>
        <span className="hero-arm hero-arm--left"></span>
        <span className="hero-arm hero-arm--right"></span>
        <span className="hero-leg hero-leg--left"></span>
        <span className="hero-leg hero-leg--right"></span>
      </div>
      <div className="hero-bubble">
        <span className="hero-bubble-tail"></span>
        <span className="hero-dot hero-dot--1"></span>
        <span className="hero-dot hero-dot--2"></span>
        <span className="hero-dot hero-dot--3"></span>
      </div>
      <div className="hero-lightbulb">
        <span className="hero-lightbulb-bulb"></span>
        <span className="hero-lightbulb-ray hero-lightbulb-ray--1"></span>
        <span className="hero-lightbulb-ray hero-lightbulb-ray--2"></span>
        <span className="hero-lightbulb-ray hero-lightbulb-ray--3"></span>
      </div>
    </div>
  </section>
);
