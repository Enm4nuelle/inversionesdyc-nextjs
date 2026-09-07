import JsonData from "../../../data/data.json";
import ImgWithMessage from "@/components/imgWithMessage";
import ImgWithDropdowns from "@/components/imgWithDropdowns";

export const metadata = {
    title: "Desaduanaje",
    description: "Agilizamos el levante de tu mercancía en aduanas, gestionando la documentación y trámites necesarios para nacionalizar tu carga sin retrasos ni sobrecostos.",
    alternates: {
        canonical: `${JsonData.urlDomain}servicios/desaduanaje`,
    },
    openGraph: {
        url: `${JsonData.urlDomain}servicios/desaduanaje`,
        title: "Desaduanaje | Inversiones D&C",
        description: "Agilizamos el levante de tu mercancía en aduanas, gestionando la documentación y trámites necesarios para nacionalizar tu carga sin retrasos ni sobrecostos.",
    },
};

export const Desaduanaje = () => {
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${JsonData.urlDomain}servicios/desaduanaje#service`,
        name: "Desaduanaje",
        serviceType: "Desaduanaje",
        description: "Agilizamos el levante de tu mercancía en aduanas, gestionando la documentación y trámites necesarios para nacionalizar tu carga sin retrasos ni sobrecostos.",
        url: `${JsonData.urlDomain}servicios/desaduanaje`,
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
                "name": "Desaduanaje",
                "item": `${JsonData.urlDomain}servicios/desaduanaje`,
            },
        ],
    };


    const pages = [];
    for (const page of JsonData.pagesDesaduanaje) {
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
export default Desaduanaje;