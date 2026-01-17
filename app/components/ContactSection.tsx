import { CLASS_NAMES } from '../constants';

export const ContactSection = () => (
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
);
