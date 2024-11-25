import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { error: 'No se proporcionaron datos' },
        { status: 400 }
      );
    }

    const data = await request.json();
    
    // Aquí creamos un PDF simple con estructura HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Cotización ${data.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .details { margin-bottom: 20px; }
            .total { font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Cotización #${data.id}</h1>
          </div>
          <div class="details">
            <p><strong>Cliente ID:</strong> ${data.client_id}</p>
            <p><strong>Usuario ID:</strong> ${data.user_id}</p>
            <p><strong>Método de Pago ID:</strong> ${data.payment_method_id}</p>
          </div>
          <div class="total">
            <p>Total: $${data.total.toFixed(2)}</p>
          </div>
        </body>
      </html>
    `;

    // Convertir el HTML a PDF usando jspdf-html2canvas
    const response = new NextResponse(
      JSON.stringify({ 
        html: htmlContent,
        success: true 
      }), 
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response;

  } catch (error) {
    console.error('Error generando PDF:', error);
    return NextResponse.json(
      { error: 'Error al generar el PDF: ' + error.message },
      { status: 500 }
    );
  }
}