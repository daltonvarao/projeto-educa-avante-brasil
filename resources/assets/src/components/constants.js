export const contratoPosGraduacao = (
  state,
  curso,
  formaPagamento,
  valor_matricula
) => {
  const { nome, cpf, rg, cep, rua, numero, bairro, cidade, estado } = state;

  return `
TERMOS DE CONTRATO DE BOLSA DE ESTUDOS

FAEL – SOCIEDADE TÉCNICA EDUCACIONAL DA LAPA S/A, pessoa jurídica de direito privado, inscrita no CNPJ/MF n° 02.558.975/0001-65, com sede na Rodovia Olívio Belich, nº 580, Cidade da Lapa, Estado do Paraná, CEP 83.750-000, simplesmente denominada "FAEL".
${nome}, brasileiro, portador do RG nº ${rg}, inscrito no CPF/MF sob nº ${cpf}, residente e domiciliado na Rua ${rua}, nº ${numero}, bairro ${bairro}, CEP ${cep} em ${cidade}, no Estado ${estado}, simplesmente denominado "BENEFICIADO".
G.M.DE S. FALCAO EDUCACIONAL, pessoa jurídica de direito privado, inscrita no CNPJ/MF n° 26.526.759/0001-04, com sede na Avenida Mendonca Furtado, nº 1341, sala b, bairro Santa Clara, Cidade de Santarém, Estado do Pará, CEP 68.005-258, empresa doravante denominada "INTERMEDIÁRIO".

1 - OBJETO DO CONTRATO
1.1 Este contrato tem como objetivo regulamentar a disponibilização de BOLSAS DE ESTUDO, sendo estas distribuídas pelo INTERMEDIÁRIO por quaisquer meios de comunicação disponível; 
1.2 A bolsa oferecida ao BENEFICIADO é de 35% no curso de ${
    curso.nome
  }, curso este que será concedido pela FAEL.

2 - VIGÊNCIA DO CONTRATO
2.1 O presente contrato terá vigência de durante o período em que o BENEFICIADO estiver matriculado na FAEL.

3 - DAS RESPONSABILIDADES DAS PARTES
3.1 Cabe à parte BENEFICIADO:
3.1.1 Fornecer dados os pessoais para que a FAEL possa realizar a matrícula;
3.1.2 Cumprir com a realização do pagamento da matrícula (caso houver) e das mensalidades;
3.1.3 Respeitar as normas dadas pela instituição concedente do curso, sendo ela a FAEL;
3.1.4 Ter o material o qual será necessário para realizar o curso (notebooks, internet, etc);
3.2 Cabe à parte FAEL:
3.2.1 Fornecer os cursos para o BENEFICIADO, assim como assessoria aos alunos em caso de dúvidas sobre a instituição, disciplinas, regulamentações, pagamentos;
3.2.2 Enviar ao aluno senha e login;
3.2.3 Disponibilizar ao BENEFICIADO o certificado de conclusão da Pós Graduação, desde que o BENEFICIADO tenha concluído o curso e tenha realizado pagamento de todo o valor;
3.3 Cabe à parte INTERMEDIÁRIO
3.3.1 Recolher dados iniciais para pré-matrícula;
3.3.2 Direcionar o BENEFICIADO para a FAEL.

4 - DOS VALORES DOS SERVIÇOS
O INTERMEDIÁRIO oferece um desconto de 35% na mensalidade, com isso, o valor pago pelo BENEFICIADO é de R$ ${
    formaPagamento.valor_parcela *
    formaPagamento.parcelas *
    (1 - formaPagamento.desconto / 100)
  }, valor este pago em ${formaPagamento.parcelas} vez(es) de R$ ${
    formaPagamento.valor_parcela * (1 - formaPagamento.desconto / 100)
  }. Além das mensalidades, o BENEFICIADO deverá realizar o pagamento da taxa de matrícula no valor de R$ ${valor_matricula} (caso haja).

5 – DISPOSIÇÕES GERAIS
O BENEFICIADO não necessitará ir a um polo presencial, todas as suas necessidades serão atendidas pelo site de forma online, por questões legais o BENEFICIADO estará vinculado ao Polo de Santarém-Pará.

6 - DO FORO
Elegem as partes, para dirimir eventuais demandas emergentes do presente contrato, com renúncia a qualquer outro, por mais privilegiado que seja, o Foro da Comarca de Santarém/PA.
`;
};

export const contratoCursoProfissionalizante = (
  state,
  curso,
  formaPagamento
) => {
  const { nome, cpf, rg, cep, rua, numero, bairro, cidade, estado } = state;

  return `
TERMOS DE CONTRATO DE BOLSA DE ESTUDOS

LUCAS PIMENTEL GOBBO - ME, pessoa jurídica de direito privado, inscrita no CNPJ/MF n° 24.576.646/0001-80, com sede na Rua Djalma Dutra, nº 460, bairro Centro, Botucatu, Estado do São Paulo, CEP 18.603-750, simplesmente denominada "FORMA CURSOS".
${nome}, brasileiro, portador do RG nº ${rg}, inscrito no CPF/MF sob nº ${cpf}, residente e domiciliado na Rua ${rua}, nº ${numero}, bairro ${bairro}, CEP ${cep} em ${cidade}, no Estado ${estado}, simplesmente denominado "BENEFICIADO".
G.M.DE S. FALCAO EDUCACIONAL, pessoa jurídica de direito privado, inscrita no CNPJ/MF n° 26.526.759/0001-04, com sede na Avenida Mendonca Furtado, nº 1341, sala b, bairro Santa Clara, Cidade de Santarém, Estado do Pará, CEP 68.005-258, empresa doravante denominada "INTERMEDIÁRIO".

1 - OBJETO DO CONTRATO
1.1 Este contrato tem como objetivo regulamentar a disponibilização de BOLSAS DE ESTUDO, sendo estas distribuídas pelo INTERMEDIÁRIO por quaisquer meios de comunicação disponível; 
1.2 A bolsa oferecida ao BENEFICIADO é de ${
    formaPagamento.desconto
  }% no curso de ${curso.nome}, curso este que será concedido pela FORMA CURSOS.

2 - VIGÊNCIA DO CONTRATO
2.1 O presente contrato terá vigência de durante o período em que o BENEFICIADO estiver matriculado na FORMA CURSOS.

3 - DAS RESPONSABILIDADES DAS PARTES
3.1 Cabe à parte BENEFICIADO:
3.1.1 Fornecer dados os pessoais para que a FORMA CURSOS possa realizar a matrícula;
3.1.2 Cumprir com a realização do pagamento do curso.
3.1.3 Respeitar as normas dadas pela instituição concedente do curso, sendo ela a FORMA CURSOS;
3.1.4 Ter o material o qual será necessário para realizar o curso (notebooks, internet, etc);
3.2 Cabe à parte FORMA CURSOS:
3.2.1 Fornecer os cursos para o BENEFICIADO, assim como assessoria aos alunos em caso de dúvidas sobre a instituição, disciplinas, regulamentações, pagamentos;
3.2.2 Enviar ao aluno senha e login;
3.2.3 Disponibilizar ao BENEFICIADO o certificado de conclusão da Pós Graduação, desde que o BENEFICIADO tenha concluído o curso e tenha realizado pagamento de todo o valor;
3.3 Cabe à parte INTERMEDIÁRIO
3.3.1 Recolher dados iniciais para pré-matrícula;
3.3.2 Direcionar o BENEFICIADO para a FORMA CURSOS.

4 - DOS VALORES DOS SERVIÇOS
O INTERMEDIÁRIO oferece um desconto de ${
    formaPagamento.desconto
  }% no curso, com isso, o valor pago pelo BENEFICIADO é de R$ ${
    formaPagamento.valor_parcela *
    formaPagamento.parcelas *
    (1 - formaPagamento.desconto / 100)
  }.

5 - DO FORO
Elegem as partes, para dirimir eventuais demandas emergentes do presente contrato, com renúncia a qualquer outro, por mais privilegiado que seja, o Foro da Comarca de Santarém/Pa.
`;
};
