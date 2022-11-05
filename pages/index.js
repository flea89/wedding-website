import React, { useRef, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { getPageCopy } from "../utils/getPageCopy";
import metaImg from "../public/meta.jpg";
import heroImg from "../public/hero.jpg";
import heelsImg from "../public/heels.png";
import rsvpImg from "../public/rsvp.png";
import planeImg from "../public/plane.png";
import trainImg from "../public/train.png";
import bedImg from "../public/bed.png";
import busImg from "../public/bus.png";
import classNames from "classnames";
import Image from "next/image";

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
          content={`${context.meta.site}${heroImg.src}`}
        />
      </Head>
      <header className="ph4 w-100 pv3 mb4 mb5-ns bt bb overflow-auto position-sticky-top background-white z1">
        {context.menu.map((i, index) => (
          <a className="mr3 ttc" key={index} href={i.link}>
            {i.text}
          </a>
        ))}
      </header>
      <main className="ph4 mw8 flex flex-column center">
        <section id="home" className="flex flex-column items-center">
          <h1 className="flex flex-column content-center">
            <div> Anna </div>
            <div className="and f4">&</div>
            <div> Paolo </div>
          </h1>
          <Image
            src={heroImg}
            priority
            alt="Paolo ed Anna coricati sull'erba a Richmond Park"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              opacity: 0.9,
            }}
          />
          <p className="pt4 f2">{context.date}</p>
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
            <h3 className="mt4">Ricevimento</h3>
            <p>
              Dopo la cerimonia i festeggiamenti continueranno presso Villa
              Kimera
            </p>
            <p>
              Via Basse di Chiusano 10,<br></br> 12100 Cuneo
            </p>
            <a
              href="https://goo.gl/maps/rgTwHdx8h6r7q6Vo9"
              target="_blank"
              rel="noreferrer"
            >
              Trovalo su Google Maps
            </a>
          </div>
          <p>
            <Image
              src={heelsImg}
              alt="Icona tacchi a spillo"
              width={50}
              height={50}
            ></Image>
            <div>
              Per le signore: sterrato ed erba sia al Santuario di Madonna di
              Ripoli che a Villa Kimera!
            </div>
          </p>
          <div>
            <Image
              src={rsvpImg}
              alt="Icona RSVP"
              width={50}
              height={50}
            ></Image>
            <div>
              Per far in modo di organizzare la festa ti chiediamo di confermare
              la presenza entro il 31 Maggio 2023{" "}
            </div>
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
        <section id="info">
          <h2>Informazioni pratiche</h2>
          <p>
            In questa sezione cerchiamo di riassumere le opzioni di mezzi
            pubblici per gli ospiti che viaggiano da lontano o dall’estero per
            avvicinarsi il più possibile a Dronero:
          </p>
          <h3 className="mt4">
            <Image
              src={planeImg}
              className="mr2"
              alt="Icona aeroplano"
              width={20}
              height={20}
            ></Image>
            Aeroporti
          </h3>
          <dl>
            <dt className="mb1 b">Aeroporto Cuneo (26 km da Dronero)</dt>
            <dd className="ml0 mb3">
              <a
                href="https://g.page/cuf_cuneoairport?share"
                target="_blank"
                rel="noreferrer"
              >
                Trovalo su maps
              </a>
            </dd>
            <dt className="mb1 b">Aeroporto Torino (135 km da Dronero)</dt>
            <dd className="ml0 mb3">
              <a
                href="https://goo.gl/maps/5LdGddLw4UekbT698"
                target="_blank"
                rel="noreferrer"
              >
                Trovalo su maps
              </a>
            </dd>
          </dl>
          <h3 className="mt4">
            <Image
              src={trainImg}
              className="mr2"
              alt="Icona treno"
              width={20}
              height={20}
            ></Image>
            Treno
          </h3>
          <p>
            <a
              href="https://goo.gl/maps/tSezF4RzSmQAyGfi9"
              target="_blank"
              rel="noreferrer"
            >
              Stazione di Cuneo
            </a>{" "}
            (19 km da Dronero), a cui si arriva con il treno da Torino Porta
            Nuova e Porta Susa, raggiungibili con taxi o navetta dall’aeroporto
            di Torino Caselle
          </p>
          <h3>
            <Image
              src={bedImg}
              className="mr2"
              alt="Icona hotel"
              width={20}
              height={20}
            ></Image>
            Pernottamento
          </h3>
          <p>
            La città di Cuneo si trova a circa 18 km da Dronero, ed offre
            un’ampia varietà di alberghi, b&b, alloggi.
          </p>
          <p>
            Se invece voleste soggiornare a Dronero le opzioni consigliate sono:
          </p>
          <ul>
            <li>
              <a
                href="https://ilcavallobianco.com/www/albergo/"
                target="_blank"
                rel="noreferrer"
              >
                Albergo “Il cavallo Bianco
              </a>
            </li>
            <li>
              <a
                href=" https://www.draconeriumhotel.it/"
                target="_blank"
                rel="noreferrer"
              >
                Hotel “Draconerium”
              </a>
            </li>
            <li>
              <a
                href="http://www.locandacabianca.it/it/"
                target="_blank"
                rel="noreferrer"
              >
                Locanda Occitana “Ca’ Bianca”
              </a>
            </li>
          </ul>
          <h3 className="mt4">
            <Image
              src={busImg}
              className="mr2"
              alt="Icona bus"
              width={20}
              height={20}
            ></Image>
            Spostamenti
          </h3>
          <p>
            In base alle conferme ricevute, organizzeremo una navetta che potrà
            servire gli ospiti negli spostamenti da:
          </p>
          <p>
            <span className="b">Dronero → Villa Kimera</span>, a seguito della
            cerimonia
          </p>
          <p>
            <span className="b">Villa Kimera → Cuneo → Dronero</span>, alla fine
            dei festeggiamenti
          </p>
        </section>
        <section id="schedule">
          <h2>Regali</h2>
          <div className="quote pb4 dib">
            <p className="relative pa4 pb0 mb0">
              <span
                className="f1 absolute"
                style={{
                  top: 0,
                  left: 0,
                }}
              >
                ‟
              </span>
              <span className="i dib f3">
                Il mondo è un libro e chi non viaggia ne conosce solo una
                pagina.
              </span>
              <span
                style={{
                  paddingLeft: "1rem",
                  bottom: 0,
                }}
                className="f1 absolute"
              >
                „
              </span>
            </p>
            <div className="f6 tr pt1 pr4">(Sant&apos;Agostino)</div>
          </div>
          <p className="mt4 mb3">
            Vi ringraziamo di cuore se vorrete contribuire ad arricchire il
            nostro libro con una nuova pagina bellissima e indimenticabile:{" "}
            <span className="b">il Vietnam</span>.
          </p>
          <div className="mb4">
            <h4>Coordinate bancarie (euro):</h4>
            <p>
              Denominazione Conto: Anna Astesano <br></br>
              IBAN: IT42B0843946280000030119924 <br></br>
              BIC: CCRTIT2TCAR <br></br>
              Causale: regalo di nozze
            </p>
          </div>
          <div>
            <h4>Coordinate bancarie (sterline):</h4>
            <p>
              Denominazione Conto: Paolo Chillari <br></br>
              Sort Code: 20-41-41<br></br>
              Account number: 60373303<br></br>
              Causale: regalo di nozze
            </p>
          </div>
          <div>
            Se state invece pensando ad un regalo che contribuirà ad abbellire
            la nostra quotidianità, abbiamo creato una Lista Nozze presso{" "}
            <a
              href="https://bosiocasa.it/index.asp"
              target="_blank"
              rel="noreferrer"
            >
              BosioCasa di Cuneo
            </a>
            .
          </div>
        </section>
        <section id="donations">
          <h2>Donazioni</h2>
          <p>
            Ringraziandovi per quanto la vostra presenza renderà speciale il
            nostro giorno, abbiamo deciso di ricambiare il vostro affetto con
            una bomboniera 100% solidale.
          </p>
          <p>
            Effettueremo infatti una donazione all&apos;Associazione{" "}
            <span className="b">“Betania ODV”</span>
            che da anni accoglie minori e persone in situazione di marginalità
            sociale.
          </p>
          <p>
            In particolare, le nostre offerte saranno destinate al villaggio di
            <a
              href="https://goo.gl/maps/VaLo8TqSX3RQrY61A"
              target="_blank"
              rel="noreferrer"
            >
              Emali, Kenya
            </a>
            , dove dal 2006 l&apos;Associazione ha dato vita ad una scuola
            materna, un orfanotrofio, un ambulatorio ed un centro di ascolto.
          </p>
          <p>
            Se siete interessati a leggere di più sull’Associazione “
            <span className="b">Betania ODV”</span> e sul suo operato vi
            invitiamo a farlo qui:
            <a
              href="https://www.associazionebetaniaonlus.org/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.associazionebetaniaonlus.org/
            </a>
          </p>
        </section>
      </main>

      <footer className="ph4 mw8 mt5 center tc f7">
        <p>
          Per qualsiasi informazione, dubbio o chiarimento, potete scriverci
          alla mail{" "}
          <a href="mailto:an.astesano@gmail.com">an.astesano@gmail.com</a>
        </p>
        <p>Se il sito non funziona potete prendervela col futuro sposo :)</p>
      </footer>
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
