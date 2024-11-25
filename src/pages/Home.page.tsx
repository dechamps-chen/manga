import MangaList from '@/components/MangaList';
import { Welcome } from '../components/Welcome/Welcome';
import { Stack } from '@mantine/core';
import { IMangaResult, ISearch, MANGA } from "@consumet/extensions"
import { useEffect, useState } from 'react';
import MangaListSkeleton from '@/components/MangaListSkeleton';
import { useOutletContext } from 'react-router-dom';
import { useDocumentTitle } from '@mantine/hooks';
import { useTranslation } from '@/core/functions/useTranslation';
import axios, { AxiosResponse } from "axios"

export function HomePage() {
  const mangadex = new MANGA.MangaDex;
  const [lastestUpdates, setLastestUpdates] = useState<ISearch<IMangaResult> | null>(null);
  const [lastestUpdatesIsLoading, setLastestUpdatesIsLoading] = useState<boolean>(true);
  const [popular, setPopular] = useState<ISearch<IMangaResult> | null>(null);
  const [popularIsLoading, setPopularIsLoading] = useState<boolean>(true);
  const [recentlyAdded, setRecentlyAdded] = useState<ISearch<IMangaResult> | null>(null);
  const [recentlyAddedIsLoading, setRecentlyAddedIsLoading] = useState<boolean>(true);
  const { language, familySafe } = useOutletContext<{ language: string, familySafe: boolean }>();
  const { t } = useTranslation(language);
  useDocumentTitle("Manga - Read unlimited free manga online");

  useEffect(() => {
    setLastestUpdatesIsLoading(true);
    setPopularIsLoading(true);
    setRecentlyAddedIsLoading(true);

    async function fetchCoverImage(coverId: string) {
      const { data } = await axios.get(`https://api.mangadex.org/cover/${coverId}`);
      const fileName = data.data.attributes.fileName;
      return fileName;
    }
    fetchA().then(v => console.log(v));
    async function fetchA(limit = 20, page = 1) {

      const res = await axios.get(`https://api.mangadex.org/manga?order[latestUploadedChapter]=desc&limit=20&offset=0&contentRating%5B%5D=safe`);
      if (res.data.result === 'ok') {
        const results: { currentPage: number, results: any } = {
          currentPage: page,
          results: [],
        };
        for (const manga of res.data.data) {
          const findCoverArt = manga.relationships.find((item: any) => item.type === 'cover_art');
          const coverArtId = findCoverArt ? findCoverArt.id : null;
          const coverArt = await fetchCoverImage(coverArtId === null || coverArtId === void 0 ? void 0 : coverArtId);
          results.results.push({
            id: manga.id,
            title: Object.values(manga.attributes.title)[0],
            altTitles: manga.attributes.altTitles,
            description: Object.values(manga.attributes.description)[0],
            status: manga.attributes.status,
            releaseDate: manga.attributes.year,
            contentRating: manga.attributes.contentRating,
            lastVolume: manga.attributes.lastVolume,
            lastChapter: manga.attributes.lastChapter,
            image: `https://api.mangadex.org/covers/${manga.id}/${coverArt}`,
          });
        }
        return results;
      }
    }

    axios.get("https://api.mangadex.org/manga?limit=10&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BlatestUploadedChapter%5D=desc")
      .then(v => console.log("axios: ", v))

    mangadex.fetchLatestUpdates(1, 20)
      .then(v => {
        setLastestUpdates(v);
      })
      .catch(() => {
        setLastestUpdates(null);
      })
      .finally(() => {
        setLastestUpdatesIsLoading(false);
      });

    // mangadex.fetchPopular(1, 20)
    //   .then(v => {
    //     setPopular(v);
    //   })
    //   .catch(() => {
    //     setPopular(null);
    //   })
    //   .finally(() => {
    //     setPopularIsLoading(false);
    //   });

    // mangadex.fetchRecentlyAdded(1, 20)
    //   .then(v => {
    //     setRecentlyAdded(v);
    //   })
    //   .catch(() => {
    //     setRecentlyAdded(null);
    //   })
    //   .finally(() => {
    //     setRecentlyAddedIsLoading(false);
    //   });

  }, [familySafe]);

  return (
    <Stack w={{ base: "100%", md: 1080 }} py={20} gap="2.5rem">
      {/* <Welcome /> */}
      {
        (lastestUpdates && !lastestUpdatesIsLoading) ?
          <MangaList title={t("lastestUpdates")} list={lastestUpdates} />
          :
          <MangaListSkeleton />
      }
      {
        (popular && !popularIsLoading) ?
          <MangaList title={t("popular")} list={popular} />
          :
          <MangaListSkeleton />
      }
      {
        (recentlyAdded && !recentlyAddedIsLoading) ?
          <MangaList title={t("recentlyAdded")} list={recentlyAdded} />
          :
          <MangaListSkeleton />
      }
    </Stack>
  );
}
