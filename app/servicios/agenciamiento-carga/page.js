import JsonData from "../../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import ImgWithDropdowns from "@/components/imgWithDropdowns";

export const metadata = {
    title: "Agenciamiento de Carga",
    description: "Gestionamos el transporte internacional de tu carga marítima o aérea desde el origen hasta el destino, coordinando con navieras y almacenes para que tu mercancía llegue segura y a tiempo.",
    alternates: {
        canonical: `${JsonData.urlDomain}servicios/agenciamiento-carga`,
    },
    openGraph: {
        url: `${JsonData.urlDomain}servicios/agenciamiento-carga`,
        title: "Agenciamiento de Carga | Inversiones D&C",
        description: "Gestionamos el transporte internacional de tu carga marítima o aérea desde el origen hasta el destino, coordinando con navieras y almacenes para que tu mercancía llegue segura y a tiempo.",
        siteName: "Inversiones D&C",
        images: [JsonData.ogImage],
        locale: "es_PE",
        type: "website",
    },
};

export const AgenciamientoCarga = () => {
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${JsonData.urlDomain}servicios/agenciamiento-carga#service`,
        name: "Agenciamiento de Carga",
        serviceType: "Agenciamiento de carga",
        description: "Gestionamos el transporte internacional de tu carga marítima o aérea desde el origen hasta el destino, coordinando con navieras y almacenes para que tu mercancía llegue segura y a tiempo.",
        url: `${JsonData.urlDomain}servicios/agenciamiento-carga`,
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
                "name": "Agenciamiento de Carga",
                "item": `${JsonData.urlDomain}servicios/agenciamiento-carga`,
            },
        ],
    };

    const pages = [];
    for (const page of JsonData.pagesAgenciamientoCarga) {
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
export default AgenciamientoCarga;