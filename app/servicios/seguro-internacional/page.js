import JsonData from "../../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import ImgWithDropdowns from "@/components/imgWithDropdowns";

export const metadata = {
    title: "Seguro Internacional",
    description: "Protege tu mercancía durante todo el trayecto internacional con una cobertura ante daños, pérdidas o imprevistos en el transporte, desde el proveedor hasta tu almacén en Perú.",
    alternates: {
        canonical: `${JsonData.urlDomain}servicios/seguro-internacional`,
    },
    openGraph: {
        url: `${JsonData.urlDomain}servicios/seguro-internacional`,
        title: "Seguro Internacional | Inversiones D&C",
        description: "Protege tu mercancía durante todo el trayecto internacional con una cobertura ante daños, pérdidas o imprevistos en el transporte, desde el proveedor hasta tu almacén en Perú.",
    },
};

export const SeguroInternacional = () => {
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${JsonData.urlDomain}servicios/seguro-internacional#service`,
        name: "Seguro internacional",
        serviceType: "seguro internacional",
        description: "Protege tu mercancía durante todo el trayecto internacional con una cobertura ante daños, pérdidas o imprevistos en el transporte, desde el proveedor hasta tu almacén en Perú.",
        url: `${JsonData.urlDomain}servicios/seguro-internacional`,
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
                "name": "Seguro Internacional",
                "item": `${JsonData.urlDomain}servicios/seguro-internacional`,
            },
        ],
    };

    const pages = [];
    for (const page of JsonData.pagesSeguroInternacional) {
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
export default SeguroInternacional;