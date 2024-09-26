'use client'

import { StepProvider } from '@/app/providers/StepProvider'
import ReferenceDrop from '../components/ReferenceDrop';
import TypeButtons from '../components/TypeButtons';
import Result from '../components/Result';

import styles from './styles.module.css'
const Consulta = () => {

  return (
    <StepProvider>
      <div className={styles.container} >
        <ReferenceDrop />
        <TypeButtons />

        <Result />
      </div>
    </StepProvider>
  )
}

export default Consulta;
