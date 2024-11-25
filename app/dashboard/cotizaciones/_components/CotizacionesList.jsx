'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchQuotations, deleteQuotation } from '@/actions/quotations/quotationsActions'

export default function CotizacionesList({ 
  clientFilter, 
  userFilter, 
  onClientFilterChange, 
  onUserFilterChange 
}) {
  const [quotations, setQuotations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadQuotations = async () => {
      try {
        const data = await fetchQuotations(clientFilter, userFilter)
        setQuotations(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar las cotizaciones')
        setQuotations([])
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadQuotations()
  }, [clientFilter, userFilter])

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta cotización?')) {
      try {
        await deleteQuotation(id)
        setQuotations(quotations.filter(quot => quot.id !== id))
        setError(null)
      } catch (err) {
        setError('Error al eliminar la cotización')
        console.error('Error:', err)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Filtrar por cliente..."
          value={clientFilter}
          onChange={(e) => onClientFilterChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs"
        />
        <input
          type="text"
          placeholder="Filtrar por usuario..."
          value={userFilter}
          onChange={(e) => onUserFilterChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs"
        />
      </div>

      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiempo Válido</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método de Pago</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  Cargando...
                </td>
              </tr>
            ) : quotations.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  No se encontraron cotizaciones
                </td>
              </tr>
            ) : (
              quotations.map((quotation) => (
                <tr key={quotation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quotation.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quotation.client_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quotation.user_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${quotation.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quotation.valid_time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quotation.payment_method_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/cotizaciones/${quotation.id}`}>
                        <button className="text-blue-600 hover:text-blue-900" title="Ver">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                      </Link>
                      <Link href={`/dashboard/cotizaciones/${quotation.id}/edit`}>
                        <button className="text-indigo-600 hover:text-indigo-900" title="Editar">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                      </Link>
                      {quotation.pdf_url && (
                        <button 
                          onClick={() => window.open(quotation.pdf_url, '_blank')}
                          className="text-green-600 hover:text-green-900"
                          title="Descargar PDF"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(quotation.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}