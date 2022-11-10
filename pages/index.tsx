import { useEffect, useState, Fragment } from "react";
import Countries from "./../components/countries";
import CreateCountry from "./../components/CreateCountry";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_COUNTRIES = gql`
  query AllCountries {
    countries {
      id
      country
      year
      area
      totalPopulation
      createdAt
    }
  }
`;

export default function HomePage() {
  const [isCreated, setIsCreated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { data, refetch } = useQuery(GET_ALL_COUNTRIES);

  useEffect(() => {
    if (isCreated) refetch();
    if (isUpdated) refetch();
    if (isDeleted) refetch();
  }, [isCreated, isUpdated, isDeleted, refetch]);

  return (
    <Fragment>
      <div className='text-center m-5'>
        <h1 className='mt-20 text-indigo-500 font-bold'>CREATE COUNTRY</h1>
        <CreateCountry
          refetch={refetch}
          setIsCreated={setIsCreated}
          setIsUpdated={setIsUpdated}
          setIsDeleted={setIsDeleted}
        />
        <h1 className='mb-10 text-indigo-500 font-bold uppercase'>
          {data?.countries.length} COUNTRIES
        </h1>

        <Countries
          countries={data?.countries}
          refetch={refetch}
          setIsCreated={setIsCreated}
          setIsUpdated={setIsUpdated}
          setIsDeleted={setIsDeleted}
        />
      </div>
    </Fragment>
  );
}
