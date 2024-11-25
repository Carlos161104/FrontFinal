// app/dashboard/cotizaciones/layout.jsx
'use client'  // Indica que es un componente del lado del cliente

export default function CotizacionesLayout({ children }) {  // Componente que recibe children como prop
  return (
    <div className="flex flex-col h-screen">  // .
      <main className="flex-1 overflow-y-auto bg-gray-50">  // .
        <div className="container mx-auto">  // .
          {children}  // .
        </div>
      </main>
    </div>
  )
}