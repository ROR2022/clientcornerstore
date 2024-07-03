"use client"
import { useEffect, useState, FC } from 'react'
import  Select  from 'react-select';
import { states } from '../../lib/dataCities';

interface SelectStateProps {
    stateSelected?: string,
    handleChangeState: (state:string)=> void
}


const initOptions = [ { value: "chocolate", label: "Chocolate" },
{ value: "strawberry", label: "Strawberry" },
{ value: "vanilla", label: "Vanilla" },
];
const initValue = { value: "choose", label: "choose" };

const SelectState: FC<SelectStateProps> = ({ stateSelected,handleChangeState }) => {
    const[dataOptions,setDataOptions]=useState(initOptions);
    const[valueSelect,setValueSelect]=useState(initValue);
    useEffect(() => {
        //console.log('stateSelected(SelectStateComponent):', stateSelected);
        formatDataOptions()
        if(stateSelected){
            setValueSelect({ value: stateSelected, label: stateSelected });
        }
    }, [stateSelected])
    const formatDataOptions = () => {
        const data = states.map((item,index) => {
            return { value: item, label: item, index }
        })
        setDataOptions(data)
    }
    const handleChange = (selectedOption:{value:string,label:string} | null) => {

        if (selectedOption===null) return;

        //console.log(estado)
        setValueSelect(selectedOption);
        //setEstadoSelected(0);
        handleChangeState(selectedOption.value);
    }
  return (
    <div>
        <Select
        value={valueSelect}
        className="w-100 me-auto ms-auto my-2"
        options={dataOptions}
        placeholder="choose..."
        onChange={(option)=>handleChange(option)}
        />
    </div>
  )
}

export default SelectState