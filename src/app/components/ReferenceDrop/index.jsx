import React from "react";

const ReferenceDrop = ({ referenceTable, selectedReference, setSelectedReference }) => {

  const handleChange = (e) => {
    setSelectedReference(e.target.value);
  };

  return (
    <select value={selectedReference} onChange={handleChange}>
      {referenceTable.length > 0 ? (
        referenceTable.map(reference => (
          <option key={reference.id} value={reference.id}>
            {reference.description}
          </option>
        ))
      ) : (
        <option value="" disabled>Loading...</option>
      )}
    </select>
  );
};

export default ReferenceDrop;
