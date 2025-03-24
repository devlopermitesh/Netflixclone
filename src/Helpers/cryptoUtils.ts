import crypto from "crypto";

class CryptoUtils {
  generateToken(length: number = 32): string {
    return crypto.randomBytes(length).toString("hex");
  }
  hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
}

export default new CryptoUtils();