import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import ProductList from './ProductList';

export default function Paginate() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const limit = 10;

  /*
  // fetching all the records at once from the api
  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch('https://dummyjson.com/products?limit=0');

    if (response.ok) {
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.products.length / limit));
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  */

  // fetching records page by page where number of records is set in limit.
  const fetchProducts = async (page) => {
    setLoading(true);
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${
        page * limit - limit
      }`
    );

    if (response.ok) {
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.total / limit);
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handlePage = (nextPage) => {
    if (nextPage !== page) setPage(nextPage);
  };

  return (
    <div>
      {error && !loading && (
        <h2 style={{ textAlign: 'center' }}>Failed to load products.</h2>
      )}
      {loading && <h2 style={{ textAlign: 'center' }}>Loading ....</h2>}
      {products.length > 0 && !loading && (
        <div className="products">
          <div>
            <h2> List of all products:</h2>
            <ul>
              {/* {products
                .slice(page * limit - limit, page * limit)
                .map((product) => (
                  <ProductList key={product.id} product={product} />
                ))} */}

              {products.map((product) => (
                <ProductList key={product.id} product={product} />
              ))}
            </ul>
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={page}
            handlePage={handlePage}
          />
        </div>
      )}
    </div>
  );
}
