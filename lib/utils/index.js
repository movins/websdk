let nextUUid = 0;

export function uuid() {
    return ++nextUUid;
}

export function hex2rgb(hex, out) {
    out = out || [];

    out[0] = ((hex >> 16) & 0xFF) / 255;
    out[1] = ((hex >> 8) & 0xFF) / 255;
    out[2] = (hex & 0xFF) / 255;

    return out;
}

export function hex2string(hex) {
    hex = hex.toString(16);
    hex = '000000'.substr(0, 6 - hex.length) + hex;

    return `#${hex}`;
}

export function rgb2hex(rgb) {
    return (((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + (rgb[2] * 255 | 0));
}

export const now = function () {
    return window.performance
        ? window.performance.now() / 1000
        : Date.now() / 1000;
};

export const fill = function (arr, val) {
    if (arr.fill) {
        arr.fill(val);
    } else {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = val;
        }
    }
};

export const buf2hex = function(bytes) { // buffer is an ArrayBuffer
    const data = bytes.subarray(0, 10);
    return Array.prototype.map.call(data, x => ('00' + x.toString(16)).slice(-2)).join('');
};