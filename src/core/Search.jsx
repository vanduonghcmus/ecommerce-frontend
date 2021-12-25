import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, results, search, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          setData({ ...data, results: res, searched: true });
        }
      });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };
  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }

    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProduct = (results = []) => {
    return (
      <div>
        <h2 className="my-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, i) => (
            <div key={i} className="col-xs-12 col-sm-4 col-lg-3 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg align-items-center">
          <div className="input-group-prepend">
            <select
              onChange={handleChange("category")}
              className="btn mr-2"
              style={{ cursor: "pointer" }}
            >
              <option className="text-left" value="All">
                Pick Category
              </option>
              {categories.map((c, i) => (
                <option className="text-left" key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by me"
          />
          <div className="btn input-group-append">
            <button
              type="submit"
              className="input-group-text"
              style={{ border: 0 }}
            >
              Search
            </button>
          </div>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>

      <div className="container-fluid mb-3">{searchedProduct(results)}</div>
    </div>
  );
};

export default Search;
