import { IMangaChapterPage, IMangaInfo, MANGA } from "@consumet/extensions";
import { Stack, Image, Text, UnstyledButton, Group, ScrollArea, ActionIcon, Skeleton, Anchor } from "@mantine/core";
import { useDocumentTitle, useViewportSize } from "@mantine/hooks";
import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { modals } from "@mantine/modals";
import { InView } from 'react-intersection-observer';
import { LanguageContext } from "@/components/LanguageContext";
import { MantineLogo } from "@mantinex/mantine-logo";
import { FaChevronLeft, FaChevronRight, FaList } from "react-icons/fa6";
import { useTranslation } from "@/core/functions/useTranslation";

type Props = {
};

const MangaRead: FunctionComponent<Props> = () => {
  const mangadex = new MANGA.MangaDex;
  const params = useParams<Params>();
  const navigate = useNavigate();
  const [manga, setManga] = useState<IMangaInfo>();
  const [episode, setEpisode] = useState<IMangaChapterPage[]>();
  const [episodeNumber, setEpisodeNumber] = useState<number | null>(null);
  const [previousEpisode, setPreviousEpisode] = useState<string | null>(null);
  const [nextEpisode, setNextEpisode] = useState<string | null>(null);
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  const [title, setTitle] = useState('');
  useDocumentTitle(title);
  const [inViewIndices, setInViewIndices] = useState(new Set<number>());
  const { height } = useViewportSize();
  const [showControl, setShowControl] = useState<boolean>(true);
  const [prevScrollTop, setPrevScrollTop] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function HandleScrollAreaOnClick(): void {
    setShowControl(!showControl);
  }

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
        const epNumber = v.chapters?.find(ep => ep.id === params.ep)?.chapterNumber;
        if (v.chapters) {
          setPreviousEpisode(
            (v.chapters[v.chapters?.findIndex(ep => ep.chapterNumber === epNumber) + 1])
              ?
              v.chapters[v.chapters?.findIndex(ep => ep.chapterNumber === epNumber) + 1].id
              :
              null
          );
          setNextEpisode(
            (v.chapters[v.chapters?.findIndex(ep => ep.chapterNumber === epNumber) - 1])
              ?
              v.chapters[v.chapters?.findIndex(ep => ep.chapterNumber === epNumber) - 1].id
              :
              null
          );
        }
        v.title && setTitle(`${!Array.isArray(v.title) ? v.title : ""} - ${epNumber && epNumber} - Manga`);
        epNumber && setEpisodeNumber(Number(epNumber));
      })
        .catch(() => {
          MangaDoesNotExist();
        });
    };

    if (params.ep !== undefined) {
      setIsLoading(true);
      mangadex.fetchChapterPages(params.ep).then(v => {
        setEpisode(v);
      })
        .catch(() => {
          EpisodeDoesNotExist()
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
  }, [params]);

  return (
    !isLoading ?
      <ScrollArea w="100%" h={height - 0.1} viewportRef={scrollAreaRef} type="always" scrollbarSize={10} onScrollPositionChange={() => HandleScroll()} onClick={HandleScrollAreaOnClick} style={{ position: "relative", userSelect: "none" }}>
        <Stack w="100%" h="100%" justify="space-between" style={{ left: 0, position: "absolute", backgroundColor: "transparent", pointerEvents: "none", transitionDuration: showControl ? "0.6s" : "0s" }}>
          <Group w="100%" mx="auto" h={64} style={{ position: "fixed", top: showControl ? "0px" : "-85px", pointerEvents: "auto", opacity: showControl ? 0.9 : 0, transition: "1s", color: "white", backgroundColor: "black" }}>
            <UnstyledButton onClick={(e) => { e.stopPropagation(); navigate("../") }}><MantineLogo size={30} /></UnstyledButton>
            {
              manga &&
              <Stack gap={0}>
                <Text size="xl" fw={600}>{String(manga.title)}</Text>
                <Text c="#888888">{episodeNumber}</Text>
              </Stack>
            }
          </Group>

          {
            manga &&
            <Group w="100%" h={85} mx="auto" justify="center" style={{ position: "fixed", bottom: showControl ? "0px" : "-233px", opacity: showControl ? 0.9 : 0, transition: "1s", pointerEvents: "auto", backgroundColor: "black" }}>
              <Anchor
                onClick={e => { e.stopPropagation(); navigate(`../manga/${manga.id}/ep/${previousEpisode}`) }}
                c={previousEpisode ? "white" : "#888888"}
                style={{ pointer: "auto", pointerEvents: previousEpisode ? "auto" : "none" }}
              >
                <FaChevronLeft size={14} />
                {t("previousEpisode")}
              </Anchor>
              <ActionIcon onClick={e => { e.stopPropagation(); navigate(`../manga/${manga.id}`) }} variant="transparent" color="white" aria-label="Settings"><FaList /></ActionIcon>
              <Anchor
                onClick={e => { e.stopPropagation(); navigate(`../manga/${manga.id}/ep/${nextEpisode}`) }}
                c={nextEpisode ? "white" : "#888888"}
                style={{ pointer: "auto", pointerEvents: nextEpisode ? "auto" : "none" }}
              >
                {t("nextEpisode")}
                <FaChevronRight size={14} />
              </Anchor>
            </Group>
          }
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
      </ScrollArea >
      :
      <Skeleton w="100%" h="100%" />
  );
};

export default MangaRead;