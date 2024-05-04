import React from 'react';

function convertHTMLToReact(htmlString) {
  return React.createElement('div', {
    dangerouslySetInnerHTML: { __html: htmlString }
  });
}

export default convertHTMLToReact;
