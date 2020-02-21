/**
 * 第一引数に指定された文字列から余計な空白、開業を削除する。
 * @param string
 */
const trim = (string: string): string => string.replace(/\r?\n?\s?\t?\s/g, "");

export default trim;
