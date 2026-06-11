class DataUtil {


    static getRandomAlphaNumeric(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return result;
    }


    static getRandomUpperAlphaNumeric(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length }, () =>
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('');
    }

    // Random lowercase alphanumeric
    static getRandomLowerAlphaNumeric(length = 8) {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () =>
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('');
    }

    // Current date & time: YYYY-MM-DD HH:MM:SS
    static getCurrentDateTime() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }


    static getTimestamp() {
        
         return Date.now();
    }

    static getRandomNumber(startRange, endRange){

         return String(Math.floor(Math.random()*(endRange-startRange+1))+startRange);
    }

    static getEvenNumber(){

         const evens = [2, 4, 6];  // list of all even numbers in range
         const randomIndex = Math.floor(Math.random() * evens.length);
         return String (evens[randomIndex]);

    }
}

module.exports = DataUtil;