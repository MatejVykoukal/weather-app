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
		<div className="container relative">
			<form
				onSubmit={handleSearchSubmit}
				className="relative form-control items-center pt-10 pb-5"
			>
				<label htmlFor="search" className="w-0 h-0 absolute invisible">
					Enter city, country or country code
				</label>
				<div className="input-group rounded-full w-full">
					<input
						type="text"
						name="search"
						placeholder="Search for city, country, postcode, etc."
						className="input input-bordered flex-grow"
					/>
					<button type="submit" className="btn btn-square">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
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
			</form>
			<FormAutocomplete />
		</div>
	);
};

export default SearchForm;
