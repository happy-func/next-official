import Banner from "../business/home/banner";
import Attachment from "../business/home/attachment/Attachment";
import Macbook from "../business/home/macbook";
import PageTitle from "../components/title";

export default function Home() {
  return (
    <div>
      <PageTitle title="首页" />
      <Macbook />
      <Banner />
      <Attachment />
    </div>
  );
}
