import { useState, FC } from 'react'
import { dataBusinessCategory } from './dataBusinessCategory'
import Select from 'react-select';

interface SelectBusinessCategoryProps {
    selectedBusinessCategory?: string,
    setSelectedBusinessCategory: (businessCategory: string) => void
}
const initOptions = dataBusinessCategory.map((item, index) => {
    return { value: item.name, label: item.name, index }
})
const initValue = { value: "choose", label: "choose", index: -1 };
const SelectBusinessCategory: FC<SelectBusinessCategoryProps> = ({ selectedBusinessCategory, setSelectedBusinessCategory }) => {
    const [dataOptions, setDataOptions] = useState(initOptions);
    const [valueSelect, setValueSelect] = useState(initValue);
    const handleChange = (selectedOption: { value: string, label: string, index: number } | null) => {

        if (selectedOption === null) return;

        //console.log(estado)
        setValueSelect(selectedOption);
        //setEstadoSelected(0);
        setSelectedBusinessCategory(selectedOption.value);
    }
    return (
        <div>
            <Select
                value={valueSelect}
                className="w-100 me-auto ms-auto my-2"
                options={dataOptions}
                placeholder="choose..."
                onChange={(option) => handleChange(option)}
            />
        </div>
    )
}

export default SelectBusinessCategory