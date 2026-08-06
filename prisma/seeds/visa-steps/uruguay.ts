import type { CountryVisaSteps } from './types';

/**
 * Steps for Uruguay.
 *
 * Two things make Uruguay unusually accessible. Mercosur nationals get
 * residence on nationality alone, through the foreign ministry rather than
 * migration, and it is markedly faster than the ordinary route. And the whole
 * process can be started from inside the country while on a tourist entry, so
 * nobody has to go home and wait.
 *
 * The carné de salud catches people out: it is a genuine medical check done at
 * a Uruguayan clinic, not a certificate you bring from abroad, and it cannot be
 * skipped.
 */
export const uruguay: CountryVisaSteps = {
  'Tourist Entry': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Most of the Americas and Europe enter visa-free; check whether your nationality is among them before applying for anything.',
        ],
        pt: [
          'Passaporte válido',
          'A maior parte das Américas e da Europa entra sem visto; verifique se sua nacionalidade está entre elas antes de pedir qualquer coisa.',
        ],
        es: [
          'Pasaporte vigente',
          'La mayor parte de América y Europa entra sin visado; compruebe si su nacionalidad está entre ellas antes de solicitar nada.',
        ],
      },
      {
        en: [
          'National identity document for Mercosur nationals',
          'Citizens of member and associate states enter with their ID card, without a passport.',
        ],
        pt: [
          'Documento nacional de identidade para nacionais do Mercosul',
          'Cidadãos de Estados membros e associados entram com a carteira de identidade, sem passaporte.',
        ],
        es: [
          'Documento nacional de identidad para nacionales del Mercosur',
          'Los ciudadanos de Estados miembros y asociados entran con su documento de identidad, sin pasaporte.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Return or onward ticket',
          'Checked at the border as evidence of a genuine visit.',
        ],
        pt: [
          'Bilhete de volta ou de continuação',
          'Conferido na fronteira como prova de visita genuína.',
        ],
        es: [
          'Billete de vuelta o de continuación',
          'Se comprueba en la frontera como prueba de una visita genuina.',
        ],
      },
      {
        en: [
          'Proof of accommodation',
          'A booking, or the address of whoever is hosting you.',
        ],
        pt: [
          'Comprovação de alojamento',
          'Uma reserva, ou o endereço de quem vai hospedar você.',
        ],
        es: [
          'Comprobante de alojamiento',
          'Una reserva, o la dirección de quien le aloja.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the stay',
          'No fixed figure is published; officers assess it against the length of the trip.',
        ],
        pt: [
          'Comprovação de recursos para a estada',
          'Não há valor fixo publicado; os oficiais avaliam conforme a duração da viagem.',
        ],
        es: [
          'Prueba de fondos para la estancia',
          'No hay cifra fija publicada; los oficiales la valoran según la duración del viaje.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'No advance application for visa-free nationalities',
          'There is no online travel authorisation; you present yourself at the border.',
        ],
        pt: [
          'Sem pedido prévio para nacionalidades isentas',
          'Não existe autorização de viagem online; você se apresenta na fronteira.',
        ],
        es: [
          'Sin solicitud previa para nacionalidades exentas',
          'No existe autorización de viaje en línea; se presenta en la frontera.',
        ],
      },
      {
        en: [
          'Apply at the consulate if a visa is required',
          'With the form, photograph, itinerary and proof of means.',
        ],
        pt: [
          'Pedir no consulado se houver exigência de visto',
          'Com formulário, fotografia, itinerário e comprovação de meios.',
        ],
        es: [
          'Solicitar en el consulado si se exige visado',
          'Con formulario, fotografía, itinerario y prueba de medios.',
        ],
        required: false,
      },
    ],
    biometrics_health: [
      {
        en: [
          'Migration registration at the border',
          'Entry and exit are recorded electronically.',
        ],
        pt: [
          'Registo migratório na fronteira',
          'Entrada e saída são registadas eletronicamente.',
        ],
        es: [
          'Registro migratorio en la frontera',
          'La entrada y la salida se registran electrónicamente.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Not compulsory, but there is no free public care for tourists.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é obrigatório, mas não há atendimento público gratuito para turistas.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es obligatorio, pero no hay atención pública gratuita para turistas.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Note the stay granted at the border',
          'Usually ninety days, extendable once at the migration office.',
        ],
        pt: [
          'Anotar o prazo concedido na fronteira',
          'Em geral noventa dias, prorrogáveis uma vez no órgão de migração.',
        ],
        es: [
          'Anotar el plazo concedido en la frontera',
          'Por lo general noventa días, prorrogables una vez ante migración.',
        ],
      },
      {
        en: [
          'Do not work as a tourist',
          'Paid activity requires a residence, even one still in progress.',
        ],
        pt: [
          'Não trabalhar como turista',
          'Atividade remunerada exige residência, ainda que em andamento.',
        ],
        es: [
          'No trabajar como turista',
          'La actividad remunerada exige una residencia, aunque esté en trámite.',
        ],
      },
      {
        en: [
          'Start the residence application from inside the country if you plan to stay',
          'Uruguay allows it while you are on a tourist entry, which removes the need to go home and wait.',
        ],
        pt: [
          'Iniciar o pedido de residência de dentro do país, se pretende ficar',
          'O Uruguai permite isso enquanto você está com entrada de turista, o que elimina a necessidade de voltar e esperar.',
        ],
        es: [
          'Iniciar la solicitud de residencia desde dentro del país si piensa quedarse',
          'Uruguay lo permite mientras está con entrada de turista, lo que elimina la necesidad de volver y esperar.',
        ],
        priority: 2,
      },
    ],
  },

  'Mercosur Residence': {
    core_documents: [
      {
        en: [
          'National identity document or passport',
          'Proving nationality of a Mercosur member or associate state, which is the entire basis of this route.',
        ],
        pt: [
          'Documento nacional de identidade ou passaporte',
          'Comprovando nacionalidade de Estado membro ou associado do Mercosul, que é toda a base desta rota.',
        ],
        es: [
          'Documento nacional de identidad o pasaporte',
          'Que acredite la nacionalidad de un Estado miembro o asociado del Mercosur, que es toda la base de esta vía.',
        ],
      },
      {
        en: [
          'Birth certificate, apostilled',
          'Apostilled in the country of issue. Uruguay accepts documents in Spanish and Portuguese without translation.',
        ],
        pt: [
          'Certidão de nascimento apostilada',
          'Apostilada no país de emissão. O Uruguai aceita documentos em espanhol e português sem tradução.',
        ],
        es: [
          'Partida de nacimiento apostillada',
          'Apostillada en el país de emisión. Uruguay acepta documentos en español y portugués sin traducción.',
        ],
      },
      {
        en: [
          'Criminal record certificate from your country',
          'Apostilled, covering the last five years of residence.',
        ],
        pt: [
          'Certidão de antecedentes penais do seu país',
          'Apostilada, cobrindo os últimos cinco anos de residência.',
        ],
        es: [
          'Certificado de antecedentes penales de su país',
          'Apostillado, cubriendo los últimos cinco años de residencia.',
        ],
      },
      {
        en: [
          'Uruguayan criminal record certificate',
          'Obtained locally once you are in the country.',
        ],
        pt: [
          'Certidão de antecedentes penais uruguaia',
          'Obtida localmente depois que você estiver no país.',
        ],
        es: [
          'Certificado de antecedentes penales uruguayo',
          'Se obtiene localmente una vez que está en el país.',
        ],
      },
      {
        en: [
          'Proof of address in Uruguay',
          'A lease, utility bill or a sworn statement with two witnesses.',
        ],
        pt: [
          'Comprovante de domicílio no Uruguai',
          'Contrato de aluguel, conta de serviço ou declaração juramentada com duas testemunhas.',
        ],
        es: [
          'Comprobante de domicilio en Uruguay',
          'Contrato de alquiler, factura de servicios o declaración jurada con dos testigos.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'No proof of income is required',
          'The Mercosur route grants residence on nationality alone. This is what makes it far lighter than the ordinary temporary residence.',
        ],
        pt: [
          'Não é exigida comprovação de renda',
          'A rota Mercosul concede residência apenas pela nacionalidade. É isso que a torna muito mais leve que a residência temporária comum.',
        ],
        es: [
          'No se exige prueba de ingresos',
          'La vía Mercosur concede la residencia solo por la nacionalidad. Eso es lo que la hace mucho más ligera que la residencia temporaria ordinaria.',
        ],
        required: false,
      },
      {
        en: [
          'Pay the processing fees',
          'Charged by the foreign ministry and for the identity card; modest compared with most countries.',
        ],
        pt: [
          'Pagar as taxas do processo',
          'Cobradas pelo ministério das relações exteriores e pela cédula de identidade; modestas em comparação com a maioria dos países.',
        ],
        es: [
          'Pagar las tasas del trámite',
          'Las cobra el ministerio de relaciones exteriores y la cédula de identidad; modestas en comparación con la mayoría de los países.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File with the foreign ministry, not with migration',
          'The Mercosur route is handled by the Ministry of Foreign Affairs, which is a different office and a different queue.',
        ],
        pt: [
          'Protocolar no ministério das relações exteriores, não na migração',
          'A rota Mercosul é conduzida pelo Ministério das Relações Exteriores, que é outro órgão e outra fila.',
        ],
        es: [
          'Presentar ante el ministerio de relaciones exteriores, no ante migración',
          'La vía Mercosur la lleva el Ministerio de Relaciones Exteriores, que es otra oficina y otra cola.',
        ],
      },
      {
        en: [
          'Book the appointment online',
          'Slots are released periodically; book as soon as the documents are apostilled.',
        ],
        pt: [
          'Agendar o atendimento online',
          'As vagas são liberadas periodicamente; agende assim que os documentos estiverem apostilados.',
        ],
        es: [
          'Reservar la cita en línea',
          'Las citas se liberan periódicamente; resérvela en cuanto los documentos estén apostillados.',
        ],
      },
      {
        en: [
          'Receive the two-year temporary residence',
          'Granted much faster than the ordinary route, often within weeks rather than months.',
        ],
        pt: [
          'Receber a residência temporária de dois anos',
          'Concedida bem mais rápido que na rota comum, muitas vezes em semanas em vez de meses.',
        ],
        es: [
          'Recibir la residencia temporaria de dos años',
          'Se concede mucho más rápido que en la vía ordinaria, a menudo en semanas en lugar de meses.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Carné de salud from a Uruguayan clinic',
          'A real medical check-up done locally — blood tests, dental and general examination. A certificate from abroad is not accepted.',
        ],
        pt: [
          'Carné de salud emitido por clínica uruguaia',
          'É um check-up médico de verdade feito localmente — exames de sangue, avaliação odontológica e geral. Certificado trazido do exterior não é aceite.',
        ],
        es: [
          'Carné de salud emitido por una clínica uruguaya',
          'Es un chequeo médico real hecho localmente: análisis de sangre, revisión odontológica y general. Un certificado traído del exterior no se acepta.',
        ],
      },
      {
        en: [
          'Fingerprints for the identity card',
          'Taken when the cédula is issued.',
        ],
        pt: [
          'Impressões digitais para a cédula de identidade',
          'Recolhidas na emissão da cédula.',
        ],
        es: [
          'Huellas dactilares para la cédula de identidad',
          'Se toman al emitir la cédula.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Get the cédula de identidad',
          'The Uruguayan ID card, which is what everything else runs on: bank, health, work, phone.',
        ],
        pt: [
          'Obter a cédula de identidad',
          'A identidade uruguaia, que é o que todo o resto exige: banco, saúde, trabalho, telefone.',
        ],
        es: [
          'Obtener la cédula de identidad',
          'El documento uruguayo, que es lo que todo lo demás exige: banco, salud, trabajo, teléfono.',
        ],
      },
      {
        en: [
          'Register with social security',
          'The BPS registration is what lets an employer hire you formally.',
        ],
        pt: [
          'Inscrever-se na previdência social',
          'O registo no BPS é o que permite a um empregador contratar você formalmente.',
        ],
        es: [
          'Inscribirse en la seguridad social',
          'El registro en el BPS es lo que permite a un empleador contratarle formalmente.',
        ],
      },
      {
        en: [
          'Convert to permanent residence after two years',
          'The temporary Mercosur residence converts on request, with an updated criminal record certificate.',
        ],
        pt: [
          'Converter para residência permanente após dois anos',
          'A residência Mercosul temporária converte a pedido, com certidão de antecedentes atualizada.',
        ],
        es: [
          'Convertir a residencia permanente tras dos años',
          'La residencia Mercosur temporaria se convierte a solicitud, con certificado de antecedentes actualizado.',
        ],
      },
      {
        en: [
          'Do not let the two-year residence lapse',
          'Conversion is requested before it expires; letting it run out means starting over.',
        ],
        pt: [
          'Não deixar a residência de dois anos caducar',
          'A conversão é pedida antes do vencimento; deixá-la vencer significa recomeçar.',
        ],
        es: [
          'No dejar caducar la residencia de dos años',
          'La conversión se solicita antes del vencimiento; dejarla vencer implica empezar de nuevo.',
        ],
        priority: 2,
      },
    ],
  },

  'Temporary Residence': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'This is the route for nationals outside Mercosur; check the Mercosur route first if you might qualify.',
        ],
        pt: [
          'Passaporte válido',
          'Esta é a rota para nacionais de fora do Mercosul; confira antes a rota Mercosul se você puder qualificar.',
        ],
        es: [
          'Pasaporte vigente',
          'Esta es la vía para nacionales de fuera del Mercosur; compruebe antes la vía Mercosur si pudiera calificar.',
        ],
      },
      {
        en: [
          'Birth certificate, apostilled and translated',
          'Documents in languages other than Spanish or Portuguese need a translation by a public translator.',
        ],
        pt: [
          'Certidão de nascimento apostilada e traduzida',
          'Documentos em idiomas que não espanhol ou português exigem tradução por tradutor público.',
        ],
        es: [
          'Partida de nacimiento apostillada y traducida',
          'Los documentos en idiomas distintos del español o el portugués exigen traducción por traductor público.',
        ],
      },
      {
        en: [
          'Criminal record certificates',
          'From your country of origin, apostilled, and from Uruguay once you are here.',
        ],
        pt: [
          'Certidões de antecedentes penais',
          'Do país de origem, apostilada, e do Uruguai depois que você estiver aqui.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'Del país de origen, apostillado, y de Uruguay una vez que esté aquí.',
        ],
      },
      {
        en: [
          'Document supporting the ground for the stay',
          'An employment contract, an enrolment certificate, or evidence of the family tie.',
        ],
        pt: [
          'Documento que sustenta o fundamento da estada',
          'Contrato de trabalho, certificado de matrícula, ou comprovação do vínculo familiar.',
        ],
        es: [
          'Documento que sustenta el fundamento de la estancia',
          'Contrato de trabajo, certificado de inscripción, o prueba del vínculo familiar.',
        ],
      },
      {
        en: [
          'Proof of address in Uruguay',
          'A lease, utility bill, or sworn statement with witnesses.',
        ],
        pt: [
          'Comprovante de domicílio no Uruguai',
          'Contrato de aluguel, conta de serviço, ou declaração juramentada com testemunhas.',
        ],
        es: [
          'Comprobante de domicilio en Uruguay',
          'Contrato de alquiler, factura de servicios, o declaración jurada con testigos.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas for regulated professions',
          'Practising requires the qualification to be recognised by the national university, a slow process worth starting early.',
        ],
        pt: [
          'Diplomas para profissões regulamentadas',
          'Exercer exige que a qualificação seja reconhecida pela universidade nacional, um processo lento que vale começar cedo.',
        ],
        es: [
          'Títulos para profesiones reguladas',
          'Ejercer exige que la titulación sea reconocida por la universidad nacional, un proceso lento que conviene empezar pronto.',
        ],
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of lawful, regular income',
          'Unlike the Mercosur route, this one does assess means. Remote income and pensions are both accepted.',
        ],
        pt: [
          'Comprovação de renda lícita e regular',
          'Diferente da rota Mercosul, esta avalia meios de fato. Renda remota e aposentadoria são aceitas.',
        ],
        es: [
          'Prueba de ingresos lícitos y regulares',
          'A diferencia de la vía Mercosur, esta sí evalúa medios. Se aceptan ingresos remotos y pensiones.',
        ],
      },
      {
        en: [
          'Bank statements covering recent months',
          'Showing the income is regular rather than a single transfer.',
        ],
        pt: [
          'Extratos bancários dos últimos meses',
          'Mostrando que a renda é regular, não uma transferência isolada.',
        ],
        es: [
          'Extractos bancarios de los últimos meses',
          'Que muestren que el ingreso es regular, no una transferencia aislada.',
        ],
      },
      {
        en: [
          'Pay the processing fees',
          'Charged by migration and for the identity card.',
        ],
        pt: [
          'Pagar as taxas do processo',
          'Cobradas pela migração e pela cédula de identidade.',
        ],
        es: [
          'Pagar las tasas del trámite',
          'Las cobra migración y la cédula de identidad.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File with the national migration directorate',
          'The ordinary route is handled by migration, not by the foreign ministry.',
        ],
        pt: [
          'Protocolar na direção nacional de migração',
          'A rota comum é conduzida pela migração, não pelo ministério das relações exteriores.',
        ],
        es: [
          'Presentar ante la dirección nacional de migración',
          'La vía ordinaria la lleva migración, no el ministerio de relaciones exteriores.',
        ],
      },
      {
        en: [
          'Book the appointment and attend in person',
          'Originals are presented and the file is opened there.',
        ],
        pt: [
          'Agendar o atendimento e comparecer presencialmente',
          'Os originais são apresentados e o processo é aberto ali.',
        ],
        es: [
          'Reservar la cita y acudir en persona',
          'Se presentan los originales y allí se abre el expediente.',
        ],
      },
      {
        en: [
          'Expect a longer decision than the Mercosur route',
          'The ordinary route commonly takes many months.',
        ],
        pt: [
          'Contar com decisão mais demorada que na rota Mercosul',
          'A rota comum costuma levar muitos meses.',
        ],
        es: [
          'Contar con una decisión más lenta que en la vía Mercosur',
          'La vía ordinaria suele tardar muchos meses.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Carné de salud from a Uruguayan clinic',
          'A local medical check-up; a certificate brought from abroad is not accepted.',
        ],
        pt: [
          'Carné de salud emitido por clínica uruguaia',
          'Um check-up médico local; certificado trazido do exterior não é aceite.',
        ],
        es: [
          'Carné de salud emitido por una clínica uruguaya',
          'Un chequeo médico local; un certificado traído del exterior no se acepta.',
        ],
      },
      {
        en: [
          'Fingerprints for the identity card',
          'Taken when the cédula is issued.',
        ],
        pt: [
          'Impressões digitais para a cédula de identidade',
          'Recolhidas na emissão da cédula.',
        ],
        es: [
          'Huellas dactilares para la cédula de identidad',
          'Se toman al emitir la cédula.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Get the cédula de identidad',
          'Issued with the same validity as the residence granted.',
        ],
        pt: [
          'Obter a cédula de identidad',
          'Emitida com a mesma validade da residência concedida.',
        ],
        es: [
          'Obtener la cédula de identidad',
          'Se emite con la misma validez que la residencia concedida.',
        ],
      },
      {
        en: [
          'Register with social security and the tax office',
          'Needed to work formally or to invoice as self-employed.',
        ],
        pt: [
          'Inscrever-se na previdência e na receita',
          'Necessário para trabalhar formalmente ou emitir nota como autônomo.',
        ],
        es: [
          'Inscribirse en la seguridad social y en la agencia tributaria',
          'Necesario para trabajar formalmente o facturar como autónomo.',
        ],
      },
      {
        en: [
          'Renew before the residence expires',
          'Temporary residence is granted for a set period and renewal keeps the continuity.',
        ],
        pt: [
          'Renovar antes de a residência vencer',
          'A residência temporária é concedida por prazo determinado, e a renovação mantém a continuidade.',
        ],
        es: [
          'Renovar antes de que venza la residencia',
          'La residencia temporaria se concede por un plazo determinado, y la renovación mantiene la continuidad.',
        ],
      },
      {
        en: [
          'Note the favourable tax treatment for new residents',
          'Uruguay offers a period of exemption on foreign-source income for people who become tax residents. Confirm the current terms before relying on it.',
        ],
        pt: [
          'Observar o tratamento fiscal favorável a novos residentes',
          'O Uruguai oferece um período de isenção sobre renda de fonte estrangeira para quem passa a ser residente fiscal. Confirme os termos vigentes antes de contar com isso.',
        ],
        es: [
          'Observar el trato fiscal favorable a nuevos residentes',
          'Uruguay ofrece un periodo de exención sobre rentas de fuente extranjera para quienes pasan a ser residentes fiscales. Confirme los términos vigentes antes de contar con ello.',
        ],
        priority: 3,
        required: false,
      },
    ],
  },

  'Permanent Residence': {
    core_documents: [
      {
        en: [
          'Valid passport or national identity document',
          'Plus the current residence and cédula.',
        ],
        pt: [
          'Passaporte válido ou documento nacional de identidade',
          'Além da residência atual e da cédula.',
        ],
        es: [
          'Pasaporte vigente o documento nacional de identidad',
          'Además de la residencia actual y la cédula.',
        ],
      },
      {
        en: [
          'Evidence of the qualifying period',
          'Mercosur nationals convert after two years of temporary residence; other routes take longer and depend on the ground.',
        ],
        pt: [
          'Comprovação do período qualificado',
          'Nacionais do Mercosul convertem após dois anos de residência temporária; outras rotas levam mais tempo e dependem do fundamento.',
        ],
        es: [
          'Prueba del periodo cualificado',
          'Los nacionales del Mercosur convierten tras dos años de residencia temporaria; otras vías tardan más y dependen del fundamento.',
        ],
      },
      {
        en: [
          'Updated criminal record certificates',
          'Uruguayan, and from your country of origin if you spent time there during the period.',
        ],
        pt: [
          'Certidões de antecedentes penais atualizadas',
          'Uruguaia, e do país de origem se você passou tempo lá durante o período.',
        ],
        es: [
          'Certificados de antecedentes penales actualizados',
          'Uruguayo, y del país de origen si pasó tiempo allí durante el periodo.',
        ],
      },
      {
        en: [
          'Proof of current address in Uruguay',
          'Evidencing that you actually live in the country.',
        ],
        pt: [
          'Comprovante de domicílio atual no Uruguai',
          'Comprovando que você de fato mora no país.',
        ],
        es: [
          'Comprobante de domicilio actual en Uruguay',
          'Que acredite que efectivamente vive en el país.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of means of living',
          'Employment, self-employment or passive income; the standard is that you support yourself.',
        ],
        pt: [
          'Comprovação de meios de vida',
          'Emprego, atividade autônoma ou renda passiva; o padrão é que você se sustente.',
        ],
        es: [
          'Prueba de medios de vida',
          'Empleo, actividad por cuenta propia o renta pasiva; el estándar es que se mantenga por sí mismo.',
        ],
      },
      {
        en: [
          'Pay the conversion fees',
          'Charged for the process and for reissuing the identity card.',
        ],
        pt: [
          'Pagar as taxas da conversão',
          'Cobradas pelo processo e pela reemissão da cédula.',
        ],
        es: [
          'Pagar las tasas de la conversión',
          'Se cobran por el trámite y por reemitir la cédula.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File with the office that granted the temporary residence',
          'The foreign ministry for the Mercosur route, migration for the ordinary one.',
        ],
        pt: [
          'Protocolar no órgão que concedeu a residência temporária',
          'O ministério das relações exteriores na rota Mercosul, a migração na rota comum.',
        ],
        es: [
          'Presentar ante la oficina que concedió la residencia temporaria',
          'El ministerio de relaciones exteriores en la vía Mercosur, migración en la ordinaria.',
        ],
      },
      {
        en: [
          'Apply before the temporary residence expires',
          'Letting it lapse means losing the accumulated period and starting again.',
        ],
        pt: [
          'Pedir antes de a residência temporária vencer',
          'Deixá-la caducar significa perder o período acumulado e recomeçar.',
        ],
        es: [
          'Solicitar antes de que venza la residencia temporaria',
          'Dejarla caducar implica perder el periodo acumulado y empezar de nuevo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Updated carné de salud',
          'Required again for the conversion, from a Uruguayan clinic.',
        ],
        pt: [
          'Carné de salud atualizado',
          'Exigido novamente na conversão, emitido por clínica uruguaia.',
        ],
        es: [
          'Carné de salud actualizado',
          'Se exige de nuevo en la conversión, emitido por una clínica uruguaya.',
        ],
      },
      {
        en: [
          'Fingerprints for the new identity card',
          'Taken when the permanent cédula is issued.',
        ],
        pt: [
          'Impressões digitais para a nova cédula',
          'Recolhidas na emissão da cédula permanente.',
        ],
        es: [
          'Huellas dactilares para la nueva cédula',
          'Se toman al emitir la cédula permanente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Get the permanent cédula',
          'Issued without a residence-linked expiry.',
        ],
        pt: [
          'Obter a cédula permanente',
          'Emitida sem validade atrelada à residência.',
        ],
        es: [
          'Obtener la cédula permanente',
          'Se emite sin vencimiento atado a la residencia.',
        ],
      },
      {
        en: [
          'Keep living in the country',
          'Permanent residence can be lost through prolonged absence, so the tie has to remain real.',
        ],
        pt: [
          'Continuar morando no país',
          'A residência permanente pode ser perdida por ausência prolongada, então o vínculo precisa continuar real.',
        ],
        es: [
          'Seguir viviendo en el país',
          'La residencia permanente puede perderse por ausencia prolongada, así que el vínculo debe seguir siendo real.',
        ],
      },
      {
        en: [
          'Consider legal citizenship after the qualifying period',
          'Uruguay grants it after several years of residence, shorter for those with family in the country.',
        ],
        pt: [
          'Avaliar a cidadania legal após o período qualificado',
          'O Uruguai a concede após alguns anos de residência, prazo menor para quem tem família no país.',
        ],
        es: [
          'Evaluar la ciudadanía legal tras el periodo cualificado',
          'Uruguay la concede tras varios años de residencia, plazo menor para quienes tienen familia en el país.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
