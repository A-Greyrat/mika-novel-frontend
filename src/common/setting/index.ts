export interface NovelReaderSetting {
    [key: string | symbol]: unknown;

    fontSize: string;
    fontFamily: string;
    backgroundColor: string;
    lineHeight: string;
    letterSpacing: string;


    '--paragraph-spacing': string;

    '--text-color': string;
    '--text-font-weight': string;

    '--title-font-size': string;
    '--title-font-weight': string;

    '--content-width': string;
    '--content-background-color': string;
}

const defaultReaderSetting: NovelReaderSetting = {
    fontSize: "18px",
    fontFamily: "Arial",
    backgroundColor: "#dcdcdc",
    lineHeight: "1.5",
    letterSpacing: "0",

    '--paragraph-spacing': '10px',

    "--text-color": "#000000",
    '--text-font-weight': "400",

    '--title-font-size': "24px",
    '--title-font-weight': "500",

    '--content-width': "60%",
    '--content-background-color': "#f5f5f5"
};

let readerSetting: NovelReaderSetting | null = null;

export const getReaderSetting = (): NovelReaderSetting => {
    if (readerSetting) {
        return readerSetting;
    }

    const setting = localStorage.getItem("readerSetting");
    if (setting) {
        readerSetting = JSON.parse(setting);
    } else {
        readerSetting = defaultReaderSetting;
    }

    return readerSetting!;
}

export const setReaderSetting = (setting: NovelReaderSetting) => {
    localStorage.setItem("readerSetting", JSON.stringify(setting));
    readerSetting = setting;
}

export const resetReaderSetting = () => {
    readerSetting = JSON.parse(JSON.stringify(defaultReaderSetting));
    localStorage.removeItem("readerSetting");
    localStorage.setItem("readerSetting", JSON.stringify(readerSetting));
}