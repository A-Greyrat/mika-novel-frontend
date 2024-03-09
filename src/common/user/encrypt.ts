async function loadPublicKeyFromBase64(base64String: string) {
    const binaryDer = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));

    return await crypto.subtle.importKey(
        "spki",
        binaryDer,
        {
            name: "RSA-OAEP",
            hash: {name: "SHA-256"},
        },
        false,
        ["encrypt"]
    );
}

const publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkxJl7WTrNodLLuPwKGd3J60B1unFy01xzScrIBj5SqxLr0RO+yN9Xgoe6fhT2I13zEuAEk5D2BmCNdrtNHDlfrDFdbresBTPLtQsirmpJU3QIoIz8HxSwVRfTMqu3sftgsAJQnD5YvWxk43t33f8nFSrwf4bAPA9hr4ZPIwiOxHLre0PK8CdJlwdsvsMWSA9E1r0Xlxw00uli4lXqHnk76iSy1s8bjlQN6+iwd9v39YMoyAXfwjg0ESaL8U11plW0BR/isBy096L7YzEXpNqwRZRfCKjuEOD/F2ilgU2f2wmOpX+M9/hBm01TRK7KPf4IoPvVcYSwDdxZQyUDrb3uQIDAQAB";

export async function rsaEncrypt(dataToEncrypt: string) {
    const importedPublicKey = await loadPublicKeyFromBase64(publicKey);
    const dataUint8Array = new TextEncoder().encode(dataToEncrypt);

    const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        importedPublicKey,
        dataUint8Array
    );

    return btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
}
