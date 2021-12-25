import React, { useState, useEffect } from "react";
import { getCategories, getFilteredProducts } from "./apiCore";
import Card from "./Card";
import Layout from "./Layout";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrice";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResult, setFilteredResult] = useState([]);

  const innit = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    innit();
  }, []);

  const loadFilteredResult = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResult(data.products);
        setSize(data.size);
        setSkip(0);
      }
    });
  };
  const loadMore = () => {
    const toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResult([...filteredResult, ...data.products]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button className="mb-4 btn btn btn-light text-info" onClick={loadMore}>
          Load More
        </button>
      )
    );
  };

  const handleFilter = (filter, filterBy) => {
    // console.log("filter", filters, filterBy);
    const newMyFilters = { ...myFilters };

    if (filterBy === "price") {
      newMyFilters.filters[filterBy] = handlePrice(filter);
    } else {
      newMyFilters.filters[filterBy] = filter;
    }

    loadFilteredResult(newMyFilters.filters);

    setMyFilters(newMyFilters);
  };

  /**
   * function will get price id then return array in price
   */
  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    data.forEach((price) => {
      if (price._id === parseInt(value)) {
        array = price.array;
      }
    });

    return array;
  };

  return (
    <Layout
      title="Shop Page"
      className="container-fluid"
      description="Search and find books of your choice"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilter={(filter) => handleFilter(filter, "category")}
            />
          </ul>
          <h4>Filter by price range</h4>
          <RadioBox
            prices={prices}
            handleFilter={(filter) => handleFilter(filter, "price")}
          />
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResult.map((product, i) => {
              return (
                <div key={i} className="col-xs-12 col-sm-4 col-lg-3 mb-3">
                  <Card product={product} />
                </div>
              );
            })}
          </div>
          <br />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
