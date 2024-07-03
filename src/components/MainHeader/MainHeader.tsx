"use client";
import { Container, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
import { mainAppTitle } from '../dataEnv';
import MainOffCanvas from './MainOffCanvas';
import {  useEffect, useState } from 'react';
import logoShop from '@/app/logoShop.png';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { MyContext } from '@/context/MyContext';
import { useRouter, usePathname } from 'next/navigation';
import { useMediaQuery } from "react-responsive";
import InstallButton from '../InstallButton/InstallButton';
//importaremos el icono de menu de tres puntos para el menu offcanvas
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineMenu } from 'react-icons/ai';


/* import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'; */

const MainHeader = () => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const { dataLocalStorage, initDataStorage } = useContext(MyContext);
  const {roleId} = dataLocalStorage;
  const [mainImage, setMainImage] = useState<string>(logoShop.src || '');
  const [mainTitle, setMainTitle] = useState(mainAppTitle);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  //recuperamos la ruta actual de la pagina
  
  useEffect(() => {
    //console.log('pathname(header):..',pathname);
    //determinar si el pathname incluye la palabra business-owner
    const path = pathname.includes('business-owner');
    if(path){
      setShowProfile(true);
    }else{
      setShowProfile(false);
    }

  }, [pathname])
  
  const isDesktop = useMediaQuery({
    query: "(min-width: 992px)",
  });
  //console.log('dataLocalStorage:..',dataLocalStorage);
  useEffect(() => {
    //console.log('dataLocalStorage:..',dataLocalStorage)
    if (dataLocalStorage?.email !== '' && dataLocalStorage?.email !== undefined && dataLocalStorage?.email !== null) {
      //console.log('dataLocalStorage:..',dataLocalStorage)
      if (dataLocalStorage.imageUrl !== undefined && dataLocalStorage.imageUrl !== null && dataLocalStorage.imageUrl !== '')
        setMainImage(dataLocalStorage.imageUrl);

      setMainTitle(`${dataLocalStorage.businessName}`);
    }else{
      setMainImage(logoShop.src);
      setMainTitle(mainAppTitle);
    }


  }, [dataLocalStorage]);


  useEffect(() => {
    //console.log('showOffCanvas:..',showOffCanvas);

  }, [showOffCanvas])

  const goPublish = () => {
    router.push('/publicar');
  }
  const handleCloseOffCanvas = () => {
    setShowOffCanvas(false);
    //console.log('Ocultar OffCanvas...')
  }
  const handleShowOffCanvas = () => {
    setShowOffCanvas(true);
    //console.log('Mostrar OffCanvas...')
  }

  

  return (
    <>
    {!showProfile &&
      <Navbar expand="lg" className="bg-light">
      <Container>
        <Navbar.Brand>
        <Link href='/' style={{ textDecoration: 'none' }} className='text-secondary'>
          <img src={mainImage} alt="Logo" width="30" height="30"
            className="d-inline-block align-top rounded me-2" />
          {mainTitle}
          </Link>
        </Navbar.Brand>
        <InstallButton />
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShowOffCanvas}>
          <SlOptionsVertical />
        </Navbar.Toggle>
        {!showOffCanvas && isDesktop &&
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex justify-content-end align-items-center gap-3 w-100">

              {dataLocalStorage && dataLocalStorage.email !== ''&&roleId==='businessOwner' &&
              <>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <AiOutlineMenu />
                </Dropdown.Toggle>
                <Dropdown.Menu className='bg-light'>

                <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Sales
                </Dropdown.Toggle>
                <Dropdown.Menu className='bg-light'>
                  <Link href={`/sales/show`} style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                  Show Sales 
                  </Link>
                  <Link href='/sales/addEdit' style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light' >
                  Add or Edit Sale</Link>
                  <Link href="/sales/delete" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                    Delete Sale
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Employees
                </Dropdown.Toggle>
                <Dropdown.Menu className='bg-light'>
                  <Link href={`/employee/show?email=${dataLocalStorage.email}`} style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                  Show Employees 
                  </Link>
                  <Link href='/employee/add' style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light' >
                  Add or Edit Employee</Link>
                  <Link href="/business-owner/delete" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                    Delete Employee
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Branches
                </Dropdown.Toggle>
                <Dropdown.Menu className='bg-light'>
                  <Link href={`/branch/show-branches`} style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                  Show Branches 
                  </Link>
                  <Link href='/branch/addEdit' style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light' >
                  Add or Edit Branch</Link>
                  <Link href="/business-owner/delete" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                    Delete Branch
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Products
                </Dropdown.Toggle>
                <Dropdown.Menu className='bg-light'>
                  <Link href={`/product/show-products`} style={{ textDecoration: 'none'}} className='d-block text-secondary p-1 btn btn-light'>
                  Show Products
                  </Link>
                  <Link href='/product/addEdit' style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light' >
                  Add or Edit Product</Link>
                  <Link href="/product/delete" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                    Delete Product
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Profile
                </Dropdown.Toggle>
                <Dropdown.Menu className='bg-light'>
                  
                  <Link href='/business-owner/profile' style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light' >
                  Edit Profile</Link>
                  <Link href={`/business-owner/show-profile?email=${dataLocalStorage.email}`} style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                    Show Profile
                  </Link>
                  <Link href="/business-owner/delete-profile" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                    Delete Profile
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
                  
                </Dropdown.Menu>
              </Dropdown>

              
              </>
              }

              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Sign
                </Dropdown.Toggle>
                <Dropdown.Menu className='bg-light'>

                {(dataLocalStorage?.email === '' || !dataLocalStorage) ?
                  <div className='bg-light'>
                    <Link href="/signin" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                      Sign In
                    </Link>
                    <Link href="/signup" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                      Sign Up
                    </Link>
                  </div>
                  :
                  <>
                    <Link href="/signout" style={{ textDecoration: 'none' }} className='d-block text-secondary p-1 btn btn-light'>
                      Sign Out
                    </Link>
                  </>
                }
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        }
        {showOffCanvas &&
          <MainOffCanvas showOffCanvas={showOffCanvas} handleCloseOffCanvas={handleCloseOffCanvas} />
        }

      </Container>
    </Navbar>
    }
    </>
  )
}

export default MainHeader