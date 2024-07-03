import {FC, useEffect, useState} from 'react'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions'
import 'react-data-table-component-extensions/dist/index.css';
import {Button} from 'react-bootstrap'
import {FaEye} from 'react-icons/fa'
import ModalDataSale from './ModalDataSale';
import { utils, writeFile } from 'xlsx';
//importamos el icono de excel de react-icons para exportar a excel
import {FaFileExcel} from 'react-icons/fa'

interface ITableSalesCash {
    dataSales: any;
}
const TableSalesCash:FC<ITableSalesCash> = ({dataSales}) => {
  const [salesCash, setSalesCash] = useState<any>([]);
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    //console.log('dataSales(TableSalesOnline):..',dataSales);
    if(dataSales.length > 0 && salesCash.length === 0) {
      const tempSales = dataSales.filter((sale:any) => sale.paymentMethod === 'cash');
      setSalesCash(tempSales);
    }
  },[dataSales])

  const exportToExcel = () => {
    const ws = utils.json_to_sheet(salesCash);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'SalesCash');
    writeFile(wb, 'SalesCash.xlsx');
  };

  const handleView = (id:string) => {
    console.log('id(handleView):..',id);
    //ubicamos la venta que tenga el id que recibimos
    const sale = salesCash.find((sale:any) => sale._id === id);
    setSelectedSale(sale);
    setShowModal(true);
  }
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
        fontsize: "18px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#7FADC0",
        color: "#fff",
        fontWeight: "bold",
        fontsize: "12px",
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        fontsize: "18px",
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const columns = [
    {
      name: 'ID',
      selector: (row:any) => row.id,
      sortable: true,
    },
    {
      name: 'Date',
      selector: (row:any) => row.date,
      sortable: true,
    },
    {
      name: 'Employee',
      selector: (row:any) => row.customer,
      sortable: true,
    },
    {
      name:'Status Payment',
      selector: (row:any) => row.status_payment,
      sortable: true,
    },
    {
      name: 'Total',
      selector: (row:any) => formatNumer(row.total),
      sortable: true,
    },
    {
      name: "Details",
      selector: (row:any) => row.null,
      sortable: true,

      cell: (row:any) => [
        <Button key={row.id} onClick={handleView.bind(this,row.id)}>
          <FaEye/>
        </Button>
      ],
    },
  ];

  const formatNumer= (num:number) => {
    //retornaremos el numero con dos decimales y el signo de pesos
    return `$${num.toFixed(2)}`
  }
  const data = salesCash.map((sale:any) => {
    return {
      id: sale._id,
      date: sale.createdAt,
      customer: sale.client,
      status_payment: sale.paymentStatus,
      total: sale.total,
    }
  })
  const tableData = {
    columns,
    data,
  };

  const myId = () => {
    return '_' + Math.random().toString(36).slice(2, 9);
  }


  return (
    <div>
      {showModal && (
        <ModalDataSale
          showModal={showModal}
          setShowModal={setShowModal}
          dataSelectedSale={selectedSale}
        />
      )}
      <Button variant='success' onClick={exportToExcel} className='d-block ms-auto me-auto my-2'>
        <FaFileExcel /> 
      </Button>
      <DataTableExtensions {...tableData} export={false} print={false}>
            <DataTable
              {...tableData}
              columns={columns}
              data={data}
              defaultSortAsc
              pagination
              /*  paginationPerPage={perPage} */
              highlightOnHover
              dense
              key={myId()}
              customStyles={customStyles}
            />
          </DataTableExtensions>
      </div>
  )
}

export default TableSalesCash