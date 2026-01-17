import { HeroSection } from './components/HeroSection';
import { ProjectsClient } from './components/ProjectsClient';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { StatsSection } from './components/StatsSection';
import { ApproachSection } from './components/ApproachSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { NavigationClient } from './components/NavigationClient';
import { EffectsClient } from './components/EffectsClient';

export default function Home() {
  const heroText = "「顧客満足」と「チームの幸福」を実装する、フルサイクルエンジニア。";

  return (
    <>
      <div className="bg-white text-gray-900 overflow-x-hidden">
        <NavigationClient />
        <EffectsClient />

        <HeroSection text={heroText} />
        <ProjectsClient />
        <SkillsSection />

        {/* Technology Stack */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Technical Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="fade-in-section">
              <h3 className="font-bold text-lg mb-4">Languages</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>JavaScript (4年以上)</li>
                <li>HTML (4年以上)</li>
                <li>CSS (4年以上)</li>
                <li>SQL (4年以上)</li>
                <li>PHP (2～4年)</li>
                <li>TypeScript (1～2年)</li>
                <li>Python (1～2年)</li>
                <li>C# (1～2年)</li>
                <li>Java (1～2年)</li>
              </ul>
            </div>

            <div className="fade-in-section">
              <h3 className="font-bold text-lg mb-4">Frameworks</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Bootstrap (4年以上)</li>
                <li>jQuery (2～4年)</li>
                <li>React (1～2年)</li>
                <li>FastAPI (1～2年)</li>
                <li>Play Framework (1～2年)</li>
                <li>Groovy (1～2年)</li>
                <li>Selenium (1～2年)</li>
                <li>Jest (1年未満)</li>
                <li>Next.js (1年未満)</li>
                <li>Vue.js (1年未満)</li>
              </ul>
            </div>

            <div className="fade-in-section">
              <h3 className="font-bold text-lg mb-4">Databases & Storage</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>MySQL (4年以上)</li>
                <li>PostgreSQL (2～4年)</li>
              </ul>
            </div>

            <div className="fade-in-section">
              <h3 className="font-bold text-lg mb-4">Tools & Libraries</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>GitHub (4年以上)</li>
                <li>VS Code (4年以上)</li>
                <li>Windows 10 (4年以上)</li>
                <li>Mac OS (4年以上)</li>
                <li>A5:SQL Mk-2 (2～4年)</li>
                <li>jQuery (2～4年)</li>
                <li>pydantic (1～2年)</li>
                <li>Celery (1～2年)</li>
                <li>Figma (1～2年)</li>
                <li>Photoshop (1～2年)</li>
                <li>Illustrator (1～2年)</li>
                <li>PHPMyAdmin (1～2年)</li>
                <li>Visual Studio (1年未満)</li>
              </ul>
            </div>
          </div>
          </div>
        </section>

        <AboutSection />
        <StatsSection />
        <ApproachSection />
        <ContactSection />
        <FooterSection />

      </div>
    </>
  );
}
