import React from 'react';
import { Wrapper } from './styles';

function ContentLayout({ children, scrollToTop}: any) {
  const scrollToTopRef = React.useRef(null);

  React.useEffect(() => {
    scrollToTopRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }, [scrollToTop]);

  return (
    <Wrapper>
      <div ref={scrollToTopRef} />
      {children}
    </Wrapper>
  );
}

export default React.memo(ContentLayout);
