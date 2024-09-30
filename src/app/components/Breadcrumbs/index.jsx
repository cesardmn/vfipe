import { useBreadcrumbs } from '@/app/providers/BreadcrumbsProvider';
import { useStep } from '@/app/providers/StepProvider';
import { useEffect, useState, Fragment } from 'react';
import styles from './styles.module.css'

const Breadcrumbs = () => {
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs();
  const { step, setStep } = useStep();
  const [crumbs, setCrumbs] = useState([]);

  useEffect(() => {
    setCrumbs(breadcrumbs);
  }, [step, breadcrumbs]);

  const handleClick = (e) => {
    const index = e.target.id

    if (index == 0) {
      const newStep = {
        refId: step.refId,
        typeId: '',
        brandId: '',
        modelId: ''
      }
      setStep(newStep)
    }

    if (index == 1) {
      const newStep = {
        refId: step.refId,
        typeId: step.typeId,
        brandId: '',
        modelId: ''
      }
      setStep(newStep)
      const newCrumbs = crumbs.slice(0, 2)
      setBreadcrumbs(newCrumbs)
    }

    if (index == 2) {
      const newStep = {
        refId: step.refId,
        typeId: step.typeId,
        brandId: step.brandId,
        modelId: ''
      }
      setStep(newStep)
      const newCrumbs = crumbs.slice(0, 3)
      setBreadcrumbs(newCrumbs)
    }

  };

  return (
    <div className={styles.crumbs} >
      {crumbs.map((crumb, index) => (
        <Fragment key={index}>
          <span
            id={index}
            className={index === crumbs.length - 1 ? styles.active : styles.crumb}
            onClick={handleClick}
          >
            {crumb}
          </span>
          {index < crumbs.length - 1 && <span className={styles.separator}> » </span>}
        </Fragment>
      ))}
    </div>

  );
};

export default Breadcrumbs;
