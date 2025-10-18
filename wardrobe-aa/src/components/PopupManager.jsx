// Generic popup/modal component
// Purpose: Provide a reusable overlay + content container
// Accepts props for showing/hiding and passes down children (like forms)

import React from "react";

export default function PopupManager({ isOpen, onClose, title, children }) {
  if (!isOpen) return null; // don't render anything when closed

  // prevent click on inner content from closing modal
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={stopPropagation}>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  );
}
