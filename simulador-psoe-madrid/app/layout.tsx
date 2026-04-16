import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simulador Electoral PSOE Madrid | Análisis Interactivo del Electorado",
  description: "Herramienta interactiva para analizar las tipologías de votantes del PSOE en la Comunidad de Madrid. Incluye simulaciones electorales y análisis de narrativas en redes sociales.",
  keywords: "PSOE, Madrid, elecciones, simulador, electorado, análisis político, redes sociales, tipologías votantes",
  authors: [{ name: "Simulador Electoral PSOE Madrid" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Simulador Electoral PSOE Madrid",
    description: "Análisis interactivo del electorado potencial del PSOE en la Comunidad de Madrid",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulador Electoral PSOE Madrid",
    description: "Análisis interactivo del electorado potencial del PSOE en la Comunidad de Madrid",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
          {children}
        </div>
      </body>
    </html>
  );
}