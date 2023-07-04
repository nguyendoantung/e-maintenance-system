import React from 'react';
import { Link } from '@material-ui/core';

const QA = () => {
  // console.log('adavdasvj');
  return (
    <>
      <div style={{ margin: '2%' }}>QA page</div>
      {[1, 2, 3, 4].map((num, index) => {
        return (
          <>
            <Link href={`/${num}`}>{num}</Link>
            <br />
          </>
        );
      })}
    </>
  );
};

export default QA;
