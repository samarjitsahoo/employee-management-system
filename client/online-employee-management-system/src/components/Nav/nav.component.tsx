import styles from "./nav.module.scss";
import Link from "next/link";
import RightContainer from "./RightContainer/right-container.component";

export default function Nav() {
  return (
    <div
      className={`${styles.mainContainer} fixed top-0 left-0 right-0 flex justify-between items-center h-20 px-6 text-white text-2xl`}
    >
      <Link href={"/"}>
        <div>Employeeverse</div>
      </Link>
      <RightContainer />
    </div>
  );

}
