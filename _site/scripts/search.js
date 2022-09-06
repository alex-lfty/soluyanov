window.addEventListener("load", () => {
  const { autocomplete } = window["@algolia/autocomplete-js"];

  const foundEl = document.querySelector("#search .found-station")

  Promise.all([
    fetch("../addresses.json").then((res) => res.json()),
    fetch("../stations.json").then((res) => res.json()),
  ]).then((results) => {
    const [buildings, stations] = results;
    const options = {
      isCaseSensitive: false,
      includeScore: true,
      // shouldSort: true,
      // includeMatches: false,
      // findAllMatches: false,
      // minMatchCharLength: 2,
      // location: 0,
      threshold: 0.6,
      // distance: 100,
      useExtendedSearch: true,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      // fieldNormWeight: 1,
      keys: ["address"],
    };

    const fuse = new Fuse(buildings.addresses, options);

    autocomplete({
      container: "#search-autocomplete",
      placeholder: "Введите адрес",
      getSources() {
        return [
          {
            sourceId: "addresses",
            getItems({ query }) {
              return fuse
                .search(query)
                .slice(0, 10)
                .map(({ item }) => item);
            },
            templates: {
              item({ item }) {
                return item.address;
              },
            },
            onSelect(params) {
              console.log("ON SELECT!", params)
              const station = stations[params.item.station]
              foundEl.innerHTML = `<div>
                <h3>${station.name}</h3>
                <div>${station.address}</div>
              </div>`
            },
            onActice() {
              console.log("ON ACTIVE!")
            }
          },
        ];
      },
    });
  });
});
