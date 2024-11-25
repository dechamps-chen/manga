import { IMangaChapterPage, IMangaInfo, MANGA } from "@consumet/extensions";
import { Stack, Image, Text } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import { modals } from "@mantine/modals";

type Props = {
};

const MangaRead: FunctionComponent<Props> = (props: Props) => {
  const mangadex = new MANGA.MangaDex;
  const params = useParams<Params>();
  const navigate = useNavigate();
  const [manga, setManga] = useState<IMangaInfo>();
  const [episode, setEpisode] = useState<IMangaChapterPage[]>();
  const [title, setTitle] = useState('');
  useDocumentTitle(title);

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
    <Stack w="100%" gap={0}>
      {
        episode &&
        episode.map((ep, key) => (
          <Image key={key} src={ep.img} maw={900} mx="auto" loading="lazy" />
        ))
      }
    </Stack>
  );
};

export default MangaRead;