import JsonData from "../../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import ImgWithDropdowns from "@/components/imgWithDropdowns";

export const metadata = {
    title: "Transporte Local",
    description: "Trasladamos tu mercancía desde el puerto o aeropuerto de llegada hasta tus almacenes en cualquier punto del Perú, con seguimiento durante toda la entrega.",
    alternates: {
        canonical: `${JsonData.urlDomain}servicios/transporte-local`,
    },
    openGraph: {
        url: `${JsonData.urlDomain}servicios/transporte-local`,
        title: "Transporte Local | Inversiones D&C",
        description: "Trasladamos tu mercancía desde el puerto o aeropuerto de llegada hasta tus almacenes en cualquier punto del Perú, con seguimiento durante toda la entrega.",
        siteName: "Inversiones D&C",
        images: [JsonData.ogImage],
        locale: "es_PE",
        type: "website",
    },
};

export const TransporteLocal = () => {
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${JsonData.urlDomain}servicios/transporte-local#service`,
        name: "Transporte local",
        serviceType: "transporte local",
        description: "Trasladamos tu mercancía desde el puerto o aeropuerto de llegada hasta tus almacenes en cualquier punto del Perú, con seguimiento durante toda la entrega.",
        url: `${JsonData.urlDomain}servicios/transporte-local`,
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
                "name": "Transporte Local",
                "item": `${JsonData.urlDomain}servicios/transporte-local`,
            },
        ],
    };

    const pages = [];
    for (const page of JsonData.pagesTransporteLocal) {
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
export default TransporteLocal;