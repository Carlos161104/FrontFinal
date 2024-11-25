'use client'
import { useState } from 'react'
import Link from 'next/link'
import CotizacionesList from './_components/CotizacionesList'

export default function CotizacionesPage() {
  const [filterClient, setFilterClient] = useState('')
  const [filterUser, setFilterUser] = useState('')

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Cotizaciones</h1>
        <Link 
          href="/dashboard/cotizaciones/nueva"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          Nueva Cotización
        </Link>
      </div>

      <div className="rounded-md border border-gray-200">
        <CotizacionesList 
          clientFilter={filterClient}
          userFilter={filterUser}
          onClientFilterChange={setFilterClient}
          onUserFilterChange={setFilterUser}
        />
      </div>
    </div>
  )
}