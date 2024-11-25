import { Carousel } from "@mantine/carousel";
import { Card, Stack, Skeleton } from "@mantine/core";
import React, { FunctionComponent } from "react";

type Props = {

};

const MangaListSkeleton: FunctionComponent<Props> = () => (
  <Stack>
    <Skeleton width="20%" height={35} mb="xs" radius="xl" />

    <Carousel
      slideSize={{ base: "33%", sm: "25%", md: "20%" }}
      slideGap="md"
      align="start"
      slidesToScroll="auto"
      controlsOffset="xs"
      controlSize={50}
    >
      {
        [...Array(5)].map((_, i) => (
          <Carousel.Slide key={i}>
            <Card>
              <Card.Section>
                <Skeleton height={297} mb="xs" radius="md" />
                <Skeleton w="99%" height={20} radius="xl" />
              </Card.Section>
            </Card>
          </Carousel.Slide>
        ))
      }
    </Carousel>
  </Stack>
);

export default MangaListSkeleton;