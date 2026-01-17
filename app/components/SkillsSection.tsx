import Image from 'next/image';

export const SkillsSection = () => (
  <section id="skills" className="py-20 px-6 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Core Competencies</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
);
