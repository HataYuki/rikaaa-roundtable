import "./test.spec";

interface karmaWindow extends Window {
  __html__: string;
}
declare let window: karmaWindow;
export default window;
