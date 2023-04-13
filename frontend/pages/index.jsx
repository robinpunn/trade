import styles from "../styles/Home.module.css";
import NftGallery from "../components/nftGallery";
import InstructionsComponent from "../components/InstructionsComponent";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <NftGallery />
      </main>
    </div>
  );
}
