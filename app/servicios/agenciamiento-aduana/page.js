import JsonData from "../../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import ImgWithDropdowns from "@/components/imgWithDropdowns";

export const metadata = {
    title: "Agenciamiento de Aduana",
    description: "Simplificamos todos los trámites aduaneros para que tus importaciones y exportaciones cumplan con la normativa vigente, evitando retrasos, observaciones y costos innecesarios.",
    alternates: {
        canonical: `${JsonData.urlDomain}servicios/agenciamiento-aduana`,
    },
    openGraph: {
        url: `${JsonData.urlDomain}servicios/agenciamiento-aduana`,
        title: "Agenciamiento de Aduana | Inversiones D&C",
        description: "Servicio integral de gestión aduanera para importación, exportación y transporte de mercancías, cumpliendo la normativa vigente.",
    },
};

export const AgenciamientoAduana = () => {
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${JsonData.urlDomain}servicios/agenciamiento-aduana#service`,
        name: "Agenciamiento de Aduana",
        serviceType: "Agenciamiento aduanero",
        description: "Servicio integral de gestión aduanera para operaciones de importación, exportación y transporte de mercancías, agilizando trámites y garantizando el cumplimiento de la normativa vigente.",
        url: `${JsonData.urlDomain}servicios/agenciamiento-aduana`,
        areaServed: {
            "@type": "Country",
            name: "Perú",
        },
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": JsonData.urlDomain,
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Agenciamiento de Aduana",
                "item": `${JsonData.urlDomain}servicios/agenciamiento-aduana`,
            },
        ],
    };

    const pages = [];
    for (const page of JsonData.pagesAgenciamientoAduana) {
        if (page.pageName === "ImgWithMessage"){
            pages.push({e: <ImgWithMessage data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }else if (page.pageName === "ImgWithDropdowns"){
            pages.push({e: <ImgWithDropdowns data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {serviceJsonLd ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
                />
            ) : ""}
            {breadcrumbJsonLd ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
                />
            ) : ""}
            {pages.map((p) => p.e)}
        </div>
    )
}
export default AgenciamientoAduana;