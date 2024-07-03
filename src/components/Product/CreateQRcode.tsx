import {useState} from 'react'
import QRCode from "react-qr-code";

const CreateQRcode = () => {
    const [valueQR, setValueQR] = useState('');
    const [showQR, setShowQR] = useState(false);

    const handleGenerateQR = () => {
        setShowQR(true);
    }

  return (
    <div>
        
        <h2 className='text-center fs-1'>CREATE QR CODE</h2>
        <div className='card me-auto ms-auto py-2 px-4 mb-3 w-75'>
            <div className='ms-auto me-auto d-block'>
                <input type='text' className='form-control' placeholder='Enter value for QR Code' onChange={(e)=>setValueQR(e.target.value)} />
                <button className='btn btn-primary mt-2' onClick={handleGenerateQR}>Generate QR</button>
                <div className='card my-3 p-2'>
                {showQR && <QRCode value={valueQR} style={{width:"150px"}}/>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateQRcode