import JsonData from "../../data/data.json";
import FormCotization from "@/components/formCotization";

export const metadata = {
    title: "Solicita tu Cotización",
    description: "Solicita una cotización de importación a Perú. Completa tus datos de contacto y cuéntanos qué clase de importación deseas realizar.",
    alternates: {
        canonical: `${JsonData.urlDomain}cotizacion`,
    },
    openGraph: {
        url: `${JsonData.urlDomain}cotizacion`,
        title: "Solicita tu Cotización | Inversiones D&C",
        description: "Solicita una cotización de importación a Perú. Completa tus datos de contacto y cuéntanos qué clase de importación deseas realizar.",
        siteName: "Inversiones D&C",
        images: [JsonData.ogImage],
        locale: "es_PE",
        type: "website",
    },
};

export const PageConsultPrice = () => {
    const pages = [];
    for (const page of JsonData.pagesConsultPrice) {
        if (page.pageName === "FormCotization"){
            pages.push({e: <FormCotization data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default PageConsultPrice;