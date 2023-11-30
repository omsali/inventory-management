import React from 'react'

const Dropdown = ({ values, setFunction, selectedValue }) => {

    const handleChange = (event) => {
        setFunction(event.target.value);
    }

    return (
        <div className='m-2'>
            <label htmlFor="Pump Type">Pump Type: </label>
            <select className='px-5 py-2 border border-black rounded-md m-2' id='Pump Type' onChange={handleChange} value={selectedValue}>
            <option value="">Select Pump Type</option>
            {values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
    )
}

export default Dropdown