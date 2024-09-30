'use client'

import ReferenceDrop from '../components/ReferenceDrop';
import TypeButtons from '../components/TypeButtons';
import Result from '../components/Result';
import Breadcrumbs from '../components/Breadcrumbs';

import styles from './styles.module.css'

import { useStep } from '@/app/providers/StepProvider'



const Consulta = () => {

  const { step } = useStep()
  const { refId, typeId } = step

  return (
    <div className={styles.container} >
      <Breadcrumbs />
      {
        (typeId === '') && (
          <>
            <ReferenceDrop />
            <TypeButtons />
          </>
        )
      }
      <Result />

    </div>

  )
}

export default Consulta;
