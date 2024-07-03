"use client";
import {FC,useState,useEffect} from 'react'
import Select from 'react-select'

interface ISelectItems {
    dataItems: any;
    itemSelected: any;
    setItemSelected: any;
    placeholder: string;
    }

const SelectItems:FC<ISelectItems> = ({dataItems,itemSelected, setItemSelected, placeholder}) => {
  return (
    
        <Select
            options={dataItems}
            value={itemSelected}
            onChange={(selectedOption: any) => {
                setItemSelected(selectedOption);
            }}
            placeholder={placeholder}
        />

  )
}

export default SelectItems