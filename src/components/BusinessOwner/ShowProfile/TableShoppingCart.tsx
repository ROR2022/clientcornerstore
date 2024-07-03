import { FC, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

interface TableShoppingCartProps {
    dataTableShoppingCart: any
}

const TableShoppingCart: FC<TableShoppingCartProps> = ({ dataTableShoppingCart }) => {
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        console.log('dataTableShoppingCart:...', dataTableShoppingCart);
        calculateTotal();
    }, [dataTableShoppingCart]);

    const calculateTotal = () => {
        let tempTotal = 0;
        /* dataTableShoppingCart.forEach((item:any) => {
            tempTotal += item.price*item.units;
        }); */
        //usaremos reduce para sumar los subtotales de cada producto
        tempTotal = dataTableShoppingCart.reduce((acc: any, item: any) => {
            return acc + item.price * item.units;
        }, 0);
        setTotal(tempTotal);
    }
    //crearemos una funcion para formatear el numero a un formato de moneda que tenga comas el signo de dolar y dos decimales
    const formatMyNumber = (num: number) => {
        return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }


    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Sub-Total</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTableShoppingCart.map((item: any, index: number) => {
                        return (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td className='text-center'>${+item.price}</td>
                                <td className='text-center'>{item.units}</td>
                                <td className='text-center'>${item.price * item.units}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </Table>
            <div className='d-flex justify-content-between'>
                <h6 className='fw-bolder'>Total:</h6>
                <h6 className='fw-bolder'>{formatMyNumber(total)}</h6>
            </div>
        </>
    )
}

export default TableShoppingCart