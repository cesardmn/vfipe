import styles from './styles.module.css';

const Skeleton = () => {
  return (
    <div className={styles.container}>
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={`${styles.skeleton} ${index === 0 ? styles.large : styles.thin}`}
        />
      ))}
    </div>
  );
};

export default Skeleton;