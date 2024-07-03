"use client"
import { useEffect, useState, FC } from 'react'
import  Select  from 'react-select';
import { cities, states } from '../../lib/dataCities';
//import { useMediaQuery } from 'react-responsive';


interface SelectCityProps {
    state: string;
    citySelected?: string;
    handleChangeCity: (value: string) => void;
}


const initOptions = [ { value: "chocolate", label: "Chocolate" },
{ value: "strawberry", label: "Strawberry" },
{ value: "vanilla", label: "Vanilla" },
];
const initValue = { value: "choose", label: "choose" };

const SelectCity: FC<SelectCityProps>  = ({state, citySelected ,handleChangeCity }) => {
    const[dataOptions,setDataOptions]=useState(initOptions);
    const[valueSelect,setValueSelect]=useState(initValue);

    
    useEffect(()=>{
        //console.log('cities of state:...',state)
        if(citySelected){
            setValueSelect({ value: citySelected, label: citySelected });
        }else setValueSelect(initValue);
        handleChangeCity('choose');
        formatDataOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state])
    
    
    const formatDataOptions = () => {
        //obtener el indice del estado seleccionado
        const stateIndex = states.findIndex((item) => item === state);
        const data = cities[stateIndex]?.map((item,index) => {
            return { value: item, label: item }
        })
        setDataOptions(data);
    }
    const handleChange = (selectedOption:{value:string,label:string} | typeof initValue | null) => {

        if(selectedOption === null){
            setValueSelect(initValue);
            return;
        }
        //console.log(estado)
        
        setValueSelect(selectedOption);
        handleChangeCity(selectedOption.value);
    }
  return (
    <div><Select
    value={valueSelect}
    className="w-100 me-auto ms-auto my-2"
    options={dataOptions}
    placeholder="choose..."
    onChange={(option)=>handleChange(option)}
    />
    
    </div>
  )
}

export default SelectCity