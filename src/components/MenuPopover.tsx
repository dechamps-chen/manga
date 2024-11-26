import { Burger, Button, Group, Popover, Text, Stack } from "@mantine/core";
import { FunctionComponent, useContext } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { LANGUAGES } from '@/core/constants';
import { useTranslation } from "@/core/functions/useTranslation";
import { LanguageContext } from "./LanguageContext";

type Props = {
  menuOpened: boolean;
  setMenuOpened?: (bool: boolean) => void;
  setLanguageModalOpened?: (bool: boolean) => void;
};

const MenuPopover: FunctionComponent<Props> = ({ menuOpened, setMenuOpened, setLanguageModalOpened }) => {
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);

  return (
    setMenuOpened && setLanguageModalOpened &&
    <Popover
      onOpen={() => setMenuOpened(true)}
      onClose={() => setMenuOpened(false)}
      width={362}
      position="bottom-end"
      offset={21}
      radius="md"
      styles={{ dropdown: { color: "white", backgroundColor: "#313147", fontWeight: 400 } }}
    >
      <Popover.Target>
        <Burger size="sm" color={menuOpened ? "white" : "#9e9e9e"} />
      </Popover.Target>
      <Popover.Dropdown>
        <Stack>
          <Button
            onClick={() => setLanguageModalOpened(true)}
            justify="space-between"
            fullWidth
            leftSection={<Text>{t("language")}</Text>}
            variant="transparent"
            color="white"
            style={{ width: "100%", justifyContent: "flex-end" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(0.98)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Group>
              <Text fw={600}>{LANGUAGES.find(l => l.value === language)?.label}</Text><FaChevronRight size="0.8rem" className="mantine-rotate-rtl" />
            </Group>
          </Button>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default MenuPopover;