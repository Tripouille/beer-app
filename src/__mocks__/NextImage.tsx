/* eslint-disable @next/next/no-img-element */

export default function NextImage({ src, alt }: JSX.IntrinsicElements["img"]) {
  return <img src={src} alt={alt} />;
}
