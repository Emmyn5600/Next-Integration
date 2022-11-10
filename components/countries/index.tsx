import React, { useState, Fragment } from "react";
import EditCountry from "./../EditModal";
import { useMutation, gql } from "@apollo/client";
import Delete from "./../deleteModal";

const DELETE_COUNTRY = gql`
  mutation DeleteCountry($deleteCountryId: ID!) {
    deleteCountry(id: $deleteCountryId) {
      id
      country
      year
      area
      totalPopulation
      createdAt
    }
  }
`;

function Countries({
  countries,
  refetch,
  setIsUpdated,
  setIsDeleted,
  setIsCreated,
}: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");
  const [countryId, setCountryId] = useState<string>("");

  const handleUpdate = (country: string) => {
    setOpen(true);
    setCountry(country);
  };

  const handleOpenDeleteModal = (countryId: string) => {
    setOpenDelete(true);
    setCountryId(countryId);
  };
  return (
    <Fragment>
      <EditCountry
        open={open}
        setOpen={setOpen}
        country={country}
        refetch={refetch}
        setIsUpdated={setIsUpdated}
        setIsDeleted={setIsDeleted}
        setIsCreated={setIsCreated}
      />
      <Delete
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        countryId={countryId}
        refetch={refetch}
        setIsUpdated={setIsUpdated}
        setIsDeleted={setIsDeleted}
        setIsCreated={setIsCreated}
      />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Country Name
              </th>
              <th scope="col" className="py-3 px-6">
                Year
              </th>
              <th scope="col" className="py-3 px-6">
                Area (Square Kilometer)
              </th>
              <th scope="col" className="py-3 px-6">
                Total Population
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {countries &&
              countries.map((country: any) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={country.id}
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {country.country}
                  </th>
                  <td className="py-4 px-6">{country.year}</td>
                  <td className="py-4 px-6">{country.area}</td>
                  <td className="py-4 px-6">{country.totalPopulation}</td>
                  <td className="py-4 px-6">
                    <a
                      onClick={() => handleUpdate(country)}
                      href="#."
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                    <a
                      href="#."
                      onClick={() => handleOpenDeleteModal(country.id)}
                      className="ml-5 font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
export default Countries;
