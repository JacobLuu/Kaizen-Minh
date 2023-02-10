import React, { useRef } from 'react';
import { Tooltip, Box } from '@material-ui/core';

interface ITooltipCustom {
  children: any;
  title: string;
}

export default function TooltipCustom({ children, title }: ITooltipCustom) {
  const positionRef = useRef({
    x: 0,
    y: 0,
  });

  const popperRef = useRef(null);
  const areaRef = useRef(null);

  const handleMouseMove = (event) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };

  return (
    <Tooltip
      title={title}
      placement="right"
      PopperProps={{
        popperRef,
        anchorEl: {
          getBoundingClientRect: () => {
            return new DOMRect(
              positionRef.current.x,
              areaRef.current.getBoundingClientRect().y,
              0,
              0
            );
          },
        },
      }}
    >
      <Box ref={areaRef} onMouseMove={handleMouseMove}>
        {children}
      </Box>
    </Tooltip>
  );
}
