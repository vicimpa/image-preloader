import { Image } from "components/Image";

export const App = () => {

  return (
    <div style={{ width: 600, height: 300 }}>
      <Image src="/images/bg.jpg" minSrc="/images/bg-min.jpg">
        <p>Загрузка...</p>
      </Image>
    </div>
  );
};