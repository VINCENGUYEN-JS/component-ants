import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Layout, Row, Col } from "./layout";
import routes, { CustomRouteObject } from "./routes";
import Menu, { MenuItem, MenuItemGroup } from "./components/Menu";
import Input from "./components/Input";

type NavProps = {
  userSearch: string;
  setUserSearch: React.Dispatch<React.SetStateAction<string>>;
};

const filterFn = (routes: CustomRouteObject[]) => (componentType: string) => {
  if (componentType === "components") {
    const supportedComponents = ["button", "divider", "menu", "input"];
    return routes.filter((route) => supportedComponents.includes(route.key));
  } else {
    const supportedLayouts = ["grid", "layout"];
    return routes.filter((route) => supportedLayouts.includes(route.key));
  }
};

const SideBar = (props: { appRoutes: CustomRouteObject[] }) => {
  const { appRoutes } = props;
  const componentTitle = "components";
  const layoutTitle = "layouts";
  let itemKeyForComponent = 11;
  let itemKeyForLayouts = 21;
  const selectedRoute = filterFn(appRoutes);
  return (
    <Menu>
      <MenuItemGroup title={componentTitle}>
        {selectedRoute(componentTitle).map((route) => (
          <MenuItem key={String(itemKeyForComponent++)}>
            <Link to={route.path as string}>{route.key}</Link>
          </MenuItem>
        ))}
      </MenuItemGroup>
      <MenuItemGroup title={layoutTitle}>
        {selectedRoute(layoutTitle).map((route) => (
          <MenuItem key={String(itemKeyForLayouts++)}>
            <Link to={route.path as string}>{route.key}</Link>
          </MenuItem>
        ))}
      </MenuItemGroup>
    </Menu>
  );
};

const Nav = (props: NavProps) => {
  const { userSearch, setUserSearch } = props;
  return (
    <Row>
      <Col span={4}>Vince's Design</Col>
      <Col span={20}>
        <>
          <Input.Search
            placeholder="Search"
            onChange={(e) => {
              const userSearchText = (e.target as HTMLInputElement).value;
              setUserSearch(userSearchText);
            }}
          />
        </>
      </Col>
    </Row>
  );
};
function App() {
  const [appRoutes, setAppRoutes] = React.useState<CustomRouteObject[]>(routes);
  const [userSearch, setUserSearch] = React.useState<string>("");

  React.useEffect(() => {
    const userSearchRoute = routes.filter((route) => {
      const routeName = route.key;
      if (routeName.includes(userSearch.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    setAppRoutes(userSearchRoute);
  }, [userSearch]);

  console.log({ appRoutes, userSearch });
  return (
    <div>
      <Layout>
        <Layout.Header id="header">
          <Nav userSearch={userSearch} setUserSearch={setUserSearch} />
        </Layout.Header>
        <Layout
          style={{
            minHeight: "100vh",
            padding: "40px 0 0",
            background: "#fff",
          }}
        >
          <Layout.Sider style={{ background: "#fff" }}>
            <SideBar appRoutes={appRoutes} />
          </Layout.Sider>
          <Layout.Content>
            <div style={{ paddingLeft: "64px" }}>
              <Routes>
                {appRoutes.map((route) => (
                  <Route path={route.path} element={route.element} />
                ))}
              </Routes>
            </div>
          </Layout.Content>
        </Layout>
        <Layout.Footer>Vince Nguyen</Layout.Footer>
      </Layout>
    </div>
  );
}

export default App;
