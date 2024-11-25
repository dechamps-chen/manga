import { AppShell, Center, Text, useMantineTheme } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';
import { LANGUAGES } from '@/core/constants';


export function BasicAppShell() {
  const [language, setLanguage] = useState<string>('en');
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

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (!storedLanguage) {
      const defaultLanguage = LANGUAGES.find(l => l.navigator === navigator.language)?.value ?? "en";
      localStorage.setItem("language", defaultLanguage);
      setLanguage(defaultLanguage);
    }
    else {
      setLanguage(storedLanguage);
    }

  }, []);

  return (
    <AppShell w="100%"
      header={{ height: 72 }}
      footer={{ height: 250 }}
    >
      <AppShell.Header style={{ position: "relative", color: "white", backgroundColor: theme.colors.dark[9], border: "none" }}>
        <Center h="100%">
          <Header
            language={language}
            setLanguage={setLanguage}
            familySafe={familySafe}
            homeOnClick={OnClickHome}
            searchOnClick={OnClickSearch}
            familySafeOnClick={OnClickFamilySafe}
          />
        </Center>
      </AppShell.Header>

      <AppShell.Main p={0}>
        <Center w="100%">
          <Outlet context={{ language, familySafe }} />
        </Center>
      </AppShell.Main>

      <AppShell.Footer style={{ position: "relative", color: theme.colors.dark[1], backgroundColor: theme.colors.dark[9] }}>
        <Text>Footer</Text>
      </AppShell.Footer>
    </AppShell >
  );
}