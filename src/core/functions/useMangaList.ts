import axios from "axios";
import { IMangaResult, ISearch } from "@consumet/extensions"

type UseMangaListReturnType = {
  fetchLatestUpdates: (page?: number, limit?: number, familySafe?: boolean) => Promise<ISearch<IMangaResult>>,
  fetchRecentlyAdded: (page?: number, limit?: number, familySafe?: boolean) => Promise<ISearch<IMangaResult>>,
  fetchPopular: (page?: number, limit?: number, familySafe?: boolean) => Promise<ISearch<IMangaResult>>,
}

export function useMangaList(): UseMangaListReturnType {
  const baseUrl = 'https://mangadex.org';
  const apiUrl = 'https://api.mangadex.org';
  
  async function fetchCoverImage(coverId: string) {
    const { data } = await axios.get(`${apiUrl}/cover/${coverId}`);
    const fileName = data.data.attributes.fileName;
    return fileName;
  }

  async function fetchLatestUpdates(page = 1, limit = 20, familySafe = true): Promise<ISearch<IMangaResult>> {
    if (page <= 0){
      throw new Error('Page number must be greater than 0');
      }
    if (limit > 100){
      throw new Error('Limit must be less than or equal to 100');
    }
    if (limit * (page - 1) >= 10000){
      throw new Error('not enough results');
    }
    try {
      const res = await axios.get(`${apiUrl}/manga?order[latestUploadedChapter]=desc&limit=${limit}&offset=${limit * (page - 1)}${familySafe ? "&contentRating%5B%5D=safe" : ""}`);
      
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
            title: String(Object.values(manga.attributes.title)[0]),
            altTitles: manga.attributes.altTitles,
            description: String(Object.values(manga.attributes.description)[0]),
            status: manga.attributes.status,
            releaseDate: manga.attributes.year,
            contentRating: manga.attributes.contentRating,
            lastVolume: manga.attributes.lastVolume,
            lastChapter: manga.attributes.lastChapter,
            image: `${baseUrl}/covers/${manga.id}/${coverArt}`,
          });
        }
        return results;
      }
      throw new Error(res.data.message);
    }
    catch (err: any) {
      throw new Error(err.message);
    }
  }


  async function fetchRecentlyAdded(page = 1, limit = 20, familySafe = true): Promise<ISearch<IMangaResult>> {
    if (page <= 0){
      throw new Error('Page number must be greater than 0');
      }
    if (limit > 100){
      throw new Error('Limit must be less than or equal to 100');
    }
    if (limit * (page - 1) >= 10000){
      throw new Error('not enough results');
    }
    try {
        const res = await axios.get(`${apiUrl}/manga?includes[]=cover_art&contentRating[]=safe${!familySafe ? "&contentRating[]=suggestive&contentRating[]=erotica" : ""}&order[createdAt]=desc&hasAvailableChapters=true&limit=${limit}&offset=${limit * (page - 1)}`);
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
                    title: String(Object.values(manga.attributes.title)[0]),
                    altTitles: manga.attributes.altTitles,
                    description: String(Object.values(manga.attributes.description)[0]),
                    status: manga.attributes.status,
                    releaseDate: manga.attributes.year,
                    contentRating: manga.attributes.contentRating,
                    lastVolume: manga.attributes.lastVolume,
                    lastChapter: manga.attributes.lastChapter,
                    image: `${baseUrl}/covers/${manga.id}/${coverArt}`,
                });
            }
            return results;
        }
        throw new Error(res.data.message);
      }
      catch (err: any) {
        throw new Error(err.message);
      }
    }

    async function fetchPopular(page = 1, limit = 20, familySafe = true): Promise<ISearch<IMangaResult>> {
      if (page <= 0){
        throw new Error('Page number must be greater than 0');
        }
      if (limit > 100){
        throw new Error('Limit must be less than or equal to 100');
      }
      if (limit * (page - 1) >= 10000){
        throw new Error('not enough results');
      }
      try{
          const res = await axios.get(`${apiUrl}/manga?includes[]=cover_art&includes[]=artist&includes[]=author&order[followedCount]=desc&contentRating[]=safe${!familySafe ? "&contentRating[]=suggestive" : ""}&hasAvailableChapters=true&limit=${limit}&offset=${limit * (page - 1)}`);
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
                      title: String(Object.values(manga.attributes.title)[0]),
                      altTitles: manga.attributes.altTitles,
                      description: String(Object.values(manga.attributes.description)[0]),
                      status: manga.attributes.status,
                      releaseDate: manga.attributes.year,
                      contentRating: manga.attributes.contentRating,
                      lastVolume: manga.attributes.lastVolume,
                      lastChapter: manga.attributes.lastChapter,
                      image: `${baseUrl}/covers/${manga.id}/${coverArt}`,
                  });
              }
              return results;
          }
          throw new Error(res.data.message);
        }
        catch (err: any) {
          throw new Error(err.message);
        }
      }

  return { fetchLatestUpdates, fetchRecentlyAdded, fetchPopular }
}