import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { Text, Icon } from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Card from "components/card/Card.js";
import PropTypes from "prop-types";

export default function MiniCalendar(props) {
  const { selectRange, ...rest } = props;
  const [value, setValue] = useState(new Date());
  return (
    <Card
      align='center'
      direction='column'
      w='100%'
      maxW='max-content'
      p='20px 15px'
      h='max-content'
      {...rest}>
      <Calendar
        onChange={setValue}
        value={value}
        selectRange={selectRange}
        view={"month"}
        tileContent={<Text color='brand.500'></Text>}
        prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px' />}
        nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px' />}
      />
    </Card>
  );
}

MiniCalendar.propTypes = {
  selectRange: PropTypes.bool,
};