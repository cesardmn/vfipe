import Image from "next/image"
import LogoSvg from '@/public/img/logo.svg'
import styles from './styles.module.css'

const Header = () => {
  return (
    <header className={styles.header} >
      <h1>
        <Image
          alt="Logo da V FIPE"
          src={LogoSvg}
          height={80}
          priority
        />
        <span>FIPE</span>
      </h1>
    </header>
  )
}

export default Header