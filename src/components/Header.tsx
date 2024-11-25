import { ActionIcon, Badge, Group, rem, UnstyledButton } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { FunctionComponent, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TbPointFilled } from "react-icons/tb";
import LanguageModal from "./LanguageModal";
import MenuPopover from "./MenuPopover";
import { useTranslation } from "@/core/functions/useTranslation";

type Props = {
  language: string;
  familySafe: boolean;
  setLanguage?: (lang: string) => void;
  homeOnClick?: () => void;
  searchOnClick?: () => void;
  familySafeOnClick?: () => void;
};

const Header: FunctionComponent<Props> = (props: Props) => {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const icon = <TbPointFilled style={{ width: rem(12), height: rem(12) }} />;
  const [languageModalOpened, setLanguageModalOpened] = useState(false);
  const { t } = useTranslation(props.language);

  return (
    <Group w={1200} h="100%" px="md" justify="space-between">
      <LanguageModal language={props.language} setLanguage={props.setLanguage} languageModalOpened={languageModalOpened} setLanguageModalOpened={setLanguageModalOpened} />

      <UnstyledButton onClick={props.homeOnClick}><MantineLogo size={30} /></UnstyledButton>
      <Group>
        <UnstyledButton onClick={props.familySafeOnClick}>
          <Badge leftSection={icon} variant="outline" color={props.familySafe ? "green" : "#9e9e9e"} size="md" style={{ cursor: "pointer" }}>{t("familySafe")}</Badge>
        </UnstyledButton>

        <ActionIcon onClick={props.searchOnClick} variant="transparent" color="default" aria-label="Search">
          <CiSearch size={24} />
        </ActionIcon>

        <MenuPopover language={props.language} menuOpened={menuOpened} setMenuOpened={setMenuOpened} setLanguageModalOpened={setLanguageModalOpened} />
      </Group>
    </Group>
  );
};

export default Header;