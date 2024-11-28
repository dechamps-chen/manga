import { IMangaChapter, IMangaInfo } from "@consumet/extensions";
import { Button, Center, Divider, Grid, Group, ScrollArea, Stack } from "@mantine/core";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "./LanguageContext";
import { useTranslation } from "@/core/functions/useTranslation";

type Props = {
  manga: IMangaInfo;
  height: number;
};

const MangaEpisode: FunctionComponent<Props> = ({ manga, height }) => {
  const [episodeList, setEpisodeList] = useState<IMangaChapter[]>();
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<boolean>(false);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);

  function EpisodeOnClick(ep: string): void {
    navigate(`ep/${ep}`);
  }

  useEffect(() => {
    const chapters = manga.chapters ?? [];
    if(chapters) {
      isAsc ?
      setEpisodeList(manga.chapters)
      :
      setEpisodeList(() => [...chapters].reverse());
    } 
  }, [isAsc])

  return (
    <Stack w={{ base: "100%", lg: 1200 }} gap={0} pb={20} mx="auto" justify="center">
      <Group px={20} justify="flex-end">
        <Button onClick={() => setIsAsc(!isAsc)}>{t("order")}: {isAsc ? t("asc") : t("desc")}</Button>
        <Button onClick={() => setExpanded(!expanded)}>{!expanded ? t("expand") : t("reduce")}</Button>
      </Group>
      <Divider my="sm" variant="dashed" />
      {
        !expanded ?
        <ScrollArea h={height*0.5} px={10} offsetScrollbars >
          <Grid>
            {
              episodeList &&
              episodeList.map(ep => (
                <Grid.Col key={ep.id} span={{ base: 6, sm: 4, md: 3 }} style={{ justifyContent: "center" }}>
                    <Center>
                      <Button onClick={() => EpisodeOnClick(ep.id)} w="100%" variant="outline" color="#202020">{ep.chapterNumber}. {ep.title}</Button>
                    </Center>
                  </Grid.Col>
              ))
            }
          </Grid>
        </ScrollArea>
      :
        <Grid px={10}>
          {
            episodeList &&
            episodeList.map((ep) => (
              <Grid.Col key={ep.id} span={{ base: 6, sm: 4, md: 3 }} style={{ justifyContent: "center" }}>
                  <Center>
                    <Button onClick={() => EpisodeOnClick(ep.id)} w="100%" variant="outline" color="#202020">{ep.chapterNumber}. {ep.title}</Button>
                  </Center>
                </Grid.Col>
            ))
          }
        </Grid>
      }
    </Stack>
  );
};

export default MangaEpisode;