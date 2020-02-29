import React from "react";
import { useHistory } from "react-router-dom";
import {
  Navbar as NavBarComponent,
  Button,
  Classes,
  Alignment
} from "@blueprintjs/core";

// Routes type
import { RouteConfig, RoutesConfig } from "../../app/Routes";

function NavButton({ label, path, icon }: RouteConfig) {
  const history = useHistory();

  function handleClick() {
    history.push(path);
  }
  return (
    <Button
      className={Classes.MINIMAL}
      icon={icon}
      text={label}
      onClick={handleClick}
    />
  );
}

type Props = {
  routesConfig: RoutesConfig;
};

function Navbar({ routesConfig: { home, routes } }: Props) {
  return (
    <NavBarComponent>
      <NavBarComponent.Group align={Alignment.LEFT}>
        {/* Special case for the home button */}
        <NavButton
          label={home.label}
          path={home.path}
          key={home.path}
          icon={home.icon}
        />
        <NavBarComponent.Divider />
      </NavBarComponent.Group>
      <NavBarComponent.Group align={Alignment.RIGHT}>
        {routes.map(({ path, label, icon }) => (
          <NavButton label={label} path={path} key={path} icon={icon} />
        ))}
      </NavBarComponent.Group>
    </NavBarComponent>
  );
}

export default Navbar;
