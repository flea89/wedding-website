import React, { useRef, useState } from "react";
import { getPageCopy } from "../../utils/getPageCopy";

export default function Index(context) {
  return <>
    <h1>{context.title}</h1>
  </>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale,
      ...(await getPageCopy("recipes", {locale})),
    },
  };
}
