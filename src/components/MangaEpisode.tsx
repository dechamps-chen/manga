import { IMangaInfo } from "@consumet/extensions";
import { Button, Center, Grid, Group, Stack } from "@mantine/core";
import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  manga: IMangaInfo;
};

const MangaEpisode: FunctionComponent<Props> = ({ manga }) => {
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const navigate = useNavigate();

  function EpisodeOnClick(ep: string): void {
    navigate(`ep/${ep}`);
  }

  return (
    <Stack w={{ base: "100%", md: 1200 }} mx="auto" justify="center" >
      <Group justify="flex-end">
        <Button onClick={() => setIsAsc(!isAsc)}>Order: {isAsc ? "ASC" : "DESC"}</Button>
        <Button>Expand</Button>
      </Group>

      <Grid>
        {
          manga.chapters &&
          (
            isAsc ?
              manga.chapters.map((episode, i) => (
                <Grid.Col key={episode.id} span={{ base: 5, md: 4, lg: 3 }} style={{ justifyContent: "center" }}>
                  <Center>
                    <Button onClick={() => EpisodeOnClick(episode.id)} w="100%" variant="outline" color="#202020">Ep.{manga.chapters && manga.chapters.length - i}. {episode.title}</Button>
                  </Center>
                </Grid.Col>
              ))
              :
              [...manga.chapters].reverse().map((episode, i) => (
                <Grid.Col key={episode.id} span={{ base: 5, md: 4, lg: 3 }} style={{ justifyContent: "center" }}>
                  <Center>
                    <Button onClick={() => EpisodeOnClick(episode.id)} w="100%" variant="outline" color="#202020">Ep.{i + 1}. {episode.title}</Button>
                  </Center>
                </Grid.Col>
              ))
          )
        }
      </Grid>
    </Stack>
  );
};

export default MangaEpisode;