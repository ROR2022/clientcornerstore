import {useEffect,useState} from 'react'
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap'
import { useContext } from 'react';
import MyContext from '@/context/MyContext';
import { getDataBusinessOwnerById} from '@/api/apiUsers';
import logoStore from '@/components/assets/images/logoStore.png';
import Link from 'next/link';

const NavBarSales = () => {
    const [dataBusinessOwner, setDataBusinessOwner] = useState<any>({});
    const {dataLocalStorage} = useContext(MyContext);
    useEffect(() => {
        //console.log('dataBusinessOwner:..',dataBusinessOwner);
    },[dataBusinessOwner])
    useEffect(() => {
        getBusinessOwner(dataLocalStorage.businessOwner);
        //console.log('logoStore:..',logoStore)
    },[]);

    const getBusinessOwner= async (id: string) => {
        try {
            const response = await getDataBusinessOwnerById(id);
            //console.log('response:..',response);
            setDataBusinessOwner(response);
        } catch (error) {
            console.log('error:..',error);
        }
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
            <img
                src={dataBusinessOwner?.imageUrl || logoStore.src}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="logoStore"
            />{' '}
            {dataBusinessOwner?.businessName || 'Store'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='' />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
          <Dropdown className="w-100">
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="w-100"
              >
                Sign
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-light">
                {dataLocalStorage?.email === "" || !dataLocalStorage ? (
                  <div className="bg-light">
                    <Link
                      href={`/signin?businessOwner=${dataBusinessOwner.email}`}
                      style={{ textDecoration: "none" }}
                      className="d-block text-secondary p-1 btn btn-light"
                    >
                      Sign In
                    </Link>
                    <Link
                      href={`/signup/client?businessOwner=${dataBusinessOwner.email}&user=client`}
                      style={{ textDecoration: "none" }}
                      className="d-block text-secondary p-1 btn btn-light"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/signout"
                      style={{ textDecoration: "none" }}
                      className="d-block text-secondary p-1 btn btn-light"
                    >
                      Sign Out
                    </Link>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}

export default NavBarSales