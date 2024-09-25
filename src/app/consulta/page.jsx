'use client'

import { useEffect, useState } from "react"

import Skeleton from '@/app/components/Skeleton'

import styles from './styles.module.css'
import { fetchData, referenceUpdate } from "@/services/FetchData"

const Consulta = () => {

  const [isLoading, setIsLoading] = useState(true)

  const handleReference = async () => {

    const data = await referenceUpdate('/api/referencia')
    setIsLoading(false)
  }


  useEffect(() => {
    handleReference()
  }, [])

  return (
    <div className={styles.container}>
      {isLoading && <Skeleton />}
    </div>
  )
}

export default Consulta