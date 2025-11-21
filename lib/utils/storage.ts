const getSessionItem = (key: string) => {
    if (typeof window === "undefined")
        return;

    return atob(JSON.parse(sessionStorage.getItem(key)));
}

const setSessionItem = (key: string, value: string) => {
    if (typeof window === "undefined")
        return;

    sessionStorage.setItem(key, btoa(value));
}

const removeSessionItem = (key: string) => {
    if (typeof window === "undefined")
        return;

    sessionStorage.removeItem(key);
}

const clearSessionItems = () => {
    if (typeof window === "undefined")
        return;

    sessionStorage.clear();
}

export {getSessionItem, setSessionItem, removeSessionItem, clearSessionItems}