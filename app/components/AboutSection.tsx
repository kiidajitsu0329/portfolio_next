export const AboutSection = () => (
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
);
