import MangaEpisode from "@/components/MangaEpisode";
import MangaInfo from "@/components/MangaInfo";
import { IMangaInfo, MANGA } from "@consumet/extensions";
import { Stack, Text } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
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
    if (params.id !== undefined) {
      mangadex.fetchMangaInfo(params.id).then(v => {
        setManga(v);
        setTitle(`${String(v.title ? v.title : (v.altTitles ? (v.altTitles.find(title => title.en !== undefined)).en : "undefined"))} - Manga`);
      })
        .catch(() => {
          MangaDoesNotExist();
        });
    };
  }, []);

  return (
    <Stack w="100%">
      {
        manga &&
        <MangaInfo manga={manga} />
      }
      {
        manga &&
        <MangaEpisode manga={manga} />
      }
    </Stack>
  );
};

export default Manga;