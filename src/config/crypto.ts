import CryptoJS from "crypto-js"

export default {
    encrypt(content: string, secret: string) {
        const hash = CryptoJS.AES.encrypt(content, CryptoJS.enc.Utf8.parse(secret), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        })
        return CryptoJS.enc.Hex.stringify(hash.ciphertext)
    },
    decrypted(content: string, secret: string) {
        const cipher = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Hex.parse(content) })
        const hash = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(secret), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        })
        return hash.toString(CryptoJS.enc.Utf8)
    },
    md5(content: string, type: keyof typeof CryptoJS.enc = "Hex") {
        // reqId+timestamp+sessionId+请求参数
        // const hash = CryptoJS.MD5(content)
        return CryptoJS.MD5(content).toString()
        // return hash.toString(CryptoJS.enc[type])
    },
}
