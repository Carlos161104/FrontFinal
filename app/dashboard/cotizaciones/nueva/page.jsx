'use client'
import { useState } from 'react';
import CotizacionForm from '../_components/cotizacionform';
import { createQuotation } from '@/actions/quotations/quotationsActions';
import { useRouter } from 'next/navigation';

export default function NuevaCotizacionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const newQuotation = await createQuotation(formData);
      router.push(`/dashboard/cotizaciones/${newQuotation.id}`);
    } catch (err) {
      setError('Error al crear la cotización. Por favor, intente nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Nueva Cotización</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <CotizacionForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
}