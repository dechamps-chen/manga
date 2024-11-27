import MangaList from '@/components/MangaList';
import { Stack } from '@mantine/core';
import { IMangaResult, ISearch, MANGA } from "@consumet/extensions"
import { useContext, useEffect, useState } from 'react';
import MangaListSkeleton from '@/components/MangaListSkeleton';
import { useOutletContext } from 'react-router-dom';
import { useDocumentTitle } from '@mantine/hooks';
import { useTranslation } from '@/core/functions/useTranslation';
import { useMangaList } from '@/core/functions/useMangaList';
import { LanguageContext } from '@/components/LanguageContext';

export function HomePage() {
  // const mangadex = new MANGA.MangaDex;
  const [lastestUpdates, setLastestUpdates] = useState<ISearch<IMangaResult> | null>(null);
  const [lastestUpdatesIsLoading, setLastestUpdatesIsLoading] = useState<boolean>(true);
  const [popular, setPopular] = useState<ISearch<IMangaResult> | null>(null);
  const [popularIsLoading, setPopularIsLoading] = useState<boolean>(true);
  const [recentlyAdded, setRecentlyAdded] = useState<ISearch<IMangaResult> | null>(null);
  const [recentlyAddedIsLoading, setRecentlyAddedIsLoading] = useState<boolean>(true);
  const { familySafe } = useOutletContext<{ familySafe: boolean }>();
  const { language } = useContext(LanguageContext);
  const { t } = useTranslation(language);
  useDocumentTitle(t("homeTitle"));
  const { fetchLatestUpdates, fetchPopular, fetchRecentlyAdded } = useMangaList();

  useEffect(() => {
    setLastestUpdatesIsLoading(true);
    setPopularIsLoading(true);
    setRecentlyAddedIsLoading(true);

    fetchLatestUpdates(1, 20, familySafe)
      .then(v => {
        setLastestUpdates(v);
      })
      .catch(() => {
        setLastestUpdates(null);
      })
      .finally(() => {
        setLastestUpdatesIsLoading(false);
      });

      fetchPopular(1, 20, familySafe)
      .then(v => {
        setPopular(v);
      })
      .catch(() => {
        setPopular(null);
      })
      .finally(() => {
        setPopularIsLoading(false);
      });

      fetchRecentlyAdded(1, 20, familySafe)
      .then(v => {
        setRecentlyAdded(v);
      })
      .catch(() => {
        setRecentlyAdded(null);
      })
      .finally(() => {
        setRecentlyAddedIsLoading(false);
      });

  }, [familySafe]);

  return (
    <Stack w={{ base: "100%", md: 1080 }}  p={20} gap="2.5rem">
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
