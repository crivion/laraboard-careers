export default function useTranslate(key, translations) {
    if (translations[key]) {
        return translations[key];
    }
    return key;
}
