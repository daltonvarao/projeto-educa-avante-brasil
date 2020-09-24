const extenso = require("extenso");

export const contratoPosGraduacao = (
  state,
  curso,
  formaPagamento,
  valor_matricula
) => {
  const { nome, cpf, rg, cep, rua, numero, bairro, cidade, estado } = state;

  return `

CONTRATO DE BOLSA DE ESTUDOS DO PROJETO EDUCA AVANTE BRASIL

Pelo presente instrumento particular e na melhor forma de direito, as partes:

1. INSTITUIÇÃO DE ENSINO CONCEDENTE

FAEL – SOCIEDADE TÉCNICA EDUCACIONAL DA LAPA S/A, pessoa jurídica de direito privado, inscrita no CNPJ/MF n° 02.558.975/0001-65, com sede na Rodovia Olívio Belich, nº 580, Cidade da Lapa, Estado do Paraná, CEP 83.750-000, simplesmente denominada "IES".

2. ALUNO BENEFICIADO

${nome}, brasileiro, portador do RG nº ${rg}, inscrito no CPF/MF sob nº ${cpf}, residente e domiciliado na Rua ${rua}, nº ${numero}, bairro ${bairro}, CEP ${cep} em ${cidade}, no Estado ${estado}, simplesmente denominado "ALUNO BENEFICIADO".

3. INTERVENIENTE ANUENTE

G.M.DE S. FALCAO EDUCACIONAL, pessoa jurídica de direito privado, inscrita no CNPJ/MF n° 26.526.759/0001-04, com sede na Avenida Mendonca Furtado, nº 1341, sala b, bairro Santa Clara, Cidade de Santarém, Estado do Pará, CEP 68.005-258, empresa doravante denominada "CAPTADOR".

4. DAS CONDIÇÕES DA BOLSA DE ESTUDO

A IES concederá ao ALUNO BENEFICIADO, oriundo do programa de bolsas de estudo do CAPTADOR, e aprovado no processo seletivo e/ou análise documental da IES, uma bolsa de estudos:
(A) Curso: ${curso.nome}.
(B) Modalidade: 100% on-line (EAD).
(C) Percentual da bolsa: 35%.
(D) Condição de pagamento: ${formaPagamento.parcelas} vez(es) no ${
    formaPagamento.tipo === "cartao" ? "Cartão" : "Boleto"
  } + taxa de matrícula informada na página de contratação.
(E) Tempo para conclusão: ${
    formaPagamento.conclusao
  } (ou em no mínimo 6 meses em caso de quitação antecipada).
(F) A Pós é 100% on-line e o ALUNO BENEFICIADO está vinculado ao polo FAEL - Santarém/PA.
(G) Mesmo que tenha algum polo FAEL na cidade do ALUNO, o vínculo será com o polo acima descriminado e não há necessidade de ir ao polo em nenhum momento (nem em Santarém e nem na cidade do Aluno).
(H) O Polo de vínculos será responsável por toda assessoria necessária até o fim da sua Pós, através de atendimento on-line.
(I) Nos 2 últimos meses.

5. PRESSUPOSTOS DE CONHECIMENTO PRÉVIO

5.1 A IES é instituição de ensino superior, credenciada pelo MEC, e tem por objeto a prestação de serviços educacionais de graduação, pós-graduação, extensão universitária e cursos livres na modalidade EAD (Educação a Distância), atividade para a qual a IES detém o conhecimento, o credenciamento e o suporte tecnológico para a prestação desses serviços e que os mesmos são regidos pela Lei de Diretrizes e Bases da Educação – Lei 9.394/96 e demais legislações aplicáveis.
5.2 O ALUNO BENEFICIADO, para ingresso no curso de pós-graduação, deve necessariamente comprovar conclusão do curso de graduação com colação de grau, conforme Resolução CNE/CES nº 01/2018 e com o Parecer CNE/CES nº 303/2000.
5.3 A IES, atendendo aos requisitos legais, conta com parcerias devidamente habilitadas para oferecer ao ALUNO BENEFICIADO o suporte e distribuição dos conteúdos, independentemente de futuras alterações destas parcerias.

6. OBJETO DO CONTRATO

6.1 O objeto do presente Contrato é CONCESSÃO DE BOLSA DE ESTUDOS DE 35%, aplicados sobre os valores comercializados pela IES, concedidos ao ALUNO BENEFICIADO para a prestação de serviços educacionais oferecido pela IES para o curso de pós-graduação lato sensu em ${
    curso.nome
  }, composto pelo módulo de disciplinas e módulo de pesquisa, na modalidade 100% (cem por cento) EAD.

7. O CURSO

7.1 As informações sobre matriz e estrutura curricular, projeto pedagógico, obrigações acadêmicas, em particular as que são relacionadas com atividades obrigatórias, são públicas e estão disponíveis no site CONTRATADA (www.fael.edu.br).
7.2 O curso será ofertado em ciclo contínuo (pela IES) e os conteúdos serão disponibilizados após a validação da matrícula.
7.3 O ALUNO BENEFICIADO sempre ingressará na matriz curricular mais atual divulgado no site da IES (www.fael.edu.br).
7.4 As atividades acadêmicas se desenvolverão por auto estudo com suporte de web tutoria (se aplicável) em Ambiente Virtual de Aprendizagem (AVA) através de LOGIN e SENHA de uso pessoal.
7.5 O ALUNO BENEFICIADO estará vinculado ao polo de apoio presencial de SANTARÉM/PA, este vínculo será apenas para fins de comissionamento e assessoria, não sendo necessário o comparecimento do ALUNO CONTRATADO ao polo em nenhum momento.
7.6 Todos os conteúdos e materiais didáticos (videoaulas, textos, artigos, disciplinas e demais recursos pedagógicos), necessários para a realização das atividades de desempenho acadêmico são disponibilizados de forma integralmente online e acessados através de LOGIN e SENHA pessoal no portal de IES.

8. INGRESSO DO CONTRATANTE

8.1. MATRÍCULA
8.1.1. A matrícula será realizada de forma online, os dados postados no site do CAPTADOR, serão repassados à IES após a compensação da taxa de matrícula;
8.1.2. Para a validação da matrícula deverá necessariamente ocorrer:
(i) compensação da taxa de matrícula inscrição;
(ii) inscrição no curso escolhido no site da IES;
(iii) aceite eletrônico do Contrato de Prestação de Serviços Educacionais no portal da IES;
8.1.3 Cumpridos integralmente os requisitos acima, o candidato é considerado aluno da IES.

9. TAXA DE ADESÃO

9.1. Como condição para a aquisição e manutenção do direito de sua bolsa de estudos junto à IES, o ALUNO BENEFICIADO, se obriga a pagar ao CAPTADOR uma taxa de adesão, de acordo com o que determina este instrumento e o regulamento do programa, sob pena de resolução de pleno direito do presente Contrato, com a consequente perda do benefício da bolsa.
9.2. A título de Taxa de Adesão, o valor que corresponde a R$ ${valor_matricula}. O não pagamento da referida taxa pelo ALUNO BENEFICIADO na data de seu vencimento ou a não efetivação da sua matrícula junto à IES na data informada pela IES.
9.3. A taxa de Adesão pode ser parcelada pelo ALUNO BENEFICIADO em até 12 parcelas, pagando os juros cobrados pela instituição financeira que faz a intermediação.

10. DOS DOCUMENTOS

10.1. O ALUNO BENEFICIADO deve enviar de forma online, na plataforma disponibilizada pela IES, os seguintes documentos válidos:
a) Diploma ou Declaração de Conclusão de Curso de Graduação com validade de até 6 meses.
b) Histórico Escolar do Curso de Graduação.
c) (RG) Registro Geral - não são válidas as identificações funcionais ou expedidas por órgãos profissionais, por não serem órgãos de identificação.
d) (CPF) Cadastro de Pessoa Física.
e) Certidão de nascimento ou certidão de casamento em caso de alteração do nome do registro de nascimento.
10.2. Caso o ALUNO BENEFICIADO prefira, poderá enviar a documentação ao polo vinculado através do e-mail gestor.santarem.pa@fael.edu.br que este fará a postagem e enviará a IES para análise da documentação.
10.3. Após a postagem da documentação, seja ela feita pelo ALUNO BENEFICIADO ou pelo polo vinculado, os documentos passarão por uma análise da IES e serão validados, podendo haver pedido de regularização, sob pena de ser entendido como não apresentado.

11. OBRIGAÇÕES DO ALUNO BENEFICIADO

11.1. Cumprir integralmente todos os requisitos para a efetivação da matrícula.
11.2. Fornecer e manter atualizados os documentos solicitados e dados de contato válidos, incluindo, mas não se limitando a: telefone fixo, celular, endereço eletrônico e residencial.
11.3. Cumprir integralmente o Manual do Aluno, Regimento Interno, Código de Conduta Ética e Calendário Acadêmico, se aplicável, disponibilizados no Site da FAEL (www.fael.edu.br), no Canal de Integridade (www.canaldeintegridadefael.com) e/ou Portal do Aluno, bem como demais obrigações e normativas aplicáveis à área de ensino.
11.4. Cumprir integralmente os prazos e procedimentos acadêmicos determinados pela IES.
11.5. Acompanhar todas as solicitações que realizar no Portal do Aluno.
11.6. Não compartilhar, em NENHUMA hipótese, LOGIN e SENHA pessoal.
11.7. Cumprir integralmente todas as obrigações financeiras relacionadas ao presente contrato, inclusive renegociações.
11.8. O CONTRATANTE deverá possuir um dispositivo pessoal, com acesso à internet e com configuração que suporte os recursos e softwares necessários ao tipo de curso contratado.
11.9. Ressarcir eventuais prejuízos materiais ou morais causados por sua culpa ou dolo, ao CAPTADOR ou IES, seus funcionários ou terceiros.

12. OBRIGAÇÕES DA IES

12.1. Ofertar o curso de pós-graduação contratado na Modalidade EAD.
12.2. Definir o planejamento acadêmico, metodologia de ensino, orientação didática, pedagógica e educacional, seleção de materiais, elaboração do currículo e calendário acadêmico, fixação da carga horária e demais procedimentos acadêmicos.
12.3. Contratar e treinar os professores que integrarão o corpo docente, ministrarão as aulas e darão apoio aos alunos.
12.4. Enviar ao ALUNO BENEFICIADO, por e-mail, o protocolo de efetivação de trancamento/cancelamento e caso haja, valor da dívida com a IES.
12.5. Ao final do curso e com o cumprimento integral de todos os requisitos por parte do ALUNO BENEFICIADO, expedir Certificado devidamente registrado e sem custo adicional.

13. OBRIGAÇÕES DO CAPTADOR

13.1. Captar e intermediar o processo de inscrição entre ALUNO BENEFICIADO e IES.
13.2. Atuar como polo Vinculado (Santarém/PA) e efetuar assistência ao aluno nas dúvidas referentes ao portal da IES.
§1° Fica o CAPTADOR isento da obrigação da cláusula 13.2 caso o ALUNO BENEFICIADO opte por fazer transferência de polo.

14. CONTRAPARTIDAS FINANCEIRAS

14.1. Conforme escolha do CONTRATANTE, o pagamento do valor total do curso contratado será efetivado em ${
    formaPagamento.parcelas
  } (${extenso(
    formaPagamento.parcelas
  )}) parcela(s), as quais estão vinculadas a ${
    formaPagamento.parcelas
  } (${extenso(
    formaPagamento.parcelas
  )}) meses de prestação de serviços, acrescido da taxa de Adesão, conforme cláusula 9.2.
14.2. Considerando o valor integral do curso e o plano de pagamento escolhido, considera-se à título de mensalidades os valores abaixo discriminados, os quais representam os efetivos valores a serem pagos pelo ALUNO BENEFICIÁRIO à IES, incluindo-se informações de descontos (bolsa de estudos oferecida pelo CAPTADOR):

OPÇÃO EM ${formaPagamento.parcelas} PARCELAS:
Valor bruto da MENSALIDADE: R$ ${formaPagamento.valor_parcela}
Bolsa Cupom Promocional: ${formaPagamento.desconto}%
Valor líquido da MENSALIDADE: R$ ${
    formaPagamento.valor_parcela * (1 - formaPagamento.desconto / 100)
  }
Vencimento das MENSALIDADES
14.3. Os descontos (bolsa de estudos) oferecidos pelo CAPTADOR são de 35%, e os descontos de pontualidade oferecidos pela IES.
§ 1º O percentual de desconto oferecido na publicidade/site do CAPTADOR é o valor da bolsa + o desconto para pagamento no dia 05.
14.4. O primeiro pagamento será mês seguinte ao do aceite de contrato da IES por parte do ALUNO BENEFICIÁRIO, seguindo os descontos de pontualidade (dia 05, 15 e/ou 25).
14.5. Em caso de pagamento parcelado no cartão de crédito, seguem as regras do pagamento a vista.
O ALUNO BENEFICIADO deverá ler e aceitar os termos do contrato proposto pela IES antes do início do seu curso.
14.6. O vencimento das mensalidades será dia 25 de cada mês do período correspondente mês e podem ter descontos, se pagas até o dia 5, 15 e/ou 25 do mês referente ao seu vencimento. Após o dia 25 haverá a cobrança de acréscimos dentro dos limites estabelecidos na legislação pertinente.
14.7. Os valores poderão ser alterados pela IES antes da concretização da matrícula.
14.8. O pagamento somente será reconhecido/baixado pela IES quando realizado através de: (i) boleto bancário emitido pela CONTRATADA; (ii) cartão de crédito e débito, se disponibilizado esta opção de pagamento.
14.9. A ausência de utilização dos serviços da IES por parte do ALUNO BENEFICIÁRIO, não exime o ALUNO BENEFICIÁRIO da contraprestação financeira assumida, tendo em vista a disponibilidade dos serviços.
14.10. Não haverá devolução de valores pagos a título de taxa de adesão ou de mensalidades em caso de irregularidades na apresentação de documentos, sendo que as disciplinas cursadas serão reconhecidas como curso de extensão por parte da IES.
14.11. A falta de pagamento de qualquer uma das parcelas acarretará, independente de notificação, o vencimento antecipado de todo o valor descrito na cláusula 14.2, acrescendo-se correção monetária pelo IGPM/FGV, ou outro índice que venha a substituí-lo, juros de mora de 1% a.m. (um por cento ao mês) e multa moratória de 2% (dois por cento) sobre o total do débito vencido.
14.12. O CONTRATANTE tem ciência de que em caso de inadimplência superior à 90 (noventa) dias, o débito poderá ser registrado no serviço de proteção ao crédito, nos termos do artigo 43º, parágrafo 2º do Código de Defesa ao Consumidor.

15. DA RESCISÃO CONTRATUAL

15.1. O ALUNO BENEFICIADO poderá, a qualquer tempo, solicitar cancelamento/trancamento de sua matrícula junto a IES, mediante solicitação no portal do aluno ou no polo de sua vinculação, ensejando ao CONTRATANTE a obrigação de pagamento dos valores vencidos/vincendos no mês da solicitação.
15.2. O ALUNO BENEFICIADO tem até 7 (sete) dias após o início deste contrato para exercer desistência (direito de arrependimento – art. 49 do Código de Defesa do Consumidor), desde que comprovadamente não tenha frequentado nenhuma aula ou utilizado qualquer material do curso contratado.
15.3. Em caso de pagamentos relativos à taxa de adesão, o ALUNO BENEFICIADO, exceto no prazo previsto no art. 49 do Código de Defesa do Consumidor, o aluno não será restituído dos valores pagos em caso de cancelamento do curso junto a IES.
15.4. As condições abaixo elencadas poderão ensejar na rescisão automática deste contrato:
15.4.1 - O não pagamento da taxa administrativa referida na Cláusula 9.2.
15.4.2 - Nos casos de informação inverídica prestada pelo ALUNO BENEFICIADO no ato da inscrição.
15.4.3 - Nos casos de cumulatividade de benefício.
15.4.4 - Inadimplência do ALUNO BENEFICIADO junto à IES.
15.4.5 - O não atendimento das exigências descritas neste contrato.
15.4.6 - Nos casos em que a IES, por ordem judicial, fiscal, administrativa ou pessoal, venha a suspender parcialmente ou integralmente suas atividades acadêmicas, implicando na interrupção das atividades para o curso o qual o ALUNO BENEFICIADO foi aprovado, caso não ocorra a transferência do ALUNO BENEFICIADO para outro curso ou IES.

16. DISPOSIÇÕES GERAIS

16.1. Todos os materiais didáticos disponibilizados no Portal do Aluno possuem conteúdos atualizados até a data de sua última revisão, podendo não conter informações mais recentes, surgidas entre a data da última revisão e a data de uso por parte do CONTRATANTE, aplicável em particular ao caso de legislações usadas como referência de disciplinas e são de inteira responsabilidade da IES.
16.2. A comunicação entre a IES e ALUNO BENEFICIADO dar-se-á através do Portal do Aluno ou contato telefônico com o setor de relacionamento com o aluno.
16.3. O CAPTADOR atua apenas como intermediário comercial entre a IES e ALUNO BENEFICIADO ficando isento de qualquer ônus ocasionado pelo relacionamento entre as partes.
16.4. A parte CONTRATANTE declara expressamente ter lido e compreendido todas as cláusulas e condições previstas neste contrato, tendo esclarecido todas as suas dúvidas junto à parte CONTRATADA antes de sua assinatura.
16.5. Em caso de Cancelamento do curso dentro do prazo de 7 dias (direito de arrependimento – art. 49 do Código de Defesa do Consumidor), o CAPTADOR fará a devolução do valor pago, quando cabível, em conformidade com a legislação vigente, ressarcindo o valor pago pelo ALUNO BENEFICIADO, através da geração de um crédito que poderá ser convertido pelo ALUNO BENEFICIADO em reembolso ou utilizado para uma contratação futura.
16.5.1 - Nos casos em que o ALUNO BENEFICIADO não cumprir com as exigências legais para ter direito ao crédito, oriunda do pagamento da taxa de adesão, o CAPTADOR, por mera liberalidade institui a POLITICA DE BOLSA GARANTIDA, garantindo ao ALUNO BENEFICIADO, quando da contratação de uma nova bolsa de estudo, até 6 (seis) meses após a rescisão do presente contrato, a isenção do pagamento da taxa de adesão, limitada ao mesmo valor da taxa anteriormente paga.
16.5.2 - Optando o ALUNO BENEFICIADO, pelo reembolso, o crédito será efetuado pelo mesmo meio de pagamento utilizado pelo ALUNO BENEFICADO para a quitação da Taxa, e o ALUNO BENEFICIADO deverá comunicar o CAPTADOR seu interesse em cancelar e solicitação de reembolso, através do e-mail gestor.santarem.pa@fael.edu.br.
16.6. O ALUNO BENEFICIADO declara conhecer e aceitar os termos deste contrato.

17. FORO

17.1. Para dirimir as dúvidas oriundas do presente instrumento, as partes elegem o foro da Comarca de Santarém/PA, renunciando a qualquer outro, por mais privilegiado que seja.

OUTRAS INFORMAÇÕES

- O pagamento é uma taxa única que chamamos de pré-matrícula. Assim sua bolsa será válida até o final do curso.
- Não é necessário realizar inscrição no site da Instituição.
- Do valor ofertado no site, o Projeto Educa Avante Brasil garante 35% até o final do curso. A porcentagem restante é de responsabilidade da instituição e poderá ou não ser alterada, conforme seus critérios internos (pontualidade de pagamento).
- O pagamento da primeira mensalidade será somente no dia 05 do próximo mês.
- Após contratar a bolsa, o candidato deverá aguardar o contato da Instituição de Ensino via telefone ou WhatsApp, para confirmação dos dados e realização da matrícula.

`;
};

export const contratoCursoProfissionalizante = (
  state,
  curso,
  formaPagamento
) => {
  const { nome, cpf, rg, cep, rua, numero, bairro, cidade, estado } = state;

  return `

CONTRATO DE BOLSA DE ESTUDOS DO PROJETO EDUCA AVANTE BRASIL

Pelo presente instrumento particular e na melhor forma de direito, as partes:

1. INSTITUIÇÃO DE ENSINO CONCEDENTE

LUCAS PIMENTEL GOBBO - ME, pessoa jurídica de direito privado, inscrita no CNPJ/MF n° 24.576.646/0001-80, com sede na Rua Djalma Dutra, nº 460, bairro Centro, Botucatu, Estado do São Paulo, CEP 18.603-750, simplesmente denominada "FORMA CURSOS".

2. ALUNO BENEFICIADO

${nome}, brasileiro, portador do RG nº ${rg}, inscrito no CPF/MF sob nº ${cpf}, residente e domiciliado na Rua ${rua}, nº ${numero}, bairro ${bairro}, CEP ${cep} em ${cidade}, no Estado ${estado}, simplesmente denominado "ALUNO BENEFICIADO".

3. INTERVENIENTE ANUENTE

G.M.DE S. FALCAO EDUCACIONAL, pessoa jurídica de direito privado, inscrita no CNPJ/MF n° 26.526.759/0001-04, com sede na Avenida Mendonca Furtado, nº 1341, sala b, bairro Santa Clara, Cidade de Santarém, Estado do Pará, CEP 68.005-258, empresa doravante denominada "CAPTADOR".

4. DAS CONDIÇÕES DA BOLSA DE ESTUDO

A FORMA CURSOS concederá ao ALUNO BENEFICIADO, oriundo do programa de bolsas de estudo do CAPTADOR, e aprovado no processo seletivo e/ou análise documental da FORMA CURSOS, uma bolsa de estudos:
(A) Curso: ${curso.nome}.
(B) Modalidade: 100% on-line (EAD).
(C) Percentual da bolsa: 50%.
(D) Condição de pagamento: ${formaPagamento.parcelas} vez(es) no ${
    formaPagamento.tipo === "cartao" ? "Cartão" : "Boleto"
  }.
(E) Tempo para conclusão: ${formaPagamento.conclusao}.
(F) O curso é 100% on-line e o ALUNO BENEFICIADO está vinculado ao polo de Santarém/PA.
(G) Mesmo que tenha algum polo FAEL na cidade do ALUNO, o vínculo será com o polo acima descriminado e não há necessidade de ir ao polo em nenhum momento (nem em Santarém e nem na cidade do Aluno).

5. PRESSUPOSTOS DE CONHECIMENTO PRÉVIO

5.1 A FORMA CURSOS é instituição de ensino voltada para cursos, e tem por objeto a prestação de serviços educacionais de cursos preparatórios e profissionalizantes. 
5.2 A FORMA CURSOS, atendendo aos requisitos legais, conta com parcerias devidamente habilitadas para oferecer ao ALUNO BENEFICIADO o suporte e distribuição dos conteúdos, independentemente de futuras alterações destas parcerias

6. OBJETO DO CONTRATO

6.1 O objeto do presente Contrato é CONCESSÃO DE BOLSA DE ESTUDOS DE 50%, aplicados sobre os valores comercializados pela FORMA CURSOS, concedidos ao ALUNO BENEFICIADO para a prestação de serviços educacionais oferecido pela FORMA CURSOS para o curso em ${
    curso.nome
  }, na modalidade 100% (cem por cento) EAD.

7. O CURSO

7.1 O curso será ofertado em ciclo contínuo (pela FORMA CURSOS) e os conteúdos serão disponibilizados após a validação da matrícula.
7.2 As atividades acadêmicas se desenvolverão por auto estudo com suporte de web tutoria (se aplicável) em Ambiente Virtual de Aprendizagem (AVA) através de LOGIN e SENHA de uso pessoal.
7.3 O ALUNO BENEFICIADO estará vinculado ao polo de apoio presencial de SANTARÉM/PA, este vínculo será apenas para fins de comissionamento e assessoria, não sendo necessário o comparecimento do ALUNO CONTRATADO ao polo em nenhum momento.
7.4 Todos os conteúdos e materiais didáticos (videoaulas, textos, artigos, disciplinas e demais recursos pedagógicos), necessários para a realização das atividades de desempenho acadêmico são disponibilizados de forma integralmente online e acessados através de LOGIN e SENHA pessoal no portal de FORMA CURSOS.

8. INGRESSO DO CONTRATANTE

8.1. MATRÍCULA
8.1.1. A matrícula será realizada de forma online, os dados postados no site do CAPTADOR, serão repassados à FORMA CURSOS após a compensação da taxa de matrícula;
8.1.2. Para a validação da matrícula deverá necessariamente ocorrer:
(i) compensação da taxa de matrícula inscrição;
8.1.3 Cumprido integralmente o requisito acima, o candidato é considerado aluno da FORMA CURSOS.

9. DOS DOCUMENTOS

9.1. O ALUNO BENEFICIADO deve informar de forma online, na plataforma disponibilizada pela CAPTADOR, os seguintes documentos válidos:
a) Endereço residencial atual;
b) (RG) Registro Geral - não são válidas as identificações funcionais ou expedidas por órgãos profissionais, por não serem órgãos de identificação.
c) (CPF) Cadastro de Pessoa Física.

10. OBRIGAÇÕES DO ALUNO BENEFICIADO

10.1. Cumprir integralmente todos os requisitos para a efetivação da matrícula.
10.2. Fornecer e manter atualizados os documentos solicitados e dados de contato válidos, incluindo, mas não se limitando a: telefone fixo, celular, endereço eletrônico e residencial.
10.3. Não compartilhar, em NENHUMA hipótese, LOGIN e SENHA pessoal.
10.4. Cumprir integralmente todas as obrigações financeiras relacionadas ao presente contrato.
10.5. O CONTRATANTE deverá possuir um dispositivo pessoal, com acesso à internet e com configuração que suporte os recursos e softwares necessários ao tipo de curso contratado.
10.6. Ressarcir eventuais prejuízos materiais ou morais causados por sua culpa ou dolo, ao CAPTADOR ou FORMA CURSO, seus funcionários ou terceiros.

11. OBRIGAÇÕES DA FORMA CURSOS

11.1. Ofertar o curso contratado na Modalidade EAD.
11.2. Definir o planejamento acadêmico, metodologia de ensino, orientação didática, pedagógica e educacional, seleção de materiais, elaboração do currículo e calendário acadêmico, fixação da carga horária e demais procedimentos acadêmicos.
11.3. Contratar e treinar os professores que integrarão o corpo docente, ministrarão as aulas e darão apoio aos alunos.
11.4. Ao final do curso e com o cumprimento integral de todos os requisitos por parte do ALUNO BENEFICIADO, expedir Certificado devidamente registrado e sem custo adicional.

12. OBRIGAÇÕES DO CAPTADOR

12.1. Captar e intermediar o processo de inscrição entre ALUNO BENEFICIADO e FORMA CURSOS.
12.2. Atuar como polo Vinculado (Santarém/PA) e efetuar assistência ao aluno nas dúvidas referentes ao portal da FORMA CURSOS.

13. CONTRAPARTIDAS FINANCEIRAS

13.1. Considerando o valor integral do curso e o plano de pagamento escolhido, considera-se os valores abaixo discriminados, os quais representam os efetivos valores a serem pagos pelo ALUNO BENEFICIÁRIO à FORMA CURSOS, incluindo-se informações de descontos (bolsa de estudos oferecida pelo CAPTADOR):

OPÇÃO EM ${formaPagamento.parcelas} PARCELAS:
Valor bruto da MENSALIDADE: R$ ${formaPagamento.valor_parcela}
Bolsa Cupom Promocional: ${formaPagamento.desconto}%
Valor líquido da MENSALIDADE: R$ ${
    formaPagamento.valor_parcela * (1 - formaPagamento.desconto / 100)
  }

13.2. Os descontos (bolsa de estudos) oferecidos pelo CAPTADOR são de 50%, e os descontos de pontualidade oferecidos pela FORMA CURSOS.
13.3. O primeiro pagamento será no momento da adesão.
13.4. O pagamento somente será reconhecido/baixado pela FORMA CURSOS quando realizado através de: (i) boleto bancário emitido pela CONTRATADA; (ii) cartão de crédito e débito, se disponibilizado esta opção de pagamento.
13.5. A ausência de utilização dos serviços da FORMA CURSOS por parte do ALUNO BENEFICIÁRIO, não exime o ALUNO BENEFICIÁRIO da contraprestação financeira assumida, tendo em vista a disponibilidade dos serviços.
13.6. Não haverá devolução de valores pagos a título de taxa de adesão ou de mensalidades em caso de irregularidades na apresentação de documentos, sendo que as disciplinas cursadas serão reconhecidas como curso de extensão por parte da FORMA CURSOS.
13.7. A falta de pagamento de qualquer uma das parcelas acarretará, independente de notificação, o vencimento antecipado de todo o valor descrito na cláusula 14.2, acrescendo-se correção monetária pelo IGPM/FGV, ou outro índice que venha a substituí-lo, juros de mora de 1% a.m. (um por cento ao mês) e multa moratória de 2% (dois por cento) sobre o total do débito vencido.
13.8. O CONTRATANTE tem ciência de que em caso de inadimplência superior à 90 (noventa) dias, o débito poderá ser registrado no serviço de proteção ao crédito, nos termos do artigo 43º, parágrafo 2º do Código de Defesa ao Consumidor.

14. DA RESCISÃO CONTRATUAL

14.1. O ALUNO BENEFICIADO tem até 7 (sete) dias após o início deste contrato para exercer desistência (direito de arrependimento – art. 49 do Código de Defesa do Consumidor), desde que comprovadamente não tenha frequentado nenhuma aula ou utilizado qualquer material do curso contratado.
14.2. As condições abaixo elencadas poderão ensejar na rescisão automática deste contrato:
14.2.1 - O não pagamento da taxa referida ao curso.
14.2.2 - Nos casos de informação inverídica prestada pelo ALUNO BENEFICIADO no ato da inscrição.
14.2.3 - Inadimplência do ALUNO BENEFICIADO junto à FORMA CURSOS.
14.2.4 - O não atendimento das exigências descritas neste contrato.
14.2.5 - Nos casos em que a FORMA CURSOS, por ordem judicial, fiscal, administrativa ou pessoal, venha a suspender parcialmente ou integralmente suas atividades acadêmicas, implicando na interrupção das atividades para o curso o qual o ALUNO BENEFICIADO foi aprovado, caso não ocorra a transferência do ALUNO BENEFICIADO para outro curso ou FORMA CURSOS.

15. DISPOSIÇÕES GERAIS

15.1. Todos os materiais didáticos disponibilizados no Portal do Aluno possuem conteúdos atualizados até a data de sua última revisão, podendo não conter informações mais recentes, surgidas entre a data da última revisão e a data de uso por parte do CONTRATANTE, aplicável em particular ao caso de legislações usadas como referência de disciplinas e são de inteira responsabilidade da FORMA CURSOS.
15.2. A comunicação entre a FORMA CURSOS e ALUNO BENEFICIADO dar-se-á através do Portal do Aluno ou contato telefônico com o setor de relacionamento com o aluno.
15.3. O CAPTADOR atua apenas como intermediário comercial entre a FORMA CURSOS e ALUNO BENEFICIADO ficando isento de qualquer ônus ocasionado pelo relacionamento entre as partes.
15.4. A parte CONTRATANTE declara expressamente ter lido e compreendido todas as cláusulas e condições previstas neste contrato, tendo esclarecido todas as suas dúvidas junto à parte CONTRATADA antes de sua assinatura.
15.5. Em caso de Cancelamento do curso dentro do prazo de 7 dias (direito de arrependimento – art. 49 do Código de Defesa do Consumidor), o CAPTADOR fará a devolução do valor pago, quando cabível, em conformidade com a legislação vigente, ressarcindo o valor pago pelo ALUNO BENEFICIADO, através da geração de um crédito que poderá ser convertido pelo ALUNO BENEFICIADO em reembolso ou utilizado para uma contratação futura.
15.5.1 - Nos casos em que o ALUNO BENEFICIADO não cumprir com as exigências legais para ter direito ao crédito, oriunda do pagamento da taxa de adesão, o CAPTADOR, por mera liberalidade institui a POLITICA DE BOLSA GARANTIDA, garantindo ao ALUNO BENEFICIADO, quando da contratação de uma nova bolsa de estudo, até 6 (seis) meses após a rescisão do presente contrato, a isenção do pagamento da taxa de adesão, limitada ao mesmo valor da taxa anteriormente paga.
15.5.2 - Optando o ALUNO BENEFICIADO, pelo reembolso, o crédito será efetuado pelo mesmo meio de pagamento utilizado pelo ALUNO BENEFICADO para a quitação da Taxa, e o ALUNO BENEFICIADO deverá comunicar o CAPTADOR seu interesse em cancelar e solicitação de reembolso, através do e-mail atendimento@projetoeducavantebrasil.com.
15.6. O ALUNO BENEFICIADO declara conhecer e aceitar os termos deste contrato.

16. FORO

16.1. Para dirimir as dúvidas oriundas do presente instrumento, as partes elegem o foro da Comarca de Santarém/PA, renunciando a qualquer outro, por mais privilegiado que seja.

OUTRAS INFORMAÇÕES

- Não é necessário realizar inscrição no site da Instituição.
- Do valor ofertado no site, o Projeto Educa Avante Brasil garante 50% até o final do curso. A porcentagem restante é de responsabilidade da instituição e poderá ou não ser alterada, conforme seus critérios internos (pontualidade de pagamento).
- Após contratar a bolsa, o candidato deverá aguardar o contato da Instituição de Ensino via telefone ou WhatsApp, para confirmação dos dados e realização da matrícula.
- Os certificados emitidos pela Forma Cursos têm validade em todo o território nacional. Os cursos livres da Forma Cursos são válidos para comprovação de carga horária de atividade extracurricular, inclusive para programas internos de ascensão funcional, conforme o Dec. 5.154/2004 e para demais atribuições. Os cursos livres de atualização são liberados pelo MEC e amparados pela Lei de Diretrizes e Bases da Educação nº 9.394.
`;
};
