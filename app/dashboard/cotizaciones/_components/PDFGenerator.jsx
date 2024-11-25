'use client'
import { useState } from 'react'
import { generateQuotationPDF } from '@/actions/quotations/quotationsActions'
import PDFViewer from './PDFViewer'
import html2pdf from 'html2pdf.js'

const PDFGenerator = ({ quotationId }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)

  const handleGeneratePDF = async () => {
    try {
      setIsGenerating(true)
      setError(null)
      
      const htmlBlob = await generateQuotationPDF(quotationId)
      
      // Leer el HTML del blob
      const htmlText = await htmlBlob.text()
      
      // Crear un elemento temporal para el HTML
      const container = document.createElement('div')
      container.innerHTML = htmlText
      
      // Convertir a PDF usando html2pdf
      const pdfBlob = await html2pdf().from(container).outputPdf('blob')
      
      // Crear URL del PDF
      const url = URL.createObjectURL(pdfBlob)
      setPdfUrl(url)
      
      // Descargar el PDF
      const link = document.createElement('a')
      link.href = url
      link.download = `cotizacion-${quotationId}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
    } catch (err) {
      console.error('Error específico de generación:', err)
      setError('No se pudo generar el PDF. Verifique la conexión con el servidor.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleGeneratePDF}
        disabled={isGenerating}
        className={`px-4 py-2 rounded-md text-white flex items-center gap-2
          ${isGenerating ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generando PDF...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Generar PDF
          </>
        )}
      </button>

      {error && (
        <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {pdfUrl && !error && <PDFViewer pdfUrl={pdfUrl} />}
    </div>
  )
}

export default PDFGenerator