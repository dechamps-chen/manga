import { ActionIcon, Badge, Group, rem, UnstyledButton } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { FunctionComponent, useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TbPointFilled } from "react-icons/tb";
import LanguageModal from "./LanguageModal";
import MenuPopover from "./MenuPopover";
import { useTranslation } from "@/core/functions/useTranslation";
import { LanguageContext } from "./LanguageContext";

type Props = {
  familySafe: boolean;
  homeOnClick?: () => void;
  searchOnClick?: () => void;
  familySafeOnClick?: () => void;
};

const Header: FunctionComponent<Props> = (props: Props) => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const icon = <TbPointFilled style={{ width: rem(12), height: rem(12) }} />;
  const [languageModalOpened, setLanguageModalOpened] = useState(false);
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);

  return (
    <Group w={1200} h="100%" px="md" justify="space-between">
      <LanguageModal languageModalOpened={languageModalOpened} setLanguageModalOpened={setLanguageModalOpened} />

      <UnstyledButton onClick={props.homeOnClick}><MantineLogo size={30} /></UnstyledButton>
      <Group>
        <UnstyledButton onClick={props.familySafeOnClick}>
          <Badge leftSection={icon} variant="outline" color={props.familySafe ? "green" : "#9e9e9e"} size="md" style={{ cursor: "pointer" }}>{t("familySafe")}</Badge>
        </UnstyledButton>

        <ActionIcon onClick={props.searchOnClick} variant="transparent" color="default" aria-label="Search">
          <CiSearch size={24} />
        </ActionIcon>

        <MenuPopover menuOpened={menuOpened} setMenuOpened={setMenuOpened} setLanguageModalOpened={setLanguageModalOpened} />
      </Group>
    </Group>
  );
};

export default Header;