import { Beer } from "./beersRepository";

const IMG_SRC_FALLBACK = "https://images.punkapi.com/v2/keg.png";
export default function getBeerImageSrc(beer: Pick<Beer, "image_url">): string {
  return beer.image_url ?? IMG_SRC_FALLBACK;
}
