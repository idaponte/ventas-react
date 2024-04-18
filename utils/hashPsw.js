import CryptoJS from 'crypto-js';

export const hashPsw = (psw) => CryptoJS.MD5(psw).toString();