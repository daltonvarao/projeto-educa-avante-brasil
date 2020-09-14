import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";

import { IntlProvider, FormattedNumber } from "react-intl";
import InputMask from "react-input-mask";

import {
  RiContactsBookLine,
  AiOutlineIdcard,
  RiMapPinLine,
  RiBankCardLine,
  BiBadgeCheck,
} from "react-icons/all";

import Modal from "./components/modal";
import { Select2 } from "./components/inputs";

const CONTACT = 0;
const PERSONAL = 1;
const ADDRESS = 2;
const PAYMENT = 3;
const CONTRACT = 4;

function AccountForm({ dispatch, state }) {
  if (state.step !== CONTACT) return null;

  return (
    <form className="modal-form">
      <h2 className="modal-form-title">Informações de contato</h2>
      <h6 className="modal-form-subtitle">Insira seus dados de contato</h6>

      <input
        placeholder="Nome completo"
        value={state.nome}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "nome",
            newState: ev.target.value,
          })
        }
        className="form-input"
        type="text"
      />

      <InputMask
        placeholder="Telefone"
        mask="(99) 99999-9999"
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "telefone",
            newState: ev.target.value,
          })
        }
        value={state.telefone}
        className="form-input"
        type="text"
      />
      <input
        placeholder="Email"
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "email",
            newState: ev.target.value,
          })
        }
        value={state.email}
        className="form-input"
        type="text"
      />

      <button
        type="button"
        onClick={() => dispatch({ type: "continue" })}
        className="btn form-btn btn-primary"
      >
        Continuar
      </button>
    </form>
  );
}

function PersonalForm({ dispatch, state }) {
  if (state.step !== PERSONAL) return null;

  return (
    <form className="modal-form">
      <h2 className="modal-form-title">Informações pessoais</h2>
      <h6 className="modal-form-subtitle">Insira seus dados pessoais</h6>

      <Select2
        name="Sexo"
        options={[
          ["Masculino", "Masculino"],
          ["Feminino", "Feminino"],
        ]}
        defaultValue={state.sexo}
        setSelected={(value) =>
          dispatch({
            type: "change",
            stateName: "sexo",
            newState: value,
          })
        }
      />

      <Select2
        name="Estado civil"
        options={[
          "Solteiro(a)",
          "Casado(a)",
          "Divorciado(a)",
          "Viúvo(a)",
        ].map((item) => [item, item])}
        defaultValue={state.estado_civil}
        setSelected={(value) =>
          dispatch({
            type: "change",
            stateName: "estado_civil",
            newState: value,
          })
        }
      />

      <label htmlFor="data_nascimento">Data de nascimento</label>
      <input
        className="form-input"
        id="data_nascimento"
        type="date"
        value={state.data_nascimento}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "data_nascimento",
            newState: ev.target.value,
          })
        }
      />

      <input
        placeholder="Cidade nascimento"
        className="form-input"
        type="text"
        value={state.cidade_nascimento}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "cidade_nascimento",
            newState: ev.target.value,
          })
        }
      />

      <input
        placeholder="Estado nascimento"
        className="form-input"
        type="text"
        value={state.estado_nascimento}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "estado_nascimento",
            newState: ev.target.value,
          })
        }
      />

      <input
        placeholder="Nome da Mãe"
        className="form-input"
        type="text"
        value={state.nome_mae}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "nome_mae",
            newState: ev.target.value,
          })
        }
      />

      <input
        placeholder="Nome do Pai"
        className="form-input"
        type="text"
        value={state.nome_pai}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "nome_pai",
            newState: ev.target.value,
          })
        }
      />

      <InputMask
        placeholder="CPF"
        className="form-input"
        type="text"
        mask="999.999.999-99"
        value={state.cpf}
        maskChar={null}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "cpf",
            newState: ev.target.value,
          })
        }
      />

      <input
        placeholder="RG"
        className="form-input"
        type="text"
        value={state.rg}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "rg",
            newState: ev.target.value,
          })
        }
      />

      <label htmlFor="data_expedicao_rg">Data de expedição do RG</label>
      <input
        className="form-input"
        type="date"
        id="data_expedicao_rg"
        value={state.data_expedicao_rg}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "data_expedicao_rg",
            newState: ev.target.value,
          })
        }
      />

      <input
        placeholder="Órgão emissor do RG"
        className="form-input"
        type="text"
        value={state.orgao_emissor_rg}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "orgao_emissor_rg",
            newState: ev.target.value,
          })
        }
      />

      <Select2
        name="Já colou grau na faculdade?"
        options={["Sim", "Não"].map((item) => [item, item])}
        defaultValue={state.colou_grau}
        setSelected={(value) =>
          dispatch({
            type: "change",
            stateName: "colou_grau",
            newState: value,
          })
        }
      />

      <button
        type="button"
        onClick={() => dispatch({ type: "continue" })}
        className="btn form-btn btn-primary"
      >
        Continuar
      </button>
    </form>
  );
}

function AddressForm({ dispatch, state }) {
  if (state.step !== ADDRESS) return null;

  return (
    <form className="modal-form">
      <h2 className="modal-form-title">Informações de endereço</h2>
      <h6 className="modal-form-subtitle">Insira seus dados de endereço</h6>
      <input placeholder="Nome completo" className="form-input" type="text" />

      <button
        type="button"
        onClick={() => dispatch({ type: "continue" })}
        className="btn form-btn btn-primary"
      >
        Continuar
      </button>
    </form>
  );
}

function PaymentForm({ dispatch, state }) {
  if (state.step !== PAYMENT) return null;

  return (
    <form className="modal-form">
      <h2 className="modal-form-title">Informações de pagamento</h2>
      <h6 className="modal-form-subtitle">Confirme a forma de pagamento</h6>
      <input placeholder="Nome completo" className="form-input" type="text" />

      <button
        type="button"
        onClick={() => dispatch({ type: "continue" })}
        className="btn form-btn btn-primary"
      >
        Continuar
      </button>
    </form>
  );
}

function ContractForm({ dispatch, state }) {
  if (state.step !== CONTRACT) return null;

  return (
    <form className="modal-form">
      <h2 className="modal-form-title">Informações de contrato</h2>
      <h6 className="modal-form-subtitle">
        Leia o contrato e aceite para continuar
      </h6>
      <textarea
        className="form-input2"
        rows="10"
        defaultValue={state.contract}
      ></textarea>

      <button type="button" className="btn form-btn btn-primary">
        Finalizar
      </button>
    </form>
  );
}

function SubscriptionModal({ visible, setVisible }) {
  const initialState = {
    step: PERSONAL,
    contract:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, sed dolores optio quos, excepturi eos, architecto sint inventore perspiciatis hic nesciunt tempora. Exercitationem consectetur aut corporis aliquam repellat autem non!",
    nome: "",
    email: "",
    telefone: "",
    sexo: "",
    estado_civil: "",
    data_nascimento: "",
    estado_nascimento: "",
    cidade_nascimento: "",
    nome_mae: "",
    nome_pai: "",
    cpf: "",
    rg: "",
    data_expedicao_rg: "",
    orgao_emissor_rg: "",
    colou_grau: "",
  };

  function reducer(state, { type, stateName, newState }) {
    switch (type) {
      case "change":
        return { ...state, [stateName]: newState };
      case "continue":
        return { ...state, step: state.step + 1 };
      case "step":
        return { ...state, step: newState };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <div className="step-icons">
        <RiContactsBookLine
          onClick={() => dispatch({ type: "step", newState: CONTACT })}
          size={38}
          color={state.step === CONTACT ? "#49996f" : "#bbbbbb99"}
        />

        <AiOutlineIdcard
          onClick={() => dispatch({ type: "step", newState: PERSONAL })}
          size={44}
          color={state.step === PERSONAL ? "#49996f" : "#bbbbbb99"}
        />

        <RiMapPinLine
          onClick={() => dispatch({ type: "step", newState: ADDRESS })}
          size={40}
          color={state.step === ADDRESS ? "#49996f" : "#bbbbbb99"}
        />

        <RiBankCardLine
          onClick={() => dispatch({ type: "step", newState: PAYMENT })}
          size={40}
          color={state.step === PAYMENT ? "#49996f" : "#bbbbbb99"}
        />

        <BiBadgeCheck
          onClick={() => dispatch({ type: "step", newState: CONTRACT })}
          size={40}
          color={state.step === 4 ? "#49996f" : "#bbbbbb99"}
        />
      </div>

      <div>
        <AccountForm state={state} dispatch={dispatch} />
        <PersonalForm state={state} dispatch={dispatch} />
        <AddressForm state={state} dispatch={dispatch} />
        <PaymentForm state={state} dispatch={dispatch} />
        <ContractForm state={state} dispatch={dispatch} />
      </div>
    </Modal>
  );
}

function PriceBox({ formaPagamentos }) {
  const [selected, setSelected] = useState(formaPagamentos[0]?.id);
  const [modalVisible, setModalVisible] = useState(1);
  return (
    <>
      <SubscriptionModal visible={modalVisible} setVisible={setModalVisible} />

      <button className="subscribe-link" onClick={() => setModalVisible(true)}>
        Inscreva-se aqui
      </button>
      <p>Selecione uma forma de pagamento</p>

      {formaPagamentos.map((pg, index) => (
        <label
          className={`price-card ${selected === pg.id && "payment-selected"}`}
          onClick={() => setSelected(pg.id)}
          key={pg.id}
          htmlFor={`payment${pg.id}`}
        >
          <input
            type="radio"
            name="payment-method"
            id={`payment${pg.id}`}
            className="align-self-start"
            defaultChecked={pg.id === selected || index === 0}
          />
          <IntlProvider locale="pt-br" defaultLocale="pt-br">
            <span className="old-price">
              {pg?.parcelas > 1 ? `${pg?.parcelas}x ` : ""}
              <FormattedNumber
                value={pg?.valor_parcela}
                style="currency"
                currency="BRL"
              />
            </span>
            <span className="price">
              {pg?.parcelas > 1 ? `${pg?.parcelas}x ` : ""}
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
        </label>
      ))}
    </>
  );
}

const container = document.querySelector("#price-box");

if (container) {
  const formaPagamentos = JSON.parse(
    container.querySelector('input[type="hidden"]').value
  );
  ReactDOM.render(<PriceBox formaPagamentos={formaPagamentos} />, container);
}
