type propsType = {
  updateSearchData?: (data: string) => void;
};

export default function SearchBox(props: propsType) {
  return (
    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 ml-auto my-8 px-4">
      <form
        onKeyDown={(event) => {
          if (event.key === "Enter" && props.updateSearchData) {
            event.preventDefault();
            props.updateSearchData(
              (
                (event.currentTarget as HTMLFormElement)?.children[1]
                  .children[1] as HTMLInputElement
              ).value
            );
          }
        }}
      >
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            // onChange={(event) => props.updateSearchData && props.updateSearchData(event.target.value)}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-600 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search by employee name..."
            required
          />
          <button
            onClick={(event) => {
              if (props.updateSearchData) {
                event.preventDefault();
                props.updateSearchData(
                  (
                    (event.currentTarget as HTMLButtonElement)
                      ?.previousSibling as HTMLInputElement
                  ).value
                );
              }
            }}
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
