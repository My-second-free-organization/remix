export interface CrawlResult {
    pathname: string;
    filePath: string;
    response: Response;
}
export interface CrawlOptions {
    /**
     * Initial URL paths to put in the crawl queue.
     * @default ['/']
     */
    paths?: string[];
    /**
     * Whether to follow outbound links found in HTML documents.
     * @default true
     */
    spider?: boolean;
    /**
     * Controls which discovered href values are added to the crawl queue. Receives the raw href value
     * as found in the HTML (after non-navigable schemes like `mailto:` and `#` are excluded).
     * Return `true` to crawl the URL, `false` to skip it. Defaults to crawling any non-absolute URLs
     *
     * @default Only non-absolute href values (i.e. those not starting with `http://`, `https://`, or `//`)
     * @example Include same-origin absolute URLs:
     * ```ts
     * filter: (href) => !href.startsWith('http') || href.startsWith('https://mysite.com')
     * ```
     */
    filter?(href: string): boolean;
    /**
     * Called for each crawled URL to produce additional path variants to queue.
     * Useful for paths that have known alternate representations without explicit links,
     * e.g. returning `[pathname + '.md']` to also fetch the markdown source of each page.
     */
    variants?(pathname: string): string[] | undefined | Promise<string[] | undefined>;
}
export declare function runCrawl(fetchFn: (request: Request) => Promise<Response>, options: CrawlOptions): AsyncIterableIterator<CrawlResult>;
//# sourceMappingURL=crawl.d.ts.map