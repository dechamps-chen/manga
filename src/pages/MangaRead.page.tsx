import { IMangaChapterPage, IMangaInfo, MANGA } from "@consumet/extensions";
import { Stack, Image, Text, UnstyledButton, Group, ScrollArea, Button, ActionIcon } from "@mantine/core";
import { useDocumentTitle, useViewportSize } from "@mantine/hooks";
import React, { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { modals } from "@mantine/modals";
import { InView } from 'react-intersection-observer';
import { LanguageContext } from "@/components/LanguageContext";
import { MantineLogo } from "@mantinex/mantine-logo";
import { FaChevronLeft, FaChevronRight, FaList } from "react-icons/fa6";
import { useTranslation } from "@/core/functions/useTranslation";

type Props = {
};

const MangaRead: FunctionComponent<Props> = (props: Props) => {
  const mangadex = new MANGA.MangaDex;
  const params = useParams<Params>();
  const navigate = useNavigate();
  const [manga, setManga] = useState<IMangaInfo>();
  const [episode, setEpisode] = useState<IMangaChapterPage[]>();
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  const [title, setTitle] = useState('');
  useDocumentTitle(title);
  const [inViewIndices, setInViewIndices] = useState(new Set<number>());
  const { height } = useViewportSize();
  const [ showControl, setShowControl ] = useState<boolean>(true);
  const [prevScrollTop, setPrevScrollTop] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  function HandleInViewChange(inView: any, index: any) {
    setInViewIndices((prevIndices) => {
      const newIndices = new Set(prevIndices);
      if (inView) {
        newIndices.add(index);
      } else {
        newIndices.delete(index);
      }
      return newIndices;
    });
  };

  function IsVisible(index: number) {
    return Array.from(inViewIndices).some(
      (inViewIndex) =>
        inViewIndex === index ||
        inViewIndex - 1 === index ||
        inViewIndex + 1 === index
    );
  };

  function HandleScroll() {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      const currentScrollTop = scrollArea.scrollTop;
      if (prevScrollTop !== null) {
        if (currentScrollTop > prevScrollTop) {
          // Scrolling down
          setShowControl(false);
        } else {
          // Scrolling up
          setShowControl(true);
        }
      }
      setPrevScrollTop(currentScrollTop);
    }
    return 0;
  }

  function MangaDoesNotExist(): void {
    modals.open({
      title: "Manga",
      children: (
        <Text>The manga does not exist</Text>
      ),
      onClose: () => {
        navigate("../");
      }
    });
  };

  function EpisodeDoesNotExist(): void {
    modals.open({
      title: "Manga",
      children: (
        <Text>The episode does not exist</Text>
      ),
      onClose: () => {
        navigate("../");
      }
    });
  };

  useEffect(() => {
    if (params.id !== undefined) {
      mangadex.fetchMangaInfo(params.id).then(v => {
        setManga(v);
        v.title && setTitle(`${!Array.isArray(v.title)?v.title:""} - Manga`);
      })
        .catch(() => {
          MangaDoesNotExist();
        });
    };

    if (params.ep !== undefined) {
      mangadex.fetchChapterPages(params.ep).then(v => {
        setEpisode(v);
      })
        .catch(() => {
          EpisodeDoesNotExist()
        });
    };
  }, []);

  return (
    <ScrollArea w="100%" h={height} viewportRef={scrollAreaRef} type="never" onScrollPositionChange={() => HandleScroll()} onClick={() => setShowControl(!showControl)} style={{ position: "relative", userSelect: "none" }}>
      <Stack w="100%" h="100%" justify="space-between" style={{ top: 0, left:0, position: "absolute", backgroundColor: "transparent", opacity: showControl ? 1 : 0, zIndex: 1000, pointerEvents: "none", transitionDuration: showControl ? "0.6s" : "0s" }}>
        <Group w={{ base: "100%", lg: "1200" }} mx="auto" h={height*0.1} style={{ backgroundColor: "pink" }}>
          <UnstyledButton onClick={() => navigate("../")}><MantineLogo size={30} /></UnstyledButton>
          {
            manga &&
            <Text>{`${String(manga.title)} | `}</Text>
          }
        </Group>

        <Group w={{ base: "100%", lg: "1200" }} h={height*0.1} mx="auto" justify="center" style={{ backgroundColor: "skyblue" }}>
          <Button size="md" leftSection={<FaChevronLeft size={14} />} variant="default">{t("previousEpisode")}</Button>
          <ActionIcon variant="default" aria-label="Settings">
            <FaList />
          </ActionIcon>
          <Button size="md" rightSection={<FaChevronRight size={14} />} variant="default">{t("nextEpisode")}</Button>
        </Group>
      </Stack>
      {
        episode &&
        episode.map((ep, key) => (
          <InView key={key} threshold={0.1} onChange={(inView) => HandleInViewChange(inView, key)}>
          {
            ({ ref }) =>
            <Image ref={ref} key={key} src={ep.img} maw={900} mx="auto" loading="lazy" draggable={false} style={{ visibility: IsVisible(key) ? 'visible' : 'hidden' }} />
          }
          </InView>
        ))
      }
    </ScrollArea>
  );
};

export default MangaRead;