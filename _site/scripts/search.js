const render = results => `<ul>
  ${results.map(address => `<li>${address}</li>`).join("")}
</ul>`

window.addEventListener("load", () => {
  Promise.all([
    fetch("../addresses.json").then((res) => res.json()),
    fetch("../stations.json").then((res) => res.json()),
  ]).then((results) => {
    console.log(results);
    const [buildings, stations] = results;
    const inputEl = document.querySelector("#search .address-search-input");
    const resultsEl = document.querySelector("#search .search-results")
    let foundAddresses = [];
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

    inputEl.addEventListener("input", (e) => {
      e.stopPropagation();
      console.log(inputEl.value);
      const searchString = inputEl.value;
      if (searchString.length > 2) {
        foundAddresses = fuse.search(searchString).slice(0, 10).map(({ item }) => item.address)
        console.log(foundAddresses);
        resultsEl.innerHTML = render(foundAddresses)
      }
      if (searchString.length === 0) {
        foundAddresses = []
        resultsEl.innerHTML = render(foundAddresses)
      }
    });
  });
});
