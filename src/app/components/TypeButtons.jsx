import { FaMotorcycle, FaCar, FaTruck } from 'react-icons/fa';
import { useFipe } from '../../store/fipeStore';
import Skeleton from './Skeleton';
import { fetchAndCacheData } from '../../services/FetchData'

const TypeButtons = () => {
  const { refId,
    setTypeId,
    setBrandList,
    setResultShow,
    setIsLoading } = useFipe();

  const handleClick = async (type) => {
    setIsLoading('result', true)
    setTypeId(type.id)
    const url = `/api/marcas/${refId}/${type.id}`
    const response = await fetchAndCacheData(url, 'get brands')
    const { ok, data, status, statusText } = response

    if (ok) {
      const formatData = data.map((brandList) => {
        return { id: brandList.Value, description: brandList.Label }
      })
      setBrandList(formatData)
      setResultShow('brands')
    }
    setIsLoading('result', false)
  };

  return (

    <div className="h-full flex flex-col gap-3">
      <h3 className="block mb-2 text-xs font-medium text-gr-2 uppercase">Tipo de veículo</h3>
      {!refId ?
        <Skeleton rows={3} /> :
        <>
          <TypeButton onClick={() => handleClick({ id: 1, description: "carro" })} icon={<FaCar />} label="Carro" />
          <TypeButton onClick={() => handleClick({ id: 2, description: "moto" })} icon={<FaMotorcycle />} label="Moto" />
          <TypeButton onClick={() => handleClick({ id: 3, description: "pesado" })} icon={<FaTruck />} label="Pesado" />
        </>}
    </div>

  );
};

const TypeButton = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2 rounded-md bg-bk-2 border border-bk-3 text-white hover:bg-or-3/30 hover:text-white transition-colors duration-200 cursor-pointer"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default TypeButtons;
