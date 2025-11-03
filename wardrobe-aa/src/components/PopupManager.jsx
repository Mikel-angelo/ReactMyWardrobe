// Generic popup/modal component
// Purpose: Provide a reusable overlay + content container
// Accepts props for showing/hiding and passes down children (like forms)

import React from "react";

export default function PopupManager({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  const stopPropagation = (e) => e.stopPropagation();

    return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-neutral-bg rounded-lg p-6 w-full max-w-md shadow-lg animate-fade-scale" onClick={stopPropagation}>
        {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
