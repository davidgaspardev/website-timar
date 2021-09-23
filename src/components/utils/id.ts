/**
 * Create id
 * 
 * @param {string} tag 
 * @returns {string}
 */
export function createId(tag: string): string {
    return `${tag}-${Math.floor(Math.random() * 500) + 1}`;
}