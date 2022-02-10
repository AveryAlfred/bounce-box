import * as PIXI from 'pixi.js';
import { useCallback } from 'react';
import { CustomPIXIComponent } from 'react-pixi-fiber';

// Custom pixi component
const TYPE = 'GRAPHICS_V2';
const behavior = {
  customDisplayObject: (props) => new PIXI.Graphics(),
  customApplyProps: function (instance, oldProps, newProps) {
    const { draw: oldDraw, ...restOld } = oldProps;
    const { draw, ...restNew } = newProps;
    instance.clear();
    draw(instance);
    this.applyDisplayObjectProps(restOld, restNew);
  },
};
export const Graphics = CustomPIXIComponent(behavior, TYPE);

export const Block = ({ shape, type }: { shape: []; type: string }) => {
  const dimensions: number[] = [];
  const fillDimension = shape.map((el) => {
    dimensions.push(el.x, el.y);
  });

  const draw = useCallback(
    (g) => {
      g.clear();
      type === 'walls' && g.beginFill(0xf3f3f3);
      type === 'boxes' && g.beginFill(0x3b3b3a);
      if (type === 'boxes') {
        g.lineStyle(1, 0xf3f3f3);
      }
      g.drawPolygon(dimensions);
      g.endFill();
    },
    [shape]
  );

  return <Graphics draw={draw} />;
};
