const layoutOrders = ({ children }) => {
  return (
    <div className="flex flex-row h-full">
      <div className="w-1/4">{/* Lista de ordenes lateral */}</div>
      <div className="w-3/4 flex flex-col h-full">
        <div className="h-1/4">{/* Barra de busqueda */}</div>
        <div className="h-3/4">
          {/* Contenido del children */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default layoutOrders;
