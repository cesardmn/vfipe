import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import { useStep } from '@/app/providers/StepProvider';
import { referenceUpdate } from '@/services/FetchData';
import Skeleton from "../Skeleton";

const ReferenceDrop = () => {
  const { step, setStep } = useStep();
  const [referenceList, setReferenceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleReference = async () => {
    try {
      const data = await referenceUpdate();
      setReferenceList(data || []);
      if (data && data.length > 0) {
        setStep(prevStep => ({ ...prevStep, refId: data[0].id }));
      }
    } catch (error) {
      console.error("Erro ao buscar referências:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const selectedRefId = e.target.value;
    setStep(prevStep => ({
      ...prevStep,
      refId: selectedRefId,
      typeId: '',
      brandId: '',
    }));
  };

  useEffect(() => {
    handleReference();
  }, []);

  return (
    <div >
      {
        loading ? (
          <Skeleton />
        ) : (
          <>
            <label htmlFor="referenceSelect">Tabela referência:</label>
            <select
              id="referenceSelect"
              onChange={handleChange}
              disabled={loading}
              className={styles.drop}
            >
              {
                referenceList.map(reference => (
                  <option key={reference.id} value={reference.id}>
                    {reference.description}
                  </option>
                ))
              }
            </select>

            <pre>{JSON.stringify(step)}</pre>
          </>
        )
      }

    </div>
  );
};

export default ReferenceDrop;
