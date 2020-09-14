import React, { useEffect } from "react";

export default function Modal({ title, visible, setVisible, children }) {
  function hideBodyScroll() {
    document.querySelector("body").style.overflowY = "hidden";
  }

  function showBodyScroll() {
    document.querySelector("body").style.overflowY = "auto";
  }

  function closeModal(ev) {
    if (ev.target.matches(".modal-container")) {
      setVisible(false);
    }
  }

  useEffect(() => {
    if (visible) {
      hideBodyScroll();
    } else {
      showBodyScroll();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="modal-container shadow" onClick={closeModal}>
      <div className="modal">
        <i
          id="modal-close"
          onClick={() => setVisible(false)}
          className="mdi mdi-close"
        ></i>
        <div className="modal-header">
          {title && <h1 className="modal-title">{title}</h1>}
        </div>

        {children}
      </div>
    </div>
  );
}
