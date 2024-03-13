import {httpGet} from "../axios";
import {JSEncrypt} from "jsencrypt";
let publicKey: string | null = null;

const getPublicKey = async () => {
    return httpGet<string>("/common/public-key").then((res) => {
        return res.data;
    });
}

export async function rsaEncrypt(dataToEncrypt: string): Promise<string | false> {
    if (publicKey === null) {
        publicKey = await getPublicKey();
        publicKey = '-----BEGIN PUBLIC KEY-----\n' + publicKey + '\n-----END PUBLIC KEY-----';
        return rsaEncrypt(dataToEncrypt);
    }

    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(dataToEncrypt);
}
