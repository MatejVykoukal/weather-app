import React, { FormEvent, useContext } from 'react';
import { AdressRequestConfig } from '../../constants';
import { adressContext } from '../../contexts/adressContext';
import AdressApi from '../../types/adress';
import { getData, onlySpaces } from '../../utils';
import { FetchResult } from '../../types/utils';
import FormAutocomplete from '../FormAutocomplete';

interface Props {}

const SearchForm: React.FC<Props> = () => {
	const { setSearchAdresses } = useContext(adressContext);

	const handleSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const searchInputElement: HTMLInputElement =
			e.currentTarget.querySelector('[name="search"]')!;
		const { value: searchQuery } = searchInputElement;
		if (onlySpaces(searchQuery)) {
			searchInputElement.value = '';
			return;
		}
		const { data: adresses, error }: FetchResult<AdressApi.RootObject> =
			await getData(AdressRequestConfig, {
				text: searchQuery,
			});
		if (error || !setSearchAdresses) {
			//TODO: Create error state & error component
			searchInputElement.value = '';
			return;
		}
		setSearchAdresses(adresses!.features);
		searchInputElement.value = '';
	};

	return (
		<form
			onSubmit={handleSearchSubmit}
			className="container relative form-control items-center mt-8"
			role="search"
		>
			<label htmlFor="search" className="w-0 h-0 absolute invisible">
				Search for weather in city, country or country code
			</label>
			<div className="w-full relative">
				<input
					type="text"
					name="search"
					placeholder="Search for city, country, postcode, etc."
					className="input input-bordered rounded-none flex-grow w-full"
				/>
				<button
					type="submit"
					className="button p-2 bg-slate-900  absolute right-2 top-1/2 -translate-y-1/2"
					aria-aria-label="Search"
				>
					{/* Change to Icon component */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
			{/* TODO: Make autocomplete accessible */}
			<FormAutocomplete />
		</form>
	);
};

export default SearchForm;
