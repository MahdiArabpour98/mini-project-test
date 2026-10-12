
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="hero">
      <section className="hero-content">
        <h1>
          سرمایه‌گذاری در
          <br />
          پروژه‌های معتبر،
          <br />
          ساختن آینده‌ای بهتر
        </h1>

        <p className="hero-description">
          به پلتفرم ما بپیوندید و در پروژه‌های تأییدشده و امن
          سرمایه‌گذاری کنید. راهی ساده برای رشد دارایی‌های شما.
        </p>

        <Link href="/projects" className="button button-primary">
          شروع کنید
          <span className="button-arrow" aria-hidden="true">
            ←
          </span>
        </Link>
      </section>

      <div className="hero-visual">
        <Image
          src="/images/investly-hero.png"
          alt="تصویر سه‌بعدی رشد سرمایه‌گذاری با ستون‌های آبی و گیاه سبز"
          width={1000}
          height={900}
          priority
          className="hero-image"
        />
      </div>
    </main>
  );
}