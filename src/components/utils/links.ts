/**
 * Get active link index.
 * Used in header navigation links to specify which page is on.
 *
 * @param {string} path
 * @returns {number}
 */
export function getActiveLinkIndex(path: string): number {
    switch(path) {
        case "/": return 0;
        case "/about": return 1;
        case "/products": return 2;
        case "/tips": return 3;
        case "/contactus": return 4;

        default: throw Error(`[ getIndexFromLinkActive ] Path (${path}) don't mapped`);
    }
}