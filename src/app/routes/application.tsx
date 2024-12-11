import { styled } from "@linaria/react";
import { SignOut } from "../components/SignOut.js";
import { ViewGraphButton } from "../components/ViewGraphButton.js";
import { ViewTimerButton } from "../components/ViewTimerButton.js";
import { Outlet, useLocation } from "react-router";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Buttons = styled.div`
  position: fixed;
  top: 0.5em;
  right: 0.5em;

  > :not(:last-child) {
    margin-bottom: 0.5em;
  }
`;

export default (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <Container>
      <Outlet />
      <Buttons>
        <SignOut />
        {pathname === "/timer" ? <ViewGraphButton /> : <ViewTimerButton />}
      </Buttons>
    </Container>
  );
};
