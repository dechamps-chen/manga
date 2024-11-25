import axios from "axios";
import { IMangaResult, ISearch } from "@consumet/extensions"

type fetchType = "[latestUploadedChapter]" | "[latestUploadedChapter]" | "[latestUploadedChapter]"

type UseMangaListReturnType = { fetchMangaList: (type: fetchType) => Promise<ISearch<IMangaResult> | undefined> }

async function fetchCoverImage(coverId: string) {
  const { data } = await axios.get(`https://api.mangadex.org/cover/${coverId}`);
  const fileName = data.data.attributes.fileName;
  return fileName;
}

export function useMangaList(): UseMangaListReturnType | null {

  async function fetchMangaList(type: fetchType, page = 1, limit = 20): Promise<ISearch<IMangaResult> | undefined> {
    const res = await axios.get(`https://api.mangadex.org/manga?order${type}=desc&limit=${limit}&offset=${limit * (page - 1)}&contentRating%5B%5D=safe`);
    if (res.data.result === 'ok') {
      const results: ISearch<IMangaResult> = {
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

  return { fetchMangaList }
}