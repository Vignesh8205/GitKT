class DataUtil {


    static getDateSecondMilliTimestamp() {

        return Date.now();
            const now = new Date();

            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');

           // const seconds = String(now.getSeconds()).padStart(2, '0');
            const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

            //return `${year}${month}${day}${seconds}`;
           return `${milliseconds}`;
    }



    static getRandomAlphaNumeric(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
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

    static generateRandomNumber(length = 12) {
        const min = Math.pow(10, length - 1);
        const max = Math.pow(10, length) - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static generateRandomClubName(prefix = 'RBFAclubUI', length = 6) {
        const now = new Date();
        const dateStamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
        const randomPart = this.getRandomAlphaNumeric(length);
        return `${prefix}${dateStamp}${randomPart}`;
    }

    static getTodayClubNamePrefix(prefix = 'RBFAclubUI') {
        const now = new Date();
        const dateStamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
        return `${prefix}${dateStamp}`;
    }

    static generateRandomVenueName(prefix = 'UIVenue', length = 8) {
        const randomPart = this.getRandomAlphaNumeric(length);
        return `${prefix}${randomPart}`;
    }

    //Person Code

    static generateRandomPersonCode(prefix = 'UITest', length = 9) {
        const randomPart = this.getRandomAlphaNumeric(length);
        return `${prefix}${randomPart}`;
    }

    static generatePersonCodeWithDate(prefix = 'UITest') {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${prefix}${year}${month}${day}${hours}${minutes}${seconds}`;
    }

    static generatePersonCodeRBFA() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const uniqueNum = String(Math.floor(100 + Math.random() * 900));
        return `PersonRBFA${year}${month}${day}_${uniqueNum}`;
    }

    static getCurrentDateDDMMYYYY() {
        const today = new Date();

        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    }

    static bankName() {
        return `API Bank ${Math.floor(Math.random() * 1000)}`;
    }

    static bankAccountNumber() {
        return `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    }

    static vatNumber() {
        return `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    }

    // Returns today's date in dd/MM/yyyy format
    static getCurrentDate() {
        const date = new Date();
        return this.formatDate(date);
    }

    // Returns a future date (e.g., +1 year) in dd/MM/yyyy format
    static getFutureDate() {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        return this.formatDate(date);
    }

    // Helper to format Date object as dd/MM/yyyy
    static formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Returns a  past date for dateof birth dd/mm/yyyy

    static getPastDate() {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 1);
        return this.formatDate(date);
    }

    // Returns the random email id 
    static generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 10);
        return `user_${randomString}@gmail.com`;
    }


    static getDateSecondMilliTimestamp() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const seconds = String(now.getSeconds()).padStart(2, '0');
        // const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

        return `${year}${month}${day}${seconds}`;
        // ${milliseconds}`;
    }

    static getRandomNumber(min, max) {
        return String(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    static getEvenNumber() {
        const evenNumbers = [2, 4, 6];
        const randomIndex = Math.floor(Math.random() * evenNumbers.length);
        return String(evenNumbers[randomIndex]);
    }

    static generateRandomLink(baseName) {
        const randomPart = Math.random().toString(36).substring(2, 7);
        return `https://www.${baseName}${randomPart}.com`;
    }

    static getRandomNumber(min, max) {
        return String(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    static getEvenNumber() {
        const evenNumbers = [2];
        const randomIndex = Math.floor(Math.random() * evenNumbers.length);
        return String(evenNumbers[randomIndex]);
    }


    static generateOrgCode(prefix = 'UI') {
        const now = new Date();
        const yy  = String(now.getFullYear()).slice(2);
        const mo  = String(now.getMonth() + 1).padStart(2, '0');
        const dd  = String(now.getDate()).padStart(2, '0');
        const hh  = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss  = String(now.getSeconds()).padStart(2, '0');
        return `${prefix}${yy}${mo}${dd}${hh}${min}${ss}`;
    }

    static generateRandomDataSetName(prefix = 'Data Sets ', length = 9) {
        const randomPart = this.getRandomAlphaNumeric(length);
        return `${prefix}${randomPart}`;
    }

   static parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

}

module.exports = DataUtil;



