import "./globals.css";

export const metadata = {
  title: "KHAZ Arcade — Interactive 3D Portfolio",
  description:
    "A creative developer portfolio presented through an interactive 3D retro arcade machine.",
  keywords: ["portfolio", "3D", "arcade", "creative developer", "KHAZ"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#F8F6EF] text-[#263238]">
        {children}
      </body>
    </html>
  );
}
