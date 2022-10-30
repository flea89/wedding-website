import React, { useRef, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { getPageCopy } from "../utils/getPageCopy";
import metaImg from "../public/meta.jpg";
import classNames from "classnames";

export default function Ruutsu(context) {
  let form = useRef();
  let [rsvpSent, setRsvpSent] = useState(false);
  let [rsvpError, setRsvpError] = useState(false);
  let [rsvpSending, setRsvpSending] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.values(form.current).reduce((obj, field) => {
      obj[field.name] = field.value;
      return obj;
    }, {});
    setRsvpSending(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setRsvpError(!res.ok);
      setRsvpSent(res.ok);
    } catch (e) {
      setRsvpError(true);
    } finally {
      setRsvpSending(false);
    }
  }

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

          <p>{context.date}</p>
          <text></text>
        </section>
        <section id="schedule">
          <div className="mb4">
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
          </div>
          <div>
            Per far in modo di organizzare la festa ti chiediamo di confermare
            la presenza entro il 31 Maggio 2023{" "}
            <label htmlFor="toggle" className="dib b underline mb3">
              cliccando qui
            </label>
            <input
              className={classNames("hidden", styles.toggle)}
              id="toggle"
              name=""
              type="checkbox"
            />
            {rsvpSent ? (
              <div> Grazie</div>
            ) : (
              <form ref={form} onSubmit={onSubmit}>
                <h3>RSVP</h3>
                <label className="db mb3">
                  Nome(i):
                  <input
                    required
                    className="db"
                    type="text"
                    name="names"
                  ></input>
                </label>
                <fieldset className="db mb3">
                  <legend>Ci sarò/saremo: </legend>
                  <input
                    type="radio"
                    id="yes"
                    name="rsvp"
                    value="yes"
                    checked
                  />
                  <label className="ml1" htmlFor="yes">
                    si
                  </label>
                  <input
                    className="ml3"
                    type="radio"
                    id="no"
                    name="rsvp"
                    value="yes"
                  />
                  <label className="ml1" htmlFor="no">
                    no
                  </label>
                </fieldset>
                <label className="db mb3">
                  C&apos;e qualche cibo che non mangi?
                  <textarea
                    className="db"
                    name="dietary-requirements"
                  ></textarea>
                </label>
                <fieldset className="db mb3">
                  <legend>Porto i miei bimbi: </legend>
                  <input type="radio" id="yes" name="kids" value="yes" />
                  <label className="ml1" htmlFor="no">
                    si
                  </label>
                  <input
                    className="ml3"
                    type="radio"
                    id="yes"
                    name="kids"
                    value="no"
                    checked
                  />
                  <label className="ml1" htmlFor="yes">
                    no
                  </label>
                </fieldset>
                <fieldset className="db mb3">
                  <legend>Hai bisogno di un passaggio? </legend>
                  <input type="radio" id="yes" name="transport" value="yes" />
                  <label className="ml1" htmlFor="yes">
                    si
                  </label>
                  <input
                    className="ml3"
                    type="radio"
                    id="yes"
                    name="transport"
                    value="no"
                    checked
                  />
                  <label className="ml1" htmlFor="no">
                    no
                  </label>
                </fieldset>
                <label className="db mb3">
                  Hai qualche domanda?
                  <textarea className="db" name="questions"></textarea>
                </label>
                <div className="db relative pb2">
                  <button className="db" type="submit">
                    Invia
                  </button>
                  <div className="absolute w-100">
                    <div hidden={!rsvpSending} className="spinner">
                      <div className="bounce1"></div>
                      <div className="bounce2"></div>
                      <div className="bounce3"></div>
                    </div>
                  </div>
                </div>
                {rsvpError ? (
                  <div className="dark-red"> Errore, riprova piu tardi!</div>
                ) : (
                  ""
                )}
              </form>
            )}
          </div>
        </section>
        <section></section>
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
