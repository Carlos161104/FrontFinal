'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { fetchQuotationById } from '@/actions/quotations/quotationsActions'
import PDFGenerator from '@/app/dashboard/cotizaciones/_components/PDFGenerator'

export default function QuotationDetailPage() {
  const [quotation, setQuotation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const params = useParams()
  const quotationId = params.id

  useEffect(() => {
    const loadQuotation = async () => {
      try {
        const data = await fetchQuotationById(quotationId)
        setQuotation(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar la cotización')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadQuotation()
  }, [quotationId])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">Cargando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-red-700 bg-red-100 rounded-md">
        {error}
      </div>
    )
  }

  if (!quotation) {
    return (
      <div className="p-4 text-gray-700 bg-gray-100 rounded-md">
        Cotización no encontrada
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Cotización #{quotation.id}
        </h1>
        <div className="flex gap-3">
          <Link
            href={`/dashboard/cotizaciones/${quotation.id}/edit`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Editar
          </Link>
          <PDFGenerator quotationId={quotation.id} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-2 gap-6 p-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Información General</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Cliente ID</dt>
                <dd className="mt-1 text-sm text-gray-900">{quotation.client_id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Usuario ID</dt>
                <dd className="mt-1 text-sm text-gray-900">{quotation.user_id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Método de Pago</dt>
                <dd className="mt-1 text-sm text-gray-900">{quotation.payment_method_id}</dd>
              </div>
            </dl>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Detalles de la Cotización</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Total</dt>
                <dd className="mt-1 text-sm text-gray-900">${quotation.total.toFixed(2)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Tiempo Válido</dt>
                <dd className="mt-1 text-sm text-gray-900">{quotation.valid_time}</dd>
              </div>
              {quotation.pdf_url && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">PDF</dt>
                  <dd className="mt-1 text-sm text-blue-600">
                    <a href={quotation.pdf_url} target="_blank" rel="noopener noreferrer">
                      Ver PDF existente
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}