import React from "react";
import styles from './styles.module.css'

const ReferenceDrop = ({ referenceTable, selectedReference, setSelectedReference }) => {

  const handleChange = (e) => {
    setSelectedReference(e.target.value);
  };

  return (
    <select 
      className={styles.drop}
      value={selectedReference} 
      onChange={handleChange}>
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
