import { parse } from 'node-html-parser';
const BASE_URL = 'http://localhost';
const defaultFilter = (href) => !href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('//');
export async function* runCrawl(fetchFn, options) {
    let { paths = ['/'], spider = true, filter = defaultFilter, variants } = options;
    let queue = new Set(paths);
    let visited = new Set();
    for (let urlPath of queue) {
        if (visited.has(urlPath)) {
            continue;
        }
        visited.add(urlPath);
        let response = await fetchFn(new Request(`${BASE_URL}${urlPath}`));
        let isHtml = response.headers.get('Content-Type')?.includes('text/html');
        let toQueue = [];
        if (isHtml) {
            // Pass a clone so we can read the body for parsing
            yield { pathname: urlPath, filePath: getHtmlFilepath(urlPath), response: response.clone() };
            let doc = parse(await response.text());
            // Always queue referenced assets (CSS, JS, images)
            toQueue.push(...extractAssetPaths(doc, urlPath, filter));
            // Only follow navigation links when spider mode is enabled
            if (spider) {
                toQueue.push(...extractLinkPaths(doc, urlPath, filter));
            }
        }
        else {
            yield { pathname: urlPath, filePath: urlPath, response };
        }
        // Queue any path variants returned by the variants callback
        if (variants) {
            let variantPaths = await variants(urlPath);
            if (variantPaths) {
                toQueue.push(...variantPaths);
            }
        }
        for (let path of toQueue) {
            if (!visited.has(path)) {
                queue.add(path);
            }
        }
    }
}
// Always put `index.html` files into directories - this leads to the best
// support with and without trailing slashes on github pages:
// https://github.com/slorber/trailing-slash-guide?tab=readme-ov-file#summary
function getHtmlFilepath(urlPath) {
    // / -> /index.html, /about -> /about/index.html, /about/ -> /about/index.html
    return urlPath.replace(/\/?$/, '/index.html');
}
function isNonNavigable(href) {
    return (href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        href.startsWith('data:'));
}
function resolveHref(href, baseUrl) {
    // Absolute URL — extract pathname
    if (/^https?:\/\//.test(href) || href.startsWith('//')) {
        try {
            return new URL(href).pathname;
        }
        catch {
            return null;
        }
    }
    // Relative URL — resolve against the current page's path
    try {
        return new URL(href, `${BASE_URL}${baseUrl}`).pathname;
    }
    catch {
        return null;
    }
}
function extractAssetPaths(doc, baseUrl, filter) {
    let linkAttrs = doc
        .querySelectorAll('link:not([rel~="preload"]):not([rel~="prefetch"]):not([rel~="modulepreload"])')
        .map((el) => el.getAttribute('href'));
    let srcAttrs = doc.querySelectorAll('script[src], img[src]').map((el) => el.getAttribute('src'));
    return [...linkAttrs, ...srcAttrs]
        .filter((href) => href != null)
        .filter((href) => !isNonNavigable(href))
        .filter(filter)
        .map((href) => resolveHref(href, baseUrl))
        .filter((href) => href != null);
}
function extractLinkPaths(doc, baseUrl, filter) {
    return doc
        .querySelectorAll('a:not([rel~="nofollow"])')
        .map((el) => el.getAttribute('href'))
        .filter((href) => href != null)
        .filter((href) => !isNonNavigable(href))
        .filter(filter)
        .map((href) => resolveHref(href, baseUrl))
        .filter((href) => href != null);
}
