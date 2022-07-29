export default function translate(key, translations) {
    if (translations[key]) {
        return translations[key];
    }
    return key;
}
