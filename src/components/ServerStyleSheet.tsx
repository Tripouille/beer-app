"use client";

import { useServerInsertedHTML } from "next/navigation";
import { getCssText } from "@/styles/config";
import { ReactElement } from "react";

export function ServerStyleSheet({ children }: { children: ReactElement }) {
  useServerInsertedHTML(() => {
    return (
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
    );
  });

  return children;
}
