/**
 * Renders the screens compiled by demo/precompile.js. `templates` maps a screen's
 * name to its compiled function; a screen's include('x') renders screen x with
 * the same data.
 */
export function screenRenderer(templates) {
    const render = (name, data) =>
        templates[name](data, escapeXML, (included, extra) => render(included, { ...data, ...extra }));
    return { render };
}

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&#34;', "'": '&#39;' };

/** What <%= %> does to a value, exactly as EJS escapes it on the server. */
function escapeXML(value) {
    return value === undefined || value === null ? '' : String(value).replace(/[&<>"']/g, (char) => ESCAPES[char]);
}
