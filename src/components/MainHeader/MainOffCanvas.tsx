"use client"
//import  { use } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { mainAppTitle } from '../dataEnv';
import logoShop from '@/app/logoShop.png';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext';
import { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/navigation';
import MainFooter from '@/components/MainFooter/MainFooter';


interface MainOffCanvasType {
  showOffCanvas: boolean;
  handleCloseOffCanvas: () => any;
}

const MainOffCanvas: FC<MainOffCanvasType> = ({ showOffCanvas, handleCloseOffCanvas }) => {
  const { dataLocalStorage } = useContext(MyContext);
  const { roleId } = dataLocalStorage;
  const [mainTitle, setMainTitle] = useState(mainAppTitle);
  const [mainImage, setMainImage] = useState<string>(logoShop.src || '');
  const router = useRouter();
  useEffect(() => {
    if (dataLocalStorage?.email !== '' && dataLocalStorage?.email !== undefined && dataLocalStorage?.email !== null) {

      if (dataLocalStorage.imageUrl !== undefined && dataLocalStorage.imageUrl !== null && dataLocalStorage.imageUrl !== '')
        setMainImage(dataLocalStorage.imageUrl);

      setMainTitle(`${dataLocalStorage.businessName}`);
    }else{
      setMainImage(logoShop.src);
      setMainTitle(mainAppTitle);
    }
  }, [dataLocalStorage]);

  const goPublish = () => {
    handleCloseOffCanvas();
    router.push('/publicar');

  }


  return (
    <Offcanvas show={showOffCanvas} onHide={handleCloseOffCanvas} responsive="lg">
      <Offcanvas.Header closeButton>
        <Link 
        onClick={handleCloseOffCanvas}
        href='/' style={{ textDecoration: 'none' }} className='text-secondary'>
          <Offcanvas.Title>
            <img src={mainImage} alt="Logo" width="30" height="30" className="d-inline-block align-top rounded me-2" />
            {mainTitle}
          </Offcanvas.Title>
        </Link>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="d-flex flex-column gap-4">
          {dataLocalStorage && dataLocalStorage?.email !== ''&&roleId==='businessOwner' &&
            <>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className='w-100'>
                  Sales
                </Dropdown.Toggle>
                <Dropdown.Menu className='bg-light'>
                  <Link onClick={handleCloseOffCanvas} href={`/sales/show`} style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                  Show Sales 
                  </Link>
                  <Link onClick={handleCloseOffCanvas} href='/sales/addEdit' style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light' >
                  Add or Edit Sale</Link>
                  <Link onClick={handleCloseOffCanvas} href="/sales/delete" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                    Delete Sale
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className='w-100'>
                  Employees
                </Dropdown.Toggle>
                <Dropdown.Menu className='bg-light'>
                  <Link onClick={handleCloseOffCanvas} href={`/employee/show?email=${dataLocalStorage.email}`} style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                  Show Employees 
                  </Link>
                  <Link onClick={handleCloseOffCanvas} href='/employee/add' style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light' >
                  Add or Edit Employee</Link>
                  <Link onClick={handleCloseOffCanvas} href="/business-owner/delete" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                    Delete Employee
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className='w-100'>
                  Branches
                </Dropdown.Toggle>
                <Dropdown.Menu className='bg-light'>
                  <Link onClick={handleCloseOffCanvas} href={`/branch/show-branches`} style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                  Show Branches 
                  </Link>
                  <Link onClick={handleCloseOffCanvas} href='/branch/addEdit' style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light' >
                  Add or Edit Branch</Link>
                  <Link onClick={handleCloseOffCanvas} href="/business-owner/delete" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                    Delete Branch
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic" className='w-100'>
                Products
              </Dropdown.Toggle>
              <Dropdown.Menu className='bg-light'>
              <Link onClick={handleCloseOffCanvas} href={`/product/show-products`} style={{ textDecoration: 'none'}} className='d-block text-secondary p-1 btn btn-light'>
                  Show Products
                  </Link>
                <Link onClick={handleCloseOffCanvas} href='/product/addEdit' style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light' >
                Add or Edit Product</Link>
                <Link onClick={handleCloseOffCanvas} href="/product/delete" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                  Delete Product
                </Link>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic" className='w-100'>
                Profile
              </Dropdown.Toggle>
              <Dropdown.Menu className='bg-light'>
                
                <Link onClick={handleCloseOffCanvas} href='/business-owner/profile' style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light' >
                Edit Profile</Link>
                <Link onClick={handleCloseOffCanvas} href={`/business-owner/show-profile?email=${dataLocalStorage.email}`} style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                  Show Profile
                </Link>
                <Link onClick={handleCloseOffCanvas} href="/business-owner/delete-profile" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                  Delete Profile
                </Link>
              </Dropdown.Menu>
            </Dropdown>
            </>
          }

          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic" className='w-100'>
              Sign
            </Dropdown.Toggle>
            <Dropdown.Menu className='bg-light'>

              {(dataLocalStorage?.email === '' || !dataLocalStorage) ?
                <div className='bg-light'>
                  <Link href="/signin" onClick={handleCloseOffCanvas} style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                    Sign In
                  </Link>
                  <Link href="/signup" onClick={handleCloseOffCanvas}  style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                    Sign Up
                  </Link>
                </div>
                :
                <>
                  <Link href="/signout" onClick={handleCloseOffCanvas} style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                    Sign Out
                  </Link>
                </>
              }
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <div className='mt-5'>
          <MainFooter handleCloseOffCanvas={handleCloseOffCanvas} />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}



export default MainOffCanvas