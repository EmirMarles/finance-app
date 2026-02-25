export function isTokenExpired(token) {
    if (!token) return true; 

    try {
        const payloadBase64 = token.split('.')[1];
        const decodedJson = atob(payloadBase64);
        const decoded = JSON.parse(decodedJson);
        const exp = decoded.exp; // Expiration time in seconds

        const now = Math.floor(Date.now() / 1000);

        return now >= exp; // True if current time is greater than or equal to expiration time
    } catch (e) {
        console.error("Error decoding token:", e);
        return true;
    }
}
