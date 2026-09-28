/**
 * Renders the screens compiled by demo/precompile.js. `templates` maps a screen's
 * name to its compiled function; a screen's include('x') renders screen x with
 * the same data.
 */
export function screenRenderer(templates) {
    const render = (name, data) =>
        templates[name](data, undefined, (included, extra) => render(included, { ...data, ...extra }));
    return { render };
}
