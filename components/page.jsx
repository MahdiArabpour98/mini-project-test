
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="hero">
      <section className="hero-content">
        <h1>
          Invest in
          <br />
          Trusted Projects,
          <br />
          Build Your Future
        </h1>

        <p className="hero-description">
          Join our platform and invest in verified and
          secure projects. A simple way to grow your wealth.
        </p>

        <Link href="/projects" className="button button-primary">
          Get Started
          <span className="button-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </section>

      <div className="hero-visual">
        <Image
          src="/images/investly-hero.png"
          alt="Investment growth represented by blue columns and a green plant"
          width={1000}
          height={900}
          priority
          className="hero-image"
        />
      </div>
    </main>
  );
}