import {useEffect, FC, useState} from 'react'
import Select from 'react-select'


interface SelectMultipleRolesProps {
    rolesSelected: any;
    handleChangeRoles: (selectedOption: any) => void;
}

const listRoles = [
    'manager',
    'cashier',
    'supervisor',
    'handyman',
  ]

const SelectMultipleRoles:FC<SelectMultipleRolesProps> = ({
    rolesSelected,
    handleChangeRoles
}) => {
    const [valueSelected, setValueSelected] = useState<Array<any>|null>(null);
    useEffect(() => {
        console.log('rolesSelected(SelectMultipleRoles):..',rolesSelected);
        parseValueSelected(rolesSelected);
    }, [rolesSelected])

    const parseValueSelected = (rolesSelected:any) => {
        // rolesSelected contiene el array de Ids de los roles seleccionados
        // dataBranches contiene el array de objetos con los roles
        // Debemos retornar un array de objetos con los roles seleccionados en el formato que espera el componente Select
        const selectedRolesTemp = rolesSelected?.map((roleId:string) => {
            return { value: roleId, label: roleId}
        });
        setValueSelected([...selectedRolesTemp] || []);
    }

    const handleChange = (selectedOption:any) => {
        //console.log('selectedOption(Selecting Branches):..',selectedOption);
        const tempList = selectedOption.map((role:any) => role.value);
        
        handleChangeRoles([...tempList]);
    }
    
  return (
    <Select
        isMulti
        name="roles"
        options={listRoles.map((role) => {
          return {
            value: role,
            label: role,
          };
        })}
        className="basic-multi-select"
        classNamePrefix="select"
        value={valueSelected}
        onChange={handleChange}
    />
  )
}

export default SelectMultipleRoles