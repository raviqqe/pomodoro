import type { JSX } from "react";
import { FaGithub } from "react-icons/fa";
import { configuration } from "../../configuration.js";
import { signInManager } from "../../main/sign-in-manager.js";
import { SignIn } from "../components/SignIn.js";
import styles from "./index.module.css";

export default (): JSX.Element => (
  <div className={styles.container}>
    <div className={styles.title}>P🍅m🍅d🍅r🍅</div>
    <SignIn signIn={() => signInManager.signIn()} />
    <a className={styles.githubLink} href={configuration.repositoryUrl} target="_blank">
      <FaGithub />
    </a>
  </div>
);
