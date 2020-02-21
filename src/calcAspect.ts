interface Aspect {
  w: number;
  h: number;
}

const calcAspect = (w, h): Aspect => {
  return [w, h].reduce((a, c, i, array) => {
    const result: Partial<Aspect> = {};
    const gcd = (w: number, h: number): number => {
      if (!h) return w;
      else return gcd(h, w % h);
    };
    if (i === 0) result.w = c / gcd(array[1], array[0]);
    if (i === 1) result.h = c / gcd(array[1], array[0]);
    return Object.assign(a, result);
  }, {});
};

export { Aspect, calcAspect };
