import { Hero } from "./Hero";
import { LanguageSectionLanding } from "./LanguageSectionLanding";
import { Features } from "./Features";
import style from '../app/page.module.css'
import { HowItWork } from "./HowItWork";
import { CTA } from "./CTA";

export function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className={`${style.background} flex-1 m-2 md:m-0`} >
       <Hero/>
       <LanguageSectionLanding/>
       <Features/>
       <HowItWork/>
       <CTA/>
      </main>
    </div>
  );
}
