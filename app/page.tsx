'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import type { Project } from './types';
import { NAV_LINKS, CLASS_NAMES, ANIMATION } from './constants';
import { throttle } from './utils';

const projects: Project[] = [
  {
    title: "Semiconductor Analysis App",
    category: "Backend / Data Analysis",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&fm=webp",
    summary: "分析アプリの基盤設計",
    description: "半導体分析アプリのAPIと非同期処理を実装。FastAPIとCelery + Redisを用いたデータ処理基盤を構築。",
    detail: "API開発、非同期タスク管理、pydanticによるバリデーション、エラーハンドリングを担当。フロントではグラフ表示やCSVエクスポート、ダウンロード機能を実装し、バックエンドではPlay FrameworkでのREST API実装にも対応しました。",
    tech: ["Python", "FastAPI", "Celery / Redis", "PostgreSQL", "Azure Storage", "JavaScript"]
  },
  {
    title: "Education Management System",
    category: "Full Stack Development",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200&fm=webp",
    summary: "申請業務のオンライン化",
    description: "教育機関向け申請管理システムのサーバサイドとUIを実装。ASP.NETを中心に、CSV登録や非同期通信を組み込み。",
    detail: "要件定義からDB設計、テストまで一貫して対応。jQueryによるUI制御で入力ミスを減らし、事務作業の効率化に寄与しました。",
    tech: ["C#", "ASP.NET", "jQuery / AJAX", "PostgreSQL", "JavaScript", "HTML/CSS"]
  },
  {
    title: "Official Government Portal Development",
    category: "Frontend / UX Optimization",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200&fm=webp",
    summary: "官公庁サイトのUX改善",
    description: "官公庁向けポータルサイトの顧客折衝から一貫対応。WordPressカスタマイズにより情報検索機能と管理機能を実装。",
    detail: "Figmaを用いた画面改善提案を実施し、現場課題を踏まえたデザイン修正を推進。AWS S3を利用した静的サイトのデプロイおよび運用サポートを担当しました。",
    tech: ["WordPress", "JavaScript", "PHP", "HTML/CSS", "AWS S3", "Figma"]
  },
  {
    title: "EC Site UI/UX Enhancement",
    category: "Frontend Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&fm=webp",
    summary: "導線設計の改善",
    description: "家具ECサイトのUI/UX改善プロジェクト。ユーザー導線の見直しと表示設計を担当。",
    detail: "UI/UX改善、HTML/CSSコーディング、JavaScriptによる機能拡張を担当。ページ遷移やCTA配置の改善に取り組みました。",
    tech: ["JavaScript", "PHP", "HTML/CSS", "jQuery", "MySQL"]
  },
  {
    title: "Agile Transformation & Communication",
    category: "Process Improvement / Team Leadership",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200&fm=webp",
    summary: "進捗の見える化推進",
    description: "アジャイル開発チームのコミュニケーション改善とプロセス最適化に取り組み。",
    detail: "進捗状況をグラフ化してデイリー共有する習慣を導入。オープンな発言環境づくりを通じて、チーム内の情報共有を促進しました。",
    tech: ["Agile/Scrum", "Communication Tools", "Data Visualization", "Team Leadership"]
  },
  {
    title: "Multi-Industry System Solutions",
    category: "Full Cycle Development",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200&fm=webp",
    summary: "多業界の短期案件対応",
    description: "不動産・飲食・レジャーなど多様な業界向けのWeb/業務システムを担当。",
    detail: "配車業務管理、物件検索、各種コーポレートサイト構築など複数案件を並行対応。業界要件を踏まえた設計と実装を行いました。",
    tech: ["WordPress", "PHP", "MySQL", "JavaScript", "HTML/CSS", "Vue.js"]
  },
  {
    title: "Career Counseling & Process Improvement",
    category: "Career Development / Requirements Gathering",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200&fm=webp",
    summary: "潜在ニーズを言語化",
    description: "人材派遣業でのキャリアカウンセリングと業務改善。スタッフのニーズ理解と最適配置に対応。",
    detail: "派遣スタッフのキャリアカウンセリング、契約書作成、研修サポートを担当。潜在的なニーズを引き出す力を磨きました。",
    tech: ["Career Planning", "Requirement Analysis", "Process Optimization", "Communication"]
  },
  {
    title: "Customer Experience & Service Excellence",
    category: "Operations / Data Organization",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200&fm=webp",
    summary: "顧客ニーズを深く理解する接客",
    description: "レンタカー業での在庫・スケジュール管理と顧客対応。",
    detail: "車両在庫、リアルタイムスケジュール管理、顧客対応、店舗事務を一体的に処理。複数条件を調整する現場運用の経験を積みました。",
    tech: ["Inventory Management", "Schedule Planning", "Customer Service", "Data Organization"]
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.fade-in-section'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      sections.forEach((section) => section.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
        }
      });
    }, { threshold: ANIMATION.SCROLL_THRESHOLD });

    sections.forEach((section) => observer.observe(section));
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

  // モーダル表示時のスクロール制御
  useEffect(() => {
    if (selectedProject === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
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
  }, []);

  // モーダルを閉じる
  const closeModal = useCallback(() => {
    setSelectedProject(null);
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
              <div className="px-6 py-4 space-y-3">
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
              </div>
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
              「顧客満足」と「チームの幸福」を実装する、フルサイクルエンジニア。
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
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed">{project.summary}</p>
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
                <Image
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=1200&fm=webp"
                  alt="Full cycle development"
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full aspect-[4/3] object-cover rounded-2xl mb-6"
                />
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Full Cycle Development
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  顧客折衝から開発・運用までの一連を担当。バックエンド・フロントエンド双方で実装経験があります。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 要件定義・基本設計</li>
                  <li>• DB設計・実装</li>
                  <li>• テスト・運用支援</li>
                </ul>
              </div>

              {/* Backend Development */}
              <div className="fade-in-section">
                <Image
                  src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1200&fm=webp"
                  alt="Backend development"
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full aspect-[4/3] object-cover rounded-2xl mb-6"
                />
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Backend Development
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  FastAPI、ASP.NET等でのデータ処理実装経験。非同期処理やキューイングを用いた設計にも対応します。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Python / FastAPI</li>
                  <li>• C# / ASP.NET</li>
                  <li>• Celery / Redis</li>
                </ul>
              </div>

              {/* Frontend & UX */}
              <div className="fade-in-section">
                <Image
                  src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&q=80&w=1200&fm=webp"
                  alt="Frontend and UX design"
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full aspect-[4/3] object-cover rounded-2xl mb-6"
                />
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Frontend & UX
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  UI制御・画面描画から導線改善まで対応。Figmaでの提案も行います。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Next.js / TypeScript</li>
                  <li>• JavaScript / jQuery</li>
                  <li>• Figma</li>
                </ul>
              </div>

              {/* Agile & Team */}
              <div className="fade-in-section">
                <Image
                  src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&q=80&w=1200&fm=webp"
                  alt="Agile team collaboration"
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full aspect-[4/3] object-cover rounded-2xl mb-6"
                />
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Agile & Communication
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  スクラムでの短期リリース対応。進捗可視化やコミュニケーション改善に取り組みました。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Agile / Scrum</li>
                  <li>• 進捗管理・可視化</li>
                  <li>• Team Leadership</li>
                </ul>
              </div>

              {/* Multi-Industry */}
              <div className="fade-in-section">
                <Image
                  src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1200&fm=webp"
                  alt="Multi-industry experience"
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full aspect-[4/3] object-cover rounded-2xl mb-6"
                />
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Multi-Industry Experience
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  半導体・官公庁・教育・EC・不動産など、多様な業界要件に対応してきました。
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 業務理解に基づく提案</li>
                  <li>• 複数案件の同時進行に対応</li>
                  <li>• 業界要件に沿った実装</li>
                </ul>
              </div>

              {/* Technical Skills */}
              <div className="fade-in-section">
                <Image
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200&fm=webp"
                  alt="Technical stack"
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="w-full aspect-[4/3] object-cover rounded-2xl mb-6"
                />
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                  Technical Stack
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-4">
                  幅広い技術スタックに対応。プロジェクト要件に応じた技術選定に取り組みます。
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
                Web/オープン系システムエンジニアとして、顧客折衝から一貫して対応できるフルサイクル開発に携わってきました。半導体分析アプリ、官公庁ポータル、ECサイトなど多様な業界で、バックエンド・フロントエンドの実装を経験しています。
              </p>

              <h3 className="text-2xl font-bold mb-6 mt-12">主な強み</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="border-l-4 border-black pl-6">
                  <h4 className="font-bold text-lg mb-3">要件定義～運用まで一貫対応</h4>
                  <p className="text-gray-600">仕様検討から実装・改善まで一貫して対応し、工程間の齟齬を最小化します。</p>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="font-bold text-lg mb-3">複雑なデータ処理への対応力</h4>
                  <p className="text-gray-600">高負荷データ処理・非同期処理を含むバックエンド開発経験。処理負荷や例外発生を見越した堅牢な実装に強みがあります。</p>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="font-bold text-lg mb-3">ユーザー視点のUI開発</h4>
                  <p className="text-gray-600">UI制御・画面描画からユーザー導線の改善まで対応。"使いやすさ"を意識した開発に取り組みます。</p>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="font-bold text-lg mb-3">チーム生産性向上への貢献</h4>
                  <p className="text-gray-600">進捗可視化・情報共有の改善により、メンバー間のコミュニケーションを円滑化します。</p>
                </div>

                <div className="border-l-4 border-black pl-6">
                  <h4 className="font-bold text-lg mb-3">多業界への適応力</h4>
                  <p className="text-gray-600">半導体・官公庁・教育・EC・不動産など、異なる品質基準と要件を持つ案件に対応してきました。</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">課題解決のパートナー</h2>
            <p className="text-xl text-gray-500 leading-relaxed font-light mb-16">
              コーディングが自動化される時代に重要なのは、ITとコミュニケーションの両面から課題をほどく力です。<br className="hidden md:block" />
              要件の整理、合意形成、実行まで伴走し、現場に定着する解決策をつくります。
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
                  <Image
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
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
