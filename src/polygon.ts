/**
 * 辺の長さと超点数を指定して作られる正多角形の各辺から中央までの距離を返す。
 * @param lengthOfASide
 * @param LengthOfVertex
 */
const calcHeightFromBase = (
  lengthOfASide: number,
  LengthOfVertex: number
): number => {
  const sumOfInteriorAngle = 180 * (LengthOfVertex - 2);
  const InteriorAngle = sumOfInteriorAngle / LengthOfVertex;
  const tanOfDeg = Math.tan(((InteriorAngle / 2) * Math.PI) / 180);
  return (tanOfDeg * lengthOfASide) / 2;
};

/**
 * 辺の長さと超点数を指定して、正多角形の座標を返す。
 * @param lengthOfASide 変の長さ
 * @param LengthOfVertex 頂点数
 */
const polygon = (
  lengthOfASide: number,
  LengthOfVertex: number
): Array<Array<number>> => {
  const heigthFromBase = calcHeightFromBase(lengthOfASide, LengthOfVertex);
  const radius = Math.sqrt(
    Math.pow(lengthOfASide / 2, 2) + Math.pow(heigthFromBase, 2)
  );
  const degOfFix = (360 / LengthOfVertex / 2) * -1;

  return [...Array(LengthOfVertex)].map((_, v) => {
    const deg = (360 / LengthOfVertex) * v + degOfFix,
      radian = (deg * Math.PI) / 180,
      posX = radius * Math.cos(radian),
      posY = radius * Math.sin(radian);
    return [posX, posY];
  });
};

export { polygon, calcHeightFromBase };
