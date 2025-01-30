import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function ScrollToTop({ history, children }) {
  useEffect(() => {
      if (!window.location.href.includes('/templates')) {

          const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
          });
          return () => {
            unlisten();
          }
      }
  });


  return <Fragment>{children}</Fragment>;
}

ScrollToTop.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(ScrollToTop);