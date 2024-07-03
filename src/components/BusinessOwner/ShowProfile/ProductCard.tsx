import { FC, use, useEffect, useState } from 'react'
import { CardFooter, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//importaremos los iconos de print y download de react-icons
import { FaPrint, FaDownload, FaCartPlus } from 'react-icons/fa';
//importar tambien el icono de add to cart de react-icons
//import { FaCartPlus } from 'react-icons/fa';
import './ProductCard.css';
import { useContext } from 'react';
import MyContext from '@/context/MyContext';


interface ProductCardProps {
    dataProduct: any;
    setIdProduct: (dataProduct: any) => void;
}

const ProductCard: FC<ProductCardProps> = ({ dataProduct, setIdProduct }) => {
    const { name, price, description, stock, category, imageUrl, qrCodeUrl, barCodeUrl, businessOwner, _id } = dataProduct;
    const [numberUnits, setNumberUnits] = useState(1);
    const [errorUnits, setErrorUnits] = useState('');
    const { dataLocalStorageShoppingCart, setDataLocalStorageShoppingCart } = useContext(MyContext);


    useEffect(() => {
        //console.log('dataProduct:...', dataProduct);
        //console.log('dataProductID:...', _id);
    }, [_id]);

    useEffect(() => {
        //reasignar el valor de las unidades si el producto ya esta en el carrito de compras
        const dataCart:any = dataLocalStorageShoppingCart.find((item: any) => item._id === _id);
        if (dataCart) {
            setNumberUnits(dataCart.units);
        }
    }, [dataLocalStorageShoppingCart]);

    const handlePrint = (name: any) => {
        //implementar la impresion de la imagen apartir de la url en el name
        //console.log('Print:..', name);
        //console.log('dataProduct:..', dataProduct);
        const urlImage = dataProduct[name];
        //console.log('urlImage:..', urlImage);
        const printWindow = window.open('', '_blank');
        printWindow?.document.write(`<img src="${urlImage}" onload="window.print();" />`);
        printWindow?.document.close();
    }
    const handleDownload = (name: any) => {
        //implementar la descarga de la imagen apartir de la url en el name
        //console.log('Download:..', name);
        const urlImage = dataProduct[name];
        const link = document.createElement('a');
        link.href = urlImage;
        link.download = `${name}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleSetIdProduct = () => {
        //console.log('dataProduct:...', dataProduct);
        //console.log('dataProductID:...', _id);
        //setDataIdProduct(dataProduct);
        //setShowModalSearch(false);
        setIdProduct(_id);
    }

    const handleIncreaseunits = () => {
        if (numberUnits < stock) {
            setNumberUnits(numberUnits + 1);
            setErrorUnits('');
        }else{
            setNumberUnits(stock);
            console.log('No more stock:..');
            setErrorUnits('No more stock');
        }
    }

    const handleDecreaseUnits = () => {
        if (numberUnits > 1) {
            setNumberUnits(numberUnits - 1);
            setErrorUnits('');
        }else{
            setNumberUnits(1);
            console.log('No less units:..');
            setErrorUnits('No less units');
        }
    }

    const handleChangeUnits = (e: any) => {
        const value = parseInt(e.target.value);
        if (value > stock) {
            setNumberUnits(stock);
            console.log('No more stock:..');
            setErrorUnits('No more stock');
            return;
        }
        if (value < 1) {
            setNumberUnits(1);
            console.log('No less units:..');
            setErrorUnits('No less units');
            return;
        }
        setNumberUnits(value);
        setErrorUnits('');
    }

    const handleAddToCart = () => {
        //console.log('Add to cart:..', dataProduct);
        const dataCart = {
            ...dataProduct,
            units: numberUnits
        }
        //console.log('dataCart:...', dataCart);
        //console.log('dataProduct:...', dataProduct);
        //console.log('dataProductID:...', _id);
        //setDataCart(dataCart);
        //setShowModalCart(true);
        let tempShoppingCart = [...dataLocalStorageShoppingCart, dataCart];
        setDataLocalStorageShoppingCart(tempShoppingCart);

    }

    return (
        <Card onClick={handleSetIdProduct} style={{ width: '25rem', height: '65rem', cursor:'pointer'  }} >
            <img src={imageUrl} style={{objectFit:'contain', width:'100%',height:'40%'}} alt='image' />
            <Card.Header>
                
                
                    <div className='d-flex gap-1 justify-content-center align-items-center'>
                    <Button onClick={handleAddToCart} variant='outline-danger'>
                    <FaCartPlus style={{width:'20px', height:'20px' }} />
                    </Button>
                    <Button variant='outline-secondary' onClick={handleDecreaseUnits}>-</Button>
                    <input 
                    step={1}
                    onChange={handleChangeUnits}
                    style={{width:'50px'}} 
                    type="number" 
                    value={numberUnits} 
                    className='form-control text-center' />
                    <Button variant='outline-secondary' onClick={handleIncreaseunits}>+</Button>
                    </div>
                    {errorUnits!=='' && <h6 className='text-danger my-1 text-center'>{errorUnits}</h6>}
                
            </Card.Header>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Text>
                    Price: ${price}
                </Card.Text>
                <Card.Text>
                    Stock: {stock} units
                </Card.Text>
                <Card.Text>
                    Category: {category}
                </Card.Text>
                <CardFooter className='d-flex gap-2 p-2 flex-wrap justify-content-center align-items-center'>
                    <div className='card p-2 d-flex flex-column justify-content-center align-items-center gap-1'>
                        <img src={qrCodeUrl} alt="qrCode" width={'100%'} />
                        <div className='d-flex gap-2 justify-content-center align-items-center'>
                        <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id={`tooltip-top-print`}>Print</Tooltip>}
                            >
                            <button type='button' onClick={() => handlePrint('qrCodeUrl')} className='btn btn-primary'>
                                <FaPrint />
                            </button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id={`tooltip-top`}>DownLoad</Tooltip>}
                            >
                            <button type='button' onClick={() => handleDownload('qrCodeUrl')} className='btn btn-success'>
                                <FaDownload />
                            </button>
                            </OverlayTrigger>
                        </div>
                    </div>
                    <div className='card p-2 d-flex flex-column justify-content-center align-items-center gap-1'>
                        <img src={barCodeUrl} alt="barCode" width={'100%'} />
                        <div className='d-flex gap-2 justify-content-center align-items-center'>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id={`tooltip-top-print`}>Print</Tooltip>}
                            >
                                <button type='button' onClick={() => handlePrint('barCodeUrl')} className='btn btn-primary'>

                                    <FaPrint />


                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip id={`tooltip-top`}>DownLoad</Tooltip>}
                            >
                                <button type='button' onClick={() => handleDownload('barCodeUrl')} className='btn btn-success'>


                                    <FaDownload />


                                </button>
                            </OverlayTrigger>
                        </div>
                    </div>
                </CardFooter>
            </Card.Body>
        </Card>
    )
}

export default ProductCard