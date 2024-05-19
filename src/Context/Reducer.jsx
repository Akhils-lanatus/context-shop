const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };

    case "TOGGLE_THEME":
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case "SET_FILTER": {
      let { filterOn, item, bool } = action.payload;
      const selectedFilters = { ...state.selectedFilters };
      selectedFilters[filterOn].add(item);
      if (!bool) {
        selectedFilters[filterOn].delete(item);
      }

      return {
        ...state,
        selectedFilters,
      };
    }
    case "SET_PRICE_FILTER":
      const { min, max } = action.payload;

      const selectedFilters = {
        ...state.selectedFilters,
        selectedPriceRange: { min, max },
      };

      return {
        ...state,
        selectedFilters: selectedFilters,
      };

    case "SET_INCLUDEOUTOFSTOCK": {
      const selectedFilters = {
        ...state.selectedFilters,
        showOutOfStock: action.payload,
      };
      return {
        ...state,
        selectedFilters,
      };
    }

    case "SEARCH_PRODUCTS":
      let searchQuery = action.payload;
      return {
        ...state,
        searchQuery,
      };

    case "CLEAR_ALL_FILTERS":
      return {
        ...state,
        selectedFilters: {
          deliveryDays: new Set(),
          selectedBrand: new Set(),
          selectedRatings: new Set(),
          selectedPriceRange: { min: 0, max: 0 },
          showOutOfStock: false,
        },
      };
  }
};

export default cartReducer;
