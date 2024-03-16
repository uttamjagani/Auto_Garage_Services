import React, { useState } from 'react';
import './Book.css';
import axios from 'axios';

const Book = () => {
  // State for text field values
  const [textField1, setTextField1] = useState('');
  const [textField2, setTextField2] = useState('');

  // State for dropdown values
  const [dropdown1, setDropdown1] = useState('');
  const [dropdown2, setDropdown2] = useState('');

  // State for checkbox values
  const [checkboxes, setCheckboxes] = useState({
    fullService: false,
    washing: false,
    oilChanging: false,
    breakRepair: false,
    engineProblem: false,
    changeTire: false,
    changeSeatAndCover: false,
    accessoriesReplace: false,
    servicing: false,
    selling: false,
  });

  // State for date and time
  const [dateTime, setDateTime] = useState('');

  // Handle text field changes
  const handleTextField1Change = (e) => {
    setTextField1(e.target.value);
  };

  const handleTextField2Change = (e) => {
    setTextField2(e.target.value);
  };

  // Handle dropdown changes
  const handleDropdown1Change = (e) => {
    setDropdown1(e.target.value);
  };

  const handleDropdown2Change = (e) => {
    setDropdown2(e.target.value);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  // Handle date and time change
  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/bookSlot', {
        state: textField1,
        city: textField2,
        company: dropdown1,
        model: dropdown2,
        services: checkboxes,
        dateTime,
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('An error occurred while booking the slot.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="name">
        <p>Appointment Booking</p>
      </div>
      <div className='text-fields'>
        <label>
          Enter State :
          <input type="text" value={textField1} onChange={handleTextField1Change} />
        </label>
        <label>
          Enter City :
          <input type="text" value={textField2} onChange={handleTextField2Change} />
        </label>
      </div>
      <div className='dropdowns'>
        <label>
          Select Bike Company :
          <select value={dropdown1} onChange={handleDropdown1Change}>
            <option value="">Select</option>
            <option value="Honda">Honda</option>
            <option value="Tvs">Tvs</option>
          </select>
        </label>
        <label>
          Select Bike Model :
          <select value={dropdown2} onChange={handleDropdown2Change}>
            <option value="">Select</option>
            <option value="Splender">Splender</option>
            <option value="Splender Plus">Splender Plus</option>
          </select>
        </label>
      </div>
      <div className='checkboxes'>
        <div className='checkbox-line'>
          <label>
            Full Services
            <input
              type="checkbox"
              name="fullService"
              checked={checkboxes.fullService}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            Washing
            <input
              type="checkbox"
              name="washing"
              checked={checkboxes.washing}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            Oil Changing
            <input
              type="checkbox"
              name="oilChanging"
              checked={checkboxes.oilChanging}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <div className='checkbox-line'>
          <label>
            Break Repair
            <input
              type="checkbox"
              name="breakRepair"
              checked={checkboxes.breakRepair}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            Engine Problem
            <input
              type="checkbox"
              name="engineProblem"
              checked={checkboxes.engineProblem}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            Change Tire
            <input
              type="checkbox"
              name="changeTire"
              checked={checkboxes.changeTire}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <div className='checkbox-line'>
          <label>
            Changing Seat and Cover
            <input
              type="checkbox"
              name="changeSeatAndCover"
              checked={checkboxes.changeSeatAndCover}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            Accessories Replace
            <input
              type="checkbox"
              name="accessoriesReplace"
              checked={checkboxes.accessoriesReplace}
              onChange={handleCheckboxChange}
            />
          </label>
          <label>
            Servicing
            <input
              type="checkbox"
              name="servicing"
              checked={checkboxes.servicing}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <div className='checkbox-line'>
          <label>
            Selling
            <input
              type="checkbox"
              name="selling"
              checked={checkboxes.selling}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
      </div>
      <div className='date-time'>
        <label>
          Select Date and Time:
          <input type="datetime-local" value={dateTime} onChange={handleDateTimeChange} />
        </label>
      </div>
      <div className="bookbtn">
        <button type="submit">Book Slot</button>
      </div>
    </form>
  );
};

export default Book;
