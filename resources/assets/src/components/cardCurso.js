import React from "react";

import { FormattedNumber, IntlProvider } from "react-intl";

function PriceCard({ pg }) {
  return (
    <label className="price-card payment-selected" htmlFor={`payment${pg.id}`}>
      <IntlProvider locale="pt-br" defaultLocale="pt-br">
        <div className="text-center">
          <div className="payment">
            {pg?.tipo == "cartao" ? "Cartão" : "Boleto"} - {pg?.conclusao}
          </div>

          <div className="discount-percentage">
            Economize{" "}
            <FormattedNumber value={pg?.desconto / 100} style="percent" />
          </div>
        </div>

        <div className="text-center">
          <div className="old-price">
            {pg?.parcelas > 1 ? `${pg?.parcelas}x ` : ""}
            <FormattedNumber
              value={pg?.valor_parcela}
              style="currency"
              currency="BRL"
            />
          </div>
          <div className="price">
            {pg?.parcelas > 1 ? `${pg?.parcelas}x ` : ""}
            <FormattedNumber
              value={pg?.valor_parcela * (1 - pg?.desconto / 100)}
              style="currency"
              currency="BRL"
            />
          </div>
        </div>
      </IntlProvider>
    </label>
  );
}

export default function Curso({ data, closeTab, home }) {
  const pg = data?.forma_pagamentos[0];

  return (
    <div className={`curso shadow ${home ? "" : "fully-rounded"}`}>
      {home && (
        <button
          onClick={closeTab}
          className="close-curso shadow mdi mdi-chevron-left mdi-24px"
        />
      )}
      <h1 className="course-title">{data.nome}</h1>
      <div className="curso-box">
        <div className="course-info">
          <ul>
            <li>
              <i className="mdi mdi-bank"></i>
              Instituição: {data.instituicao}
            </li>
            <li>
              <i className="mdi mdi-earth"></i>
              Tipo: {data.tipo}
            </li>
            <li>
              <i className="mdi mdi-clock-outline"></i>
              Duração: {data.duracao}
            </li>
          </ul>
        </div>
      </div>

      <div>
        <PriceCard pg={pg} />

        <a className="open-curso" href={`/cursos/${data.id}`}>
          Ver mais detalhes <span className="mdi mdi-arrow-right"></span>
        </a>
      </div>
    </div>
  );
}

{
  /* <div className="price-card">
  <IntlProvider locale="pt-br" defaultLocale="pt-br">
    <span className="old-price">
      {pg?.parcelas > 1 ? `${pg?.parcelas}x ` : ""}{" "}
      <FormattedNumber
        value={pg?.valor_parcela}
        style="currency"
        currency="BRL"
      />
    </span>
    <span className="price">
      {pg?.parcelas > 1 ? `${pg?.parcelas}x ` : ""}{" "}
      <FormattedNumber
        value={pg?.valor_parcela * (1 - pg?.desconto / 100)}
        style="currency"
        currency="BRL"
      />
    </span>
    <span className="discount-percentage">
      desconto de{" "}
      <FormattedNumber value={pg?.desconto / 100} style="percent" />
    </span>
    <span className="discount-price">
      Economize{" "}
      <FormattedNumber
        value={pg?.valor_total - pg?.valor_liquido}
        style="currency"
        currency="BRL"
      />
    </span>

    <div className="payment-info">
      <span className="payment">
        {pg?.tipo == "cartao" ? "Cartão" : "Boleto"} em {pg?.conclusao}
      </span>
    </div>
  </IntlProvider>
</div> */
}
