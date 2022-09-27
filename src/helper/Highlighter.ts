/**
 * Highlight keywords inside a DOM element
 * @param {string} elem Element to search for keywords in
 * @param {string[]} keywords Keywords to highlight
 * @param {boolean} caseSensitive Differentiate between capital and lowercase letters
 * @param {string} cls Class to apply to the highlighted keyword
 */
export function highlight(elem: any, keywords: any, caseSensitive = false, cls = "highlight") {
    const flags = caseSensitive ? "gi" : "g";
    // Sort longer matches first to avoid
    // highlighting keywords within keywords.
    keywords.sort((a: any, b: any) => b.length - a.length);
    Array.from(elem.childNodes).forEach((child: any) => {
        const keywordRegex = RegExp(keywords.join("|"), flags);
        if (child.nodeType !== 3) {
            // not a text node
            highlight(child, keywords, caseSensitive, cls);
        } else if (keywordRegex.test(child.textContent)) {
            const frag = document.createDocumentFragment();
            let lastIdx = 0;
            child.textContent.replace(keywordRegex, (match: any, idx: any) => {
                const part = document.createTextNode(child.textContent.slice(lastIdx, idx));
                const highlighted = document.createElement("span");
                highlighted.textContent = match;
                highlighted.classList.add(cls);
                frag.appendChild(part);
                frag.appendChild(highlighted);
                lastIdx = idx + match.length;
            });
            const end = document.createTextNode(child.textContent.slice(lastIdx));
            frag.appendChild(end);
            child.parentNode.replaceChild(frag, child);
        }
    });
}
