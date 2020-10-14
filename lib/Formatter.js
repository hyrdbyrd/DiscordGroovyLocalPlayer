exports.Formatter = class {
    static toQueryString = (obj) => `?${Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&')}`;
};
