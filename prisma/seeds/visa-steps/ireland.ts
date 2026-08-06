import type { CountryVisaSteps } from './types';

/**
 * Steps for Ireland.
 *
 * Ireland is outside Schengen, so a Schengen visa is worth nothing here and the
 * days spent in Ireland do not count against the 90/180 rule. Every application
 * starts on AVATS, the online system, which produces the summary form that has
 * to be printed and signed.
 *
 * The re-entry visa category needs care: it was abolished for adults, who now
 * re-enter on a valid Irish Residence Permit card. It survives only for
 * children, who are not issued those cards. Treating it as a general
 * requirement would send adults chasing a permission that no longer exists.
 */
export const ireland: CountryVisaSteps = {
  'Short-Stay Visa (C category)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least six months beyond the intended departure, plus copies of any previous passport.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos seis meses além da saída prevista, mais cópias de passaportes anteriores.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos seis meses más allá de la salida prevista, más copias de pasaportes anteriores.',
        ],
      },
      {
        en: [
          'AVATS summary form, printed and signed',
          'The online application produces this form; the paperwork is only accepted with it attached.',
        ],
        pt: [
          'Formulário-resumo do AVATS, impresso e assinado',
          'O pedido online gera esse formulário; a documentação só é aceite com ele anexado.',
        ],
        es: [
          'Formulario resumen de AVATS, impreso y firmado',
          'La solicitud en línea genera ese formulario; la documentación solo se acepta con él adjunto.',
        ],
      },
      {
        en: [
          'Two passport photographs',
          'Recent, with your name and application number written on the back.',
        ],
        pt: [
          'Duas fotografias tipo passaporte',
          'Recentes, com seu nome e o número do pedido escritos no verso.',
        ],
        es: [
          'Dos fotografías tipo pasaporte',
          'Recientes, con su nombre y el número de solicitud escritos al dorso.',
        ],
      },
      {
        en: [
          'Signed letter of application',
          'Ireland asks for a letter in your own words explaining the trip and confirming you will comply with the conditions. It is not optional.',
        ],
        pt: [
          'Carta de solicitação assinada',
          'A Irlanda pede uma carta escrita por você explicando a viagem e confirmando que cumprirá as condições. Não é opcional.',
        ],
        es: [
          'Carta de solicitud firmada',
          'Irlanda pide una carta escrita por usted explicando el viaje y confirmando que cumplirá las condiciones. No es opcional.',
        ],
      },
      {
        en: [
          'Travel itinerary and accommodation',
          'Bookings, or a letter from your host with their address and status in Ireland.',
        ],
        pt: [
          'Itinerário e alojamento',
          'Reservas, ou carta do anfitrião com o endereço e a situação dele na Irlanda.',
        ],
        es: [
          'Itinerario y alojamiento',
          'Reservas, o carta del anfitrión con su dirección y su situación en Irlanda.',
        ],
      },
      {
        en: [
          'Evidence of ties to your country of residence',
          'Employment, studies, property or dependants — what shows you will leave again.',
        ],
        pt: [
          'Comprovação de vínculos com seu país de residência',
          'Emprego, estudos, imóveis ou dependentes — o que mostra que você sairá novamente.',
        ],
        es: [
          'Prueba de arraigo en su país de residencia',
          'Empleo, estudios, propiedades o dependientes: lo que demuestra que volverá a marcharse.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Bank statements from the last six months',
          'Original statements from the account, not screenshots or printouts without a stamp.',
        ],
        pt: [
          'Extratos bancários dos últimos seis meses',
          'Extratos originais da conta, não capturas de tela nem impressões sem carimbo.',
        ],
        es: [
          'Extractos bancarios de los últimos seis meses',
          'Extractos originales de la cuenta, no capturas de pantalla ni impresiones sin sello.',
        ],
      },
      {
        en: [
          'Proof of income',
          'Payslips, or tax returns and company documents if you are self-employed.',
        ],
        pt: [
          'Comprovação de renda',
          'Holerites, ou declarações de imposto e documentos da empresa se for autônomo.',
        ],
        es: [
          'Comprobante de ingresos',
          'Nóminas, o declaraciones de impuestos y documentos de la empresa si trabaja por cuenta propia.',
        ],
      },
      {
        en: [
          'Documents of whoever funds the trip',
          'If a third party pays, their statements and a letter stating the commitment.',
        ],
        pt: [
          'Documentos de quem financia a viagem',
          'Se um terceiro paga, os extratos dele e uma carta declarando o compromisso.',
        ],
        es: [
          'Documentos de quien financia el viaje',
          'Si paga un tercero, sus extractos y una carta declarando el compromiso.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Complete the application on AVATS',
          'Apply no earlier than three months before travelling.',
        ],
        pt: [
          'Preencher o pedido no AVATS',
          'Peça no máximo três meses antes da viagem.',
        ],
        es: [
          'Completar la solicitud en AVATS',
          'Solicite como mucho tres meses antes de viajar.',
        ],
      },
      {
        en: [
          'Pay the visa fee',
          'Some nationalities are exempt from the fee under bilateral agreements.',
        ],
        pt: [
          'Pagar a taxa do visto',
          'Algumas nacionalidades são isentas da taxa por acordos bilaterais.',
        ],
        es: [
          'Pagar la tasa del visado',
          'Algunas nacionalidades están exentas de la tasa por acuerdos bilaterales.',
        ],
      },
      {
        en: [
          'Send the documents to the office indicated',
          'Ireland works largely by post or through a partner centre; there is usually no interview.',
        ],
        pt: [
          'Enviar os documentos ao escritório indicado',
          'A Irlanda trabalha em grande parte por correio ou por centro parceiro; em geral não há entrevista.',
        ],
        es: [
          'Enviar los documentos a la oficina indicada',
          'Irlanda trabaja en gran medida por correo o mediante un centro asociado; por lo general no hay entrevista.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection where required',
          'Not requested in every country; the AVATS instructions say whether it applies to you.',
        ],
        pt: [
          'Recolha de dados biométricos quando exigida',
          'Não é pedida em todo país; as instruções do AVATS dizem se se aplica a você.',
        ],
        es: [
          'Recogida de datos biométricos cuando se exija',
          'No se pide en todos los países; las instrucciones de AVATS indican si le aplica.',
        ],
        required: false,
      },
      {
        en: [
          'Travel medical insurance',
          'Not a formal requirement for a short stay, but strongly advisable since Ireland is outside the EU health card arrangements for non-EU travellers.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é exigência formal na estada curta, mas é muito recomendável, já que a Irlanda fica fora dos acordos de cartão europeu de saúde para viajantes de fora da UE.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es un requisito formal en la estancia corta, pero es muy recomendable, ya que Irlanda queda fuera de los acuerdos de tarjeta sanitaria europea para viajeros de fuera de la UE.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport with the visa',
          'The visa allows you to travel to the border; the immigration officer decides admission there.',
        ],
        pt: [
          'Retirar o passaporte com o visto',
          'O visto permite viajar até a fronteira; quem decide a admissão ali é o oficial de imigração.',
        ],
        es: [
          'Recoger el pasaporte con el visado',
          'El visado permite viajar hasta la frontera; quien decide la admisión allí es el oficial de inmigración.',
        ],
      },
      {
        en: [
          'Remember that a Schengen visa is not valid for Ireland',
          'Ireland is outside Schengen. Days spent here do not count against the 90/180 rule either.',
        ],
        pt: [
          'Lembrar que visto Schengen não vale para a Irlanda',
          'A Irlanda está fora do Schengen. Os dias passados aqui também não contam na regra dos 90/180.',
        ],
        es: [
          'Recordar que un visado Schengen no vale para Irlanda',
          'Irlanda está fuera de Schengen. Los días pasados aquí tampoco cuentan en la regla de 90/180.',
        ],
      },
      {
        en: [
          'Do not stay beyond 90 days on a short-stay visa',
          'A C visa cannot be extended or converted from inside Ireland.',
        ],
        pt: [
          'Não permanecer além de 90 dias com visto de curta duração',
          'O visto C não pode ser prorrogado nem convertido de dentro da Irlanda.',
        ],
        es: [
          'No permanecer más de 90 días con visado de corta duración',
          'El visado C no puede prorrogarse ni convertirse desde dentro de Irlanda.',
        ],
      },
    ],
  },

  'Long-Stay Visa (D category)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least twelve months beyond the intended arrival.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos doze meses além da chegada prevista.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos doce meses más allá de la llegada prevista.',
        ],
      },
      {
        en: [
          'AVATS summary form, printed and signed',
          'Select the correct long-stay reason: study, employment, or joining family.',
        ],
        pt: [
          'Formulário-resumo do AVATS, impresso e assinado',
          'Selecione o motivo correto de longa duração: estudo, emprego ou reunião familiar.',
        ],
        es: [
          'Formulario resumen de AVATS, impreso y firmado',
          'Seleccione el motivo correcto de larga duración: estudio, empleo o reagrupación familiar.',
        ],
      },
      {
        en: [
          'Two passport photographs',
          'Recent, with your name and application number on the back.',
        ],
        pt: [
          'Duas fotografias tipo passaporte',
          'Recentes, com nome e número do pedido no verso.',
        ],
        es: [
          'Dos fotografías tipo pasaporte',
          'Recientes, con nombre y número de solicitud al dorso.',
        ],
      },
      {
        en: [
          'Signed letter of application',
          'Explaining the plan, the length of stay and what you will do afterwards.',
        ],
        pt: [
          'Carta de solicitação assinada',
          'Explicando o plano, o tempo de permanência e o que fará depois.',
        ],
        es: [
          'Carta de solicitud firmada',
          'Explicando el plan, la duración de la estancia y qué hará después.',
        ],
      },
      {
        en: [
          'Employment permit issued in advance',
          'For work, the permit is obtained by you or the employer from the Department of Enterprise before the visa is applied for. The visa does not grant permission to work.',
        ],
        pt: [
          'Autorização de trabalho obtida previamente',
          'Para trabalho, a autorização é obtida por você ou pelo empregador junto ao Department of Enterprise antes de pedir o visto. O visto não concede o direito de trabalhar.',
        ],
        es: [
          'Permiso de trabajo obtenido previamente',
          'Para trabajar, el permiso lo obtiene usted o el empleador ante el Department of Enterprise antes de solicitar el visado. El visado no otorga el derecho a trabajar.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Letter of acceptance from the institution',
          'The course must be on the Interim List of Eligible Programmes, and the fees must already be paid.',
        ],
        pt: [
          'Carta de aceitação da instituição',
          'O curso precisa estar na Interim List of Eligible Programmes, e as mensalidades já devem estar pagas.',
        ],
        es: [
          'Carta de admisión de la institución',
          'El curso debe figurar en la Interim List of Eligible Programmes, y las tasas ya deben estar pagadas.',
        ],
        required: false,
      },
      {
        en: [
          'Proof of English at the required level',
          'The level is set by the institution, and it also matters for some employment permits.',
        ],
        pt: [
          'Comprovação de inglês no nível exigido',
          'O nível é definido pela instituição, e também pesa em algumas autorizações de trabalho.',
        ],
        es: [
          'Prueba de inglés en el nivel exigido',
          'El nivel lo fija la institución, y también cuenta en algunos permisos de trabajo.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Qualifications for the role',
          'Diplomas and reference letters supporting the employment permit.',
        ],
        pt: [
          'Qualificações para a função',
          'Diplomas e cartas de referência que sustentam a autorização de trabalho.',
        ],
        es: [
          'Cualificaciones para el puesto',
          'Títulos y cartas de referencia que respaldan el permiso de trabajo.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the first year',
          'Students are held to a set annual amount, over and above the tuition already paid.',
        ],
        pt: [
          'Comprovação de recursos para o primeiro ano',
          'Estudantes são avaliados por um valor anual determinado, além da mensalidade já paga.',
        ],
        es: [
          'Prueba de fondos para el primer año',
          'A los estudiantes se les exige un importe anual determinado, además de la matrícula ya pagada.',
        ],
      },
      {
        en: [
          'Bank statements from the last six months',
          'Original and stamped, showing a steady pattern rather than a recent transfer.',
        ],
        pt: [
          'Extratos bancários dos últimos seis meses',
          'Originais e carimbados, mostrando padrão estável e não uma transferência recente.',
        ],
        es: [
          'Extractos bancarios de los últimos seis meses',
          'Originales y sellados, que muestren un patrón estable y no una transferencia reciente.',
        ],
      },
      {
        en: [
          'Evidence the sponsor can support you',
          'For family reunification, the sponsor’s income is assessed against a published threshold.',
        ],
        pt: [
          'Comprovação de que o patrocinador consegue sustentar você',
          'No reagrupamento familiar, a renda do patrocinador é avaliada contra um piso publicado.',
        ],
        es: [
          'Prueba de que el patrocinador puede mantenerle',
          'En la reagrupación familiar, los ingresos del patrocinador se evalúan contra un umbral publicado.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Complete the application on AVATS',
          'Long-stay decisions take considerably longer than short-stay ones.',
        ],
        pt: [
          'Preencher o pedido no AVATS',
          'Decisões de longa duração levam bem mais tempo que as de curta duração.',
        ],
        es: [
          'Completar la solicitud en AVATS',
          'Las decisiones de larga duración tardan bastante más que las de corta duración.',
        ],
      },
      {
        en: [
          'Pay the long-stay visa fee',
          'Separate from the registration fee paid after arrival.',
        ],
        pt: [
          'Pagar a taxa de visto de longa duração',
          'Separada da taxa de registo paga após a chegada.',
        ],
        es: [
          'Pagar la tasa de visado de larga duración',
          'Independiente de la tasa de registro que se paga tras la llegada.',
        ],
      },
      {
        en: [
          'Send the documents to the office indicated',
          'Originals are returned with the passport; keep copies of everything you send.',
        ],
        pt: [
          'Enviar os documentos ao escritório indicado',
          'Os originais voltam com o passaporte; guarde cópias de tudo o que enviar.',
        ],
        es: [
          'Enviar los documentos a la oficina indicada',
          'Los originales vuelven con el pasaporte; guarde copias de todo lo que envíe.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection where required',
          'Indicated in the AVATS instructions for your country.',
        ],
        pt: [
          'Recolha de dados biométricos quando exigida',
          'Indicada nas instruções do AVATS para o seu país.',
        ],
        es: [
          'Recogida de datos biométricos cuando se exija',
          'Se indica en las instrucciones de AVATS para su país.',
        ],
        required: false,
      },
      {
        en: [
          'Private health insurance valid in Ireland',
          'Compulsory for students and for several other long-stay routes, and it is checked again at registration.',
        ],
        pt: [
          'Seguro de saúde privado válido na Irlanda',
          'Obrigatório para estudantes e para várias outras rotas de longa duração, e é conferido de novo no registo.',
        ],
        es: [
          'Seguro de salud privado válido en Irlanda',
          'Obligatorio para estudiantes y para otras varias vías de larga duración, y se comprueba de nuevo en el registro.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register with immigration within 90 days of arrival',
          'This produces the Irish Residence Permit card, which is what actually evidences your permission to stay.',
        ],
        pt: [
          'Registar-se na imigração em até 90 dias da chegada',
          'É o que gera o cartão Irish Residence Permit, que é o que de fato comprova sua permissão de permanência.',
        ],
        es: [
          'Registrarse ante inmigración en los 90 días siguientes a la llegada',
          'Es lo que genera la tarjeta Irish Residence Permit, que es lo que realmente acredita su permiso de estancia.',
        ],
      },
      {
        en: [
          'Pay the registration fee and collect the IRP card',
          'The card carries a stamp number that defines exactly what you may do — work, study, or neither.',
        ],
        pt: [
          'Pagar a taxa de registo e retirar o cartão IRP',
          'O cartão traz um número de stamp que define exatamente o que você pode fazer — trabalhar, estudar, ou nenhum dos dois.',
        ],
        es: [
          'Pagar la tasa de registro y recoger la tarjeta IRP',
          'La tarjeta lleva un número de stamp que define exactamente qué puede hacer: trabajar, estudiar, o ninguna de las dos.',
        ],
      },
      {
        en: [
          'Get a PPS number',
          'Required in order to be paid, to be taxed correctly and to access public services.',
        ],
        pt: [
          'Obter o número PPS',
          'Necessário para receber salário, ser tributado corretamente e aceder a serviços públicos.',
        ],
        es: [
          'Obtener el número PPS',
          'Necesario para cobrar, tributar correctamente y acceder a los servicios públicos.',
        ],
      },
      {
        en: [
          'Renew the permission before the IRP expires',
          'Renewal is done online, and letting the card lapse breaks the continuity that long-term residence depends on.',
        ],
        pt: [
          'Renovar a permissão antes de o IRP vencer',
          'A renovação é feita online, e deixar o cartão caducar quebra a continuidade de que depende a residência de longa duração.',
        ],
        es: [
          'Renovar el permiso antes de que caduque el IRP',
          'La renovación se hace en línea, y dejar caducar la tarjeta rompe la continuidad de la que depende la residencia de larga duración.',
        ],
        priority: 2,
      },
    ],
  },

  'Multiple Entry Visa': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'The visa is never issued for longer than the passport validity.',
        ],
        pt: [
          'Passaporte válido',
          'O visto nunca é emitido por prazo maior que a validade do passaporte.',
        ],
        es: [
          'Pasaporte vigente',
          'El visado nunca se emite por más tiempo que la vigencia del pasaporte.',
        ],
      },
      {
        en: [
          'AVATS summary form requesting multiple entry',
          'It is not a separate visa type so much as an option on the C or D application; you have to ask for it explicitly.',
        ],
        pt: [
          'Formulário-resumo do AVATS pedindo múltiplas entradas',
          'Não é bem um tipo de visto à parte, mas uma opção no pedido C ou D; é preciso pedir explicitamente.',
        ],
        es: [
          'Formulario resumen de AVATS solicitando entradas múltiples',
          'No es tanto un tipo de visado aparte como una opción en la solicitud C o D; hay que pedirlo explícitamente.',
        ],
      },
      {
        en: [
          'Evidence of previous compliant travel',
          'Earlier Irish or UK visas used without overstaying are the strongest argument for multiple entry.',
        ],
        pt: [
          'Comprovação de viagens anteriores em conformidade',
          'Vistos irlandeses ou britânicos anteriores usados sem overstay são o argumento mais forte para múltiplas entradas.',
        ],
        es: [
          'Prueba de viajes anteriores conformes',
          'Visados irlandeses o británicos anteriores usados sin sobreestadía son el argumento más fuerte para entradas múltiples.',
        ],
      },
      {
        en: [
          'Letter explaining why repeated travel is needed',
          'A recurring business relationship, family in Ireland, or a study arrangement that requires coming and going.',
        ],
        pt: [
          'Carta explicando por que a viagem recorrente é necessária',
          'Relação de negócios recorrente, família na Irlanda, ou um arranjo de estudo que exige ir e voltar.',
        ],
        es: [
          'Carta explicando por qué se necesita viajar de forma recurrente',
          'Una relación de negocios recurrente, familia en Irlanda, o un arreglo de estudio que exige ir y volver.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Bank statements from the last six months',
          'Showing you can fund repeated trips, not just one.',
        ],
        pt: [
          'Extratos bancários dos últimos seis meses',
          'Mostrando que você custeia viagens repetidas, não apenas uma.',
        ],
        es: [
          'Extractos bancarios de los últimos seis meses',
          'Que muestren que puede costear viajes repetidos, no solo uno.',
        ],
      },
      {
        en: [
          'Proof of stable income',
          'Continuity of employment or business matters more here than a single balance.',
        ],
        pt: [
          'Comprovação de renda estável',
          'Continuidade de emprego ou de negócio pesa mais aqui do que um saldo isolado.',
        ],
        es: [
          'Prueba de ingresos estables',
          'La continuidad del empleo o del negocio pesa más aquí que un saldo aislado.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply on AVATS selecting multiple entry',
          'A first-time applicant is usually granted single entry; multiple entry tends to follow a clean history.',
        ],
        pt: [
          'Pedir no AVATS selecionando múltiplas entradas',
          'Quem pede pela primeira vez costuma receber entrada única; múltiplas entradas tendem a vir depois de um histórico limpo.',
        ],
        es: [
          'Solicitar en AVATS seleccionando entradas múltiples',
          'A quien solicita por primera vez suele concedérsele entrada única; las entradas múltiples suelen llegar tras un historial limpio.',
        ],
      },
      {
        en: ['Pay the multiple entry fee', 'Higher than the single entry fee.'],
        pt: [
          'Pagar a taxa de múltiplas entradas',
          'Mais alta que a de entrada única.',
        ],
        es: [
          'Pagar la tasa de entradas múltiples',
          'Más alta que la de entrada única.',
        ],
      },
      {
        en: [
          'Send the documents to the office indicated',
          'Include the previous passports showing the travel history.',
        ],
        pt: [
          'Enviar os documentos ao escritório indicado',
          'Inclua os passaportes anteriores que mostram o histórico de viagens.',
        ],
        es: [
          'Enviar los documentos a la oficina indicada',
          'Incluya los pasaportes anteriores que muestran el historial de viajes.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection where required',
          'Same rule as for any other Irish visa application.',
        ],
        pt: [
          'Recolha de dados biométricos quando exigida',
          'Mesma regra de qualquer outro pedido de visto irlandês.',
        ],
        es: [
          'Recogida de datos biométricos cuando se exija',
          'La misma regla que en cualquier otra solicitud de visado irlandés.',
        ],
        required: false,
      },
      {
        en: [
          'Travel medical insurance for each trip',
          'Advisable, and required if the underlying category is a long-stay one.',
        ],
        pt: [
          'Seguro médico de viagem para cada viagem',
          'Recomendável, e exigido se a categoria de base for de longa duração.',
        ],
        es: [
          'Seguro médico de viaje para cada viaje',
          'Recomendable, y exigido si la categoría de base es de larga duración.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the validity and the conditions printed',
          'Multiple entry sets how many times you may enter, not how long you may stay on each visit.',
        ],
        pt: [
          'Conferir a validade e as condições impressas',
          'A múltipla entrada define quantas vezes você pode entrar, não quanto tempo pode ficar em cada visita.',
        ],
        es: [
          'Verificar la validez y las condiciones impresas',
          'La entrada múltiple define cuántas veces puede entrar, no cuánto tiempo puede quedarse en cada visita.',
        ],
      },
      {
        en: [
          'Keep the total time within what the category allows',
          'Repeated visits that add up to near-continuous residence get refused at the border.',
        ],
        pt: [
          'Manter o tempo total dentro do que a categoria permite',
          'Visitas repetidas que somam residência quase contínua acabam recusadas na fronteira.',
        ],
        es: [
          'Mantener el tiempo total dentro de lo que permite la categoría',
          'Las visitas repetidas que suman una residencia casi continua terminan rechazadas en la frontera.',
        ],
      },
      {
        en: [
          'Reapply before the visa expires',
          'A clean history of compliance is what supports a longer validity next time.',
        ],
        pt: [
          'Pedir de novo antes de o visto vencer',
          'Um histórico limpo de cumprimento é o que sustenta uma validade maior da próxima vez.',
        ],
        es: [
          'Volver a solicitar antes de que caduque el visado',
          'Un historial limpio de cumplimiento es lo que sustenta una validez mayor la próxima vez.',
        ],
        priority: 2,
      },
    ],
  },

  'Transit Visa': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Plus the visa for your final destination, if that country requires one.',
        ],
        pt: [
          'Passaporte válido',
          'Além do visto do destino final, se aquele país exigir um.',
        ],
        es: [
          'Pasaporte vigente',
          'Además del visado del destino final, si ese país lo exige.',
        ],
      },
      {
        en: [
          'AVATS summary form for transit',
          'Check first whether your nationality actually needs one: the transit visa list is short and most travellers do not.',
        ],
        pt: [
          'Formulário-resumo do AVATS para trânsito',
          'Verifique antes se sua nacionalidade realmente precisa: a lista de trânsito é curta e a maioria dos viajantes não precisa.',
        ],
        es: [
          'Formulario resumen de AVATS para tránsito',
          'Compruebe antes si su nacionalidad realmente lo necesita: la lista de tránsito es corta y la mayoría de los viajeros no lo requiere.',
        ],
      },
      {
        en: [
          'Confirmed onward ticket',
          'Showing you leave Ireland on the same journey, without entering the country.',
        ],
        pt: [
          'Bilhete de continuação confirmado',
          'Mostrando que você sai da Irlanda na mesma jornada, sem entrar no país.',
        ],
        es: [
          'Billete de continuación confirmado',
          'Que muestre que sale de Irlanda en el mismo trayecto, sin entrar en el país.',
        ],
      },
      {
        en: [
          'One passport photograph',
          'Recent, with your name and application number on the back.',
        ],
        pt: [
          'Uma fotografia tipo passaporte',
          'Recente, com nome e número do pedido no verso.',
        ],
        es: [
          'Una fotografía tipo pasaporte',
          'Reciente, con nombre y número de solicitud al dorso.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of funds for the journey',
          'A light requirement compared with other categories, since you do not enter the country.',
        ],
        pt: [
          'Comprovação de recursos para a jornada',
          'Exigência leve em comparação com outras categorias, já que você não entra no país.',
        ],
        es: [
          'Prueba de fondos para el trayecto',
          'Requisito ligero comparado con otras categorías, ya que no entra en el país.',
        ],
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply on AVATS well before the flight',
          'A transit visa cannot be obtained at the airport.',
        ],
        pt: [
          'Pedir no AVATS bem antes do voo',
          'O visto de trânsito não pode ser obtido no aeroporto.',
        ],
        es: [
          'Solicitar en AVATS bastante antes del vuelo',
          'El visado de tránsito no se puede obtener en el aeropuerto.',
        ],
      },
      {
        en: ['Pay the transit visa fee', 'Lower than the short-stay fee.'],
        pt: [
          'Pagar a taxa de visto de trânsito',
          'Mais baixa que a de curta duração.',
        ],
        es: [
          'Pagar la tasa de visado de tránsito',
          'Más baja que la de corta duración.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection where required',
          'Follows the same rule as other Irish applications.',
        ],
        pt: [
          'Recolha de dados biométricos quando exigida',
          'Segue a mesma regra dos demais pedidos irlandeses.',
        ],
        es: [
          'Recogida de datos biométricos cuando se exija',
          'Sigue la misma regla que las demás solicitudes irlandesas.',
        ],
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Do not leave the airport transit area',
          'A transit visa does not permit entry into Ireland, not even for a night.',
        ],
        pt: [
          'Não sair da área de trânsito do aeroporto',
          'O visto de trânsito não permite entrar na Irlanda, nem para uma noite.',
        ],
        es: [
          'No salir de la zona de tránsito del aeropuerto',
          'El visado de tránsito no permite entrar en Irlanda, ni siquiera para una noche.',
        ],
      },
      {
        en: [
          'Apply for a short-stay visa if you need to stop over',
          'Any stay outside the transit area, however brief, needs the C category instead.',
        ],
        pt: [
          'Pedir visto de curta duração se precisar fazer escala',
          'Qualquer permanência fora da área de trânsito, por mais breve, exige a categoria C.',
        ],
        es: [
          'Solicitar un visado de corta duración si necesita hacer escala',
          'Cualquier estancia fuera de la zona de tránsito, por breve que sea, exige la categoría C.',
        ],
      },
    ],
  },

  'Re-Entry Visa': {
    core_documents: [
      {
        en: [
          'Check first whether you still need one',
          'Re-entry visas were abolished for adults: a valid Irish Residence Permit card is what lets you return. They survive only for children under 16, who are not issued those cards.',
        ],
        pt: [
          'Verificar antes se você ainda precisa de um',
          'Os vistos de reentrada foram extintos para adultos: quem permite o retorno é o cartão Irish Residence Permit válido. Eles sobrevivem apenas para menores de 16 anos, que não recebem esse cartão.',
        ],
        es: [
          'Comprobar primero si todavía lo necesita',
          'Los visados de reentrada se suprimieron para adultos: lo que permite el regreso es la tarjeta Irish Residence Permit vigente. Solo subsisten para menores de 16 años, que no reciben esa tarjeta.',
        ],
      },
      {
        en: [
          'Child’s valid passport',
          'Together with the passport of the parent or guardian who is resident in Ireland.',
        ],
        pt: [
          'Passaporte válido da criança',
          'Junto com o passaporte do pai, mãe ou responsável residente na Irlanda.',
        ],
        es: [
          'Pasaporte vigente del menor',
          'Junto con el pasaporte del progenitor o tutor residente en Irlanda.',
        ],
      },
      {
        en: [
          'Parent’s Irish Residence Permit card',
          'A copy of the card of the adult the child’s permission derives from.',
        ],
        pt: [
          'Cartão Irish Residence Permit do responsável',
          'Cópia do cartão do adulto de quem a permissão da criança deriva.',
        ],
        es: [
          'Tarjeta Irish Residence Permit del responsable',
          'Copia de la tarjeta del adulto del que deriva el permiso del menor.',
        ],
      },
      {
        en: [
          'Child’s birth certificate',
          'Evidencing the relationship, with a certified translation where needed.',
        ],
        pt: [
          'Certidão de nascimento da criança',
          'Comprovando o vínculo, com tradução certificada quando necessário.',
        ],
        es: [
          'Partida de nacimiento del menor',
          'Que acredite el vínculo, con traducción certificada cuando haga falta.',
        ],
      },
      {
        en: [
          'Travel details for the trip',
          'Dates of departure and return, and where the child will be staying.',
        ],
        pt: [
          'Detalhes da viagem',
          'Datas de saída e de retorno, e onde a criança ficará.',
        ],
        es: [
          'Detalles del viaje',
          'Fechas de salida y regreso, y dónde se alojará el menor.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'No separate proof of funds is required',
          'The child’s permission derives from the resident parent, whose status has already been assessed.',
        ],
        pt: [
          'Não é exigida comprovação de recursos à parte',
          'A permissão da criança deriva do responsável residente, cuja situação já foi avaliada.',
        ],
        es: [
          'No se exige prueba de fondos aparte',
          'El permiso del menor deriva del progenitor residente, cuya situación ya fue evaluada.',
        ],
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply by post to the re-entry visa unit',
          'Applications are made in advance of travel, not on return.',
        ],
        pt: [
          'Pedir por correio à unidade de vistos de reentrada',
          'Os pedidos são feitos antes da viagem, não na volta.',
        ],
        es: [
          'Solicitar por correo a la unidad de visados de reentrada',
          'Las solicitudes se hacen antes del viaje, no al regreso.',
        ],
      },
      {
        en: [
          'Pay the re-entry visa fee',
          'Single or multiple entry, at different rates.',
        ],
        pt: [
          'Pagar a taxa do visto de reentrada',
          'Entrada única ou múltipla, com valores diferentes.',
        ],
        es: [
          'Pagar la tasa del visado de reentrada',
          'Entrada única o múltiple, con importes distintos.',
        ],
      },
      {
        en: [
          'Allow enough time before travelling',
          'The passport is held while the application is processed, so leave a wide margin before the trip.',
        ],
        pt: [
          'Deixar tempo suficiente antes de viajar',
          'O passaporte fica retido durante a análise, então deixe uma margem larga antes da viagem.',
        ],
        es: [
          'Dejar tiempo suficiente antes de viajar',
          'El pasaporte queda retenido durante la tramitación, así que deje un margen amplio antes del viaje.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'No biometric appointment for this category',
          'The application is documentary and made by post.',
        ],
        pt: [
          'Sem atendimento biométrico nesta categoria',
          'O pedido é documental e feito por correio.',
        ],
        es: [
          'Sin cita biométrica en esta categoría',
          'La solicitud es documental y se hace por correo.',
        ],
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Travel with the child’s passport carrying the visa',
          'And with a copy of the resident parent’s permission.',
        ],
        pt: [
          'Viajar com o passaporte da criança já com o visto',
          'E com uma cópia da permissão do responsável residente.',
        ],
        es: [
          'Viajar con el pasaporte del menor ya con el visado',
          'Y con una copia del permiso del progenitor residente.',
        ],
      },
      {
        en: [
          'Register the child once they turn 16',
          'At that point they get their own Irish Residence Permit and stop needing re-entry visas.',
        ],
        pt: [
          'Registar a criança quando ela completar 16 anos',
          'Nesse momento ela passa a ter o próprio Irish Residence Permit e deixa de precisar de visto de reentrada.',
        ],
        es: [
          'Registrar al menor cuando cumpla 16 años',
          'En ese momento obtiene su propia Irish Residence Permit y deja de necesitar visados de reentrada.',
        ],
      },
    ],
  },
};
