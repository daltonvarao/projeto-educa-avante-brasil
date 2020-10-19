import React, { useEffect } from "react";

import { Select2 } from "./inputs";

import { IntlProvider, FormattedNumber } from "react-intl";

export const FormasPagamentos = ({ formasPagamentos, setFormasPagamentos }) => {
  function handleClick() {
    setFormasPagamentos((state) => [
      ...state,
      {
        parcelas: "",
        conclusao: "",
        tipo: "",
        desconto: "",
        valor_parcela: "",
      },
    ]);
  }

  useEffect(() => {
    if (formasPagamentos.length === 0) {
      handleClick();
    }
  }, [formasPagamentos]);

  return (
    <>
      <h4 className="form-subtitle text-primary">Forma de Pagamento</h4>
      {formasPagamentos.map((data, position) => (
        <FormaPagamento
          data={data}
          position={position}
          key={position}
          formasPagamentos={formasPagamentos}
          setFormasPagamentos={setFormasPagamentos}
        />
      ))}

      <button
        onClick={handleClick}
        className="btn text-primary mb-1 float-right outline-none"
        type="button"
      >
        Nova forma de pagamento
      </button>
    </>
  );
};

const FormaPagamento = ({
  data,
  position,
  formasPagamentos,
  setFormasPagamentos,
}) => {
  function setSelected(
    ev,
    position,
    formasPagamentos,
    setFormasPagamentos,
    fieldName
  ) {
    let value = ev.target.value;
    let newState = [...formasPagamentos];

    newState[position][fieldName] = value;

    setFormasPagamentos(newState);
  }

  function handleRemoveClick(position) {
    const newState = [...formasPagamentos];

    if (newState[position].valor_parcela) {
      if (!window.confirm("Deseja remover este item?")) return;
    }

    newState.splice(position, 1);

    setFormasPagamentos(newState);
  }

  return (
    <>
      <h5 className="form-subtitle text-primary">
        Forma de Pagamento {position + 1}
      </h5>

      <input type="hidden" value={data.id} />

      <div className="form-group-inline">
        <Select2
          name="Parcelas"
          options={[1, 2, 3, 6, 9, 12, 15, 18].map((item) => [item, item])}
          defaultValue={data.parcelas}
          setSelected={(value) => {
            let newState = [...formasPagamentos];

            newState[position]["parcelas"] = value;

            setFormasPagamentos(newState);
          }}
        />
        <input
          className="form-input"
          type="number"
          placeholder="Valor R$ 0.0"
          value={data.valor_parcela}
          onChange={(ev) =>
            setSelected(
              ev,
              position,
              formasPagamentos,
              setFormasPagamentos,
              "valor_parcela"
            )
          }
        />

        <input
          className="form-input"
          type="number"
          placeholder="Desconto % 0.0"
          value={data.desconto}
          onChange={(ev) =>
            setSelected(
              ev,
              position,
              formasPagamentos,
              setFormasPagamentos,
              "desconto"
            )
          }
        />
      </div>
      <div className="form-group-inline">
        <Select2
          name="Tipo"
          options={[
            ["cartao", "Cartão"],
            ["boleto", "Boleto"],
          ]}
          defaultValue={data.tipo}
          setSelected={(value) => {
            let newState = [...formasPagamentos];

            newState[position]["tipo"] = value;

            setFormasPagamentos(newState);
          }}
        />

        <input
          className="form-input"
          type="text"
          placeholder="Conclusão"
          value={data.conclusao}
          onChange={(ev) =>
            setSelected(
              ev,
              position,
              formasPagamentos,
              setFormasPagamentos,
              "conclusao"
            )
          }
        />

        <button
          className="btn mdi-2x danger-text mdi mdi-trash-can-outline"
          type="button"
          disabled={
            formasPagamentos.length === 1 && !formasPagamentos[0].valor_parcela
          }
          onClick={() => handleRemoveClick(position)}
        />
      </div>
    </>
  );
};

export function FormaPagamentoBox({ selected, setSelected, pg, pos }) {
  return (
    <label
      className={`price-card ${selected === pg.id && "payment-selected"}`}
      onClick={() => setSelected(pg.id)}
      htmlFor={`payment${pg.id}`}
    >
      <IntlProvider locale="pt-br" defaultLocale="pt-br">
        <div className="payment-info">
          <input
            type="radio"
            name="payment-method"
            id={`payment${pg.id}`}
            defaultChecked={pg.id === selected || pos === 0}
          />

          <div>
            <div className="payment">
              {pg?.tipo == "cartao" ? "Cartão" : "Boleto"} - {pg?.conclusao}
            </div>

            <div className="discount-percentage">
              Economize{" "}
              <FormattedNumber value={pg?.desconto / 100} style="percent" />
            </div>
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
