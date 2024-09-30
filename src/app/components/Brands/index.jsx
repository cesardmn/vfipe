import { useStep } from '@/app/providers/StepProvider';
import { fetchData } from '@/services/FetchData';
import { useEffect, useState, useRef } from 'react';
import Skeleton from '../Skeleton';
import { useBreadcrumbs } from '@/app/providers/BreadcrumbsProvider';

import styles from './styles.module.css'


const Brands = () => {
  const { step, setStep } = useStep();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  const { breadcrumbs, setBreadcrumbs } = useBreadcrumbs()


  const handleBrands = async () => {
    setLoading(true);
    if (step.typeId !== '') {
      const data = await fetchData(`/api/marcas/${step.refId}/${step.typeId}`);
      setBrands(data);

    }
    setLoading(false);
  };

  useEffect(() => {
    handleBrands();
    setSearchTerm('')
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [step]);

  useEffect(() => {
    const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);
    const filtered = brands.filter(brand =>
      searchWords.every(word =>
        brand.brand.toLowerCase().includes(word)
      )
    );
    setResult(filtered);
  }, [searchTerm, brands]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleModel = (e) => {
    const newStep = { ...step }
    newStep.brandId = e.target.value
    setStep(newStep)
    const newCrumbs = [...breadcrumbs.slice(0, 2), e.target.innerText]
    setBreadcrumbs(newCrumbs)
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <input
            type="search"
            ref={searchInputRef}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Pesquisar marcas..."
            className={styles.search}
          />
          <ul className={styles.ul} >
            {result.map(item => (
              <li
                key={item.id}
                value={item.id}
                onClick={(e) => handleModel(e)}>
                {item.brand}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Brands;
