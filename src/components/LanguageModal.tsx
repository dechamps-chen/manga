import { Button, Group, Modal, Radio } from "@mantine/core";
import { FunctionComponent, useEffect, useState } from "react";
import { LANGUAGES } from "@/core/constants"

type Props = {
  language: string;
  languageModalOpened: boolean;
  setLanguage?: (lang: string) => void;
  setLanguageModalOpened?: (bool: boolean) => void;
};

const LanguageModal: FunctionComponent<Props> = ({ language, languageModalOpened, setLanguage, setLanguageModalOpened }) => {
  const [radioValue, setRadioValue] = useState<string>(language);

  function LanguageOnSubmit(): void {
    if (!setLanguage) { return }
    localStorage.setItem("language", radioValue);
    setLanguage(radioValue);
    setLanguageModalOpened && setLanguageModalOpened(false);
  }

  useEffect(() => {
    setRadioValue(language);
  }, [language])

  return (
    setLanguageModalOpened &&
    <Modal
      opened={languageModalOpened}
      onClose={() => setLanguageModalOpened(false)}
      size={330}
      title="Language"
      withCloseButton={false}
      zIndex={301}
      radius="md"
      styles={{ header: { color: "white", justifyContent: "center", backgroundColor: "#313147" }, title: { fontSize: 16, fontWeight: 700, }, body: { color: "white", backgroundColor: "#313147" } }}
      centered
    >
      <Radio.Group
        value={radioValue}
        onChange={setRadioValue}
      >

        {
          LANGUAGES && LANGUAGES.map(lang => (
            <Radio
              key={lang.value}
              name="language"
              label={lang.label}
              value={lang.value}
              color="white"
              size="md"
              variant="outline"
              styles={{ labelWrapper: { width: "100%" }, label: { height: 48, cursor: "pointer" } }}
            />
          ))
        }
      </Radio.Group>
      <Group>
        <Button onClick={() => setLanguageModalOpened(false)}>Close</Button>
        <Button onClick={() => LanguageOnSubmit()}>OK</Button>
      </Group>
    </Modal>
  );
};

export default LanguageModal;