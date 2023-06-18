export default function Pagination({ totalPages, currentPage, handlePage }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <button
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          style={{ fontWeight: currentPage === i + 1 ? 700 : 100 }}
          key={i}
          onClick={() => handlePage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
