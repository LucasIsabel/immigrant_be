import type { CountryVisaSteps } from './types';

/**
 * Steps for Switzerland.
 *
 * Switzerland is in Schengen but not in the EU, and the consequence for
 * non-EU/EFTA nationals is severe: work permits are capped by federal quotas,
 * the employer has to show no Swiss or EU candidate was available, and only
 * qualified profiles are eligible at all.
 *
 * The order of operations is the thing to internalise. The canton decides
 * first; the mission only issues the visa once the cantonal migration office
 * has authorised it. Applying at a consulate without that authorisation gets
 * nowhere.
 */
export const switzerland: CountryVisaSteps = {
  'Schengen Visa (Type C, up to 90 days)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond departure, issued within the last ten years.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses além da saída, emitido nos últimos dez anos.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses más allá de la salida, emitido en los últimos diez años.',
        ],
      },
      {
        en: [
          'Schengen application form, signed',
          'One per traveller, including minors.',
        ],
        pt: [
          'Formulário Schengen preenchido e assinado',
          'Um por viajante, inclusive menores.',
        ],
        es: [
          'Formulario Schengen cumplimentado y firmado',
          'Uno por viajero, incluidos menores.',
        ],
      },
      {
        en: [
          'Two recent photographs',
          'Passport format, on a light background.',
        ],
        pt: [
          'Duas fotografias recentes',
          'Formato passaporte, em fundo claro.',
        ],
        es: [
          'Dos fotografías recientes',
          'Formato pasaporte, con fondo claro.',
        ],
      },
      {
        en: [
          'Return flight reservation',
          'A reservation only, matching the dates declared.',
        ],
        pt: [
          'Reserva de voo de volta',
          'Apenas a reserva, coerente com as datas declaradas.',
        ],
        es: [
          'Reserva de vuelo de vuelta',
          'Solo la reserva, coherente con las fechas declaradas.',
        ],
      },
      {
        en: [
          'Proof of accommodation',
          'Hotel booking, or a formal declaration of sponsorship from your host validated by their cantonal authority.',
        ],
        pt: [
          'Comprovativo de alojamento',
          'Reserva de hotel, ou uma declaração formal de garantia do anfitrião validada pela autoridade cantonal dele.',
        ],
        es: [
          'Comprobante de alojamiento',
          'Reserva de hotel, o una declaración formal de garantía del anfitrión validada por su autoridad cantonal.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Minimum cover of 30,000 euros, valid across the Schengen area for the whole stay.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Cobertura mínima de 30 mil euros, válida no espaço Schengen durante toda a estada.',
        ],
        es: [
          'Seguro médico de viaje',
          'Cobertura mínima de 30 mil euros, válida en el espacio Schengen durante toda la estancia.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means of subsistence',
          'Switzerland is expensive and the daily figure expected is higher than in most Schengen states.',
        ],
        pt: [
          'Comprovativo de meios de subsistência',
          'A Suíça é cara e o valor diário esperado é maior que na maioria dos Estados Schengen.',
        ],
        es: [
          'Comprobante de medios de subsistencia',
          'Suiza es cara y la cifra diaria esperada es mayor que en la mayoría de los Estados Schengen.',
        ],
      },
      {
        en: [
          'Bank statements from the last three months',
          'The balance has to be consistent with the trip described.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'O saldo precisa ser coerente com a viagem descrita.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'El saldo debe ser coherente con el viaje descrito.',
        ],
      },
      {
        en: [
          'Proof of employment and approved leave',
          'An employer letter, or company documents if you are self-employed.',
        ],
        pt: [
          'Comprovativo de vínculo laboral e férias aprovadas',
          'Carta do empregador, ou documentos da empresa se for autônomo.',
        ],
        es: [
          'Comprobante de vínculo laboral y vacaciones aprobadas',
          'Carta del empleador, o documentos de la empresa si trabaja por cuenta propia.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the appointment at the Swiss mission or its partner centre',
          'Which office covers you depends on where you legally reside, not on your nationality.',
        ],
        pt: [
          'Agendar atendimento na representação suíça ou no centro parceiro',
          'Qual escritório atende você depende de onde reside legalmente, não da sua nacionalidade.',
        ],
        es: [
          'Reservar cita en la representación suiza o en su centro asociado',
          'Qué oficina le atiende depende de dónde reside legalmente, no de su nacionalidad.',
        ],
      },
      {
        en: [
          'Pay the visa fee',
          'Charged in Swiss francs and not refunded on refusal.',
        ],
        pt: [
          'Pagar a taxa do visto',
          'Cobrada em francos suíços e não devolvida em caso de indeferimento.',
        ],
        es: [
          'Pagar la tasa del visado',
          'Se cobra en francos suizos y no se devuelve si deniegan.',
        ],
      },
      {
        en: [
          'Submit the application in person',
          'Take originals and copies; apply no earlier than six months before travelling.',
        ],
        pt: [
          'Entregar o pedido presencialmente',
          'Leve originais e cópias; peça no máximo seis meses antes da viagem.',
        ],
        es: [
          'Presentar la solicitud en persona',
          'Lleve originales y copias; solicite como mucho seis meses antes de viajar.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Fingerprints stay on file for 59 months across Schengen applications.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'As impressões ficam registadas por 59 meses entre pedidos Schengen.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Las huellas quedan registradas 59 meses entre solicitudes Schengen.',
        ],
      },
      {
        en: ['Medical examination', 'Not required for short-stay visas.'],
        pt: ['Exame médico', 'Não é exigido em vistos de curta duração.'],
        es: ['Examen médico', 'No se exige en visados de corta duración.'],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport with the visa',
          'Check the validity and the number of entries granted.',
        ],
        pt: [
          'Retirar o passaporte com o visto',
          'Confira a validade e o número de entradas concedidas.',
        ],
        es: [
          'Recoger el pasaporte con el visado',
          'Verifique la validez y el número de entradas concedidas.',
        ],
      },
      {
        en: [
          'Respect the 90 days in any 180 rule',
          'Switzerland is in Schengen, so the days count together with every other member state.',
        ],
        pt: [
          'Respeitar a regra dos 90 dias em cada 180',
          'A Suíça está no Schengen, então os dias contam junto com os dos demais Estados-membros.',
        ],
        es: [
          'Respetar la regla de 90 días en cada 180',
          'Suiza está en Schengen, así que los días cuentan junto con los de los demás Estados miembros.',
        ],
      },
      {
        en: [
          'Remember that customs is separate from Schengen',
          'Switzerland is outside the EU customs union, so goods are still declared at the border.',
        ],
        pt: [
          'Lembrar que a alfândega é separada do Schengen',
          'A Suíça está fora da união aduaneira da UE, então mercadorias continuam sendo declaradas na fronteira.',
        ],
        es: [
          'Recordar que la aduana es independiente de Schengen',
          'Suiza está fuera de la unión aduanera de la UE, así que las mercancías se siguen declarando en la frontera.',
        ],
      },
      {
        en: [
          'Do not work on a short-stay visa',
          'Even short assignments need a separate authorisation, and Switzerland enforces this strictly.',
        ],
        pt: [
          'Não trabalhar com visto de curta duração',
          'Mesmo trabalhos curtos exigem autorização à parte, e a Suíça é rigorosa nisso.',
        ],
        es: [
          'No trabajar con visado de corta duración',
          'Incluso los encargos cortos requieren una autorización aparte, y Suiza lo aplica con rigor.',
        ],
      },
    ],
  },

  'National Visa / Residence Permit (Type D, over 90 days)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Should cover the period of residence applied for.',
        ],
        pt: [
          'Passaporte válido',
          'Deve cobrir o período de residência pedido.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir el periodo de residencia solicitado.',
        ],
      },
      {
        en: [
          'Cantonal authorisation issued first',
          'The canton where you will live decides before the mission does anything. The consular stage only opens after that approval arrives.',
        ],
        pt: [
          'Autorização cantonal emitida antes',
          'O cantão onde você vai morar decide antes de a representação fazer qualquer coisa. A etapa consular só abre depois que essa aprovação chega.',
        ],
        es: [
          'Autorización cantonal emitida antes',
          'El cantón donde vivirá decide antes de que la representación haga nada. La etapa consular solo se abre cuando llega esa aprobación.',
        ],
      },
      {
        en: [
          'National visa application form',
          'Filed in several copies, which is unusual and easy to overlook.',
        ],
        pt: [
          'Formulário de visto nacional',
          'Entregue em várias vias, o que é incomum e passa fácil despercebido.',
        ],
        es: [
          'Formulario de visado nacional',
          'Se presenta en varias copias, algo poco habitual y fácil de pasar por alto.',
        ],
      },
      {
        en: [
          'Document justifying the stay',
          'An employment contract, a university admission, or the family documents, depending on the ground.',
        ],
        pt: [
          'Documento que justifica a estada',
          'Contrato de trabalho, admissão universitária ou documentos familiares, conforme o fundamento.',
        ],
        es: [
          'Documento que justifica la estancia',
          'Contrato de trabajo, admisión universitaria o documentos familiares, según el fundamento.',
        ],
      },
      {
        en: [
          'Curriculum vitae and criminal record certificate',
          'Both are part of the standard cantonal file, apostilled and translated into the language of the canton.',
        ],
        pt: [
          'Currículo e certidão de antecedentes criminais',
          'Ambos fazem parte do processo cantonal padrão, apostilados e traduzidos para o idioma do cantão.',
        ],
        es: [
          'Currículum y certificado de antecedentes penales',
          'Ambos forman parte del expediente cantonal estándar, apostillados y traducidos al idioma del cantón.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas and academic transcripts',
          'Non-EU work permits are generally restricted to qualified profiles, so the qualification is central.',
        ],
        pt: [
          'Diplomas e históricos escolares',
          'Autorizações de trabalho para não-UE em geral se restringem a perfis qualificados, então a qualificação é central.',
        ],
        es: [
          'Títulos y expedientes académicos',
          'Los permisos de trabajo para no comunitarios suelen restringirse a perfiles cualificados, así que la titulación es central.',
        ],
      },
      {
        en: [
          'Proof of the local language where required',
          'Requirements vary by canton and by permit, and the relevant language differs across the country.',
        ],
        pt: [
          'Comprovação do idioma local quando exigida',
          'As exigências variam por cantão e por autorização, e o idioma relevante muda conforme a região do país.',
        ],
        es: [
          'Prueba del idioma local cuando se exija',
          'Los requisitos varían por cantón y por permiso, y el idioma relevante cambia según la región del país.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of sufficient means',
          'Assessed against Swiss living costs, which are among the highest anywhere.',
        ],
        pt: [
          'Comprovativo de meios suficientes',
          'Avaliado contra o custo de vida suíço, que está entre os mais altos do mundo.',
        ],
        es: [
          'Comprobante de medios suficientes',
          'Se evalúa contra el coste de vida suizo, de los más altos del mundo.',
        ],
      },
      {
        en: [
          'Salary in line with local standards',
          'The employer must offer conditions equivalent to the sector and region, not merely above a minimum.',
        ],
        pt: [
          'Salário compatível com os padrões locais',
          'O empregador precisa oferecer condições equivalentes às do setor e da região, não apenas acima de um mínimo.',
        ],
        es: [
          'Salario acorde con los estándares locales',
          'El empleador debe ofrecer condiciones equivalentes a las del sector y la región, no solo por encima de un mínimo.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Proof of funds for students',
          'A set amount per year, and students face limits on how much they may work.',
        ],
        pt: [
          'Comprovação de recursos para estudantes',
          'Um valor determinado por ano, e estudantes têm limite de quanto podem trabalhar.',
        ],
        es: [
          'Prueba de fondos para estudiantes',
          'Un importe determinado por año, y los estudiantes tienen límite de cuánto pueden trabajar.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Employer or institution applies to the canton',
          'This is where the process actually begins, and it is the longest stage.',
        ],
        pt: [
          'Empregador ou instituição pede ao cantão',
          'É aqui que o processo realmente começa, e é a etapa mais longa.',
        ],
        es: [
          'El empleador o la institución solicita al cantón',
          'Aquí es donde realmente empieza el proceso, y es la etapa más larga.',
        ],
      },
      {
        en: [
          'Apply for the D visa once the canton approves',
          'The mission is notified directly; you attend to complete the formalities.',
        ],
        pt: [
          'Pedir o visto D depois que o cantão aprovar',
          'A representação é notificada diretamente; você comparece para completar as formalidades.',
        ],
        es: [
          'Solicitar el visado D una vez que el cantón apruebe',
          'La representación recibe la notificación directamente; usted acude a completar las formalidades.',
        ],
      },
      {
        en: [
          'Pay the national visa fee',
          'Separate from the cantonal permit fee charged after arrival.',
        ],
        pt: [
          'Pagar a taxa de visto nacional',
          'Separada da taxa do título cantonal cobrada após a chegada.',
        ],
        es: [
          'Pagar la tasa de visado nacional',
          'Independiente de la tasa del permiso cantonal que se cobra tras la llegada.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Taken at the mission, and again for the permit card in Switzerland.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'Feita na representação, e novamente para o cartão de autorização na Suíça.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Se realiza en la representación, y de nuevo para la tarjeta de permiso en Suiza.',
        ],
      },
      {
        en: [
          'Swiss health insurance within three months',
          'Compulsory and backdated to your arrival, so delaying it does not save money — it only creates a bill.',
        ],
        pt: [
          'Seguro de saúde suíço em até três meses',
          'Obrigatório e retroativo à chegada, então adiar não economiza — só acumula fatura.',
        ],
        es: [
          'Seguro de salud suizo en tres meses',
          'Obligatorio y retroactivo a su llegada, así que retrasarlo no ahorra: solo acumula factura.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register at the commune within the legal deadline',
          'Done within days of arriving and before starting work. The commune, not the canton, is where you present yourself.',
        ],
        pt: [
          'Registar-se na comuna dentro do prazo legal',
          'Feito em poucos dias da chegada e antes de começar a trabalhar. Quem recebe você é a comuna, não o cantão.',
        ],
        es: [
          'Registrarse en la comuna dentro del plazo legal',
          'Se hace a los pocos días de llegar y antes de empezar a trabajar. Quien le recibe es la comuna, no el cantón.',
        ],
      },
      {
        en: [
          'Collect the residence permit card',
          'Issued by the cantonal migration office after the commune registration.',
        ],
        pt: [
          'Retirar o cartão de autorização de residência',
          'Emitido pelo serviço cantonal de migração após o registo na comuna.',
        ],
        es: [
          'Recoger la tarjeta de permiso de residencia',
          'La emite el servicio cantonal de migración tras el registro en la comuna.',
        ],
      },
      {
        en: [
          'Tell the authorities before moving canton',
          'Permits are cantonal; moving to another canton requires notifying both.',
        ],
        pt: [
          'Avisar as autoridades antes de mudar de cantão',
          'As autorizações são cantonais; mudar para outro cantão exige comunicar aos dois.',
        ],
        es: [
          'Avisar a las autoridades antes de cambiar de cantón',
          'Los permisos son cantonales; mudarse a otro cantón exige notificar a ambos.',
        ],
      },
      {
        en: [
          'Renew the permit annually',
          'Residence permits are typically renewed each year, and continuity is what leads to settlement.',
        ],
        pt: [
          'Renovar a autorização anualmente',
          'Autorizações de residência costumam ser renovadas a cada ano, e é a continuidade que leva ao estabelecimento.',
        ],
        es: [
          'Renovar el permiso anualmente',
          'Los permisos de residencia suelen renovarse cada año, y es la continuidad la que conduce al establecimiento.',
        ],
        priority: 2,
      },
    ],
  },

  'Work Permit / Labour Permit': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Plus the D visa, if your nationality requires one to enter.',
        ],
        pt: [
          'Passaporte válido',
          'Além do visto D, se sua nacionalidade exigir um para entrar.',
        ],
        es: [
          'Pasaporte vigente',
          'Además del visado D, si su nacionalidad lo exige para entrar.',
        ],
      },
      {
        en: [
          'Signed employment contract',
          'Stating role, salary, working hours and duration, on Swiss terms.',
        ],
        pt: [
          'Contrato de trabalho assinado',
          'Com função, salário, jornada e duração, em termos suíços.',
        ],
        es: [
          'Contrato de trabajo firmado',
          'Con puesto, salario, jornada y duración, en términos suizos.',
        ],
      },
      {
        en: [
          'Employer’s justification for hiring a non-EU worker',
          'The employer must document the search and show no suitable Swiss, EU or EFTA candidate was available. This is what most applications turn on.',
        ],
        pt: [
          'Justificativa do empregador para contratar fora da UE',
          'O empregador precisa documentar a busca e mostrar que não havia candidato suíço, da UE ou da EFTA adequado. É sobre isso que a maioria dos pedidos se decide.',
        ],
        es: [
          'Justificación del empleador para contratar fuera de la UE',
          'El empleador debe documentar la búsqueda y demostrar que no había candidato suizo, de la UE o de la AELC adecuado. Es sobre esto que se decide la mayoría de las solicitudes.',
        ],
      },
      {
        en: [
          'Curriculum vitae and references',
          'Evidencing the specialist profile the quota system is reserved for.',
        ],
        pt: [
          'Currículo e referências',
          'Comprovando o perfil especializado a que o sistema de cotas se destina.',
        ],
        es: [
          'Currículum y referencias',
          'Que acrediten el perfil especializado al que se destina el sistema de cuotas.',
        ],
      },
      {
        en: [
          'Criminal record certificate',
          'Apostilled and translated into the language of the canton.',
        ],
        pt: [
          'Certidão de antecedentes criminais',
          'Apostilada e traduzida para o idioma do cantão.',
        ],
        es: [
          'Certificado de antecedentes penales',
          'Apostillado y traducido al idioma del cantón.',
        ],
      },
    ],
    education: [
      {
        en: [
          'University degree or equivalent qualification',
          'Third-country work permits are effectively limited to managers, specialists and other qualified workers.',
        ],
        pt: [
          'Diploma universitário ou qualificação equivalente',
          'As autorizações de trabalho para terceiros países ficam efetivamente limitadas a gestores, especialistas e outros trabalhadores qualificados.',
        ],
        es: [
          'Título universitario o cualificación equivalente',
          'Los permisos de trabajo para terceros países se limitan en la práctica a directivos, especialistas y otros trabajadores cualificados.',
        ],
      },
      {
        en: [
          'Evidence of several years of professional experience',
          'Usually expected alongside the qualification, not instead of it.',
        ],
        pt: [
          'Comprovação de vários anos de experiência profissional',
          'Em geral esperada junto com a qualificação, não no lugar dela.',
        ],
        es: [
          'Prueba de varios años de experiencia profesional',
          'Se espera junto con la titulación, no en su lugar.',
        ],
      },
      {
        en: [
          'Recognition for regulated professions',
          'Healthcare, law and teaching require recognition by the competent Swiss body before practising.',
        ],
        pt: [
          'Reconhecimento para profissões regulamentadas',
          'Saúde, direito e ensino exigem reconhecimento pelo órgão suíço competente antes do exercício.',
        ],
        es: [
          'Reconocimiento para profesiones reguladas',
          'Sanidad, derecho y enseñanza exigen reconocimiento del organismo suizo competente antes de ejercer.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary meeting sector and regional standards',
          'Undercutting local pay is itself a ground for refusal, since the rules exist to protect the domestic labour market.',
        ],
        pt: [
          'Salário compatível com os padrões do setor e da região',
          'Pagar abaixo do local é por si só motivo de indeferimento, já que as regras existem para proteger o mercado de trabalho interno.',
        ],
        es: [
          'Salario acorde con los estándares del sector y la región',
          'Pagar por debajo de lo local es por sí solo motivo de denegación, ya que las normas existen para proteger el mercado laboral interno.',
        ],
      },
      {
        en: [
          'Employer’s contribution to social insurance',
          'Registration with the Swiss social security scheme starts with the employment.',
        ],
        pt: [
          'Contribuição do empregador à seguridade social',
          'A inscrição no regime suíço de seguridade social começa com o vínculo de trabalho.',
        ],
        es: [
          'Cotización del empleador a la seguridad social',
          'La inscripción en el régimen suizo de seguridad social empieza con el empleo.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Employer applies to the cantonal labour authority',
          'The application is the employer’s, not yours. Without a company willing to run it, there is no route here.',
        ],
        pt: [
          'Empregador pede à autoridade cantonal de trabalho',
          'O pedido é do empregador, não seu. Sem uma empresa disposta a conduzi-lo, não há rota aqui.',
        ],
        es: [
          'El empleador solicita a la autoridad cantonal de trabajo',
          'La solicitud es del empleador, no suya. Sin una empresa dispuesta a llevarla, no hay vía aquí.',
        ],
      },
      {
        en: [
          'Wait for the federal quota to be allocated',
          'Permits for third-country nationals are capped nationally and released in tranches, so timing can decide the outcome.',
        ],
        pt: [
          'Aguardar a alocação da cota federal',
          'As autorizações para nacionais de terceiros países têm teto nacional e são liberadas em lotes, então o momento pode decidir o resultado.',
        ],
        es: [
          'Esperar la asignación del cupo federal',
          'Los permisos para nacionales de terceros países tienen tope nacional y se liberan por tramos, así que el momento puede decidir el resultado.',
        ],
      },
      {
        en: [
          'Federal approval after the cantonal decision',
          'Both levels have to agree; the canton approving is not the end of the process.',
        ],
        pt: [
          'Aprovação federal após a decisão cantonal',
          'Os dois níveis precisam concordar; o cantão aprovar não é o fim do processo.',
        ],
        es: [
          'Aprobación federal tras la decisión cantonal',
          'Ambos niveles deben coincidir; que el cantón apruebe no es el final del proceso.',
        ],
      },
      {
        en: [
          'Pay the permit fees',
          'Charged by the canton, in addition to the visa fee.',
        ],
        pt: [
          'Pagar as taxas da autorização',
          'Cobradas pelo cantão, além da taxa do visto.',
        ],
        es: [
          'Pagar las tasas del permiso',
          'Las cobra el cantón, además de la tasa del visado.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection for the permit card',
          'Taken at the cantonal migration office after arrival.',
        ],
        pt: [
          'Recolha de dados biométricos para o cartão de autorização',
          'Feita no serviço cantonal de migração após a chegada.',
        ],
        es: [
          'Recogida de datos biométricos para la tarjeta de permiso',
          'Se realiza en el servicio cantonal de migración tras la llegada.',
        ],
      },
      {
        en: [
          'Swiss health insurance within three months',
          'Compulsory for every resident, backdated to arrival, and chosen by you rather than provided by the employer.',
        ],
        pt: [
          'Seguro de saúde suíço em até três meses',
          'Obrigatório para todo residente, retroativo à chegada, e escolhido por você, não fornecido pelo empregador.',
        ],
        es: [
          'Seguro de salud suizo en tres meses',
          'Obligatorio para todo residente, retroactivo a la llegada, y elegido por usted, no provisto por el empleador.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check which permit type you were granted',
          'A short-term permit and a residence permit look similar but differ in duration, renewability and what they lead to.',
        ],
        pt: [
          'Conferir qual tipo de autorização foi concedido',
          'Uma autorização de curta duração e uma de residência parecem semelhantes, mas diferem em prazo, renovação e no que levam.',
        ],
        es: [
          'Comprobar qué tipo de permiso le concedieron',
          'Un permiso de corta duración y uno de residencia se parecen, pero difieren en plazo, renovación y en adónde conducen.',
        ],
      },
      {
        en: [
          'Register at the commune before starting work',
          'Starting before registering is a breach, even with the permit approved.',
        ],
        pt: [
          'Registar-se na comuna antes de começar a trabalhar',
          'Começar antes de se registar é uma infração, mesmo com a autorização aprovada.',
        ],
        es: [
          'Registrarse en la comuna antes de empezar a trabajar',
          'Empezar antes de registrarse es una infracción, incluso con el permiso aprobado.',
        ],
      },
      {
        en: [
          'Get authorisation before changing employer',
          'The permit is tied to the job it was granted for, and a change needs a new decision.',
        ],
        pt: [
          'Obter autorização antes de trocar de empregador',
          'A autorização está vinculada ao emprego para o qual foi concedida, e a troca exige nova decisão.',
        ],
        es: [
          'Obtener autorización antes de cambiar de empleador',
          'El permiso está ligado al empleo para el que se concedió, y el cambio exige una nueva decisión.',
        ],
      },
      {
        en: [
          'Count the years towards a settlement permit',
          'Settlement normally comes after ten years, or sooner for certain nationalities and where integration criteria are met.',
        ],
        pt: [
          'Contar os anos para a autorização de estabelecimento',
          'O estabelecimento em geral vem após dez anos, ou antes para certas nacionalidades e quando os critérios de integração são cumpridos.',
        ],
        es: [
          'Contar los años para el permiso de establecimiento',
          'El establecimiento suele llegar tras diez años, o antes para ciertas nacionalidades y cuando se cumplen los criterios de integración.',
        ],
        priority: 2,
      },
    ],
  },
};
