'use client'

import { StepProvider } from '@/app/providers/StepProvider'
import { BreadcrumbsProvider } from '@/app/providers/BreadcrumbsProvider'
import ReferenceDrop from '../components/ReferenceDrop';
import TypeButtons from '../components/TypeButtons';
import Result from '../components/Result';
import Breadcrumbs from '../components/Breadcrumbs';

import styles from './styles.module.css'


const Consulta = () => {

  return (
    <StepProvider>
      <BreadcrumbsProvider>
        <div className={styles.container} >
          <Breadcrumbs />
          <ReferenceDrop />
          <TypeButtons />
          <Result />
        </div>
      </BreadcrumbsProvider>
    </StepProvider>
  )
}

export default Consulta;
