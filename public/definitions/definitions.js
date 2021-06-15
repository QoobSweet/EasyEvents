export const compressKey = (key) => {
    const _key = key.replace(' ', '').trim();
    return _key.charAt(0).toLowerCase() + _key.slice(1);
};
export const decompressKey = (key) => {
    const _key = key.replace(/([A-Z])/g, ' $1').trim();
    return (_key.charAt(0).toUpperCase() + _key.slice(1));
};
//# sourceMappingURL=definitions.js.map