/**
 * 頂点数からRtableに描画される画像の角度(ラジアン)を算出する。
 * @param lengthOfVertex
 */
const calcRadianFromVertexLen = (lengthOfVertex: number): Array<number> => {
  const sumOfInteriorAngle = 180 * (lengthOfVertex - 2);
  const InteriorAngle = sumOfInteriorAngle / lengthOfVertex;
  const valueOfCorrection = ((180 - InteriorAngle) / 2) * 2;

  return [...Array(lengthOfVertex)].map((_, v) => {
    return (valueOfCorrection * v * Math.PI) / 180;
  });
};

export default calcRadianFromVertexLen;
