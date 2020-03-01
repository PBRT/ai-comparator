import React from "react";
import { useHistory } from "react-router-dom";
import {
  Navbar as NavBarComponent,
  Button,
  Classes,
  Alignment
} from "@blueprintjs/core";

import { TEST_IDS } from "../../tests/test-ids";
import { RouteConfig, RoutesConfig } from "../../app/Routes";
import { useWindowSize } from "../../utils/useWindowSize";

type NavButtonProps = RouteConfig & {
  isHomeButton: boolean | null;
};

function NavButton({
  label,
  path,
  icon,
  testID,
  isHomeButton
}: NavButtonProps) {
  const history = useHistory();
  const { innerWidth } = useWindowSize();
  const isTabletOrLower = innerWidth != null && innerWidth < 600;
  const shouldShowLabel = !isTabletOrLower || isHomeButton;

  function handleClick() {
    history.push(path);
  }
  return (
    <Button
      className={Classes.MINIMAL}
      icon={icon}
      text={shouldShowLabel ? label : null}
      onClick={handleClick}
      data-testid={testID}
    />
  );
}

type Props = {
  routesConfig: RoutesConfig;
};

function Navbar({ routesConfig: { home, routes } }: Props) {
  return (
    <NavBarComponent data-testid={TEST_IDS.COMPONENT_NAVBAR}>
      <NavBarComponent.Group align={Alignment.LEFT}>
        {/* Special case for the home button */}
        <NavButton
          label={home.label}
          path={home.path}
          key={home.path}
          icon={home.icon}
          testID={home.testID}
          isHomeButton
        />
        <NavBarComponent.Divider />
      </NavBarComponent.Group>
      <NavBarComponent.Group align={Alignment.RIGHT}>
        {routes.map(({ path, label, icon, testID }) => (
          <NavButton
            label={label}
            path={path}
            key={path}
            icon={icon}
            testID={testID}
            isHomeButton={false}
          />
        ))}
      </NavBarComponent.Group>
    </NavBarComponent>
  );
}

export default Navbar;
