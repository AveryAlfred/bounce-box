import Matter from 'matter-js';

export const gameOptions = () => {
  const frameRate = 1000 / 30;
  const canvas = { width: 400, height: 200 };
  const boxes = 20;
  const boxSize = 20;
  const wallThickness = 10;

  const entities = {
    boxes: [...Array(boxes)].map(() =>
      Matter.Bodies.rectangle(
        Math.random() * canvas.width,
        boxSize,
        Math.random() * boxSize + boxSize,
        Math.random() * boxSize + boxSize
      )
    ),
    walls: [
      Matter.Bodies.rectangle(
        canvas.width / 2,
        0,
        canvas.width,
        wallThickness,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        0,
        canvas.height / 2,
        wallThickness,
        canvas.height,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        canvas.width,
        canvas.width / 2,
        wallThickness,
        canvas.width,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        canvas.width / 2,
        canvas.height,
        canvas.width,
        wallThickness,
        { isStatic: true }
      ),
    ],
  };

  return {
    frameRate,
    canvas,
    boxSize,
    boxes,
    wallThickness,
    entities,
  };
};
