import { Box, useStyleConfig } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Card(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default Card;

Card.propTypes = {
  variant : PropTypes.string,
  children : PropTypes.any
}