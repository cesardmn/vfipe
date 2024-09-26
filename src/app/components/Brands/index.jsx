import { useStep } from '@/app/providers/StepProvider';
import { fetchData } from '@/services/FetchData';
import { useEffect, useState, useRef } from 'react';
import Skeleton from '../Skeleton';

const Brands = () => {
  const { step, setStep } = useStep();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null); // Create a ref for the search input

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
    newStep.modelId = e.target.value
    setStep(newStep)
  }

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <input
            type="search"
            ref={searchInputRef} // Attach the ref to the input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search brands..."
          />
          <ul>
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
    </>
  );
};

export default Brands;
