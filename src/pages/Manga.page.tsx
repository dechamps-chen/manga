import MangaEpisode from "@/components/MangaEpisode";
import MangaInfo from "@/components/MangaInfo";
import { IMangaInfo, MANGA } from "@consumet/extensions";
import { Skeleton, Stack, Text } from "@mantine/core";
import { useDocumentTitle, useViewportSize } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";

type Props = {

};

const Manga: FunctionComponent<Props> = () => {
  const mangadex = new MANGA.MangaDex;
  const params = useParams<Params>();
  const navigate = useNavigate();
  const [manga, setManga] = useState<IMangaInfo>();
  const [title, setTitle] = useState('');
  useDocumentTitle(title);
  const [ isLoading, setIsLoading] = useState<boolean>(true);
  const { height } = useViewportSize();

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
  }

  useEffect(() => {
    if (params.id) {
      setIsLoading
      mangadex.fetchMangaInfo(params.id).then(v => {
        setManga(v);
        setTitle(`${v.title ?? (
        Array.isArray(v.altTitles)
          ? (v.altTitles.find(title => title.en !== undefined)?.en ?? "undefined")
          : "undefined"
        )} - Manga`);
      })
        .catch(() => {
          MangaDoesNotExist();
        })
        .finally(() => {
          setIsLoading(false);
        })
    };
  }, []);

  return (
    manga &&
    <Stack w="100%">
      {
        !isLoading ?
        <MangaInfo manga={manga} height={height} />
        :
        <Skeleton w="100%" h={{ base: height * 0.7, md: 322 }}  />
      }
        <MangaEpisode manga={manga} height={height} />
    </Stack>
  );
};

export default Manga;