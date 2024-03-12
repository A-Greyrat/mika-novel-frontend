export interface NovelReaderSetting {
    [key: string | symbol]: unknown;

    fontSize: string;
    fontFamily: string;
    backgroundColor: string;
    lineHeight: string;
    letterSpacing: string;

    '--text-color': string;

    '--title-font-size': string;
    '--title-font-weight': string;

    '--content-width': string;
    '--content-background-color': string;
}


let readerSetting: NovelReaderSetting = {
    fontSize: "18px",
    fontFamily: "Arial",
    backgroundColor: "rgb(222,222,222)",
    lineHeight: "1.5",
    letterSpacing: "0",

    "--text-color": "rgb(0, 0, 0)",
    '--title-font-size': "24px",
    '--title-font-weight': "500",
    '--content-width': "60%",
    '--content-background-color': "rgb(240,240,240)"
};


export const getReaderSetting = () => {
    if (localStorage.getItem("readerSetting")) {
        readerSetting = JSON.parse(localStorage.getItem("readerSetting")!) as NovelReaderSetting;
    } else {
        localStorage.setItem("readerSetting", JSON.stringify(readerSetting));
    }
    return readerSetting;
}
