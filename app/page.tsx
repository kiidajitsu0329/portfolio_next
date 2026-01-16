'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const projects = [
  {
    title: "Semiconductor Analysis App",
    category: "Backend / Data Analysis",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    description: "半導体製造における複雑なデータ分析を行うアプリケーション開発。FastAPIによる高速なAPI実装と、Celery + Redisを用いた非同期タスク管理により、効率的な処理を実現。",
    detail: "基本設計からテストまでを担当。pydanticを用いた厳格なデータバリデーションや、フロントエンドでの動的なグラフ描画・CSVエクスポート機能を実装し、分析精度の向上に貢献しました。",
    tech: ["Python / FastAPI", "Celery / Redis", "Azure Storage", "PostgreSQL", "JavaScript"]
  },
  {
    title: "Education Management System",
    category: "Full Cycle Dev",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200",
    description: "教育機関向け管理システムのサーバサイドおよびUI開発。ASP.NETを中心に、CSVデータの自動登録機能や非同期通信処理を実装し、事務作業の大幅な効率化を達成。",
    detail: "要件定義からDB設計、テストまで一貫して対応。jQueryを用いた直感的なUI制御により、PC操作に不慣れなユーザーでもミスなく作業できるインターフェースを構築しました。",
    tech: ["C# / ASP.NET", "PostgreSQL", "JavaScript / jQuery", "Windows Server", "SQL Server"]
  },
  {
    title: "Agile Web Development & UX",
    category: "Frontend / UX Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
    description: "家具ECサイトのUI/UX改善および官公庁ポータル開発。ユーザー導線の最適化や、Next.js/TypeScriptを用いたアジャイルな短期開発をリード。",
    detail: "Figmaを用いたプロトタイプ制作からReactによる実装まで担当。チーム内の進捗可視化ツールを導入し、コミュニケーションのボトルネックを解消することで、リリース速度を30%向上させました。",
    tech: ["Next.js / TypeScript", "PHP / WordPress", "AWS S3", "Figma", "MySQL"]
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="bg-white text-gray-900 overflow-x-hidden">
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100' : 'bg-transparent'
        }`}>
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="text-lg font-semibold tracking-tight">Daiki.T</div>
            <div className="hidden md:flex space-x-8 text-xs font-medium text-gray-600 uppercase tracking-widest">
              <a href="#work" className="hover:text-black transition-colors">Work</a>
              <a href="#about" className="hover:text-black transition-colors">About</a>
              <a href="#contact" className="hover:text-black transition-colors">Contact</a>
            </div>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-gray-100">
              <div className="px-6 py-4 space-y-3">
                <a 
                  href="#work" 
                  className="mobile-menu-item block text-sm font-medium text-gray-600 hover:text-black transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Work
                </a>
                <a 
                  href="#about" 
                  className="mobile-menu-item block text-sm font-medium text-gray-600 hover:text-black transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
                <a 
                  href="#contact" 
                  className="mobile-menu-item block text-sm font-medium text-gray-600 hover:text-black transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-32 px-6 max-w-6xl mx-auto">
          <h1 className="hero-text text-5xl md:text-8xl font-bold mb-10 mt-16">
            <span className="reveal-container">
              <span className="reveal-text reveal-delay-1 block">Bridge the Gap.</span>
            </span>
            <span className="reveal-container">
              <span className="reveal-text reveal-delay-2 text-gray-400 block">Full-Cycle Engineering.</span>
            </span>
          </h1>
          <div className="reveal-container">
            <p className="reveal-text reveal-delay-3 text-xl md:text-2xl text-gray-500 max-w-2xl font-light leading-relaxed">
              要件定義から運用まで一貫して担うフルサイクルエンジニア。技術・デザイン・業務をつなぎ、複雑な課題に対する「最適解」を構築します。
            </p>
          </div>
        </section>

        {/* Project Grid */}
        <section id="work" className="px-6 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`project-card group cursor-pointer fade-in-section ${index === 2 ? 'md:col-span-2' : ''}`}
                onClick={() => setSelectedProject(index)}
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-40 px-6 bg-[#fbfbfd]">
          <div className="max-w-4xl mx-auto text-center fade-in-section">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Beyond Coding.</h2>
            <p className="text-xl text-gray-500 leading-relaxed font-light mb-16">
              システム開発はコードを書くだけではありません。チームの進捗可視化、コミュニケーションの円滑化、そしてビジネス要件の深い理解。<br className="hidden md:block" />
              アジャイルとウォーターフォール双方の経験を活かし、安定稼働と生産性向上の両立を実現します。
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-4xl font-bold mb-2">5+</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Years Exp.</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10+</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Full</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Cycle Dev</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 px-6 max-w-6xl mx-auto fade-in-section">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="mb-12 md:mb-0">
              <h2 className="text-6xl font-bold mb-6 tracking-tighter">Ready to <br />Collaborate?</h2>
              <p className="text-gray-400 text-lg font-light">複雑なデータ処理から直感的なUI実装まで。<br />最適なソリューションをご提案します。</p>
            </div>
            <div>
              <a
                href="mailto:hello@example.com"
                className="inline-block bg-black text-white px-12 py-5 rounded-full font-medium hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-2xl"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-gray-100 text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-[0.3em]">
            © 2026 Daiki Tsuji Portfolio
          </div>
        </footer>

        {/* Modal */}
        {selectedProject !== null && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all group"
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-black" />
              </button>
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-72 md:h-auto relative bg-gray-100">
                  <img
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 p-10 md:p-16">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">
                    {projects[selectedProject].category}
                  </span>
                  <h3 className="text-3xl font-bold mb-8 tracking-tight">{projects[selectedProject].title}</h3>
                  <div className="space-y-8 text-gray-500 font-light leading-relaxed">
                    <p className="text-lg text-black font-normal">{projects[selectedProject].description}</p>
                    <div className="pt-8 border-t border-gray-100">
                      <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Project Detail</h4>
                      <p>{projects[selectedProject].detail}</p>
                    </div>
                    <div className="pt-8 border-t border-gray-100">
                      <h4 className="text-xs font-bold text-black uppercase tracking-widest mb-4">Tech Stack</h4>
                      <ul className="grid grid-cols-2 gap-y-2">
                        {projects[selectedProject].tech.map((tech, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <span className="w-1.5 h-1.5 bg-black rounded-full mr-3"></span>
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
