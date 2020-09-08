import React from "react";

import { FormattedNumber, IntlProvider } from "react-intl";

export default function Curso({ data }) {
  const pg = data?.forma_pagamentos[0];

  return (
    <div
      className="curso shadow"
      onClick={() => (location.href = `/cursos/${data.id}`)}
    >
      <div className="curso-box">
        <h1 className="course-title">{data.nome}</h1>
        <div className="course-info">
          <ul>
            <li>
              <i className="mdi mdi-office-building-outline"></i>
              Instituição: {data.instituicao}
            </li>
            <li>
              <i className="mdi mdi-earth"></i>
              Tipo: {data.tipo}
            </li>
            <li>
              <i className="mdi mdi-calendar"></i>
              Duração: {data.duracao}
            </li>
          </ul>
        </div>
      </div>

      <IntlProvider locale="pt-br" defaultLocale="pt-br">
        <div className="price-card">
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
        </div>
      </IntlProvider>
    </div>
  );
}
