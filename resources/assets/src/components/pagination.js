import React from "react";

export default function Pagination({
  pagination: { page, lastPage },
  setPage,
}) {
  return (
    <div className="pagination">
      {page <= 1 ? (
        <button
          className="disabled pagination-link pagination-previous"
          tabIndex="-1"
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>
      ) : (
        <button
          className="pagination-link pagination-previous"
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </button>
      )}

      <a className="current-page active">{page}</a>

      {page >= lastPage ? (
        <button
          className="disabled pagination-link pagination-next"
          tabIndex="-1"
          onClick={() => {}}
        >
          Próximo
        </button>
      ) : (
        <button
          className="pagination-link pagination-next"
          onClick={() => setPage(page + 1)}
        >
          Próximo
        </button>
      )}
    </div>
  );
}
