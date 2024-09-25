import styles from './styles.module.css'

const TypeButtons = () => {

  const handleType = (id) => {
    console.log(id)
  }

  return (
    <div className={styles.buttonGroup}>
      <button onClick={(e) => handleType(2)}>motos</button>
      <button onClick={(e) => handleType(1)}>carros</button>
      <button onClick={(e) => handleType(3)}>pesados</button>
    </div>
  )
}

export default TypeButtons