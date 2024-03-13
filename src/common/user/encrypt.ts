import {httpGet} from "../axios";
import forge from "node-forge";

let publicKey: string | null = null;

const getPublicKey = async () => {
    return httpGet<string>("/common/public-key").then((res) => {
        return res.data;
    });
}

export async function rsaEncrypt(dataToEncrypt: string) {
    if (publicKey === null) {
        publicKey = await getPublicKey();
        return rsaEncrypt(dataToEncrypt);
    }

    const pemKey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;

    const publicKeyObj = forge.pki.publicKeyFromPem(pemKey);
    const encrypted = publicKeyObj.encrypt(dataToEncrypt, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
    });

    return forge.util.encode64(encrypted);
}
