import { FetchResult, QueryParams } from './types';

/**
 *
 * @returns true, if provided string consist only of whitespaces
 */
export function onlySpaces(str: string): boolean {
	return str.trim().length === 0;
}
/**
 * Example of returned value: `"param1=value1&param2=value2"`
 * @returns query string of parameters
 */
export const getQueryString = (params: QueryParams): string =>
	Object.keys(params)
		.filter((key) => params[key] !== null && params[key] !== undefined)
		.map(
			(key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
		)
		.join('&');

/**
 * Creates RelativeURL object, similar to absolute URL object that native URL() constructor creates.
 */
export class RelativeURL {
	public origin = '';
	public pathname: string;
	public search: string;

	constructor(url: string) {
		this.pathname = this.getPathname(url);
		this.search = this.getSearch(url);
	}

	private getPathname = (url: string) => {
		const searchIndex = url.indexOf('?');
		return searchIndex !== -1 ? url.slice(0, searchIndex) : url;
	};

	private getSearch = (url: string) => {
		const searchIndex = url.indexOf('?');
		return searchIndex !== -1 ? url.slice(searchIndex) : '';
	};
}

/**
 *  Example of returned value: `"www.example.com/api?param1=value1&param2=value2"`
 * @returns Encoded parsed url
 */
export const parseUrl = (url: string, params: QueryParams): string => {
	// Regular expression that matches strings, that are absolute urls.
	const r = new RegExp('^(?:[a-z]+:)?//', 'i');
	const isAbsoluteUrl = r.test(url);

	const { origin, pathname, search } = isAbsoluteUrl
		? new URL(url)
		: new RelativeURL(url);

	const queryString = getQueryString(params);

	return `${origin}${pathname === '/' ? '' : pathname}${
		search ? search + '&' : '?'
	}${queryString}`;
};

export const getData = async (config: RequestConfig, params?: QueryParams) => {
	let result: FetchResult<any> = { data: undefined, error: undefined };
	try {
		const res = await fetch(
			parseUrl(config.url, {
				...config.base_params,
				...params,
			}),
			config.options
		);
		const data = await res.json();
		result.data = data;
	} catch (err) {
		console.error(err);
		result.error = (err as Error).stack as string;
	}
	return result;
};

export class RequestConfig {
	constructor(
		public url: string,
		public base_params: QueryParams,
		public options: RequestInit
	) {
		this.url = url;
		this.base_params = base_params;
		this.options = options;
	}
}
