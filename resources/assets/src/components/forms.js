import React, { useState, useEffect } from "react";

import InputMask from "react-input-mask";
import cep from "cep-promise";
import axios from "axios";
import swal from "@sweetalert/with-react";

import { Select2 } from "./inputs";
import { FormaPagamentoBox } from "./formaPagamento";

const CONTACT = 0;
const PERSONAL = 1;
const ADDRESS = 2;
const PAYMENT = 3;
const CONTRACT = 4;

async function updateMatricula(state, dispatch) {
  console.log(state);
  try {
    const method = state.matricula_id ? "put" : "post";
    const url = state.matricula_id
      ? `/api/matriculas/${state.matricula_id}`
      : "/api/matriculas";

    const response = await axios[method](url, state);

    dispatch({
      type: "change",
      stateName: "matricula_id",
      newState: response.data?.matricula?.id,
    });

    dispatch({ type: "continue" });
  } catch (error) {
    swal("Erro", error.message, "error");
  }
}

async function finalizaMatricula(state) {
  try {
    await axios.put(`/api/matriculas/${state.matricula_id}`, state);

    swal(
      "Concluído!",
      "Em alguns instantes entraremos em contato com você para mais detalhes",
      "success"
    );

    setTimeout(() => {
      location.reload();
    }, 5000);
  } catch (error) {
    swal("Erro", error.message, "error");
  }
}

export function AccountForm({ dispatch, state }) {
  if (state.step !== CONTACT) return null;

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (state.nome && state.email && state.telefone) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [state]);

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
        onClick={() => updateMatricula(state, dispatch)}
        className="btn form-btn btn-primary continue"
        disabled={!valid}
      >
        Continuar
      </button>
    </form>
  );
}

export function PersonalForm({ dispatch, state }) {
  if (state.step !== PERSONAL) return null;

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (
      state.sexo &&
      state.estado_civil &&
      state.data_nascimento &&
      state.cidade_nascimento &&
      state.nome_mae &&
      state.nome_pai &&
      state.rg &&
      state.cpf &&
      state.orgao_emissor_rg &&
      state.estado_nascimento &&
      state.data_expedicao_rg &&
      state.uf_rg &&
      state.colou_grau
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [state]);

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

      <input
        placeholder="UF do RG"
        className="form-input"
        type="text"
        value={state.uf_rg}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "uf_rg",
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

      <div className="form-group-inline">
        <button
          type="button"
          onClick={() => dispatch({ type: "back" })}
          className="btn form-btn btn-outline-primary back w-20"
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={() => updateMatricula(state, dispatch)}
          className="btn form-btn btn-primary continue w-80"
          disabled={!valid}
        >
          Continuar
        </button>
      </div>
    </form>
  );
}

export function AddressForm({ dispatch, state }) {
  if (state.step !== ADDRESS) return null;

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (
      state.cidade &&
      state.cep &&
      state.rua &&
      state.estado &&
      state.bairro &&
      state.numero
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [state]);

  async function loadLocation(cepValue) {
    if (cepValue.length < 9) return;

    try {
      const {
        city: cidade,
        neighborhood: bairro,
        state: estado,
        street: rua,
      } = await cep(cepValue.replace("-", ""));

      dispatch({
        type: "changeMany",
        newStates: { cidade, bairro, estado, rua },
      });
    } catch (error) {}
  }

  return (
    <form className="modal-form">
      <h2 className="modal-form-title">Informações de endereço</h2>
      <h6 className="modal-form-subtitle">Insira seus dados de endereço</h6>

      <InputMask
        mask="99999-999"
        placeholder="CEP"
        className="form-input"
        type="text"
        value={state.cep}
        onBlur={(ev) => loadLocation(ev.target.value)}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "cep",
            newState: ev.target.value,
          })
        }
      />

      <input
        placeholder="Cidade"
        className="form-input"
        type="text"
        value={state.cidade}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "cidade",
            newState: ev.target.value,
          })
        }
      />

      <input
        placeholder="Estado"
        className="form-input"
        type="text"
        value={state.estado}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "estado",
            newState: ev.target.value,
          })
        }
      />

      <input
        placeholder="Rua"
        className="form-input"
        type="text"
        value={state.rua}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "rua",
            newState: ev.target.value,
          })
        }
      />

      <input
        placeholder="Número"
        className="form-input"
        type="text"
        value={state.numero}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "numero",
            newState: ev.target.value,
          })
        }
      />

      <input
        placeholder="Bairro"
        className="form-input"
        type="text"
        value={state.bairro}
        onChange={(ev) =>
          dispatch({
            type: "change",
            stateName: "bairro",
            newState: ev.target.value,
          })
        }
      />

      <div className="form-group-inline">
        <button
          type="button"
          onClick={() => dispatch({ type: "back" })}
          className="btn form-btn btn-outline-primary back w-20"
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={() => updateMatricula(state, dispatch)}
          disabled={!valid}
          className="btn form-btn btn-primary continue w-80"
        >
          Continuar
        </button>
      </div>
    </form>
  );
}

export function PaymentForm({ dispatch, state, formaPagamentos, selected }) {
  if (state.step !== PAYMENT) return null;

  function setSelected(id) {
    dispatch({
      type: "change",
      stateName: "forma_pagamento_id",
      newState: id,
    });
  }

  useEffect(() => {
    dispatch({
      type: "change",
      stateName: "forma_pagamento_id",
      newState: selected,
    });
  }, []);

  return (
    <>
      <h2 className="modal-form-title">Informações de pagamento</h2>
      <h6 className="modal-form-subtitle">Confirme a forma de pagamento</h6>

      <div className="price-box">
        {formaPagamentos.map((pg, index) => (
          <FormaPagamentoBox
            setSelected={setSelected}
            selected={selected}
            pg={pg}
            key={index}
            pos={index}
          />
        ))}
      </div>

      <div className="form-group-inline">
        <button
          type="button"
          onClick={() => dispatch({ type: "back" })}
          className="btn form-btn btn-outline-primary back w-20"
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={() => updateMatricula(state, dispatch)}
          className="btn form-btn btn-primary continue w-80"
        >
          Continuar
        </button>
      </div>
    </>
  );
}

export function ContractForm({ dispatch, state }) {
  if (state.step !== CONTRACT) return null;

  useEffect(() => {
    dispatch({ type: "finaliza" });
  }, [state.accept_contract]);

  const contract =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, sed dolores optio quos, excepturi eos, architecto sint inventore perspiciatis hic nesciunt tempora. Exercitationem consectetur aut corporis aliquam repellat autem non!";

  return (
    <form className="modal-form">
      <h2 className="modal-form-title">Informações de contrato</h2>
      <h6 className="modal-form-subtitle">
        Leia o contrato e aceite para continuar
      </h6>

      <textarea
        className="form-input2"
        rows="10"
        defaultValue={contract}
        readOnly
      ></textarea>

      <div className="form-group-inline">
        <input
          type="checkbox"
          id="aceita_contato"
          defaultChecked={state.aceita_contato}
          onChange={(ev) =>
            dispatch({
              type: "change",
              stateName: "aceita_contato",
              newState: ev.target.checked,
            })
          }
        />
        <label htmlFor="aceita_contato">
          Autorizo o contato via Email e WhatsApp nos dados informados.
        </label>
      </div>

      <div className="form-group-inline">
        <input
          type="checkbox"
          id="accept"
          defaultChecked={state.accept_contract}
          onChange={(ev) =>
            dispatch({
              type: "change",
              stateName: "accept_contract",
              newState: ev.target.checked,
            })
          }
        />
        <label htmlFor="accept">
          Declaro que as informações fornecidas são verídicas e que li e aceito
          os termos e condições do Contrato e os Termos de uso do site.
        </label>
      </div>

      <div className="form-group-inline">
        <button
          type="button"
          onClick={() => dispatch({ type: "back" })}
          className="btn form-btn btn-outline-primary back w-20"
        >
          Voltar
        </button>
        <button
          type="button"
          disabled={!state.accept_contract}
          className="btn form-btn btn-primary w-80"
          onClick={() => finalizaMatricula(state)}
        >
          Finalizar
        </button>
      </div>
    </form>
  );
}
