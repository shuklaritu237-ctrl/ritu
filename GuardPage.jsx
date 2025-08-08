import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { SearchRes } from "../Features/SearchRes";

export const GuardPage = () => {
  const data = useLoaderData().filter((curEle) => curEle.block);
  
  const nameRef = useRef();
  const phoneRef = useRef();

  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedFlat, setSelectedFlat] = useState("");

  const blocks = [...new Set(data.map(item => item.block))];

  const flatsForSelectedBlock = selectedBlock 
    ? data.find(item => item.block === selectedBlock)?.flats || []
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!capturedImage) {
      alert("Please capture image before submitting.");
      return;
    }

    if (!selectedBlock || !selectedFlat) {
      alert("Please select both block and flat number");
      return;
    }

    // Format data properly before sending
    const visitorData = {
      name: nameRef.current.value.trim(),
      phone: formatPhoneNumber(phoneRef.current.value),
      block: selectedBlock,
      flat: Number(selectedFlat), // Convert to number
      time: new Date().toLocaleTimeString('en-IN', { hour12: false }),
      date: formatDate(new Date()),
    };

    try {
      const res = await fetch("http://localhost:5000/visitors/Add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitorData),
      });

      if (res.ok) {
        resetForm();
        alert("Visitor Added Successfully");
      } else {
        const error = await res.json();
        alert(error.msg || "Failed to submit visitor info");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error occurred while submitting visitor info.");
    }
  };

  // Helper functions for data formatting
  const formatPhoneNumber = (phone) => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    // Convert to number (if needed) or keep as string
    return digits.length <= 10 ? digits : phone;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    // Or for Indian format:
    // return new Intl.DateTimeFormat('en-IN').format(date);
  };

  const resetForm = () => {
    setCapturedImage(null);
    nameRef.current.value = "";
    phoneRef.current.value = "";
    setSelectedBlock("");
    setSelectedFlat("");
  };

  return (
    <div className="guard-page">
      <h1>Add Visitors :</h1>
      <form onSubmit={handleSubmit} >
        
        <input 
          placeholder="Visitor Name" 
          ref={nameRef} 
          required 
        />
        
        <input 
          placeholder="Phone Number" 
          ref={phoneRef} 
          required 
          type="tel"
          pattern="[0-9]{10}"
          title="10 digit phone number"
        />
        
        <select
          value={selectedBlock}
          onChange={(e) => {
            setSelectedBlock(e.target.value);
            setSelectedFlat("");
          }}
          required
        >
          <option value="">Select Block</option>
          {blocks.map((block) => (
            <option key={block} value={block}>
              {block}
            </option>
          ))}
        </select>
        
        <select
          value={selectedFlat}
          onChange={(e) => setSelectedFlat(e.target.value)}
          disabled={!selectedBlock}
          required
        >
          <option value="">Select Flat Number</option>
          {flatsForSelectedBlock.map((flat) => (
            <option key={flat} value={flat}>
              {flat}
            </option>
          ))}
        </select>
        
        <button type="submit">Submit</button>
      </form>

      <div>
        <SearchRes />
      </div>
    </div>
  );
};