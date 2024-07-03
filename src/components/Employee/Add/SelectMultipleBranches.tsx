
import { useState, useEffect, FC } from 'react'
import { useContext } from 'react'
import { MyContext } from '@/context/MyContext'
import { getBranchesByBusinessOwnerEmail } from '@/api/apiBranches';
import Select from 'react-select'


interface SelectMultipleBranchesProps {
    branchesSelected: any;
    handleChangeBranches: (selectedOption: any) => void;
}

const SelectMultipleBranches:FC<SelectMultipleBranchesProps> = ({
    branchesSelected,
    handleChangeBranches
}) => {
    const { dataLocalStorage, } = useContext(MyContext);
    const [dataBranches, setDataBranches] = useState([]);
    const [valueSelected, setValueSelected] = useState<Array<any>|null>(null);

    useEffect(() => {
        getBranches();
    }, [])

    useEffect(() => {
        parseValueSelected(branchesSelected);
    }, [branchesSelected])

    const parseValueSelected = (branchesSelected:any) => {
        // branchesSelected contiene el array de Ids de las sucursales seleccionadas
        // dataBranches contiene el array de objetos con las sucursales
        // Debemos retornar un array de objetos con las sucursales seleccionadas en el formato que espera el componente Select
        
        const selectedBranchesTemp = branchesSelected.map((branchId:string) => {
            return dataBranches.find((branch:any) => branch.value === branchId);
                        });

        setValueSelected([...selectedBranchesTemp] || []);

    }

    const getBranches = async() => {
        try {
            const result = await getBranchesByBusinessOwnerEmail(dataLocalStorage.email);
            //console.log('result(dataBranches):..',result);
            const {docs} = result;
            if(docs.length > 0){
                const data = docs.map((doc:any) => {
                    return {
                        value: doc._id,
                        label: `${doc.businessName} - ${doc.legalName}`
                    }
                });
                //console.log('dataBranches:..',data);
                setDataBranches(data);
            }

        } catch (error) {
            console.log('error:..',error);       
        }
    }

    const handleChange = (selectedOption:any) => {
        //console.log('selectedOption(Selecting Branches):..',selectedOption);
        const tempList = selectedOption.map((branch:any) => branch.value);
        
        handleChangeBranches([...tempList]);
    }

  return (
    <div>
      <Select
        isMulti
        name="branches"
        options={dataBranches}
        className="basic-multi-select"
        classNamePrefix="select"
        value={valueSelected}
        onChange={handleChange}
      />
    </div>
  )
}

export default SelectMultipleBranches