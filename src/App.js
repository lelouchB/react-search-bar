import {
  FieldDictionary,
  Filter,
  FilterBuilder,
  Input,
  Pagination,
  Results,
  ResultsPerPage,
  SearchProvider,
  Summary,
  ViewType,
  Pipeline,
  RangeFilterBuilder,
  Sorting,
} from "@sajari/react-search-ui";

function App() {
  const fields = new FieldDictionary({
    title: "name",
    subtitle: (data) =>
      data.level4 || data.level3 || data.level2 || data.level1 || data.brand,
  });
  const brandFilter = new FilterBuilder({
    name: "brand",
    field: "brand",
  });
  const categoryFilter = new FilterBuilder({
    name: "level1",
    field: "level1",
  });

  const colorFilter = new FilterBuilder({
    name: "color",
    field: "imageTags",
    array: true,
  });

  const priceFilter = new RangeFilterBuilder({
    name: "price",
    field: "price",
  });

  const ratingFilter = new FilterBuilder({
    name: "rating",
    field: "rating",
  });
  return (
    <SearchProvider
      search={{
        pipeline: new Pipeline(
          {
            account: "1594153711901724220",
            collection: "bestbuy",
          },
          "query"
        ),
        fields,
        filters: [
          categoryFilter,
          priceFilter,
          colorFilter,
          ratingFilter,
          brandFilter,
        ],
      }}
      searchOnLoad
    >
      <div>
        <h1 className="text-5xl text-center font-normal mt-0 mb-2 text-purple-800">
          Sajari React Example
        </h1>
        <div>
          <div className="px-6 py-3 ">
            <Input
              className="relative bg-white bg-white rounded text-sm  outline-none focus:outline-none focus:ring w-full"
              placeholder="Search here"
            />
            <div className="flex items-center justify-end my-3">
              <Summary size="sm" />
              <div className="flex space-x-4  ml-2">
                <Sorting
                  options={[
                    { name: "Most relevant", value: "" },
                                        { name: "Name: A to Z", value: "name" },

                    { name: "Brand: A to Z", value: "brand" },
                    { name: "Brand: Z to A", value: "-brand" },
                    { name: "Rating: Low to High", value: "rating" },
                    { name: "Rating: High to Low", value: "-rating" },
                    { name: "Popularity", value: "popularity" },
                  ]}
                  size="sm"
                />
                <ResultsPerPage />
                <ViewType />
              </div>
            </div>
            <div className="w-full px-12 ">
              <div className="flex mt-6">
                <div className="w-1/3 pr-4 border-gray-100 border-r space-y-6">
                  <Filter type="list" name="brand" title="Brand" searchable />
                  <Filter
                    type="list"
                    name="level1"
                    title="Category"
                    searchable
                  />
                  <Filter
                    type="range"
                    name="price"
                    title="Price"
                    format="price"
                  />
                  <Filter type="color" name="color" title="Color" />
                  <Filter type="rating" name="rating" title="Rating" />
                </div>

                <Results />
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </SearchProvider>
  );
}

export default App;
