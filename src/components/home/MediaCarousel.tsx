import { Box, Flex, Image, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface MediaCarouselProps {
  media: string[];
  alt: string;
}

export const MediaCarousel = ({ media, alt }: MediaCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const isVideo = (url: string) => {
    return /\.(mp4|webm|ogg|avi|mov)$/i.test(url) || url.includes("video");
  };

  if (!media || media.length === 0) {
    return null;
  }

  return (
    <Box position="relative" w="full">
      {/* Main media display */}
      <Box position="relative" h={600}>
        {isVideo(media[currentIndex]) ? (
          <video
            src={media[currentIndex]}
            controls
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "4px",
              objectFit: "cover",
            }}
          />
        ) : (
          <Image
            src={media[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            w="full"
            h="full"
            borderRadius={4}
            objectFit="contain"
            loading="lazy"
          />
        )}

        {/* Navigation arrows - only show if more than 1 media item */}
        {media.length > 1 && (
          <>
            <IconButton
              aria-label="Previous media"
              as={IoChevronBack}
              position="absolute"
              left={2}
              top="50%"
              transform="translateY(-50%)"
              bg="blackAlpha.600"
              color="white"
              size="2xs"
              borderRadius="full"
              _hover={{ bg: "blackAlpha.800" }}
              onClick={prevSlide}
            />
            <IconButton
              aria-label="Next media"
              as={IoChevronForward}
              position="absolute"
              right={2}
              top="50%"
              transform="translateY(-50%)"
              bg="blackAlpha.600"
              color="white"
              size="2xs"
              borderRadius="full"
              _hover={{ bg: "blackAlpha.800" }}
              onClick={nextSlide}
            />
          </>
        )}
      </Box>

      {/* Dots indicator - only show if more than 1 media item */}
      {media.length > 1 && (
        <Flex justify="center" mt={2} gap={1}>
          {media.map((_, index) => (
            <Box
              key={index}
              w={2}
              h={2}
              borderRadius="full"
              bg={index === currentIndex ? "white" : "whiteAlpha.500"}
              cursor="pointer"
              onClick={() => setCurrentIndex(index)}
              transition="all 0.2s"
              _hover={{ bg: "whiteAlpha.700" }}
            />
          ))}
        </Flex>
      )}
    </Box>
  );
};
