export interface QueryParams {
	[key: string]: string;
}

export interface IJson {
	[key: string]: string;
}

export interface FetchResult<T> {
	data?: T | undefined;
	error?: string | undefined;
}
