
import {FC, useState, useEffect} from 'react'
import { useContext } from 'react';
import MyContext from '@/context/MyContext';
//importaremos el icono de trash de react-icons
import { FaTrash } from 'react-icons/fa';

interface CardShoppingCartProps {
    itemShoppingCart: any;
    isDisabled?: boolean;
}

const CardShoppingCart:FC<CardShoppingCartProps> = ({itemShoppingCart, isDisabled}) => {
    const {_id,name, description, price, units, imageUrl, stock} = itemShoppingCart;
    const [numberUnits, setNumberUnits] = useState(units);
    const [errorUnits, setErrorUnits] = useState('');
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const { dataLocalStorageShoppingCart, setDataLocalStorageShoppingCart } = useContext(MyContext);

    useEffect(() => {
        //console.log('itemShoppingCart:...', itemShoppingCart);
    }, [itemShoppingCart]);

    useEffect(() => {
        //console.log('dataLocalStorageShoppingCart:...',dataLocalStorageShoppingCart);
        //reasignar el valor de las unidades si el producto ya esta en el carrito de compras
        const dataCart:any = dataLocalStorageShoppingCart.find((item: any) => item._id === _id);
        if (dataCart) {
            setNumberUnits(dataCart.units);
        }
    }, [dataLocalStorageShoppingCart]);

    const handleChangeUnits = (e: any) => {
        const value = parseInt(e.target.value);
        if(value < 1){
            setNumberUnits(1);
            //setErrorUnits('No less units');
            setShowDeleteButton(true);
            return;
        }
        if(value > stock){
            setNumberUnits(stock);
            setErrorUnits('No more stock');
            return;
        }
        setNumberUnits(value);
        setErrorUnits('');
        setShowDeleteButton(false);
        //se actualiza el carrito de compras con la nueva cantidad de unidades
        updateShoppingCart(value);
    }

    const updateShoppingCart = (value:number) => {
        let tempShoppingCart = dataLocalStorageShoppingCart.map((item:any) => {
            if(item._id === _id){
                item.units = value;
            }
            return item;
        });
        setDataLocalStorageShoppingCart(tempShoppingCart);
    }

    const handleIncreaseUnits = () => {
        if(numberUnits < stock){
            setNumberUnits(numberUnits+1);
            setErrorUnits('');
            updateShoppingCart(numberUnits+1);
        }else{
            setNumberUnits(stock);
            setErrorUnits('No more stock');
        }
    }

    const handleDecreaseUnits = () => {
        if(showDeleteButton===true){
            //se elimina el producto del carrito de compras
            let tempShoppingCart = dataLocalStorageShoppingCart.filter((item:any) => item._id !== _id);
            setDataLocalStorageShoppingCart(tempShoppingCart);
            return;
        }
        if(numberUnits > 1){
            setNumberUnits(numberUnits-1);
            setErrorUnits('');
            updateShoppingCart(numberUnits-1);
            setShowDeleteButton(false);
        }else{
            setNumberUnits(1);
            //setErrorUnits('No less units');
            setShowDeleteButton(true);
        }
    }

  return (
    <div style={{width:'320px'}} className='d-flex gap-1 border rounded p-1'>
        <div className='bg-light d-flex justify-content-center align-items-center rounded'>
        <img src={imageUrl} style={{width:'50px', objectFit:'contain'}} alt="image" />
        </div>
        <div className='d-flex flex-column gap-1'>
            <h6>{name}</h6>
            <p>{description}</p>

            <div className='d-flex gap-1'>
            <p>Price: ${price}</p>
            <div className='d-flex gap-1 justify-content-center align-items-center'>
                <button 
                disabled={isDisabled}
                onClick={handleDecreaseUnits} className='btn btn-outline-secondary'>
                    {showDeleteButton===true ? <FaTrash/>:
                    <span>-</span>
                    }
                    
                </button>
                <input 
                disabled={isDisabled}
                step={1}
                className='form-control text-center'
                style={{width:'50px'}} 
                type="number" 
                value={numberUnits} 
                onChange={handleChangeUnits} />
                {/* <span className='border rounded p-2'>{units}</span> */}
                <button 
                disabled={isDisabled}
                onClick={handleIncreaseUnits} className='btn btn-outline-secondary'>+</button>
            </div>
            </div>

            {errorUnits!=='' && <p className='text-danger text-center'>{errorUnits}</p>}
        </div>
    </div>
  )
}

export default CardShoppingCart