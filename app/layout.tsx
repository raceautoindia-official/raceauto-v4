import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import AddBootstrap from "@/components/BootstrapClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const metadata: Metadata = {
  title: {
    default:
      "Race Auto India - Latest News on Cars, Bikes, and Commercial Vehicles",
    template: "%s -Race Auto India",
  },

  description:
    "Stay updated with the latest news and updates on cars, bikes, and commercial vehicles in India. Explore reviews, launches, and more.",
  keywords: [
    "cars",
    "bikes",
    "commercial vehicles",
    "automotive news",
    "car reviews",
    "bike reviews",
    "vehicle launches",
    "Race Auto India",
  ],
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    title:
      "Race Auto India - Latest News on Cars, Bikes, and Commercial Vehicles",
    description:
      "Stay updated with the latest news and updates on cars, bikes, and commercial vehicles in India. Explore reviews, launches, and more",
  },
  alternates: {
    canonical: "https://raceautoindia.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <AddBootstrap />
        <ToastContainer />
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}


