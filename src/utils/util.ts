const isNullOrUndefined = (obj: string | {} | [] | undefined | null) => {
    return obj === null || obj === "" || JSON.stringify(obj) === '{}' || JSON.stringify(obj) === "[]" || obj === undefined;
}
const getTimesTamps = () => {
    return Date.parse(new Date().toString()).toString().substring(0, 10)
}

export {
    isNullOrUndefined,
    getTimesTamps
}
