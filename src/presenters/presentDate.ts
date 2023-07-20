import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export const presentDate = (date: Date | string) => dayjs(date).format("ll");
