"use client";

//import Image from "next/image";
//import styles from "./page.module.css";
import MainWelcome from "@/components/MainWelcome/MainWelcome";
import StoresCatalog from "@/components/StoresCatalog/StoresCatalog";
import { useEffect, FC, useState } from "react";
import { useContext } from "react";
import MyContext from "@/context/MyContext";
import { useRouter } from "next/navigation";
import { getDataBusinessOwnerById } from "@/api/apiUsers";
import { Spinner } from "react-bootstrap";
import { useSearchParams } from "next/navigation";

const PreHome: FC = () => {
  const { dataLocalStorage } = useContext(MyContext);
  const { roleId } = dataLocalStorage;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const emailBusinessOwner = searchParams.get("businessOwner")||'';

  useEffect(() => {
    const {businessOwner} = dataLocalStorage;
    console.log('roleId:..', roleId); 
    if (roleId==='client' ) {
      if(emailBusinessOwner==='' || emailBusinessOwner===null || emailBusinessOwner===undefined || emailBusinessOwner==='null' || emailBusinessOwner==='undefined'){
        getDataBusinessOwner(businessOwner, false)
      }else{
        router.push(`/business-owner/show-profile?email=${emailBusinessOwner}`);
      }
      
      //getDataBusinessOwner(businessOwner);
    }
    const listEmployee = ['manager', 'cashier', 'handyman', 'supervisor'];
    const isEmployee = listEmployee.find((item) => item === roleId);
    //console.log('isEmployee:..', isEmployee);
    //console.log('emailBusinessOwner:..', emailBusinessOwner);
    if(isEmployee){
      if(emailBusinessOwner==='' || emailBusinessOwner===null || emailBusinessOwner===undefined || emailBusinessOwner==='null' || emailBusinessOwner==='undefined'){
        getDataBusinessOwner(businessOwner, true)
      }else{
        //console.log('Se supone que si hay un emailBusinessOwner:..', emailBusinessOwner);
        router.push(`/business-owner/sale-format?businessOwner=${emailBusinessOwner}`);
      }
      
    }
  }, []);

  const getDataBusinessOwner = async (businessOwner: string, isEmployee: boolean) => {
    console.log('businessOwner:..', businessOwner);
    try {
      setLoading(true);
      const result = await getDataBusinessOwnerById(businessOwner);
      console.log('result:..', result);
      setLoading(false);
      const emailBusinessOwnerResult = result?.email;
      if (emailBusinessOwnerResult) {
        if(isEmployee===true){
          //console.log('isEmployee(se supone que aqui deberiamos de estar):..', emailBusinessOwnerResult);
          router.push(`/business-owner/sale-format?businessOwner=${emailBusinessOwnerResult}`);
        }else{
          router.push(`/business-owner/show-profile?email=${emailBusinessOwnerResult}`);
        }
        
        //return emailBusinessOwner;
      }
    } catch (error) {
      console.log('error:..', error);
    }
  };

  return (
    <>
    {loading? 
    <div style={{height:'100vh'}} className="d-flex justify-content-center align-items-center my-4 w-100 h-100">
      <Spinner style={{width:'100px', height:'100px'}} variant="primary" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
    :
    <div>
      <StoresCatalog />
      <MainWelcome />
    </div>
    }
    
    </>
  );
}

export default function Home() {
  return (
    <div>
      <PreHome />
    </div>
  );
}
