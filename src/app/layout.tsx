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
            33% { transform: translate(40px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
          }
          @keyframes drift2 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(-35px, 25px) scale(1.08); }
            66% { transform: translate(30px, -15px) scale(0.97); }
          }
          @keyframes drift3 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(20px, 30px) scale(1.05); }
          }
          @keyframes shimmerBar {
            0% { background-position: -600px 0; }
            100% { background-position: 600px 0; }
          }
          @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          body {
            background: linear-gradient(135deg, #fffbeb 0%, #fef9e7 40%, #fef3c7 70%, #fde68a 100%) !important;
          }

          .gold-navbar {
            animation: fadeDown 0.5s ease forwards;
            background: rgba(255, 253, 240, 0.85) !important;
            border-bottom: 1.5px solid rgba(251, 191, 36, 0.35) !important;
            backdrop-filter: blur(20px) !important;
          }

          .gold-logo-icon {
            background: linear-gradient(135deg, #f59e0b, #fbbf24, #fde68a, #f59e0b) !important;
            background-size: 200% 200% !important;
            animation: shimmerBar 3s linear infinite !important;
            box-shadow: 0 4px 20px rgba(245, 158, 11, 0.45) !important;
          }

          .gold-blob-1 {
            animation: drift1 10s ease-in-out infinite;
            background: radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 70%) !important;
          }
          .gold-blob-2 {
            animation: drift2 13s ease-in-out infinite;
            background: radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%) !important;
          }
          .gold-blob-3 {
            animation: drift3 9s ease-in-out infinite;
            background: radial-gradient(circle, rgba(253,230,138,0.5) 0%, transparent 70%) !important;
          }

          .gold-site-title {
            font-family: 'Playfair Display', serif !important;
            font-weight: 900 !important;
            background: linear-gradient(90deg, #92400e, #d97706, #f59e0b, #b45309) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
          }

          .gold-site-sub {
            font-family: 'DM Sans', sans-serif !important;
            color: #a16207 !important;
            font-weight: 500 !important;
          }
        `}</style>
      </head>

      <body
        className="min-h-screen text-gray-900"
        style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef9e7 40%, #fef3c7 70%, #fde68a 100%)' }}
      >

        {/* Animated Gold Background Blobs */}
        <div className="fixed inset-0 overflow-hidden -z-10">

          {/* Blob top-left */}
          <div
            className="gold-blob-1"
            style={{
              position: 'absolute',
              top: -140, left: -140,
              width: 380, height: 380,
              borderRadius: '50%',
            }}
          />

          {/* Blob bottom-right */}
          <div
            className="gold-blob-2"
            style={{
              position: 'absolute',
              bottom: -140, right: -140,
              width: 420, height: 420,
              borderRadius: '50%',
            }}
          />

          {/* Blob center-right */}
          <div
            className="gold-blob-3"
            style={{
              position: 'absolute',
              top: '35%', right: -80,
              width: 260, height: 260,
              borderRadius: '50%',
            }}
          />

          {/* Blob center-left */}
          <div
            style={{
              position: 'absolute',
              top: '60%', left: -60,
              width: 200, height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(254,215,75,0.35) 0%, transparent 70%)',
              animation: 'drift2 11s ease-in-out infinite',
            }}
          />

        </div>

        {/* Navbar */}
        <header
          className="gold-navbar sticky top-0 z-50"
        >

          <div className="
            max-w-7xl
            mx-auto
            px-6
            py-4
            flex
            items-center
            justify-between
          ">

            <div className="flex items-center gap-3">

              <div
                className="gold-logo-icon"
                style={{
                  width: 44, height: 44,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  border: '1.5px solid rgba(255,255,255,0.6)',
                }}
              >
                🛍️
              </div>

              <div>
                <h1 className="gold-site-title text-xl">
                  Premium.mrst
                </h1>

                <p className="gold-site-sub text-xs">
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
