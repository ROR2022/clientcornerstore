// src/context/MyContext.js
"use client";
"use context";
import { createContext, useEffect } from 'react';
import { useLocalStorage } from "usehooks-ts";
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_SHOPPING_CART } from '@/components/dataEnv';



const initDataStorage = {
  _id: '',
  userRole:'',
  roleId: '',
  businessOwner: '',
  businessName: '',
  businessCategory: '',
  branchCategory: '',
  slogan: '',
  shortDescription: '',
  longDescription: '',
  email: '',
  password: '',
  imageUrl: '',
  legalName: '',
  shortAddress: '',
  phone: '',
  completeAddress: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  webSite: '',
  facebook: '',
  instagram: '',
  twitter: '',
  access_token: '',
  dataPayment: null,
  statusPayment: '',
  completeShoppingNumber: 0,
  branch: []
};



//const initDataStorageShopppingCart = [];

export const MyContext = createContext(
  {
    dataLocalStorage: initDataStorage,
    setDataLocalStorage: (data:any) => {},
    initDataStorage,
    dataLocalStorageShoppingCart: [],
    setDataLocalStorageShoppingCart: (data:any) => {},
  }
);




export const MyProvider = ({ children }: { children: React.ReactNode }) => {
    const [dataLocalStorage, setDataLocalStorage] = useLocalStorage(
        LOCAL_STORAGE_KEY || 'tempDataLocalStorage',
        initDataStorage
      );
      const [dataLocalStorageShoppingCart, setDataLocalStorageShoppingCart] = useLocalStorage(
        LOCAL_STORAGE_KEY_SHOPPING_CART || 'tempDataLocalStorageShoppingCart',
        []
      );
  //const [state, setState] = useState('default value');
  useEffect(() => {
    //console.log('dataLocalStorage:...',dataLocalStorage);
    //setDataLocalStorage(dataLocalStorage);
  }, [dataLocalStorage]);

  return (
    <MyContext.Provider value={{ 
      dataLocalStorage, setDataLocalStorage, initDataStorage,
      dataLocalStorageShoppingCart, setDataLocalStorageShoppingCart 
      }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
