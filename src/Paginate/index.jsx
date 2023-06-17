import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import ProductList from './ProductList';

export default function Paginate() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const productsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/products?limit=40');

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePage = (nextPage) => {
    if (nextPage !== page) setPage(nextPage);
  };

  return (
    <div>
      {loading && <h2 style={{ textAlign: 'center' }}>Loading ....</h2>}
      {products.length > 0 && !loading && (
        <div>
          <h2> List of all products:</h2>
          <ul>
            {products
              .slice(
                page * productsPerPage - productsPerPage,
                page * productsPerPage
              )
              .map((product) => (
                <ProductList key={product.id} product={product} />
              ))}
          </ul>

          <Pagination
            totalPages={Math.ceil(products.length / productsPerPage)}
            currentPage={page}
            handlePage={handlePage}
          />
        </div>
      )}
    </div>
  );
}
