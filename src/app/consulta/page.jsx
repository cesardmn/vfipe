'use client'

import { useEffect, useState } from "react"
import Skeleton from '@/app/components/Skeleton'
import styles from './styles.module.css'
import { referenceUpdate } from "@/services/FetchData"
import ReferenceDrop from "../components/ReferenceDrop"
import TypeButtons from "../components/TypeButtons"

const Consulta = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [referenceTable, setReferenceTable] = useState([]);
  const [selectedReference, setSelectedReference] = useState('');

  const handleReference = async () => {
    const data = await referenceUpdate('/api/referencia');
    setReferenceTable(data || []);
    if (data.length > 0) {
      setSelectedReference(data[0].id);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    handleReference();
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <ReferenceDrop
            referenceTable={referenceTable}
            selectedReference={selectedReference}
            setSelectedReference={setSelectedReference}
          />

          <TypeButtons />
        </>
      )}
    </div>
  )
}

export default Consulta;
