import { Country } from '../types/Country';

export const fetchCountries = async () => {
	const response = await fetch('https://restcountries.com/v3.1/region/ame');

	const data = await (response.json() as Promise<Country>);

	return data;
};
