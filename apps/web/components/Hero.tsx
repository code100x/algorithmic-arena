import Link from "next/link";
import heroCodeDark from "/public/hero-code-dark.png";
import heroCodeLight from "/public/hero-code-light.png";
import Image from "next/image";
export function Hero() {
  return (
    <section className="bg-white dark:bg-background pt-8 relative overflow-hidden md:pt-20">
      <div className="container mx-auto px-4 py-12 flex flex-col justify-center items-center md:px-6">
        <div className="flex items-center text-center max-w-3xl flex-col">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Conquer the Code at <br /><div className="text-primary my-1 md:my-4">Algorithmic Arena</div>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
            Join elite coders, solve problems, and climb leaderboards at Algorithmic Arena. Achieve victory          </p>
          <div className="flex flex-col w-full md:w-auto md:flex-row gap-4 mt-5">
            <Link
              href="/contests"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50   dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
              prefetch={false}
            >
              Start Solving
            </Link>
            <Link
              href="/problems"
              className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:ring-gray-300"
              prefetch={false}
            >
              Exploring Features
            </Link>
          </div>
        </div>
        <div className="my-[5rem] relative" >
          <Image src={heroCodeDark} alt="hero-code" className="relative hidden dark:block z-20" />
          <Image src={heroCodeLight} alt="hero-code" className="relative block dark:hidden z-20" />
          <svg width="760" height="639" className="absolute z-10 -bottom-[50%] right-[300%] md:right-0 md:bottom-0 left-0 pointer-events-none" viewBox="0 0 760 639" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_6030_68949)">
              <path d="M241.78 315.218C229.195 308.555 213.671 310.727 200 310.727C200 300.034 208.303 292.778 212.831 283.22C229.999 246.975 250.272 216.287 290.296 202.785C311.603 195.597 341.624 202.406 353.167 223.395C359.711 235.293 361.573 249.745 370.488 260.365C381.561 273.553 397.027 283.957 414.113 286.989C431.465 290.069 451.028 290.216 468.563 288.192C480.171 286.853 491.435 283.396 503.126 282.739C529.398 281.263 547.936 284.872 556.695 311.689C568.225 346.991 548.508 376.561 514.353 384.666C483.599 391.964 453.487 408.29 434.883 434.868C423.071 451.743 407.138 464.76 386.206 469.512C367.416 473.777 344.372 474.172 326.142 467.267C318.714 464.453 313.303 458.927 307.217 454.035C290.404 440.518 281.45 420.874 279.551 399.502C278.399 386.549 281.047 373.215 277.947 360.447C273.388 341.678 258.822 324.24 241.78 315.218Z" fill="url(#paint0_linear_6030_68949)" />
            </g>
            <defs>
              <filter id="filter0_f_6030_68949" x="0" y="0.0195312" width="760" height="672.588" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_6030_68949" />
              </filter>
              <linearGradient id="paint0_linear_6030_68949" x1="380" y1="200.02" x2="380" y2="472.607" gradientUnits="userSpaceOnUse">
                <stop stop-color="#3259E8" />
                <stop offset="1" stop-color="#0D1D57" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <Grid />
    </section>
  );
}

function Grid() {
  return (
    <svg width="1440" className="absolute z-10 top-0 pointer-events-none" height="1013" viewBox="0 0 1440 1013" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.04">
        <path d="M19.4602 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M45.4055 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M71.3523 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M97.2976 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M123.243 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M149.189 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M175.135 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M201.081 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M227.027 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M252.973 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M278.919 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M304.865 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M330.811 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M356.757 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M382.702 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M408.649 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M434.594 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M460.541 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M486.486 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M512.433 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M538.378 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M564.325 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M590.27 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M616.216 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M642.163 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M668.108 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M694.055 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M720 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M745.947 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M771.892 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M797.839 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M823.784 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M849.73 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M875.675 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M901.622 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M927.567 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M953.514 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M979.46 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1005.41 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1031.35 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1057.3 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1083.24 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1109.19 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1135.14 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1161.08 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1187.03 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1212.97 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1238.92 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1264.86 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1290.81 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1316.76 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1342.7 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1368.65 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1394.59 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M1420.54 0V1920" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 0H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 25.9395H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 51.8906H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 77.8301H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 103.781H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 129.721H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 155.672H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 181.623H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 207.562H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 233.514H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 259.453H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 285.404H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 311.344H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 337.295H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 363.244H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 389.186H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 415.135H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 441.076H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 467.025H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 492.967H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 518.916H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 544.857H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 570.807H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 596.756H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 622.697H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 648.646H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 674.588H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 700.537H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 726.479H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 752.428H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 778.377H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 804.318H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 830.268H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 856.209H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 882.158H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 908.1H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 934.049H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 960H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 985.939H1680" stroke="#94A3B8" stroke-width="1.33333" />
        <path d="M-240 1011.89H1680" stroke="#94A3B8" stroke-width="1.33333" />
      </g>
    </svg>

  )
}
