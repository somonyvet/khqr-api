export const checkIsActive = (pathname, url) => {
    const firstPath = pathname.split("/")[1];

    return `/${firstPath}` === url;
}
