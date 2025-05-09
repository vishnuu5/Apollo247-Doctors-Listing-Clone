import DoctorsListing from "@/components/DoctorsListing";
import Header from "@/components/Header";

export const metadata = {
  title: "General Physician & Internal Medicine Specialists | Apollo 247 Clone",
  description:
    "Consult with the best general physicians and internal medicine specialists online. Book appointments with experienced doctors for your health concerns.",
  keywords:
    "general physician, internal medicine, doctor consultation, online doctor, apollo doctors",
  openGraph: {
    title:
      "General Physician & Internal Medicine Specialists | Apollo 247 Clone",
    description:
      "Consult with the best general physicians and internal medicine specialists online.",
    url: "https://apollo247-clone.vercel.app/specialties/general-physician-internal-medicine",
    siteName: "Apollo 247 Clone",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "General Physician & Internal Medicine Specialists",
      },
    ],
    type: "website",
  },
  canonical:
    "https://apollo247-clone.vercel.app/specialties/general-physician-internal-medicine",
};

export default function Home() {
  return (
    <main>
      <Header />
      <DoctorsListing />
    </main>
  );
}
