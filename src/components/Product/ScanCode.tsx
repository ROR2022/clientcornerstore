import {FC} from 'react'
import { Scanner } from '@yudiel/react-qr-scanner';

interface ScanCodeProps {
    valueScanner: string;
    setValueScanner: (data: any) => void;
}

const ScanCode: FC<ScanCodeProps> = ({valueScanner,setValueScanner}) => {

    const handleDataScanner = (data: any) => {
        console.log('data Scanner:..',data);
        const dataScanner = data[0].rawValue;
        setValueScanner(dataScanner);
    }
  return (
    <div>
        <h2 className='text-center fs-1'>SCAN CODE</h2>
        <div className='card me-auto ms-auto py-2 px-4 mb-3 w-75'>
            <div className='ms-auto me-auto d-block'>
            <Scanner onScan={handleDataScanner} formats={["code_128", "qr_code"]} />
            </div>
        </div>
    </div>
  )
}

export default ScanCode