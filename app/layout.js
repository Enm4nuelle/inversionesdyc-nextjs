import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import JsonData from "../data/data.json";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingWhatsapp from "@/components/floatingWhatsapp";
import ToastProvider from "@/components/toastProvider";
import ScrollToTop from "@/components/scrollToTop";
import { ProductProvider } from "@/context/ProductContext";

export const metadata = {
    metadataBase: new URL(JsonData.urlDomain),
    title: {
        default: "Inversiones D&C | Operador Logístico Internacional",
        template: "%s | Inversiones D&C",
    },
    description: "Operador Logístico Internacional con presencia en Europa, Asia y Latinoamérica. Gestionamos tu importación de principio a fin: agenciamiento de carga y aduana, seguro internacional y transporte local en Perú.",
    keywords: [
        "operador logístico internacional",
        "agenciamiento de carga",
        "agenciamiento de aduana",
        "importaciones desde China",
        "desaduanaje Perú",
        "seguro internacional de carga",
        "transporte local Perú",
        "importar desde India Brasil Estados Unidos",
    ],
    openGraph: {
        title: "Inversiones D&C | Operador Logístico Internacional",
        description: "Operador Logístico Internacional con presencia en Europa, Asia y Latinoamérica. Gestionamos tu importación de principio a fin: agenciamiento de carga y aduana, seguro internacional y transporte local en Perú.",
        url: JsonData.urlDomain,
        siteName: "Inversiones D&C",
        images: [JsonData.ogImage],
        locale: "es_PE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Inversiones D&C | Operador Logístico Internacional",
        description: "Operador Logístico Internacional con presencia en Europa, Asia y Latinoamérica. Gestionamos tu importación de principio a fin: agenciamiento de carga y aduana, seguro internacional y transporte local en Perú.",
        images: [JsonData.ogImage],
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: "/favicon.ico",
    },
}

const services = [
    { name: "Agenciamiento de Carga", url: "/servicios/agenciamiento-carga" },
    { name: "Agenciamiento de Aduana", url: "/servicios/agenciamiento-aduana" },
    { name: "Desaduanaje", url: "/servicios/desaduanaje" },
    { name: "Seguro Internacional", url: "/servicios/seguro-internacional" },
    { name: "Transporte Local", url: "/servicios/transporte-local" },
];

export default function RootLayout({ children }) {
	const header = JsonData.forAllPages.find(
        item => item.pageName === "Header"
    );

    const floatingWhatsapp = JsonData.forAllPages.find(
        item => item.pageName === "FloatingWhatsapp"
    );

    const footer = JsonData.forAllPages.find(
        item => item.pageName === "Footer"
    );
    let countrysConnect = {};
    for(let i = 0; i < JsonData.pages.length; i++){
        if(JsonData.pages[i].pageName === "ConnectCountries"){
            countrysConnect = JsonData.pages[i];
            break;
        }
    }
    const loc = JsonData.locationCompany;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Inversiones D&C",
        "alternateName": "Inversiones DyC Perú",
        "url": JsonData.urlDomain,
        "logo": `${JsonData.urlDomain}/img/imagenesInicio/imagenLogo.png`,
        "image": JsonData.ogImage,
        "description": "Operador Logístico Internacional con presencia en Europa, Asia y Latinoamérica. Ofrecemos soluciones de logística y comercio internacional para importaciones seguras y eficientes.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": loc.streetAddress,
            "addressLocality": loc.addressLocality,
            "addressRegion": loc.addressRegion,
            "postalCode": loc.postalCode,
            "addressCountry": loc.addressCountry,
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": loc.latitude,
            "longitude": loc.longitude,
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": footer.data.contacts.find(c => c.type === "phone")?.items[0].text,
            "email": footer.data.contacts.find(c => c.type === "email")?.text,
            "contactType": "sales",
            "areaServed": "PE",
            "availableLanguage": ["Spanish"],
        },
        "areaServed": countrysConnect.data.countries.map(count => count.title),
        "sameAs": footer.data.socialNetworks.map(s => s.href),
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00",
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios Inversiones D&C",
            "itemListElement": services.map((service) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": service.name,
                    "url": `${JsonData.urlDomain}${service.url}`,
                },
            })),
        },
    }
	return (
		<html lang="es" data-scroll-behavior="smooth">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {/* Importaciones de fuentes y iconos de font awesome*/}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"/>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            </head>
			<body>
                <ProductProvider>
                    <Header data={header.data} />
                    <main>
                        {children}
                    </main>
                    <Footer data={footer.data} />
                    <FloatingWhatsapp data={floatingWhatsapp.data} />
                    <ToastProvider />
                    <ScrollToTop />
                </ProductProvider>
            </body>
		</html>
	);
}
