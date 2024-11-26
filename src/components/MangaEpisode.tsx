import { IMangaChapter, IMangaInfo } from "@consumet/extensions";
import { Button, Center, Grid, Group, ScrollArea, Stack } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  manga: IMangaInfo;
};

const MangaEpisode: FunctionComponent<Props> = ({ manga }) => {
  const [episodeList, setEpisodeList] = useState<IMangaChapter[]>();
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [expand, setExpand] = useState<boolean>(false);
  const { height } = useViewportSize();
  const navigate = useNavigate();

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
        <Button onClick={() => setIsAsc(!isAsc)}>Order: {isAsc ? "ASC" : "DESC"}</Button>
        <Button onClick={() => setExpand(!expand)}>{expand ? "Expand" : "Reduce"}</Button>
      </Group>
      {
        expand ?
        <ScrollArea h={height*0.5} m={20} p={2} offsetScrollbars style={{ border: "1px solid", borderRadius: "5px", borderColor: "#202020", borderCollapse: "collapse" }}>
          <Grid>
            {
              episodeList &&
              episodeList.map((episode, i) => (
                <Grid.Col key={episode.id} span={{ base: 6, sm: 4, md: 3 }} style={{ justifyContent: "center" }}>
                    <Center>
                      <Button onClick={() => EpisodeOnClick(episode.id)} w="100%" variant="outline" color="#202020">{manga.chapters && manga.chapters.length - i}. {episode.title}</Button>
                    </Center>
                  </Grid.Col>
              ))
            }
          </Grid>
        </ScrollArea>
      :
        <Grid p={20}>
          {
            episodeList &&
            episodeList.map((episode, i) => (
              <Grid.Col key={episode.id} span={{ base: 6, sm: 4, md: 3 }} style={{ justifyContent: "center" }}>
                  <Center>
                    <Button onClick={() => EpisodeOnClick(episode.id)} w="100%" variant="outline" color="#202020">{manga.chapters && manga.chapters.length - i}. {episode.title}</Button>
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