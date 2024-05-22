const cartReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS": {
      let allCategories = new Set();
      for (const cat of action.payload) {
        allCategories.add(cat.category);
      }

      return {
        ...state,
        products: action.payload,
        allCategories: Array.from(allCategories),
      };
    }

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
    case "SET_PRICE_FILTER": {
      const { min, max } = action.payload;

      const selectedFilters = {
        ...state.selectedFilters,
        selectedPriceRange: { min, max },
      };

      return {
        ...state,
        selectedFilters: selectedFilters,
      };
    }

    case "SET_SORT_BY_FILTER": {
      const selectedFilters = { ...state.selectedFilters };
      selectedFilters.sortBy = action.payload;
      return { ...state, selectedFilters };
    }

    case "SET_INCLUDE_OUT_OF_STOCK": {
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
      return {
        ...state,
        searchQuery: action.payload,
        selectedCategory: "",
      };

    case "SET_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
        searchQuery: "",
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
          sortBy: null,
        },
      };
  }
};

export default cartReducer;
