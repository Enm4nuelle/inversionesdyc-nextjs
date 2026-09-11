import JsonData from "../data/data.json";

export default function sitemap() {
    const today = new Date().toISOString();
    return [
        {
            url: JsonData.urlDomain,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${JsonData.urlDomain}nosotros`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${JsonData.urlDomain}servicios/agenciamiento-aduana`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${JsonData.urlDomain}servicios/agenciamiento-carga`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${JsonData.urlDomain}servicios/desaduanaje`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${JsonData.urlDomain}servicios/seguro-internacional`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${JsonData.urlDomain}servicios/transporte-local`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${JsonData.urlDomain}calendar`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${JsonData.urlDomain}cotizacion`,
            lastModified: today,
            changeFrequency: "monthly",
            priority: 0.9,
        }
    ];
}