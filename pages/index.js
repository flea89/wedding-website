import React, { useRef, useState } from "react";
import Head from "next/head";
import { getPageCopy } from "../utils/fsUtil";
import heroImg from "../public/hero.jpg";
import heelsImg from "../public/heels.png";
import rsvpImg from "../public/rsvp.png";
import planeImg from "../public/plane.png";
import trainImg from "../public/train.png";
import bedImg from "../public/bed.png";
import busImg from "../public/bus.png";
import classNames from "classnames";
import Image from "next/image";
import HeadMeta from "../components/HeadMeta";

export default function Index(context) {
  let form = useRef();
  let [rsvpSent, setRsvpSent] = useState(false);
  let [rsvpError, setRsvpError] = useState(false);
  let [rsvpSending, setRsvpSending] = useState(false);
  let [rsvpVisibility, setRsvpVisibility] = useState(false);

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
        <HeadMeta pageContext={context} />
      </Head>
      <header className="ph4 w-100 pv3 mb4 mb5-ns bt bb overflow-auto position-sticky-top background-white z1">
        {context.menu.map((i, index) => (
          <a className="mr3 ttc" key={index} href={i.link}>
            {i.text}
          </a>
        ))}
      </header>
      <main className="ph4 mw8 flex flex-column center tc-ns">
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
          <div className="mb4 cf">
            <h2>{context.s_title}</h2>
            <div className="fl w-100 w-50-ns">
              <h3>{context.s_cerimony}</h3>
              <p>
                {context.cerimony_location} <br></br>
                {context.cerimony_address} <br></br>
                {context.cerimony_city}
              </p>
              <a
                href="https://goo.gl/maps/rgTwHdx8h6r7q6Vo9"
                target="_blank"
                rel="noreferrer"
              >
                {context.find_on_maps}
              </a>
            </div>
            <div className="fl w-100 w-50-ns mt4 mt0-ns">
              <h3>{context.s_reception}</h3>
              <p>{context.s_reception_desc}</p>
              <p>
                {context.reception_location} <br></br>
                {context.reception_address} <br></br>
                {context.reception_city}
              </p>
              <a
                href="https://goo.gl/maps/cbqqZZt36PAM7toy9"
                target="_blank"
                rel="noreferrer"
              >
                {context.find_on_maps}
              </a>
            </div>
          </div>
          <div className="mb2">
            <Image
              src={heelsImg}
              alt="Icona tacchi a spillo"
              width={50}
              height={50}
            ></Image>
            <div>{context.lady_heels}</div>
          </div>
          <div>
            <div className="tr tc-ns">
              <Image
                src={rsvpImg}
                alt="Icona RSVP"
                width={50}
                height={50}
              ></Image>
              <div>{context.rsvp_desc} </div>
              <button
                className="clear-button-styles underline"
                onClick={() => setRsvpVisibility(!rsvpVisibility)}
              >
                {context.rsvp_toggle_text}
              </button>
            </div>
            {rsvpVisibility ? (
              rsvpSent ? (
                <div> {context.success_message} </div>
              ) : (
                <form className="mw6 center-ns" ref={form} onSubmit={onSubmit}>
                  <h3>{context.f_title}</h3>
                  <label className="db mb3">
                    {context.input_name}:
                    <input
                      required
                      className="db center-ns"
                      type="text"
                      name="names"
                    ></input>
                  </label>
                  <fieldset className="db mb3">
                    <legend>{context.input_av}: </legend>
                    <input
                      type="radio"
                      id="rsvp_yes"
                      name="rsvp"
                      value="yes"
                      checked
                      readOnly
                    />
                    <label className="ml1" htmlFor="rsvp_yes">
                      {context.yes}
                    </label>
                    <input
                      className="ml3"
                      type="radio"
                      id="rsvp_no"
                      name="rsvp"
                      value="no"
                    />
                    <label className="ml1" htmlFor="rsvp_no">
                      {context.no}
                    </label>
                  </fieldset>
                  <label className="db mb3">
                    {context.input_dietary}:
                    <textarea
                      className="db center-ns"
                      name="dietary-requirements"
                    ></textarea>
                  </label>
                  <fieldset className="db mb3">
                    <legend>{context.input_kids}: </legend>
                    <input type="radio" id="kids_yes" name="kids" value="yes" />
                    <label className="ml1" htmlFor="kids_yes">
                      {context.yes}
                    </label>
                    <input
                      className="ml3"
                      type="radio"
                      id="kids_no"
                      name="kids"
                      value="no"
                      checked
                      readOnly
                    />
                    <label className="ml1" htmlFor="kids_no">
                      {context.no}
                    </label>
                  </fieldset>
                  <fieldset className="db mb3">
                    <legend
                      dangerouslySetInnerHTML={{
                        __html: context.input_transport,
                      }}
                    />
                    <input
                      type="radio"
                      id="transport_yes"
                      name="transport"
                      value="yes"
                    />
                    <label className="ml1" htmlFor="transport_yes">
                      {context.yes}
                    </label>
                    <input
                      className="ml3"
                      type="radio"
                      id="transport_no"
                      name="transport"
                      value="no"
                      checked
                      readOnly
                    />
                    <label className="ml1" htmlFor="transport_no">
                      {context.no}
                    </label>
                  </fieldset>
                  <label className="db mb3">
                    {context.input_question}
                    <textarea
                      className="db center-ns"
                      name="questions"
                    ></textarea>
                  </label>
                  <div className="db relative pb2">
                    <button className="db center-ns" type="submit">
                      {context.send}
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
              )
            ) : (
              <></>
            )}
          </div>
        </section>
        <section id="info" className="tc-ns">
          <h2>{context.i_title}</h2>
          <p>{context.i_desc}</p>
          <div className="mt4 cf">
            <div className="fl w-100 w-50-ns pr4-ns">
              <h3>
                <Image
                  src={planeImg}
                  className="mr2"
                  alt="Icona aeroplano"
                  width={20}
                  height={20}
                ></Image>
                {context.i_aero_title}
              </h3>
              <dl>
                <dt className="mb1 b">{context.levaldigi}</dt>
                <dd className="ml0 mb3">
                  <a
                    href="https://goo.gl/maps/2GmPcmM8LPmbDew57"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {context.find_on_maps}
                  </a>
                </dd>
                <dt className="mb1 b">{context.caselle}</dt>
                <dd className="ml0 mb3">
                  <a
                    href="https://goo.gl/maps/5LdGddLw4UekbT698"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {context.find_on_maps}
                  </a>
                </dd>
              </dl>
            </div>
            <div className="fl w-100 w-50-ns mt4 mt0-ns">
              <h3 className="">
                <Image
                  src={trainImg}
                  className="mr2"
                  alt="Icona treno"
                  width={20}
                  height={20}
                ></Image>
                {context.i_train_title}
              </h3>
              <p>
                <a
                  href="https://goo.gl/maps/tSezF4RzSmQAyGfi9"
                  target="_blank"
                  rel="noreferrer"
                >
                  {context.i_station}
                </a>{" "}
                {context.i_station_desc}
              </p>
            </div>
          </div>
          <div className="mt4 cf tc-ns">
            <div className="fl w-100 w-50-ns pr4-ns">
              <h3>
                <Image
                  src={bedImg}
                  className="mr2"
                  alt="Icona hotel"
                  width={20}
                  height={20}
                ></Image>
                {context.i_acc_title}
              </h3>
              <p>{context.i_acc_desc}</p>
              <p>{context.i_acc_desc_2}</p>
              <ul className="dib tl">
                {context.hotels.map((h) => (
                  <li key={h.name}>
                    <a href={h.link} target="_blank" rel="noreferrer">
                      {h.name}
                    </a>
                  </li>
                ))}
              </ul>
              <p>{context.i_acc_call}</p>
            </div>
            <div className="fl w-100 w-50-ns mt4 mt0-ns">
              <h3 className="">
                <Image
                  src={busImg}
                  className="mr2"
                  alt="Icona bus"
                  width={20}
                  height={20}
                ></Image>
                {context.i_transport_title}
              </h3>
              <p>{context.i_transport_desc}</p>
              <p>
                <span className="b">Dronero → Villa Kimera</span>,{" "}
                {context.i_trasport_reception}{" "}
              </p>
              <p>
                <span className="b">Villa Kimera → Cuneo → Dronero</span>,{" "}
                {context.i_trasport_back}{" "}
              </p>
            </div>
          </div>
        </section>

        <section id="wishing-well">
          <h2>{context.g_title}</h2>
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
              <span className="i dib f3">{context.g_quote}</span>
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
            <div className="f6 tr pt1 pr4">({context.g_sait})</div>
          </div>
          <p
            className="mt4 mb3"
            dangerouslySetInnerHTML={{ __html: context.g_desc }}
          ></p>
          <div className="mb4 mt4 cf">
            <div className="fl w-100 w-50-ns pr4-ns">
              <h4>Coordinate bancarie (euro):</h4>
              <p>
                Denominazione Conto: Anna Astesano <br></br>
                IBAN: IT42B0843946280000030119924 <br></br>
                BIC: CCRTIT2TCAR <br></br>
                Causale: regalo di nozze
              </p>
            </div>
            <div className="fl w-100 w-50-ns mt4 mt0-ns">
              <h4>Bank details (GBP):</h4>
              <p>
                Account name: Paolo Chillari <br></br>
                Sort Code: 20-41-41<br></br>
                Account number: 60373303<br></br>
                Reason: wedding gift
              </p>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: context.g_list }}></div>
        </section>
        <section id="donations">
          <h2>{context.d_title}</h2>
          {context.d_ps.map((p, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: p }}></p>
          ))}
        </section>
      </main>

      <footer className="ph4 mw8 mt5 center tc f7">
        <p>
          {context.footer_contact}{" "}
          <a href="mailto:an.astesano@gmail.com">an.astesano@gmail.com</a>
        </p>
        <p>{context.footer_dev}</p>
      </footer>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  console.log(locale);
  return {
    props: {
      locale,
      ...(await getPageCopy("home", { locale })),
    },
  };
}
