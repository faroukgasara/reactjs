import { ListItem } from "@chakra-ui/react";
import React from "react";
import { useDrag } from "react-dnd";

const InsertQuestion = ({ item, playerType, onDropPlayer, index }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: playerType,
    item: () => ({ ...item, index }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        onDropPlayer(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <ListItem  
      p="2"
      borderRadius="md"
      boxShadow="md"
      mb="2"
      textAlign="center"
      ref={dragRef}
      bg={
        isDragging
          ? playerType === "player"
            ? "teal.100"
            : "teal.500"
          : "white"
      }
      color={isDragging ? "white" : "black"}
    >
      {item.libelle}
    </ListItem>
  );
};
export default InsertQuestion;