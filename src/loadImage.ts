interface ImageResorce {
  img: HTMLImageElement;
  src: string;
}

/**
 * 指定されたパスの画像が読み込まれたときImageResource型のデータを返すPromiseを返す。
 * @param src 読み込みたい画像パス。
 */
const loadImage = (src: string): Promise<ImageResorce> => {
  return new Promise((resolve): void => {
    const img = new Image();

    const handleLoade = (): void => {
      resolve({ img: img, src: src });
    };

    img.addEventListener("load", () => {
      handleLoade();
    });

    img.src = src;
  });
};

export { loadImage, ImageResorce };
