import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Warung Reseller",
  description: "Digital Premium Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >

      <head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

          @keyframes drift1 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33%  { transform: translate(40px, -30px) scale(1.1); }
            66%  { transform: translate(-20px, 20px) scale(0.95); }
          }
          @keyframes drift2 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33%  { transform: translate(-35px, 25px) scale(1.08); }
            66%  { transform: translate(30px, -15px) scale(0.97); }
          }
          @keyframes drift3 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50%  { transform: translate(20px, 30px) scale(1.05); }
          }

          @keyframes scrollLeft {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }

          @keyframes shimmerLogo {
            0%   { background-position: -400px 0; }
            100% { background-position:  400px 0; }
          }

          @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-10px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          body {
            background: #0f0e17 !important;
            color: #e8e6f0;
          }

          /* --- Watermark tracks --- */
          .wm-track {
            position: absolute;
            white-space: nowrap;
            font-family: 'Playfair Display', serif;
            font-size: 20px;
            font-weight: 900;
            letter-spacing: 28px;
            text-transform: uppercase;
            color: rgba(180, 160, 255, 0.04);
            user-select: none;
            pointer-events: none;
            animation: scrollLeft 28s linear infinite;
          }
          .wm-track:nth-child(1)  { top:  5%; animation-duration: 30s; }
          .wm-track:nth-child(2)  { top: 16%; animation-duration: 24s; animation-direction: reverse; }
          .wm-track:nth-child(3)  { top: 27%; animation-duration: 32s; }
          .wm-track:nth-child(4)  { top: 38%; animation-duration: 22s; animation-direction: reverse; }
          .wm-track:nth-child(5)  { top: 49%; animation-duration: 28s; }
          .wm-track:nth-child(6)  { top: 60%; animation-duration: 26s; animation-direction: reverse; }
          .wm-track:nth-child(7)  { top: 71%; animation-duration: 34s; }
          .wm-track:nth-child(8)  { top: 82%; animation-duration: 20s; animation-direction: reverse; }
          .wm-track:nth-child(9)  { top: 93%; animation-duration: 30s; }

          /* --- Glow orbs --- */
          .orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(90px);
            opacity: 0.15;
            pointer-events: none;
          }
          .orb-1 {
            width: 380px; height: 380px;
            background: #7c5cbf;
            top: -100px; left: -100px;
            animation: drift1 12s ease-in-out infinite;
          }
          .orb-2 {
            width: 320px; height: 320px;
            background: #3d6fcc;
            bottom: -80px; right: -80px;
            animation: drift2 16s ease-in-out infinite;
          }
          .orb-3 {
            width: 240px; height: 240px;
            background: #9b4fa0;
            top: 40%; left: 55%;
            animation: drift3 10s ease-in-out infinite;
          }
          .orb-4 {
            width: 200px; height: 200px;
            background: #3d6fcc;
            top: 65%; left: -60px;
            animation: drift2 11s ease-in-out infinite;
          }

          /* --- Navbar --- */
          .dark-navbar {
            animation: fadeDown 0.5s ease forwards;
            background: linear-gradient(135deg, rgba(30,24,54,0.92) 0%, rgba(20,18,40,0.92) 100%) !important;
            border-bottom: 0.5px solid rgba(180, 160, 255, 0.18) !important;
            backdrop-filter: blur(20px) !important;
            box-shadow: 0 2px 24px rgba(0,0,0,0.3) !important;
          }

          /* --- Logo icon shimmer --- */
          .dark-logo-icon {
            background: linear-gradient(90deg, #6d3fc4, #4f7de0, #9b59d6, #4f7de0, #6d3fc4) !important;
            background-size: 400px 100% !important;
            animation: shimmerLogo 2.8s linear infinite !important;
            box-shadow: 0 4px 20px rgba(109, 63, 196, 0.5) !important;
          }

          /* --- Site title — solid gradient, NOT transparent text --- */
          .dark-site-title {
            font-family: 'Playfair Display', serif !important;
            font-weight: 900 !important;
            font-size: 1.2rem !important;
            background: linear-gradient(90deg, #d4c4ff, #a8d4ff, #e0d4ff) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            filter: drop-shadow(0 1px 8px rgba(196,176,255,0.35)) !important;
          }

          .dark-site-sub {
            font-family: 'DM Sans', sans-serif !important;
            color: rgba(196, 176, 255, 0.5) !important;
            font-weight: 500 !important;
          }
        `}</style>
      </head>

      <body
        className="min-h-screen"
        style={{ background: '#0f0e17', color: '#e8e6f0' }}
      >

        {/* Background layer: orbs + watermark */}
        <div className="fixed inset-0 overflow-hidden -z-10"
          style={{ background: 'linear-gradient(135deg, #0f0e17 0%, #1a1726 50%, #120f1e 100%)' }}
        >
          {/* Glow orbs */}
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="orb orb-4" />

          {/* Watermark rows */}
          <div className="wm-track">MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · </div>
          <div className="wm-track">Premium Digital Store · Premium Digital Store · Premium Digital Store · Premium Digital Store · Premium Digital Store · </div>
          <div className="wm-track">MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · </div>
          <div className="wm-track">© 2026 MrstPremium · © 2026 MrstPremium · © 2026 MrstPremium · © 2026 MrstPremium · © 2026 MrstPremium · </div>
          <div className="wm-track">MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · </div>
          <div className="wm-track">Premium Digital Store · Premium Digital Store · Premium Digital Store · Premium Digital Store · Premium Digital Store · </div>
          <div className="wm-track">MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · </div>
          <div className="wm-track">© 2026 MrstPremium · © 2026 MrstPremium · © 2026 MrstPremium · © 2026 MrstPremium · © 2026 MrstPremium · </div>
          <div className="wm-track">MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · MrstPremium · </div>
        </div>

        {/* Navbar */}
        <header className="dark-navbar sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">

              <div
                className="dark-logo-icon"
                style={{
                  width: 44, height: 44,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                🛍️
              </div>

              <div>
                <h1 className="dark-site-title">
                  Premium.mrst
                </h1>
                <p className="dark-site-sub text-xs">
                  Premium Digital Store
                </p>
              </div>

            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

      </body>
    </html>
  );
}