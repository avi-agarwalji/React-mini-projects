export default function ProductList({ product }) {
  return (
    <li>
      {product.id} - {product.title}
      <ul>
        <li>Brand: {product.brand}</li>
        <li>Category: {product.category}</li>
        <li>Price: {product.price}</li>
      </ul>
    </li>
  );
}
