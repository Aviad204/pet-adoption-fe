import React from "react";
import { Badge, Flex, Avatar, Box, Text } from "@chakra-ui/react";
import "./petsfeed.css";

function PetsFeed() {
  return (
    <div className="actual-feed-item mb-1">
      <Flex>
        <Avatar src="data:image/jpeg;base64,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" />
        <Box ml="3">
          <div className="pet-name-container">
            <Text className="text-left" fontWeight="bold">
              Lucky
              <Badge ml="1" colorScheme="green">
                Dog
              </Badge>
            </Text>
          </div>
          <Text fontSize="sm">
            <span>Lucky</span> the <span>dog</span> is now available!
          </Text>
        </Box>
      </Flex>
    </div>
  );
}

export default PetsFeed;