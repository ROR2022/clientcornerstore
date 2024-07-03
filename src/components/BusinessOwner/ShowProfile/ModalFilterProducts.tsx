import { getDataCategories, getDataProductsByFilter } from '@/api/apiProduct';
//import { get } from 'http';
import { FC, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';

interface ModalFilterProductsProps {
    showModalFilter: boolean;
    setShowModalFilter: (showModalFilter: boolean) => void;
    emailUser: string;
    setDataProducts: (dataProducts: any) => void;
}

const initFilterParams = {
    category: '',
    query: '',
    emailUser: ''
}

const ModalFilterProducts: FC<ModalFilterProductsProps> = ({ showModalFilter, setShowModalFilter, emailUser, setDataProducts }) => {
    const [categories, setCategories] = useState<any>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [dataQuery, setDataQuery] = useState<string>('');
    //const [filterParams, setFilterParams] = useState(initFilterParams);

    useEffect(() => {
        //console.log('emailUser:...', emailUser);
        getDataCategoriesByEmailBusinessOwner();
    }, []);
    const getDataCategoriesByEmailBusinessOwner = async () => {
        try {
            const result = await getDataCategories(emailUser);
            //console.log('result:...', result);
            const { categories } = result;
            if (categories.length === 0 || !categories) {
                console.log('No hay categorias:...');
                return;
            } else {
                const tempCategories = categories.map((category: any) => {
                    return { value: category, label: `${category}` }
                });
                setCategories([...tempCategories]);
            }
        } catch (error) {
            console.log('error:...', error);
        }
    }

    const handleChangeCategory = (option: any) => {
        console.log('option:...', option);
        setSelectedCategory(option);
    }
    const handleSearch = async () => {
        try {
            const tempFilterParams = {
                category: selectedCategory?.value || '',
                query: dataQuery || '',
                emailUser: emailUser
            }
            if(!selectedCategory&& !dataQuery){
                console.log('No filter params:...');
                return;
            }
            //setFilterParams(tempFilterParams);
            const result = await getDataProductsByFilter(tempFilterParams);
            console.log('result:...', result);
            const { dataProducts } = result;
            if (dataProducts.length === 0 || !dataProducts) {
                console.log('No hay productos:...');
                return;
            }
            setDataProducts([...dataProducts]);
            handleClose();
            
        } catch (error) {
            console.log('error:...', error);
        }
    }

    const handleClose = () => {
        setSelectedCategory(null);
        setDataQuery('');
        setShowModalFilter(false)
    };
    return (
        <Modal show={showModalFilter} onHide={handleClose} centered className='bg-secondary bg-opacity-25'>
            <Modal.Header closeButton>
                <Modal.Title>
                    <span className={'alert alert-success'}>Filter Products:</span>
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <Select
                    value={selectedCategory}
                    className="w-100 me-auto ms-auto my-2"
                    options={categories}
                    placeholder="Select Category"
                    onChange={(option) => handleChangeCategory(option)}
                />
                <input
                    type="text"
                    className='form-control my-2'
                    placeholder='Search by name or description...'
                    value={dataQuery}
                    onChange={(e) => setDataQuery(e.target.value)}
                />
                {selectedCategory && <p>Category: {selectedCategory.label}</p>}
                {dataQuery && <p>Query: {dataQuery}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSearch}>
                    Search
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalFilterProducts