// components/CodeGeneratorComponent.js
import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, FormControl, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import  QRCode  from 'react-qr-code';
import Barcode from 'react-barcode';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

const CodeGenerator = () => {
  const [text, setText] = useState('');
  const [codeType, setCodeType] = useState('QR');
  const [codeValue, setCodeValue] = useState('');
  const codeRef:any = useRef(null);

  const handleGenerateClick = () => {
    setCodeValue(text);
  };

  const handlePrintClick = () => {
    if (codeRef.current) {
      const printWindow = window.open('', '_blank');
      printWindow?.document.write('<html><head><title>Print</title></head><body>');
      printWindow?.document.write('<div>' + codeRef.current.outerHTML + '</div>');
      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.print();
    }
  };

  const handleSaveClick = () => {
    if (codeRef.current) {
      toPng(codeRef.current)
        .then((dataUrl) => {
          saveAs(dataUrl, 'code.png');
        })
        .catch((error) => {
          console.error('Error generating image', error);
        });
    }
  };

  return (
    <Container className='card p-2 my-2'>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="text-center">Generador de Códigos</h1>
          <Form>
            <Form.Group controlId="formBasicText">
              <Form.Label>Texto para generar código</Form.Label>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Introduce el texto"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                
                  <Button variant="primary" onClick={handleGenerateClick}>
                    Generar
                  </Button>
                
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo de código</Form.Label>
              <ToggleButtonGroup type="radio" name="options" defaultValue={'QR'} onChange={(val) => setCodeType(val)}>
                <ToggleButton id='qrCodeRor' variant="outline-primary" value={'QR'}>Código QR</ToggleButton>
                <ToggleButton id='barCodeRor' variant="outline-primary" value={'Barcode'}>Código de Barras</ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>
          </Form>
          {codeValue && (
            <div className="text-center mt-4">
              <div ref={codeRef} style={{ background: 'white', padding: '16px' }} className='card d-flex justify-content-center align-items-center'>
                {codeType === 'QR' ? (
                  <QRCode value={codeValue} style={{padding:'5px'}} />
                ) : (
                  <Barcode value={codeValue} width={1} />
                )}
              </div>
              <Button variant="secondary" className="mt-3" onClick={handlePrintClick}>
                Imprimir
              </Button>
              <Button variant="secondary" className="mt-3 ml-2" onClick={handleSaveClick}>
                Guardar como Imagen
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CodeGenerator;
