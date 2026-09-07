import JsonData from "../../data/data.json";
import ButtonApp from "@/components/buttonApp";

export const DownloadApp = () => {
    const pages = [];
    for (const page of JsonData.pagesDownloadApp) {
        if(page.pageName === "ButtonApp"){
            pages.push({e: <ButtonApp data={page.data} key={page.pageName + page.order}/>, order: page.order});
        }
    }
    pages.sort((a, b) => a.order - b.order);
    return (
        <div>
            {pages.map((p) => p.e)}
        </div>
    )
}
export default DownloadApp;