import { useState, useRef, useEffect } from 'react';
import Skeleton from './Skeleton';
import { useFipe } from '@/store/fipeStore';
import { fetchAndCacheData } from '../../services/FetchData'

const Brands = () => {
  const { brandList, setBrandId, setModelList, setResultShow, refId, typeId } = useFipe();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    setSearchTerm('');
    searchInputRef.current?.focus()
  }, [brandList]);


  useEffect(() => {
    if (!brandList) return;

    const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);
    const filtered = brandList.filter(
      (brand) =>
        brand?.description &&
        searchWords.every((word) => brand.description.toLowerCase().includes(word))
    );
    setFilteredBrands(filtered);
  }, [searchTerm, brandList]);

  const handleClick = async (brand) => {
    const response = await fetchAndCacheData(`/api/modelos/${refId}/${typeId}/${brand.id}`)
    const { ok, data, status, statusText } = response

    if (ok) {
      const models = data.Modelos
      const formatedModels = models.map(model => ({
        id: model.Value,
        description: model.Label,
      }))
      setModelList(formatedModels)
      setBrandId(brand.id)
      setResultShow('models')
    }
  }

  return (
    <div className="w-full flex flex-col gap-4">

      <input
        type="search"
        ref={searchInputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar marcas..."
        className="w-full px-4 py-3 rounded-lg bg-bk-1 text-sm text-wt-1 placeholder-gr-1 shadow-md focus:outline-none focus:ring-2 focus:ring-or-2 border border-bk-3 transition-colors"
      />

      {!brandList ? (
        <Skeleton rows={5} />
      ) : (
        <ul
          className="w-full max-h-80 overflow-y-auto bg-bk-1 rounded-lg shadow-md border border-bk-3 divide-y divide-bk-3 scrollbar-thin scrollbar-thumb-bk-3 scrollbar-track-bk-2"
          role="listbox"
        >
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand) => (
              <li
                key={brand.id}
                className="cursor-pointer px-4 py-3 text-sm text-wt-1 hover:bg-or-2/20 transition-colors group"
                role="option"
                onClick={() => handleClick(brand)}
              >
                <span className="group-hover:text-or-1 transition-colors">
                  {brand.description}
                </span>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-gr-1 italic">
              {searchTerm
                ? 'Nenhuma marca encontrada'
                : 'Nenhuma marca disponível'}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Brands;