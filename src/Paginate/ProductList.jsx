export default function ProductList({ product }) {
  return (
    <li>
      <h4>
        {product.id} - {product.title}
      </h4>
      <ul>
        <li>Category: {product.category}</li>
        <li>Price: {product.price}</li>
      </ul>
    </li>
  );
}
