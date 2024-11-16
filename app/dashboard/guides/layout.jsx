"use client";
import React from "react";

const layoutGuides = ({ children }) => {
  
  return (
    <div className="flex flex-row h-full">
      {/* Primer div: 4/12 del espacio */}
      <div className="w-4/12 h-[90vh] max-h-[90vh] overflow-hidden px-5 overflow-y-auto bg-blue-400">
        <p>Formulario de busqueda</p>
      </div>
      <div className="bg-blue-300 h-full w-7/12">{children}</div>
    </div>
  );
};

export default layoutGuides;
