"use client";
import { useState, useEffect } from "react";
import { useContext } from "react";
import MyContext from "@/context/MyContext";
import { getSales } from "@/api/apiSales";
import { Form } from "react-bootstrap";
import TableSalesOnline from "./TableSalesOnline";
import TableSalesCash from "./TableSalesCash";

const ShowSales = () => {
  const { dataLocalStorage } = useContext(MyContext);
  const [dataSales, setDataSales] = useState<any>([]);
  const [typeSales, setTypeSales] = useState<string>("online");

  useEffect(() => {
    console.log("dataLocalStorage:..", dataLocalStorage);
    if (dataLocalStorage.email && dataSales.length === 0) {
      getDataSales();
    }
  }, [dataLocalStorage]);

  const getDataSales = async () => {
    try {
      const result = await getSales(dataLocalStorage.access_token);
      console.log("result:..", result);
      if(result?.length > 0) {
        setDataSales(result);
      }
    } catch (error) {
      console.log("error:..", error);
    }
  };

  return (
    <div>
      <h2 className="alert alert-info text-center fs-3">Show Sales:</h2>
      <div className="TYPESALES d-flex justify-content-center align-items-center w-100 my-3">
        <Form.Check
          inline
          label="Online"
          value="online"
          checked={typeSales === "online"}
          onChange={(e) => setTypeSales(e.target.value)}
          name="group1"
          type="radio"
          id={`inline-radio-1`}
        />
        <Form.Check
          inline
          label="Store"
          value="store"
          checked={typeSales === "store"}
          onChange={(e) => setTypeSales(e.target.value)}
          name="group1"
          type="radio"
          id={`inline-radio-2`}
        />
      </div>
      {dataSales.length === 0 ? (
        <h3 className="alert alert-warning text-center fs-3">
          No data to show
        </h3>
      ) : (
        <div>
          {typeSales === "online" ? (
            <TableSalesOnline dataSales={dataSales} />
          ) : (
            <TableSalesCash dataSales={dataSales} />
          )}
        </div>
      )}
    </div>
  );
};

export default ShowSales;
