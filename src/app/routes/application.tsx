import type { JSX } from "react";
import { Outlet, useLocation } from "react-router";
import { SignOut } from "../components/SignOut.js";
import { ViewGraphButton } from "../components/ViewGraphButton.js";
import { ViewTimerButton } from "../components/ViewTimerButton.js";
import styles from "./application.module.css";

export default (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <Outlet />
      <div className={styles.buttons}>
        <SignOut />
        {pathname === "/timer" ? <ViewGraphButton /> : <ViewTimerButton />}
      </div>
    </div>
  );
};
