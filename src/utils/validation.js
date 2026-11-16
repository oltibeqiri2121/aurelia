export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());
export const isPhone = (v) => /^[+()\d\s.-]{7,20}$/.test(v) && v.replace(/\D/g, '').length >= 7;
