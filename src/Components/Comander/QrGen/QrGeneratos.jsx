import React from 'react';
import { QRCode } from 'react-qrcode-logo';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class QRCodeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.generatePDF = this.generatePDF.bind(this);
  }

  async generatePDF() {
    const input = document.getElementById('qr-code-container');
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    const qrWidth = pageWidth ;
    const qrHeight = pageHeight ;

    // Establecer los márgenes superior e inferior
    const marginTop = 0; // Puedes ajustar estos valores según sea necesario
    const marginBottom = 5;
    
    // Establecer un área de trabajo personalizada para el documento
    pdf.setPage(0);
    pdf.setDrawColor(0); // No dibujar ningún borde
    pdf.setFillColor(255, 255, 255); // Establecer el color de relleno en blanco
    pdf.rect(0, marginTop, pageWidth, pageHeight - marginTop - marginBottom, 'F'); // Dibujar un rectángulo para definir el área de trabajo
    
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 2; col++) {
        const xOffset = col * qrWidth;
        const yOffset = row * qrHeight;
        pdf.addImage(imgData, 'PNG', xOffset, yOffset + marginTop, qrWidth, qrHeight, undefined, 'NONE');
        
        
        // Ajustes de texto (opcional)
        pdf.setTextColor(0, 0, 0); // Color del texto: negro
        pdf.setFontSize(12); // Tamaño del texto: 12 puntos
        
      }
    }

    pdf.save('qrcodes.pdf');
}




  render() {
    const baseUrl = window.location.origin;


    return (
      <div>
        <button onClick={this.generatePDF}>Generar PDF</button>
        <div id="qr-code-container" style={{ padding: '20px', backgroundColor: 'white', display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '20px' }}>
          {[...Array(8)].map((_, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <QRCode value={baseUrl} size={150} />
  
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default QRCodeGenerator;