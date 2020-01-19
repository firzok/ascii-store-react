import { SHORT_MONTH, FULL_DAY } from "../config/static_lists";


export default function getDate(dateStr) {

    let difference = new Date().getTime() - new Date(dateStr).getTime();
    let days = difference / 86400000;   //milliseconds in a day

    if (days > 7) {
        let date = new Date(dateStr);
        return `${FULL_DAY[date.getDay()]} ${SHORT_MONTH[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
    } else {
        return `${Math.floor(days)} days ago`;
    }
}