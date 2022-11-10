import React, { useState, useMemo, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useMutation, gql } from "@apollo/client";

const initialState = {
  country: "",
  year: "",
  area: "",
  totalPopulation: "",
};

const UPDATE_COUNTRY = gql`
  mutation UpdateCountry($updateCountyInput2: UpdateCountryInput!) {
    updateCounty(input: $updateCountyInput2) {
      id
      country
      year
      area
      totalPopulation
    }
  }
`;

export default function CreateCountry({
  country,
  refetch,
  setIsUpdated,
  setIsDeleted,
  setIsCreated,
}) {
  const [value, setValue] = useState("");
  const [formValues, setFormValues] = useState({
    year: country.year,
    area: country.area,
    totalPopulation: country.totalPopulation,
  });

  const [updateCounty] = useMutation(UPDATE_COUNTRY);

  const options = useMemo(() => countryList().getData(), []);

  const handleCountry = (value) => {
    setValue(value);
  };

  useEffect(() => {
    if (country) {
      setValue(country?.country);
    }
  }, [country]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCounty({
      variables: {
        updateCountyInput2: {
          id: country.id,
          country: value.label,
          year: formValues.year,
          area: Number(formValues.area),
          totalPopulation: Number(formValues.totalPopulation),
        },
      },
    });
    setIsUpdated(true);
    setIsDeleted(false);
    setIsCreated(false);
    clear();
    refetch();
  };

  const clear = () => {
    setValue("");
    setFormValues(initialState);
  };

  return (
    <div className='mt-10 sm:mt-0'>
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='mt-5 md:col-span-12'>
          <form onSubmit={handleSubmit}>
            <div className='overflow-hidden shadow sm:rounded-md'>
              <div className='bg-white px-4 py-5 sm:p-6'>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Country({country.country})
                    </label>
                    <Select
                      options={options}
                      value={value}
                      onChange={handleCountry}
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='year'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Year
                    </label>
                    <input
                      type='number'
                      name='year'
                      id='year'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      value={formValues.year}
                      onChange={(event) =>
                        setFormValues({
                          ...formValues,
                          year: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Area (square Kilometers)
                    </label>
                    <input
                      type='number'
                      name='area'
                      id='total-area'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      value={formValues.area}
                      onChange={(event) =>
                        setFormValues({
                          ...formValues,
                          area: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='total-population'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Total Population
                    </label>
                    <input
                      type='number'
                      name='totalPopulation'
                      id='total-population'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      value={formValues.totalPopulation}
                      onChange={(event) =>
                        setFormValues({
                          ...formValues,
                          totalPopulation: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <button
                  type='submit'
                  className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
