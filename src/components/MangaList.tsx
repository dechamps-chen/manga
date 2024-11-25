import { Stack, Title, Card, Image, Text, UnstyledButton } from "@mantine/core";
import React, { FunctionComponent } from "react";
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css'
import { IMangaResult, ISearch } from "@consumet/extensions"
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  list: ISearch<IMangaResult>;
};

const MangaList: FunctionComponent<Props> = ({ title, list }) => {
  const navigate = useNavigate();

  return (
    <Stack>
      <Title order={2}>{title}</Title>

      <Carousel
        slideSize={{ base: "33%", sm: "25%", md: "20%" }}
        slideGap="md"
        align="start"
        slidesToScroll="auto"
        controlsOffset="xs"
        controlSize={50}
      >
        {
          list && list.results.map(manga => (
            <Carousel.Slide key={manga.id}>
              <Card>
                <Card.Section>
                  <UnstyledButton h={297} style={{ overflow: "hidden" }}>
                    <Image
                      radius="md"
                      src={manga.image}
                      height={297}
                      alt={String(manga.title)}
                      style={{ transition: "transform .2s" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      onClick={() => navigate(`manga/${manga.id}`)}
                      loading="lazy"
                    />
                  </UnstyledButton>
                  <Text pt=".25rem" size="1rem" c="dark.5" fw={400}>{String(manga.title)}</Text>
                </Card.Section>

              </Card>
            </Carousel.Slide>
          ))
        }

      </Carousel>
    </Stack>
  );
};

export default MangaList;