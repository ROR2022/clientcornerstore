//este componente es el que se encarga de recuperar las branches del businessOwner

import { FC, useEffect, useState } from 'react'
import { getBranchesByBusinessOwnerEmail } from '@/api/apiBranches';
import Select from 'react-select';
import { getEmployees } from '@/api/apiEmployees';

interface SelectBranchProps {
    emailBusinessOwner: string;
    dataIdBranch: string;
    setDataIdBranch: (dataIdBranch: string) => void;
    isEmployee?: boolean;
}

interface SelectOptions {
    value: string;
    label: string;
}

const initValue = { value: "choose", label: "choose" };
const SelectBranch: FC<SelectBranchProps> = ({ emailBusinessOwner, dataIdBranch, setDataIdBranch, isEmployee }) => {
    //const [dataBranches, setDataBranches] = useState<any>([]);
    const [dataOptions, setDataOptions] = useState<Array<SelectOptions>>([]);
    const [valueSelect, setValueSelect] = useState(initValue);

    useEffect(() => {
        if(isEmployee!==true){
            getDataBranches('');
        }else{
            getDataEmployees();
        }
        
    }, [])

    useEffect(() => {
        if (dataIdBranch !== '') {
            //buscamos el value por el dataIdBranch en el array dataOptions
            const data = dataOptions.find((option) => option.value === dataIdBranch);
            if (data) {
                setValueSelect(data);
            }else{
                console.log('dataIdBranch not found in dataOptions');
                setValueSelect(initValue);
            }
        }else{
            setValueSelect(initValue);
        }
    }, [dataIdBranch])

    const getDataBranches = async (query: string) => {
        try {
            const result = await getBranchesByBusinessOwnerEmail(emailBusinessOwner, query);
            //console.log('result(branches by business owner):..', result);
            const { docs } = result;
            if (docs) {
                //setDataBranches(docs);
                const data = docs.map((branch: any) => {
                    return {
                        value: branch._id,
                        label: `${branch.businessName} - ${branch.legalName}`
                    }
                });
                setDataOptions(data);
            }
        } catch (error) {
            console.log('error:..', error);
        }
    }

    const getDataEmployees = async () => {
        try {
            const result = await getEmployees(emailBusinessOwner);
            console.log('result(Employees by business owner):..', result);
            const docs = result;
            if (docs) {
                //setDataBranches(docs);
                const data = docs.map((branch: any) => {
                    return {
                        value: branch._id,
                        label: `${branch.roleId} - ${branch.businessName} ${branch.legalName}`
                    }
                });
                setDataOptions(data);
            }
        } catch (error) {
            console.log('error:..', error);
        }
    }



    const handleChange = (selectedOption: { value: string, label: string } | typeof initValue | null) => {

        if (selectedOption === null) {
            setValueSelect(initValue);
            return;
        }
        //console.log(estado)

        setValueSelect(selectedOption);
        //handleChangeCity(selectedOption.value);
        setDataIdBranch(selectedOption.value);
    }




    return (
        <div>
            <Select
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? 'grey' : 'red',
                    }),
                }}
                value={valueSelect}
                className="w-100 me-auto ms-auto my-2"
                options={dataOptions}
                placeholder="choose branch..."
                onChange={(option) => handleChange(option)}
            />
        </div>
    )
}

export default SelectBranch