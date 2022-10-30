import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { getPageCopy } from "../utils/getPageCopy";
import metaImg from "../public/meta.jpg";

export default function Ruutsu(context) {
  return (
    <div>
      <Head>
        <title>{context.meta.title}</title>
        <meta name="description" content={context.meta.desc} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`${context.meta.site}${metaImg.src}`}
        />
        <meta property="og:title" content={context.meta.title} />
        <meta
          name="description"
          content={context.meta.desc}
          itemProp="description"
        />
        <meta property="og:description" content={context.meta.desc} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={context.meta.title} />
        <meta name="twitter:description" content={context.meta.desc} />
        <meta
          name="twitter:image"
          content={`${context.meta.site}${metaImg.src}`}
        />
      </Head>
      <header className="ph4 w-100 pv3 mb4 mb5-ns bt bb overflow-auto position-sticky-top background-white">
        {context.menu.map((i, index) => (
          <a className="mr3 ttc" key={index} href={i.link}>
            {i.text}
          </a>
        ))}
      </header>
      <main className="ph4 mw8 flex flex-column center">
        <section id="home" className="flex flex-column items-center">
          <h1>{context.title}</h1>
          <img></img>
          <p>{context.date}</p>
          <text></text>
        </section>
        <section id="schedule">
          <h2>Agenda</h2>
          <h3>Cerimonia</h3>
          <p>
            Santuario di Ripoli, <br></br>Via Montemale,<br></br> Dronero CN
          </p>
          <a
            href="https://goo.gl/maps/rgTwHdx8h6r7q6Vo9"
            target="_blank"
            rel="noreferrer"
          >
            Trovalo su Google Maps
          </a>
          <h3 className="mt4">Reception</h3>
          <p>
            Villa Kimera, <br></br> Cuneo
          </p>
          <a
            href="https://goo.gl/maps/rgTwHdx8h6r7q6Vo9"
            target="_blank"
            rel="noreferrer"
          >
            Trovalo su Google Maps
          </a>
        </section>
        <section>RSVP</section>
        <section id="schedule">
          <h2>Regali</h2>
        </section>
        <section id="donations">
          <h2>Donazioni</h2>
        </section>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale,
      ...(await getPageCopy("home", locale)),
    },
  };
}
