window.addEventListener("load", () => {
  const { autocomplete } = window["@algolia/autocomplete-js"];

  const foundEl = document.querySelector("#search .found-station");

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
      translations: {
        clearButtonTitle: "Очистить",
        detachedCancelButtonText: "Отмена",
      },
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
              params.setQuery(params.item.address);
              const station = stations[params.item.station];
              foundEl.innerHTML = `<div>
                <div class="station-title">${station.name}</div>
                <div class="station-address">${station.address}</div>
              </div>`;
              const multiRoute = new ymaps.multiRouter.MultiRoute(
                {
                  referencePoints: [
                    `Москва, ${params.item.address}`,
                    `Москва, ${station.address}`,
                  ],
                  params: {
                    routingMode: "pedestrian",
                  },
                },
                {
                  boundsAutoApply: true,
                }
              );
              window.districtMap.geoObjects.add(multiRoute);
            },
            onActice() {
              console.log("ON ACTIVE!");
            },
          },
        ];
      },
    });
  });
});
