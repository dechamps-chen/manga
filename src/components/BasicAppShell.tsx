import { AppShell, Center, Text, useMantineTheme } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useState } from 'react';

export function BasicAppShell() {
  const [familySafe, setFamilySafe] = useState<boolean>(true);
  const navigate = useNavigate();
  const theme = useMantineTheme();

  function OnClickFamilySafe(): void {
    setFamilySafe(!familySafe);
  }

  function OnClickHome(): void {
    navigate("/");
  }

  function OnClickSearch(): void {
    navigate("/search");
  }

  return (
    <AppShell w="100%"
      header={{ height: 72 }}
      footer={{ height: 250 }}
    >
      <AppShell.Header style={{ position: "relative", color: "white", backgroundColor: theme.colors.dark[9], border: "none" }}>
        <Center h="100%">
          <Header
            familySafe={familySafe}
            homeOnClick={OnClickHome}
            searchOnClick={OnClickSearch}
            familySafeOnClick={OnClickFamilySafe}
          />
        </Center>
      </AppShell.Header>

      <AppShell.Main p={0}>
        <Center w="100%">
          <Outlet context={{ familySafe }} />
        </Center>
      </AppShell.Main>

      <AppShell.Footer style={{ position: "relative", color: theme.colors.dark[1], backgroundColor: theme.colors.dark[9] }}>
        <Text>Footer</Text>
      </AppShell.Footer>
    </AppShell >
  );
}