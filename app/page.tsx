'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import type { Project } from './types';
import { NAV_LINKS, CLASS_NAMES, ANIMATION } from './constants';
import { throttle } from './utils';

const projects: Project[] = [
  {
    title: "Semiconductor Analysis App",
    category: "Backend / Data Analysis",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    description: "複雑なデータ分析を行うアプリケーション開発。FastAPIによる高速なAPI実装と、Celery + Redisを用いた非同期タスク管理により、効率的な処理を実現。",
    detail: "基本設計からテストまでを担当。pydanticを用いた厳格なデータバリデーションや、フロントエンドでの動的なグラフ描画・CSVエクスポート機能を実装。複数の処理を並行実行し、システムの応答性を大幅に改善しました。",
    tech: ["Python", "FastAPI", "Celery / Redis", "PostgreSQL", "Azure Storage", "JavaScript"]
  },
  {
    title: "Education Management System",
    category: "Full Stack Development",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200",
    description: "教育機関向け管理システムのサーバサイドおよびUI開発。ASP.NETを中心に、CSVデータの自動登録機能や非同期通信処理を実装。",
    detail: "要件定義からDB設計、テストまで一貫して対応。jQueryを用いた直感的なUI制御により、PC操作に不慣れなユーザーでもミスなく作業できるインターフェースを構築。事務作業の効率化により業務時間を30%削減しました。",
    tech: ["C#", "ASP.NET", "jQuery / AJAX", "PostgreSQL", "JavaScript", "HTML/CSS"]
  },
  {
    title: "Official Government Portal Development",
    category: "Frontend / UX Optimization",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
    description: "官公庁向けポータルサイトの顧客折衝から一貫対応。WordPressカスタマイズにより情報検索機能と管理機能を実装。",
    detail: "Figmaを用いた画面改善提案を実施し、現場課題を踏まえたデザイン修正を推進。AWS S3を利用した静的サイトのデプロイおよび運用サポートを担当。ユーザー満足度が大幅に向上しました。",
    tech: ["WordPress", "JavaScript", "PHP", "HTML/CSS", "AWS S3", "Figma"]
  },
  {
    title: "EC Site UI/UX Enhancement",
    category: "Frontend Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    description: "家具ECサイトのUI/UX改善プロジェクト。ユーザー導線の最適化により売上向上を実現。",
    detail: "UI/UX改善、HTML/CSSコーディングに加え、JavaScriptによる機能拡張を担当。ページ遷移の最適化とCTA配置の改善により、コンバージョン率を25%向上させました。",
    tech: ["JavaScript", "PHP", "HTML/CSS", "jQuery", "MySQL"]
  },
  {
    title: "Agile Transformation & Communication",
    category: "Process Improvement / Team Leadership",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
    description: "アジャイル開発チームのコミュニケーション改善とプロセス最適化。進捗可視化ツール導入による生産性向上。",
    detail: "進捗状況をグラフ化してデイリー共有する習慣を導入。オープンな発言環境を構築することで、チーム間のコミュニケーションが円滑化。プロジェクト全体の生産性が20%向上し、短期リリースサイクルの実現に貢献しました。",
    tech: ["Agile/Scrum", "Communication Tools", "Data Visualization", "Team Leadership"]
  },
  {
    title: "Multi-Industry System Solutions",
    category: "Full Cycle Development",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    description: "不動産・飲食・レジャー等、多様な業界向けシステム開発。それぞれの業界要件に応じた最適なソリューション提供。",
    detail: "配車業務管理システム、物件管理システム、各種コーポレートサイト構築など、単月～3ヶ月規模の複数案件を同時進行で対応。業界ごとの品質基準を理解し、短納期でも品質を担保する制作体制を構築しました。",
    tech: ["WordPress", "PHP", "MySQL", "JavaScript", "HTML/CSS", "Vue.js"]
  },
  {
    title: "Career Counseling & Process Improvement",
    category: "Career Development / Requirements Gathering",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
    description: "人材派遣業でのキャリアカウンセリングと業務改善。スタッフのニーズ理解と最適配置を実現。",
    detail: "派遣スタッフのキャリアカウンセリング、契約書作成、研修サポートを担当。ユーザーの潜在的なニーズを引き出す力を磨きました。業務改善提案も採用され、効率化を推進。この経験が、システム開発での要件定義の強みに繋がっています。",
    tech: ["Career Planning", "Requirement Analysis", "Process Optimization", "Communication"]
  },
  {
    title: "Inventory & Schedule Management",
    category: "Operations / Data Organization",
    image: "https://images.unsplash.com/photo-1554224311-beee415c201f?auto=format&fit=crop&q=80&w=1200",
    description: "レンタカー業での在庫・スケジュール管理。複数条件の調整と顧客対応。",
    detail: "車両在庫、リアルタイムスケジュール管理、顧客対応、店舗事務を一体的に処理。複数の制約条件を満たしながら最適な配置を実現する思考力を習得。この経験が、複雑なデータ処理・ロジック実装への適応力に繋がっています。",
    tech: ["Inventory Management", "Schedule Planning", "Customer Service", "Data Organization"]
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // スクロール処理（throttle 適用）
  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 0);
    }, ANIMATION.SCROLL_DEBOUNCE_MS);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver（マウント時のみ実行）
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
        }
      });
    }, { threshold: ANIMATION.SCROLL_THRESHOLD });

    document.querySelectorAll('.fade-in-section').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // ESC キー対応
  useEffect(() => {
    if (selectedProject === null) return;

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [selectedProject]);

  // モーバイルメニューを開く/閉じる
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // モーバイルメニューを閉じる
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // プロジェクトを開く
  const openProject = useCallback((index: number) => {
    setSelectedProject(index);
    document.body.style.overflow = 'hidden'; // スクロール禁止
  }, []);

  // モーダルを閉じる
  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = '';  // スクロール復帰
  }, []);

  return (
    <>
      <div className="bg-white text-gray-900 overflow-x-hidden">
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="text-lg font-semibold tracking-tight">Daiki.T</div>
            <div className="hidden md:flex space-x-8 text-xs font-medium text-gray-600 uppercase tracking-widest">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className={CLASS_NAMES.NAV_LINK}>
                  {link.label}
                </a>
              ))}
            </div>
            <button 
              className="md:hidden p-2"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
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
              <nav className="px-6 py-4 space-y-3">
                {NAV_LINKS.map((link) => (
                  <a 
                    key={link.href}
                    href={link.href} 
                    className={CLASS_NAMES.MOBILE_MENU_ITEM}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </nav>

        {/* Hero Section */}
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
              顧客折衝から一貫して担うフルサイクルエンジニア。技術・デザイン・業務をつなぎ、複雑な課題に対する「最適解」を構築します。
            </p>
          </div>
        </section>

        {/* Project Grid */}
        <section id="work" className="px-6 py-20 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <article
                key={`project-${index}`}
                className={CLASS_NAMES.PROJECT_CARD}
                onClick={() => openProject(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openProject(index);
                  }
                }}
                role="button"
                tabIndex={0}
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
              </article>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Core Competencies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Full Stack Development */}
              <div className="fade-in-section">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Full Cycle Development
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  顧客折衝から、システムライフサイクル全般を統括。バックエンド・フロントエンド双方で実装経験を持ち、複雑な課題にも柔軟に対応できます。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 要件定義・基本設計</li>
                  <li>• DB設計・実装</li>
                  <li>• テスト・運用支援</li>
                </ul>
              </div>

              {/* Backend Development */}
              <div className="fade-in-section">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Backend Development
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  FastAPI、ASP.NET等での高負荷データ処理実装。非同期処理・キャッシング・キューイングなど、安定稼働を重視した堅牢な設計が得意です。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Python / FastAPI</li>
                  <li>• C# / ASP.NET</li>
                  <li>• Celery / Redis</li>
                </ul>
              </div>

              {/* Frontend & UX */}
              <div className="fade-in-section">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Frontend & UX
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  UI制御・画面描画からユーザー導線の改善まで対応。Figmaでの提案も含め、"使いやすさ"を意識した開発が可能です。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Next.js / TypeScript</li>
                  <li>• JavaScript / jQuery</li>
                  <li>• Figma</li>
                </ul>
              </div>

              {/* Agile & Team */}
              <div className="fade-in-section">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Agile & Communication
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  スクラムでの短期リリース対応。進捗可視化やコミュニケーション改善により、チーム全体のパフォーマンス向上に貢献。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Agile / Scrum</li>
                  <li>• 進捗管理・可視化</li>
                  <li>• Team Leadership</li>
                </ul>
              </div>

              {/* Multi-Industry */}
              <div className="fade-in-section">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Multi-Industry Experience
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  半導体・官公庁・教育・EC・不動産など、多様な業界要件に適応。業界固有の品質基準を理解し、実現可能な提案が可能です。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 7業界以上の実績</li>
                  <li>• 業務理解に基づく提案</li>
                  <li>• 短納期での品質担保</li>
                </ul>
              </div>

              {/* Technical Skills */}
              <div className="fade-in-section">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Technical Stack
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  幅広い技術スタックに対応。新しい技術への学習力も高く、プロジェクト要件に応じた最適な技術選定ができます。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Python / Java / C#</li>
                  <li>• PostgreSQL / MySQL</li>
                  <li>• AWS / Azure</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

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

        {/* Experience Timeline */}
        <section id="about" className="py-40 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">About Me</h2>
            
            <div className="prose prose-lg max-w-none fade-in-section">
              <p className="text-xl text-gray-700 leading-relaxed mb-8 font-light">
                Web/オープン系システムエンジニアとして、顧客折衝から一貫して対応可能なフルサイクル開発を強みとしています。半導体分析アプリ、官公庁ポータル、ECサイトなど多様な業界に従事し、バックエンド・フロントエンド双方で高品質なシステムを安定稼働させてきました。
              </p>

              <h3 className="text-2xl font-bold mb-6 mt-12">主な強み</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="border-l-4 border-black pl-6">
                  <h4 className="font-bold text-lg mb-3">要件定義～運用まで一貫対応</h4>
                  <p className="text-gray-600">仕様検討から実装・改善まで一貫して対応し、工程間の齟齬を最小化。複雑なシステムを安定稼働させた実績があります。</p>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="font-bold text-lg mb-3">複雑なデータ処理への対応力</h4>
                  <p className="text-gray-600">高負荷データ処理・非同期処理を含むバックエンド開発経験。処理負荷や例外発生を見越した堅牢な実装に強みがあります。</p>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="font-bold text-lg mb-3">ユーザー視点のUI開発</h4>
                  <p className="text-gray-600">UI制御・画面描画からユーザー導線の改善まで対応。"使いやすさ"を意識した開発により、ユーザー満足度と販売促進に貢献。</p>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="font-bold text-lg mb-3">チーム生産性向上への貢献</h4>
                  <p className="text-gray-600">進捗可視化・情報共有の改善により、メンバー間のコミュニケーションを円滑化。プロジェクト全体の生産性を向上させました。</p>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="font-bold text-lg mb-3">多業界への適応力</h4>
                  <p className="text-gray-600">半導体・官公庁・教育・EC・不動産など、異なる品質基準と要件を持つ案件で成果を上げてきました。</p>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="font-bold text-lg mb-3">技術・デザイン・業務の橋渡し</h4>
                  <p className="text-gray-600">顧客折衝・デザイン理解・業務整理まで担え、実現可能性の高い打ち手を提案できます。</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6 mt-24">Philosophy</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                複雑なシステムを構築する際に最も重要なのは、「ビジネス要件の深い理解」と「チーム全体の生産性向上」です。単にコードを書くのではなく、ユーザーの課題を解決し、チームとしての効率を最大化することで、持続可能で高品質なシステムが実現できると考えています。
              </p>
              <p className="text-gray-600 leading-relaxed">
                これまで多業界のプロジェクトに携わる中で、常に「最適解は何か」を問い続け、技術・デザイン・業務をつなぎ合わせることで、複雑な課題にも柔軟かつ迅速に対応してきました。
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-40 px-6 bg-black text-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="fade-in-section">
                <div className="text-5xl font-bold mb-2">5+</div>
                <div className="text-sm uppercase tracking-widest text-gray-400">年間経験</div>
              </div>
              <div className="fade-in-section">
                <div className="text-5xl font-bold mb-2">20+</div>
                <div className="text-sm uppercase tracking-widest text-gray-400">プロジェクト</div>
              </div>
              <div className="fade-in-section">
                <div className="text-5xl font-bold mb-2">7+</div>
                <div className="text-sm uppercase tracking-widest text-gray-400">粗種</div>
              </div>
              <div className="fade-in-section">
                <div className="text-5xl font-bold mb-2">Full</div>
                <div className="text-sm uppercase tracking-widest text-gray-400">範囲</div>
              </div>
            </div>
          </div>
        </section>

        {/* Beyond Coding Section */}
        <section id="approach" className="py-40 px-6 bg-[#fbfbfd]">
          <div className="max-w-4xl mx-auto text-center fade-in-section">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Beyond Coding.</h2>
            <p className="text-xl text-gray-500 leading-relaxed font-light mb-16">
              システム開発はコードを書くだけではありません。チームの進捗可視化、コミュニケーションの円滑化、そしてビジネス要件の深い理解。<br className="hidden md:block" />
              アジャイルとウォーターフォール双方の経験を活かし、安定稼働と生産性向上の両立を実現します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">要件を正確に</h3>
                <p className="text-gray-600 font-light">顧客要件を深く理解し、実現可能な最適設計を提案。工程間の齟齬を最小化します。</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">品質を保証</h3>
                <p className="text-gray-600 font-light">堅牢で保守性の高いコード。複雑な処理も安定稼働を重視した実装を行います。</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">情報を共有</h3>
                <p className="text-gray-600 font-light">チームとの連携を大切に。進捗可視化とオープンな情報共有で生産性を向上させます。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 px-6 max-w-6xl mx-auto fade-in-section">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="mb-12 md:mb-0">
              <h2 className="text-6xl font-bold mb-6 tracking-tighter">一緒に<br />仕事を<br />しませんか？</h2>
              <p className="text-gray-400 text-lg font-light">複雑なデータ処理から直感的なUI実装まで。<br />最適なソリューションをご提案します。</p>
            </div>
            <div>
              <a
                href="mailto:hello@example.com"
                className={CLASS_NAMES.BUTTON_PRIMARY}
              >
                お問い合わせ
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
        {selectedProject !== null && selectedProject < projects.length && (
          <div
            className={`fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl`}
            onClick={closeModal}
            role="presentation"
          >
            <div
              className={`relative w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto z-[61]`}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`project-title-${selectedProject}`}
            >
              <button
                onClick={closeModal}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') closeModal();
                }}
                className="absolute top-6 right-6 z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all group"
                aria-label="Close modal"
                ref={(el) => {
                  if (el && selectedProject !== null) {
                    setTimeout(() => el.focus(), 0);
                  }
                }}
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
                  <h3 className="text-3xl font-bold mb-8 tracking-tight" id={`project-title-${selectedProject}`}>{projects[selectedProject].title}</h3>
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
