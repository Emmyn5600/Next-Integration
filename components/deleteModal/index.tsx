import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, gql } from "@apollo/client";

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

function DeleteModal({
  openDelete,
  setOpenDelete,
  countryId,
  setIsUpdated,
  setIsDeleted,
  setIsCreated,
  refetch,
}: any) {
  const cancelButtonRef = useRef(null);

  const [deleteCountry] = useMutation(DELETE_COUNTRY);

  const handleDeleteCountry = () => {
    deleteCountry({
      variables: {
        deleteCountryId: countryId,
      },
    });
    setOpenDelete(false);
    setIsDeleted(true);
    setIsUpdated(false);
    setIsCreated(false);
  };

  return (
    <Transition.Root show={openDelete} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={setOpenDelete}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-100'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4  '>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg font-medium leading-6 text-gray-900'
                      >
                        Delete
                      </Dialog.Title>
                      <div className='mt-2'>
                        <span className='text-red-500'>
                          Are you sure you want to delete this row?
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <a
                    href='/'
                    type='button'
                    onClick={handleDeleteCountry}
                    className='mt-3 inline-flex w-full justify-center rounded-md border border-red-300 bg-red-500 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    Yes Delete
                  </a>
                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => setOpenDelete(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default DeleteModal;
