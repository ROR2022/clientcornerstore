import {useState} from 'react'
import Barcode from 'react-barcode';

const CreateBarCode = () => {
    const [valueBarCode, setValueBarCode] = useState('');
    const [showBarCode, setShowBarCode] = useState(false);

    const handleGenerateBarCode = () => {
        setShowBarCode(true);
    }
  return (
    <div>
        <h2 className='text-center fs-1'>CREATE BAR CODE</h2>
        <div className='card me-auto ms-auto py-2 px-4 mb-3 w-75'>
            <div className='ms-auto me-auto d-block'>
                <input type='text' className='form-control' placeholder='Enter value for Bar Code' onChange={(e)=>setValueBarCode(e.target.value)} />
                <button className='btn btn-primary mt-2' onClick={handleGenerateBarCode}>Generate Bar Code</button>
                <div className='card my-3 p-2'>
                {showBarCode && <Barcode value={valueBarCode} width={1}/>}
                </div>
            </div>
        </div>

    </div>
  )
}

export default CreateBarCode