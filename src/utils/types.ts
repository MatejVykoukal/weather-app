export interface QueryParams {
	[key: string]: string;
}

export interface FetchResult<T> {
	data?: T;
	error?: string;
}
