import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom";

import {
  RiContactsBookLine,
  AiOutlineIdcard,
  RiMapPinLine,
  RiBankCardLine,
  BiBadgeCheck,
} from "react-icons/all";

import Modal from "./components/modal";
import {
  AccountForm,
  AddressForm,
  ContractForm,
  PaymentForm,
  PersonalForm,
} from "./components/forms";

import { FormaPagamentoBox } from "./components/formaPagamento";

const CONTACT = 0;
const PERSONAL = 1;
const ADDRESS = 2;
const PAYMENT = 3;
const CONTRACT = 4;

function SubscriptionModal({
  visible,
  setVisible,
  formaPagamentos,
  cursoId,
  selected,
}) {
  const initialState = {
    step: CONTRACT,
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
    uf_rg: "",
    colou_grau: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    forma_pagamento: selected,
    accept_contract: false,
    allow_contact: false,
    curso_id: cursoId,
  };

  function reducer(state, { type, stateName, newState, newStates }) {
    switch (type) {
      case "change":
        return { ...state, [stateName]: newState };
      case "changeMany":
        return { ...state, ...newStates };
      case "back":
        return { ...state, step: state.step - 1 };
      case "continue":
        return { ...state, step: state.step + 1 };
      case "step":
        return { ...state, step: newState };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <div className="step-icons">
        <RiContactsBookLine
          size={38}
          color={state.step === CONTACT ? "#49996f" : "#bbbbbb99"}
        />

        <AiOutlineIdcard
          size={44}
          color={state.step === PERSONAL ? "#49996f" : "#bbbbbb99"}
        />

        <RiMapPinLine
          size={40}
          color={state.step === ADDRESS ? "#49996f" : "#bbbbbb99"}
        />

        <RiBankCardLine
          size={40}
          color={state.step === PAYMENT ? "#49996f" : "#bbbbbb99"}
        />

        <BiBadgeCheck
          size={40}
          color={state.step === 4 ? "#49996f" : "#bbbbbb99"}
        />
      </div>

      <div>
        <AccountForm state={state} dispatch={dispatch} />
        <PersonalForm state={state} dispatch={dispatch} />
        <AddressForm state={state} dispatch={dispatch} />
        <PaymentForm
          state={state}
          dispatch={dispatch}
          formaPagamentos={formaPagamentos}
          selected={selected}
        />
        <ContractForm state={state} dispatch={dispatch} />
      </div>
    </Modal>
  );
}

function PriceBox({ formaPagamentos, cursoId }) {
  const [selected, setSelected] = useState(formaPagamentos[0]?.id);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <SubscriptionModal
        visible={modalVisible}
        setVisible={setModalVisible}
        formaPagamentos={formaPagamentos}
        selected={selected}
        cursoId={cursoId}
      />

      <button className="subscribe-link" onClick={() => setModalVisible(true)}>
        Inscreva-se aqui
      </button>
      <p>Selecione uma forma de pagamento</p>

      {formaPagamentos.map((pg, index) => (
        <FormaPagamentoBox
          setSelected={setSelected}
          selected={selected}
          pg={pg}
          key={index}
          pos={index}
        />
      ))}
    </>
  );
}

const container = document.querySelector("#price-box");

if (container) {
  const formaPagamentos = JSON.parse(
    container.querySelector('input[type="hidden"]').value
  );

  const cursoId = container.getAttribute("data-curso-id");

  ReactDOM.render(
    <PriceBox cursoId={cursoId} formaPagamentos={formaPagamentos} />,
    container
  );
}
