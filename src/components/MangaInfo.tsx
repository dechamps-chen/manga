import { IMangaInfo } from "@consumet/extensions";
import { BackgroundImage, Badge, Box, Breadcrumbs, Group, Image, Stack, Text, Title } from "@mantine/core";
import { FunctionComponent } from "react";

type Props = {
  manga: IMangaInfo;
  height: number;
};

const MangaInfo: FunctionComponent<Props> = ({ manga, height }) => {
  return (
    <Group>
      <BackgroundImage w="100%" h={{ base: height * 0.7, md: 322 }} src={manga.image ? manga.image : ""} style={{ position: "relative" }} >
        <Box w="100%" h="100%" opacity={{ base: 0.55, md: 0.9 }} style={{ position: "absolute", backgroundColor: "black" }} />
        <Box w="100%" h="100%" px={20} style={{ position: "absolute", color: "white", minWidth: 400, alignContent: "flex-end", userSelect: "none" }}>
          <Group w={{ base: "100%", lg: 1200 }} mx="auto" pb={20} justify="space-between" align="flex-end">
            <Stack w={{ base: "60%", lg: 690 }} pb={20}>
              <Group>
                <Badge color="white" radius="sm" style={{ color: "black", cursor: "text" }}>{String(manga.status)}</Badge>
                <Breadcrumbs>
                  {
                    manga.genres && manga.genres.map(genre => (
                      <Badge key={genre} variant="transparent" color="#eeeeee">{String(genre)}</Badge>
                    ))
                  }
                </Breadcrumbs>
              </Group>
              <Title order={2} style={{ cursor: "text" }}>{manga.title ? manga.title : (manga.altTitles ? (manga.altTitles.find(title => title.en !== undefined)).en : "undefined")} ({String(manga.releaseDate)})</Title>
              {
                manga.description?.en !== undefined &&
                <Text style={{ cursor: "text" }} lineClamp={3}>{manga.description.en}</Text>
              }
            </Stack>
            <Image src={manga.image} h={322} display={{ base: "none", md: "block" }} />
          </Group>
        </Box>
      </BackgroundImage>
    </Group>
  );
};

export default MangaInfo;