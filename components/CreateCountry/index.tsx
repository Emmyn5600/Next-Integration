import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useMutation, gql } from "@apollo/client";

const initialValues = {
  year: "",
  area: "",
  totalPopulation: "",
};

const CREATE_COUNTRY_MUTATION = gql`
  mutation CreateCountry($input: CreateCountryInput!) {
    createCountry(input: $input) {
      country
      year
      area
      totalPopulation
    }
  }
`;

export default function CreateCountry({
  refetch,
  setIsCreated,
  setIsUpdated,
  setIsDeleted,
}: any) {
  const [value, setValue] = useState<any>("");
  const [formValues, setFormValues] = useState(initialValues);
  const [createCountry] = useMutation(CREATE_COUNTRY_MUTATION);

  const options = useMemo(() => countryList().getData(), []);

  const handleCountry = (value: any) => {
    setValue(value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createCountry({
      variables: {
        input: {
          country: value.label,
          year: formValues.year,
          area: Number(formValues.area),
          totalPopulation: Number(formValues.totalPopulation),
        },
      },
    });
    setIsCreated(true);
    setIsUpdated(false);
    setIsDeleted(false);
    clear();
    refetch();
  };

  const clear = () => {
    setValue("");
    setFormValues(initialValues);
  };

  return (
    <div className='ml-80 m-5'>
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='mt-5 md:col-span-2 md:mt-0'>
          <form onSubmit={handleSubmit}>
            <div className='overflow-hidden shadow sm:rounded-md'>
              <div className='bg-white px-4 py-5 sm:p-6'>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Country
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
                  // disabled
                  className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
