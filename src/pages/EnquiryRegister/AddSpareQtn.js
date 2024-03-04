import axios from "axios";
import React, { useEffect, useState } from "react";
import { alertError } from "../../components/Alert";
import formatPrice from "../../Utils/FormatPrice";

const AddSpareQtn = () => {
  const api = axios.create({
    baseURL: "http://localhost:5000", // Set your backend server address here
  });
  const btnClass =
    "px-5 py-2 border border-zinc-700 rounded-md m-2 text-sky-100 bg-zinc-700 hover:bg-zinc-600 cursor-pointer shadow-md shadow-zinc-500";
  const inputClass =
    "px-5 py-2 border border-sky-400 bg-sky-100 rounded-md m-2 w-60";

  const [addSpare, setAddSpare] = useState(true);
  const [parts, setParts] = useState([]);
  const [data, setData] = useState({
    qtnno: 0,
    custName: "",
    coPerson: "",
    cono: 0,
    coEmail: "",
    pumpModel: "",
    partName: "",
    partNo: "",
    moc: "",
    qty: 0,
    delTime: "",
    totalVal: 0,
    unit: "",
  });

  const fetchData = async () => {
    api.get(`api/v1/getqtnparts?qtnno=${data.qtnno}`).then((response) => {
      // console.log(response.data.qtn[0].parts)
      if (
        response.data.qtn &&
        response.data.qtn[0] &&
        response.data.qtn[0].parts
      ) {
        setParts(response.data.qtn[0].parts);
      }
    });
  };
  useEffect(() => {
    api.get(`api/v1/getqtnparts?qtnno=${data.qtnno}`).then((response) => {
      if (
        response.data.qtn &&
        response.data.qtn[0] &&
        response.data.qtn[0].parts
      ) {
        const data = response.data.qtn[0];
        setParts(data.parts);
        setData({
          qtnno: data.qtnno,
          custName: data.custName,
          cono: data.cono,
          coPerson: data.coPerson,
          coEmail: data.coEmail,
        });
      }
    });
  }, [data.qtnno]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleAddEntry = () => {
    setAddSpare(!addSpare);
    handleReset();
  };

  const handleReset = () => {
    fetchData();
    setData({
      ...data,
      pumpModel: "",
      partName: "",
      partNo: "",
      moc: "",
      qty: 0,
      delTime: "",
      totalVal: 0,
      unit: "",
    });
  };

  const handleAddSpare = async () => {
    // console.log(data.qtnno)
    if (data.qtnno && data.qtnno !== 0) {
      const response = await fetch("http://localhost:5000/api/v1/addqtn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qtnno: data.qtnno,
          custName: data.custName,
          coPerson: data.coPerson,
          cono: data.cono,
          coEmail: data.coEmail,
          parts: [
            {
              pumpModel: data.pumpModel,
              partName: data.partName,
              partNo: data.partNo,
              moc: data.moc,
              qty: data.qty,
              delTime: data.delTime,
              totalVal: data.totalVal,
              unit: data.unit,
            },
          ],
          mailDate: "",
          desc: "",
          poDate: "",
          followup: "",
          remark: "",
        }),
      });
      handleReset();
    } else {
      alertError("Quotation no is required");
    }
    // console.log(response)
  };

  return (
    <div className="">
      <div className="bg-zinc-900 border border-black fixed z-[-1] top-0 left-0 h-screen w-full shadow-xl "></div>
      <div className="border border-sky-400 shadow-xl shadow-sky-500 rounded-2xl w-full mx-auto my-8 pb-8 bg-sky-300">
        <div className="my-4 text-center font-bold text-5xl text-zinc-900 italic">
          Create Quotion
        </div>
        <div>
          <div>
            <div className="grid grid-cols-3 px-20">
              <div className=" grid grid-cols-3">
                <label htmlFor="qtnno" className="text-lg font-medium pt-4">
                  Quotation no:{" "}
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="eg: 111111"
                  value={data.qtnno}
                  onChange={handleInputChange}
                  name="qtnno"
                  id="qtnno"
                />
              </div>
              <div className=" grid grid-cols-3">
                <label htmlFor="custName" className="text-lg font-medium pt-4">
                  Customer Name:{" "}
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="eg: John Deo"
                  value={data.custName}
                  onChange={handleInputChange}
                  name="custName"
                  id="custName"
                />
              </div>
              <div className=" grid grid-cols-3">
                <label htmlFor="coPerson" className="text-lg font-medium pt-4">
                  Contact Person:{" "}
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="eg: John Deo"
                  value={data.coPerson}
                  onChange={handleInputChange}
                  name="coPerson"
                  id="coPerson"
                />
              </div>
              <div className=" grid grid-cols-3">
                <label htmlFor="cono" className="text-lg font-medium pt-4">
                  Contact no:{" "}
                </label>
                <input
                  type="number"
                  className={inputClass}
                  placeholder="eg: 9999999999"
                  value={data.cono}
                  onChange={handleInputChange}
                  name="cono"
                  id="cono"
                />
              </div>
              <div className=" grid grid-cols-3">
                <label htmlFor="coEmail" className="text-lg font-medium pt-4">
                  Contact Email:{" "}
                </label>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="eg: johndeo@gmail.com"
                  value={data.coEmail}
                  onChange={handleInputChange}
                  name="coEmail"
                  id="coEmail"
                />
              </div>
            </div>
          </div>
          <div
            className={`${btnClass} w-fit absolute right-5`}
            onClick={handleAddEntry}
          >
            {" "}
            Add Entry
          </div>
          <div className="flex mt-16">
            <div className="text-center text-lg font-medium border border-sky-700 p-2 w-24">
              {" "}
              Sr. no.
            </div>
            <div className="grid grid-cols-9 w-full">
              {/* <div className='text-center text-lg font-medium border border-sky-700 p-2'>Sr. no.</div> */}
              <div className="text-center text-lg font-medium border border-sky-700">
                Part Name
              </div>
              <div className="text-center text-lg font-medium border border-sky-700">
                Pump Model
              </div>
              <div className="text-center text-lg font-medium border border-sky-700">
                Part No.
              </div>
              <div className="text-center text-lg font-medium border border-sky-700">
                MOC
              </div>
              <div className="text-center text-lg font-medium border border-sky-700">
                Delivery Weeks
              </div>
              <div className="text-center text-lg font-medium border border-sky-700">
                Total Spare Cost
              </div>
              <div className="text-center text-lg font-medium border border-sky-700">
                Quantity
              </div>
              <div className="text-center text-lg font-medium border border-sky-700">
                Unit
              </div>
              <div className="text-center text-lg font-medium border border-sky-700">
                Total Amount
              </div>
            </div>
          </div>
          {console.log(parts)}
          {parts &&
            parts.map((part, index) => (
              <div className="flex">
                <div className="text-center text-lg font-medium border border-sky-700 p-2 w-24">
                  {index + 1}{" "}
                </div>
                <div className="grid grid-cols-9 w-full">
                  <div className="text-center text-lg font-medium border border-sky-700">
                    {part.partName}
                  </div>
                  <div className="text-center text-lg font-medium border border-sky-700">
                    {part.pumpModel}
                  </div>
                  <div className="text-center text-lg font-medium border border-sky-700">
                    {part.partNo}
                  </div>
                  <div className="text-center text-lg font-medium border border-sky-700">
                    {part.moc}
                  </div>
                  <div className="text-center text-lg font-medium border border-sky-700">
                    {part.delTime}
                  </div>
                  <div className="text-center text-lg font-medium border border-sky-700">
                    {formatPrice(part.totalVal)}
                  </div>
                  <div className="text-center text-lg font-medium border border-sky-700">
                    {part.qty}
                  </div>
                  <div className="text-center text-lg font-medium border border-sky-700">
                    {part.unit}
                  </div>
                  <div className="text-center text-lg font-medium border border-sky-700">
                    {formatPrice(part.totalVal * part.qty)}
                  </div>
                </div>
              </div>
            ))}

          {addSpare && (
            <div className="flex">
              <div className="border border-sky-700 text-center bg-sky-100 p-2 w-24"></div>
              <div className="grid grid-cols-9 w-full">
                <input
                  type="text"
                  className="border border-sky-700 text-center bg-sky-100 p-2"
                  placeholder="eg: Shaft"
                  value={data.partName}
                  onChange={handleInputChange}
                  name="partName"
                  id="partName"
                />
                <input
                  type="text"
                  className="border border-sky-700 text-center bg-sky-100 p-2"
                  placeholder="eg: ETN"
                  value={data.pumpModel}
                  onChange={handleInputChange}
                  name="pumpModel"
                  id="pumpModel"
                />
                <input
                  type="text"
                  className="border border-sky-700 text-center bg-sky-100 p-2"
                  placeholder="eg: 502"
                  value={data.partNo}
                  onChange={handleInputChange}
                  name="partNo"
                  id="partNo"
                />
                <input
                  type="text"
                  className="border border-sky-700 text-center bg-sky-100 p-2"
                  placeholder="eg: Bronze"
                  value={data.moc}
                  onChange={handleInputChange}
                  name="moc"
                  id="moc"
                />
                <input
                  type="text"
                  className="border border-sky-700 text-center bg-sky-100 p-2"
                  placeholder="eg: Ex.Stock"
                  value={data.delTime}
                  onChange={handleInputChange}
                  name="delTime"
                  id="delTime"
                />
                <input
                  type="number"
                  className="border border-sky-700 text-center bg-sky-100 p-2"
                  placeholder="eg: 999999"
                  value={data.totalVal}
                  onChange={handleInputChange}
                  name="totalVal"
                  id="totalVal"
                />
                <input
                  type="number"
                  className="border border-sky-700 text-center bg-sky-100 p-2"
                  placeholder="eg: 99"
                  value={data.qty}
                  onChange={handleInputChange}
                  name="qty"
                  id="qty"
                />
                <input
                  type="text"
                  className="border border-sky-700 text-center bg-sky-100 p-2"
                  placeholder="eg: Nos/ set"
                  value={data.unit}
                  onChange={handleInputChange}
                  name="unit"
                  id="unit"
                />
                <div className="border border-sky-700 text-center bg-sky-100 p-2">
                  {data.totalVal * data.qty}
                </div>
              </div>
            </div>
          )}
          {addSpare && (
            <div
              className={`${btnClass} w-fit relative right-0`}
              onClick={handleAddSpare}
            >
              Done
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSpareQtn;
