import JsonData from "../../data/data.json";
import GoogleCalendar from "@/components/googleCalendar";

export const metadata = {
    title: "Calendario",
    description: "Agenda una cita con Inversiones D&C para entender a fondo tu importación y darte una buena cotización.",
    alternates: {
        canonical: `${JsonData.urlDomain}calendar`,
    },
    openGraph: {
        url: `${JsonData.urlDomain}calendar`,
        title: "Calendario | Inversiones D&C",
        description: "Agenda una cita con Inversiones D&C para entender a fondo tu importación y darte una buena cotización.",
    },
};

export const Calendar = () => {
    const pages = [];
    for (const page of JsonData.pagesCalendar) {
        if (page.pageName === "GoogleCalendar"){
            pages.push({e: <GoogleCalendar data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default Calendar;