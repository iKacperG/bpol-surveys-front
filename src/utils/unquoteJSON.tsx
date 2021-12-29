export default function unquoteJson(object: {}) {
    const cleaned = JSON.stringify(object, null, 2);

    return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, function (match) {
        return match.replace(/"/g, "");
    });
}