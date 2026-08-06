import type { CountryVisaSteps } from './types';

/**
 * Steps for South Korea.
 *
 * Long stays run on the Certificate of Confirmation of Visa Issuance. The
 * sponsor inside Korea — an employer, a university, an investor entity — obtains
 * it from the local immigration office and sends you the issuance number; only
 * then does the embassy stage begin, and it is short. Building a case at a
 * consulate from scratch is the wrong order and costs months.
 *
 * After arrival, alien registration is a hard deadline, and the resulting
 * residence card is what unlocks a bank account, a phone contract and health
 * insurance. Nationals of designated countries also clear a tuberculosis test at
 * a nominated hospital before the visa is even issued.
 *
 * Settlement runs through a points system: the F-2 scoring route, fed by income,
 * qualifications and Korean language, is the ordinary path to permanent F-5
 * residence, and completing the state integration programme replaces the exam.
 */
export const southKorea: CountryVisaSteps = {
  'Short-Term Visas (C, D categories etc)': {
    core_documents: [
      {
        en: [
          'Passport valid for at least six months',
          'With blank pages for the visa sticker; consulates return files where the remaining validity does not cover the intended stay.',
        ],
        pt: [
          'Passaporte válido por pelo menos seis meses',
          'Com páginas em branco para a etiqueta do visto; os consulados devolvem dossiês cuja validade restante não cobre a estada pretendida.',
        ],
        es: [
          'Pasaporte con al menos seis meses de vigencia',
          'Con páginas en blanco para la etiqueta del visado; los consulados devuelven expedientes cuya vigencia restante no cubra la estancia prevista.',
        ],
      },
      {
        en: [
          'Check the electronic travel authorisation before applying',
          'Many nationalities enter without a visa and instead need an online authorisation obtained days in advance. Applying for a visa you do not need wastes the fee and the appointment.',
        ],
        pt: [
          'Verificar a autorização eletrônica de viagem antes de pedir',
          'Muitas nacionalidades entram sem visto e precisam apenas de uma autorização online obtida com dias de antecedência. Pedir um visto desnecessário desperdiça a taxa e o agendamento.',
        ],
        es: [
          'Comprobar la autorización electrónica de viaje antes de solicitar',
          'Muchas nacionalidades entran sin visado y solo necesitan una autorización en línea obtenida días antes. Solicitar un visado innecesario desperdicia la tasa y la cita.',
        ],
      },
      {
        en: [
          'Visa application form with a colour photograph',
          'One form per applicant with a recent photograph on a white background, glued rather than stapled at most consulates.',
        ],
        pt: [
          'Formulário de pedido de visto com fotografia colorida',
          'Um formulário por requerente com fotografia recente em fundo branco, colada e não grampeada na maioria dos consulados.',
        ],
        es: [
          'Formulario de solicitud de visado con fotografía en color',
          'Un formulario por solicitante con fotografía reciente sobre fondo blanco, pegada y no grapada en la mayoría de los consulados.',
        ],
      },
      {
        en: [
          'Itinerary with flight and accommodation reservations',
          'Bookings should be reservations rather than issued tickets: a refusal after paying in full is an avoidable loss.',
        ],
        pt: [
          'Itinerário com reservas de voo e de alojamento',
          'As reservas devem ser pré-reservas, não bilhetes emitidos: um indeferimento depois de pagar tudo é um prejuízo evitável.',
        ],
        es: [
          'Itinerario con reservas de vuelo y de alojamiento',
          'Conviene que sean reservas y no billetes emitidos: una denegación tras pagarlo todo es una pérdida evitable.',
        ],
      },
      {
        en: [
          'Invitation letter and the inviter business registration',
          'Short-term business visits are assessed on the Korean company that invites you, so their registration certificate carries more weight than your own paperwork.',
        ],
        pt: [
          'Carta convite e registo comercial de quem convida',
          'Visitas de negócios de curta duração são avaliadas pela empresa coreana que convida, então a certidão de registo dela pesa mais do que os seus próprios papéis.',
        ],
        es: [
          'Carta de invitación y registro mercantil del invitante',
          'Las visitas de negocios cortas se evalúan por la empresa coreana que invita, así que su certificado de registro pesa más que sus propios papeles.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Evidence of ties to your country of residence',
          'Employment certificate, property or family documents. Consulates weigh the likelihood of return more heavily than the trip budget.',
        ],
        pt: [
          'Comprovação de vínculos com o país onde você reside',
          'Certificado de emprego, documentos de imóvel ou de família. Os consulados pesam mais a probabilidade de retorno do que o orçamento da viagem.',
        ],
        es: [
          'Prueba de vínculos con su país de residencia',
          'Certificado de empleo, documentos de propiedad o de familia. Los consulados ponderan más la probabilidad de retorno que el presupuesto del viaje.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Bank statements for the recent months',
          'Usually the last six months with the balance and the movement visible; a single large deposit just before applying reads badly.',
        ],
        pt: [
          'Extratos bancários dos últimos meses',
          'Em geral os últimos seis meses com saldo e movimentação visíveis; um único depósito grande pouco antes do pedido soa mal.',
        ],
        es: [
          'Extractos bancarios de los últimos meses',
          'Por lo general los últimos seis meses con saldo y movimientos visibles; un único depósito grande justo antes de solicitar da mala impresión.',
        ],
      },
      {
        en: [
          'Income tax certificate or equivalent proof',
          'Official income evidence weighs more than the account balance, and its absence is a common reason for extra documents being requested.',
        ],
        pt: [
          'Certidão de imposto de renda ou prova equivalente',
          'A comprovação oficial de renda pesa mais que o saldo em conta, e a falta dela é motivo comum de pedido de documentos adicionais.',
        ],
        es: [
          'Certificado del impuesto sobre la renta o prueba equivalente',
          'La prueba oficial de ingresos pesa más que el saldo en cuenta, y su ausencia es un motivo habitual de solicitud de documentos adicionales.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at the consulate with jurisdiction over your address',
          'Korean missions only accept applicants resident in their consular district, and lodging at the wrong one means starting over.',
        ],
        pt: [
          'Pedir no consulado com jurisdição sobre o seu endereço',
          'As missões coreanas só aceitam requerentes residentes no respectivo distrito consular, e protocolar no lugar errado significa começar do zero.',
        ],
        es: [
          'Solicitar en el consulado con jurisdicción sobre su domicilio',
          'Las misiones coreanas solo aceptan solicitantes residentes en su distrito consular, y presentar en el equivocado obliga a empezar de nuevo.',
        ],
      },
      {
        en: [
          'Pay the fee according to entries and length',
          'Single, double and multiple entry are priced differently, and some nationalities are exempt by agreement. Confirm the current tariff at your mission.',
        ],
        pt: [
          'Pagar a taxa conforme entradas e duração',
          'Entrada única, dupla e múltipla têm preços diferentes, e algumas nacionalidades são isentas por acordo. Confirme a tarifa vigente na sua missão.',
        ],
        es: [
          'Pagar la tasa según las entradas y la duración',
          'La entrada única, doble y múltiple tienen precios distintos, y algunas nacionalidades están exentas por acuerdo. Confirme la tarifa vigente en su misión.',
        ],
      },
      {
        en: [
          'Allow for a referral to the justice ministry',
          'Straightforward files are decided in days, but any case sent to the ministry in Seoul for review takes several weeks longer with no way to expedite it.',
        ],
        pt: [
          'Prever encaminhamento ao ministério da justiça',
          'Casos simples saem em dias, mas qualquer processo enviado ao ministério em Seul para análise leva várias semanas a mais, sem forma de acelerar.',
        ],
        es: [
          'Prever la remisión al ministerio de justicia',
          'Los casos sencillos se resuelven en días, pero cualquier expediente enviado al ministerio en Seúl tarda varias semanas más, sin forma de acelerarlo.',
        ],
      },
      {
        en: [
          'Attend an interview if the consulate calls you',
          'Interviews are requested selectively and are not a bad sign in themselves, but failing to attend closes the file.',
        ],
        pt: [
          'Comparecer à entrevista se o consulado convocar',
          'As entrevistas são pedidas de forma seletiva e não são, por si só, mau sinal, mas faltar encerra o processo.',
        ],
        es: [
          'Asistir a la entrevista si el consulado le convoca',
          'Las entrevistas se piden de forma selectiva y no son en sí una mala señal, pero no asistir cierra el expediente.',
        ],
        priority: 2,
        required: false,
      },
    ],
    biometrics_health: [
      {
        en: [
          'Tuberculosis test for designated nationalities',
          'Nationals of listed high-incidence countries must present a screening result from a hospital nominated by the Korean mission, done before the visa is issued rather than after arrival.',
        ],
        pt: [
          'Teste de tuberculose para nacionalidades designadas',
          'Nacionais de países listados de alta incidência precisam apresentar resultado de triagem feito em hospital indicado pela missão coreana, antes da emissão do visto e não depois da chegada.',
        ],
        es: [
          'Prueba de tuberculosis para nacionalidades designadas',
          'Los nacionales de países listados de alta incidencia deben presentar un resultado de cribado hecho en un hospital designado por la misión coreana, antes de emitir el visado y no tras llegar.',
        ],
      },
      {
        en: [
          'Fingerprints and facial image taken on entry',
          'Collected at immigration on arrival for travellers above the age threshold, not at the consulate.',
        ],
        pt: [
          'Impressões digitais e imagem facial colhidas na entrada',
          'Recolhidas na imigração ao chegar, para viajantes acima da idade mínima, e não no consulado.',
        ],
        es: [
          'Huellas e imagen facial tomadas al entrar',
          'Se recogen en inmigración a la llegada, para viajeros por encima de la edad mínima, y no en el consulado.',
        ],
      },
      {
        en: [
          'Travel insurance for the duration of the visit',
          'Short-term visitors are outside the national health scheme and pay hospital costs in full at the point of care.',
        ],
        pt: [
          'Seguro de viagem para a duração da visita',
          'Visitantes de curta duração estão fora do sistema nacional de saúde e pagam integralmente os custos hospitalares no atendimento.',
        ],
        es: [
          'Seguro de viaje para la duración de la visita',
          'Los visitantes de corta duración quedan fuera del sistema nacional de salud y pagan íntegramente los costes hospitalarios en el momento.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Complete the arrival declarations before boarding',
          'Entry and customs declarations are filed online in advance and produce a code shown at the airport, which shortens the queue considerably.',
        ],
        pt: [
          'Concluir as declarações de chegada antes do embarque',
          'As declarações de entrada e alfândega são preenchidas online com antecedência e geram um código exibido no aeroporto, o que encurta bastante a fila.',
        ],
        es: [
          'Completar las declaraciones de llegada antes de embarcar',
          'Las declaraciones de entrada y aduana se presentan en línea con antelación y generan un código que se muestra en el aeropuerto, lo que acorta bastante la cola.',
        ],
      },
      {
        en: [
          'Carry out no paid work on a short-term status',
          'These categories cover tourism, family visits, meetings and contract signing, never remunerated activity, and enforcement extends to online work for Korean clients.',
        ],
        pt: [
          'Não exercer trabalho remunerado em status de curta duração',
          'Essas categorias cobrem turismo, visita a familiares, reuniões e assinatura de contratos, nunca atividade remunerada, e a fiscalização alcança trabalho online para clientes coreanos.',
        ],
        es: [
          'No realizar trabajo remunerado en un estatus de corta duración',
          'Estas categorías cubren turismo, visitas familiares, reuniones y firma de contratos, nunca actividad remunerada, y el control alcanza al trabajo en línea para clientes coreanos.',
        ],
      },
      {
        en: [
          'Do not count on converting the status from inside',
          'A short-term category generally cannot be changed to work or study without leaving the country; the sponsor has to start the certificate process while you are abroad.',
        ],
        pt: [
          'Não contar em converter o status por dentro do país',
          'Uma categoria de curta duração em geral não pode ser mudada para trabalho ou estudo sem sair do país; o patrocinador precisa iniciar o processo do certificado com você no exterior.',
        ],
        es: [
          'No contar con convertir el estatus desde dentro del país',
          'Una categoría de corta duración por lo general no puede cambiarse a trabajo o estudio sin salir del país; el patrocinador debe iniciar el proceso del certificado con usted en el extranjero.',
        ],
      },
      {
        en: [
          'Leave before the permitted period ends',
          'Overstay brings a fine calculated on the days, a departure order and an entry ban that blocks later work or study applications.',
        ],
        pt: [
          'Sair antes do fim do período permitido',
          'A permanência além do prazo gera multa calculada pelos dias, ordem de saída e proibição de entrada que bloqueia pedidos futuros de trabalho ou estudo.',
        ],
        es: [
          'Salir antes de que termine el periodo permitido',
          'Quedarse de más genera una multa calculada por días, una orden de salida y una prohibición de entrada que bloquea futuras solicitudes de trabajo o estudio.',
        ],
      },
    ],
  },

  'Long-Stay / Work / Student / Skilled Visas (D, E, F etc)': {
    core_documents: [
      {
        en: [
          'Passport covering the intended period of residence',
          'The residence card is issued against the passport, so a short remaining validity truncates the permission granted.',
        ],
        pt: [
          'Passaporte que cubra o período de residência pretendido',
          'O cartão de residência é emitido contra o passaporte, então uma validade restante curta encurta a permissão concedida.',
        ],
        es: [
          'Pasaporte que cubra el periodo de residencia previsto',
          'La tarjeta de residencia se emite contra el pasaporte, de modo que una vigencia restante corta recorta el permiso concedido.',
        ],
      },
      {
        en: [
          'Certificate of Confirmation of Visa Issuance from your sponsor',
          'Your employer, university or investment entity applies for it at the immigration office in Korea and sends you the issuance number. This is where the real decision happens; the embassy step afterwards is brief.',
        ],
        pt: [
          'Certificate of Confirmation of Visa Issuance obtido pelo patrocinador',
          'Seu empregador, universidade ou entidade de investimento o pede no escritório de imigração na Coreia e envia a você o número de emissão. É aqui que a decisão de verdade acontece; a etapa na embaixada depois é rápida.',
        ],
        es: [
          'Certificate of Confirmation of Visa Issuance obtenido por su patrocinador',
          'Su empleador, universidad o entidad de inversión lo solicita en la oficina de inmigración en Corea y le envía el número de emisión. Aquí ocurre la decisión real; la etapa en la embajada después es breve.',
        ],
      },
      {
        en: [
          'Visa application quoting the issuance number',
          'With the number in hand the consulate is largely verifying identity, which is why the form must match the sponsor filing exactly.',
        ],
        pt: [
          'Pedido de visto citando o número de emissão',
          'Com o número em mãos, o consulado está basicamente conferindo identidade, e por isso o formulário precisa bater exatamente com o que o patrocinador protocolou.',
        ],
        es: [
          'Solicitud de visado citando el número de emisión',
          'Con el número en mano el consulado básicamente verifica la identidad, y por eso el formulario debe coincidir exactamente con lo presentado por el patrocinador.',
        ],
      },
      {
        en: [
          'Employment contract matching a defined visa subcategory',
          'There is no generic work visa: the role has to fit a listed occupation for the skilled category, or one of the specific categories for language teaching, research or entertainment.',
        ],
        pt: [
          'Contrato de trabalho compatível com uma subcategoria definida',
          'Não existe visto de trabalho genérico: a função precisa se encaixar numa ocupação listada da categoria qualificada, ou numa das categorias específicas de ensino de idiomas, pesquisa ou entretenimento.',
        ],
        es: [
          'Contrato de trabajo acorde a una subcategoría definida',
          'No existe un visado de trabajo genérico: el puesto debe encajar en una ocupación listada de la categoría cualificada, o en una de las categorías específicas de enseñanza de idiomas, investigación o espectáculos.',
        ],
      },
      {
        en: [
          'Apostilled criminal record certificate',
          'Required for teaching categories and increasingly for others, issued at national level and apostilled or legalised. It has a short validity, so order it at the right moment.',
        ],
        pt: [
          'Certidão de antecedentes criminais apostilada',
          'Exigida nas categorias de ensino e cada vez mais em outras, emitida em nível nacional e apostilada ou legalizada. Tem validade curta, então peça na hora certa.',
        ],
        es: [
          'Certificado de antecedentes penales apostillado',
          'Exigido en las categorías docentes y cada vez más en otras, emitido a nivel nacional y apostillado o legalizado. Tiene una validez corta, así que pídalo en el momento adecuado.',
        ],
      },
      {
        en: [
          'Admission letter or investment registration for other routes',
          'Students need a certificate of admission from an institution authorised to sponsor visas, and investors need the foreign investment notification and company registration before anything else moves.',
        ],
        pt: [
          'Carta de admissão ou registo de investimento nas demais rotas',
          'Estudantes precisam de carta de admissão de instituição autorizada a patrocinar vistos, e investidores precisam da notificação de investimento estrangeiro e do registo da empresa antes de qualquer outro passo.',
        ],
        es: [
          'Carta de admisión o registro de inversión en las otras vías',
          'Los estudiantes necesitan una carta de admisión de una institución autorizada a patrocinar visados, y los inversores la notificación de inversión extranjera y el registro de la empresa antes de cualquier otro paso.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Apostilled degree certificate and transcripts',
          'Originals with apostille or consular legalisation; photocopies and digital records issued by the university are not accepted for the sponsor filing.',
        ],
        pt: [
          'Diploma e históricos escolares apostilados',
          'Originais com apostila ou legalização consular; cópias e registos digitais emitidos pela universidade não são aceites no protocolo do patrocinador.',
        ],
        es: [
          'Título y expedientes académicos apostillados',
          'Originales con apostilla o legalización consular; las copias y los registros digitales de la universidad no se aceptan en la presentación del patrocinador.',
        ],
      },
      {
        en: [
          'Degree and experience combination for the skilled category',
          'The skilled work category accepts either a relevant degree or a substantial number of years of experience in the same field, and mixing the two badly is a frequent refusal ground.',
        ],
        pt: [
          'Combinação de diploma e experiência na categoria qualificada',
          'A categoria de trabalho qualificado aceita diploma na área ou um número substancial de anos de experiência no mesmo campo, e combinar mal os dois é motivo frequente de recusa.',
        ],
        es: [
          'Combinación de título y experiencia en la categoría cualificada',
          'La categoría de trabajo cualificado acepta un título afín o un número sustancial de años de experiencia en el mismo campo, y combinar mal ambos es un motivo frecuente de denegación.',
        ],
      },
      {
        en: [
          'Korean language certification where it counts',
          'The national proficiency test is required for some study routes and feeds directly into the residence points system, so taking it early shortens the road to settlement.',
        ],
        pt: [
          'Certificação de idioma coreano quando ela conta',
          'O exame nacional de proficiência é exigido em algumas rotas de estudo e alimenta diretamente o sistema de pontos de residência, então fazê-lo cedo encurta o caminho até a fixação.',
        ],
        es: [
          'Certificación de idioma coreano cuando cuenta',
          'El examen nacional de competencia se exige en algunas vías de estudio y alimenta directamente el sistema de puntos de residencia, así que hacerlo pronto acorta el camino al arraigo.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary at the level required for your category',
          'The skilled work category ties the minimum salary to national income per head, so the threshold moves each year. Confirm the current multiple before signing.',
        ],
        pt: [
          'Salário no nível exigido para a sua categoria',
          'A categoria de trabalho qualificado atrela o salário mínimo à renda nacional por habitante, então o piso muda a cada ano. Confirme o múltiplo vigente antes de assinar.',
        ],
        es: [
          'Salario en el nivel exigido para su categoría',
          'La categoría de trabajo cualificado ata el salario mínimo a la renta nacional por habitante, de modo que el umbral cambia cada año. Confirme el múltiplo vigente antes de firmar.',
        ],
      },
      {
        en: [
          'Held funds in your own name for the study route',
          'Students show a balance kept for a period in their own account, not a transfer arriving the week before; the amount depends on the institution and the region.',
        ],
        pt: [
          'Recursos mantidos em seu próprio nome na rota de estudo',
          'Estudantes comprovam saldo mantido por um período na própria conta, não uma transferência que chega na semana anterior; o valor depende da instituição e da região.',
        ],
        es: [
          'Fondos mantenidos a su nombre en la vía de estudios',
          'Los estudiantes acreditan un saldo mantenido durante un periodo en su propia cuenta, no una transferencia llegada la semana anterior; el importe depende de la institución y la región.',
        ],
      },
      {
        en: [
          'Capital transferred and registered for the investment route',
          'The money must arrive through the official foreign investment channel and be registered; funds moved privately do not support the visa even if the business exists.',
        ],
        pt: [
          'Capital transferido e registado na rota de investimento',
          'O dinheiro precisa entrar pelo canal oficial de investimento estrangeiro e ser registado; recursos movidos por via particular não sustentam o visto mesmo que o negócio exista.',
        ],
        es: [
          'Capital transferido y registrado en la vía de inversión',
          'El dinero debe entrar por el canal oficial de inversión extranjera y quedar registrado; los fondos movidos por vía privada no sostienen el visado aunque el negocio exista.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Sponsor files first and the applicant follows',
          'The certificate stage takes weeks at the immigration office in Korea; the consular stage that follows is usually a matter of days.',
        ],
        pt: [
          'Patrocinador protocola primeiro e o requerente vem depois',
          'A etapa do certificado leva semanas no escritório de imigração na Coreia; a etapa consular seguinte costuma ser questão de dias.',
        ],
        es: [
          'El patrocinador presenta primero y el solicitante después',
          'La etapa del certificado lleva semanas en la oficina de inmigración en Corea; la etapa consular posterior suele ser cuestión de días.',
        ],
      },
      {
        en: [
          'Use the issuance number before it expires',
          'The confirmation number is valid only for a few months. If it lapses the sponsor has to obtain a new one from scratch, with the same waiting time.',
        ],
        pt: [
          'Usar o número de emissão antes de ele expirar',
          'O número de confirmação vale apenas alguns meses. Se caducar, o patrocinador precisa obter outro do zero, com o mesmo tempo de espera.',
        ],
        es: [
          'Usar el número de emisión antes de que caduque',
          'El número de confirmación solo vale unos meses. Si caduca, el patrocinador debe obtener otro desde cero, con el mismo tiempo de espera.',
        ],
      },
      {
        en: [
          'Pay the consular fee and travel within the visa validity',
          'The visa itself has an entry window separate from the length of stay, and arriving after it closes means reapplying.',
        ],
        pt: [
          'Pagar a taxa consular e viajar dentro da validade do visto',
          'O visto tem uma janela de entrada separada da duração da estada, e chegar depois de ela fechar significa pedir de novo.',
        ],
        es: [
          'Pagar la tasa consular y viajar dentro de la validez del visado',
          'El visado tiene una ventana de entrada distinta de la duración de la estancia, y llegar después de que se cierre obliga a solicitar de nuevo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Pre-departure tuberculosis screening where required',
          'Applicants from designated countries present a result from a hospital nominated by the mission before the visa is granted, and the report has a short shelf life.',
        ],
        pt: [
          'Triagem de tuberculose antes da partida quando exigida',
          'Requerentes de países designados apresentam resultado de hospital indicado pela missão antes da concessão do visto, e o laudo tem validade curta.',
        ],
        es: [
          'Cribado de tuberculosis previo al viaje cuando se exige',
          'Los solicitantes de países designados presentan un resultado de un hospital designado por la misión antes de conceder el visado, y el informe caduca pronto.',
        ],
      },
      {
        en: [
          'Health check in Korea for teaching categories',
          'Language teachers repeat a medical examination at a Korean hospital after arrival, including a drug test, and a failed check ends the employment.',
        ],
        pt: [
          'Exame de saúde na Coreia nas categorias de ensino',
          'Professores de idiomas repetem exame médico em hospital coreano depois de chegar, incluindo teste de drogas, e um resultado reprovado encerra o vínculo.',
        ],
        es: [
          'Chequeo de salud en Corea para las categorías docentes',
          'Los profesores de idiomas repiten un examen médico en un hospital coreano tras llegar, con prueba de drogas incluida, y un resultado desfavorable termina el empleo.',
        ],
      },
      {
        en: [
          'Biometrics captured at the immigration office',
          'Fingerprints and a photograph are taken when you register as a resident, in addition to those taken at the border.',
        ],
        pt: [
          'Biometria capturada no escritório de imigração',
          'Impressões digitais e fotografia são colhidas no momento do registo como residente, além das colhidas na fronteira.',
        ],
        es: [
          'Biometría capturada en la oficina de inmigración',
          'Las huellas y la fotografía se toman al registrarse como residente, además de las tomadas en la frontera.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register as a foreign resident within ninety days',
          'A legal deadline counted from arrival. Registration produces the residence card, and missing it brings a fine that also stains later applications.',
        ],
        pt: [
          'Registar-se como residente estrangeiro em até noventa dias',
          'É prazo legal contado da chegada. O registo gera o cartão de residência, e perdê-lo gera multa que ainda mancha pedidos futuros.',
        ],
        es: [
          'Registrarse como residente extranjero en noventa días',
          'Es un plazo legal contado desde la llegada. El registro produce la tarjeta de residencia, y perderlo acarrea una multa que además mancha solicitudes futuras.',
        ],
      },
      {
        en: [
          'Use the residence card to set up daily life',
          'Bank account, mobile contract, delivery services and most online authentication depend on the card number, so almost nothing works in the weeks before it arrives.',
        ],
        pt: [
          'Usar o cartão de residência para montar a vida diária',
          'Conta bancária, plano de telefonia, entregas e a maior parte da autenticação online dependem do número do cartão, então quase nada funciona nas semanas anteriores a ele.',
        ],
        es: [
          'Usar la tarjeta de residencia para montar la vida diaria',
          'La cuenta bancaria, el contrato de móvil, los repartos y casi toda la autenticación en línea dependen del número de la tarjeta, así que casi nada funciona en las semanas previas.',
        ],
      },
      {
        en: [
          'Join the national health insurance scheme',
          'Enrolment becomes compulsory for long-stay residents after a set period, contributions are backdated, and arrears block visa extensions later.',
        ],
        pt: [
          'Aderir ao sistema nacional de seguro de saúde',
          'A inscrição se torna obrigatória para residentes de longa duração após um período definido, as contribuições retroagem, e atrasos travam prorrogações de visto depois.',
        ],
        es: [
          'Afiliarse al sistema nacional de seguro de salud',
          'La afiliación se vuelve obligatoria para residentes de larga duración tras un periodo fijado, las cotizaciones se aplican con efecto retroactivo, y los atrasos bloquean prórrogas posteriores.',
        ],
      },
      {
        en: [
          'Report changes of address, job or institution promptly',
          'Address changes have a deadline of days, and changing employer or university requires prior permission from immigration rather than a notification after the fact.',
        ],
        pt: [
          'Comunicar rapidamente mudanças de endereço, emprego ou instituição',
          'Mudanças de endereço têm prazo de dias, e trocar de empregador ou universidade exige autorização prévia da imigração, não um aviso depois do fato.',
        ],
        es: [
          'Comunicar pronto los cambios de domicilio, empleo o institución',
          'Los cambios de domicilio tienen un plazo de días, y cambiar de empleador o universidad exige autorización previa de inmigración, no un aviso posterior.',
        ],
      },
    ],
  },

  'Permanent Residency / Immigration Investor Scheme': {
    core_documents: [
      {
        en: [
          'Passport and your current residence card',
          'The application is made from inside Korea while you hold a valid status; there is no route to apply from abroad.',
        ],
        pt: [
          'Passaporte e o seu cartão de residência atual',
          'O pedido é feito de dentro da Coreia com um status válido; não existe rota para pedir do exterior.',
        ],
        es: [
          'Pasaporte y su tarjeta de residencia actual',
          'La solicitud se hace desde dentro de Corea con un estatus vigente; no hay vía para solicitar desde el extranjero.',
        ],
      },
      {
        en: [
          'Identify the route that leads to your permanent status',
          'The ordinary path is years on a long-term residence status, commonly reached through the points-based residence category; marriage, investment and high-value talent each have their own separate conditions.',
        ],
        pt: [
          'Identificar a rota que leva ao seu status permanente',
          'O caminho comum são anos num status de residência de longa duração, geralmente alcançado pela categoria de residência por pontos; casamento, investimento e talento de alto valor têm condições próprias e separadas.',
        ],
        es: [
          'Identificar la vía que lleva a su estatus permanente',
          'El camino habitual son años en un estatus de residencia de larga duración, normalmente alcanzado por la categoría de residencia por puntos; matrimonio, inversión y talento de alto valor tienen condiciones propias y separadas.',
        ],
      },
      {
        en: [
          'Immigration record of entries, exits and status history',
          'Continuity of residence is calculated from this record, and periods spent abroad or on a non-qualifying status can silently reset the count.',
        ],
        pt: [
          'Registo de entradas, saídas e histórico de status',
          'A continuidade da residência é calculada a partir desse registo, e períodos no exterior ou em status não qualificador podem zerar a contagem silenciosamente.',
        ],
        es: [
          'Registro de entradas, salidas e historial de estatus',
          'La continuidad de la residencia se calcula a partir de ese registro, y los periodos en el extranjero o en un estatus no cualificante pueden reiniciar la cuenta en silencio.',
        ],
      },
      {
        en: [
          'Family relationship documents for the spouse route',
          'The Korean spouse family register extract plus the marriage record, with evidence that the relationship is genuine and ongoing rather than only registered.',
        ],
        pt: [
          'Documentos de vínculo familiar na rota de cônjuge',
          'Extrato do registo familiar do cônjuge coreano mais o registo do casamento, com provas de que a relação é genuína e contínua, e não apenas registada.',
        ],
        es: [
          'Documentos de vínculo familiar en la vía de cónyuge',
          'Extracto del registro familiar del cónyuge coreano más el registro del matrimonio, con pruebas de que la relación es genuina y continua, no solo registrada.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Criminal record clearance from Korea and abroad',
          'Both domestic and home country checks are requested, and even minor convictions in Korea, including traffic offences, are weighed against the file.',
        ],
        pt: [
          'Nada consta criminal da Coreia e do exterior',
          'São pedidas verificações domésticas e do país de origem, e mesmo condenações leves na Coreia, inclusive de trânsito, pesam contra o dossiê.',
        ],
        es: [
          'Certificado de antecedentes de Corea y del extranjero',
          'Se piden comprobaciones nacionales y del país de origen, y hasta condenas leves en Corea, incluidas las de tráfico, pesan contra el expediente.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Completion of the state social integration programme',
          'Finishing the government integration course substitutes for the written examination and interview that otherwise apply, which is why long-term residents start it years in advance.',
        ],
        pt: [
          'Conclusão do programa estatal de integração social',
          'Concluir o curso de integração do governo substitui a prova escrita e a entrevista que valeriam de outra forma, e é por isso que residentes de longa duração começam anos antes.',
        ],
        es: [
          'Finalización del programa estatal de integración social',
          'Terminar el curso de integración del gobierno sustituye al examen escrito y la entrevista que regirían en otro caso, y por eso los residentes de larga duración lo empiezan años antes.',
        ],
      },
      {
        en: [
          'Korean proficiency evidence for the points assessment',
          'Language level is one of the heaviest scoring items in the points-based residence category and is what most often decides whether the threshold is reached.',
        ],
        pt: [
          'Comprovação de proficiência em coreano para a pontuação',
          'O nível de idioma é um dos itens de maior peso na categoria de residência por pontos e é o que mais frequentemente decide se o limiar é atingido.',
        ],
        es: [
          'Prueba de competencia en coreano para la puntuación',
          'El nivel de idioma es uno de los ítems de mayor peso en la categoría de residencia por puntos y es lo que más a menudo decide si se alcanza el umbral.',
        ],
      },
      {
        en: [
          'Qualifications and age points supporting the score',
          'Degrees, professional licences, work in a designated field and age bands all carry points, and a document you skip is points you simply do not get.',
        ],
        pt: [
          'Pontos de qualificação e idade que sustentam a pontuação',
          'Diplomas, licenças profissionais, atuação em área designada e faixas etárias somam pontos, e um documento que você deixa de juntar é ponto que simplesmente não entra.',
        ],
        es: [
          'Puntos por titulación y edad que sostienen la puntuación',
          'Los títulos, las licencias profesionales, el trabajo en un campo designado y las franjas de edad suman puntos, y un documento que omite son puntos que sencillamente no obtiene.',
        ],
        priority: 2,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Annual income above the national income benchmark',
          'The requirement is expressed as a multiple of income per head, so it moves every year and last year figure is not a safe guide.',
        ],
        pt: [
          'Renda anual acima do parâmetro nacional de renda',
          'A exigência é expressa como múltiplo da renda por habitante, então muda todo ano e o número do ano passado não é guia seguro.',
        ],
        es: [
          'Ingresos anuales por encima del parámetro nacional',
          'El requisito se expresa como múltiplo de la renta por habitante, así que cambia cada año y la cifra del año pasado no es una guía fiable.',
        ],
      },
      {
        en: [
          'Tax payment certificates from the national and local offices',
          'Both national and local tax records are checked, and an unpaid local tax of trivial value is enough to hold the decision.',
        ],
        pt: [
          'Certidões de pagamento de tributos nacionais e locais',
          'Tanto os registos nacionais quanto os locais são conferidos, e um tributo local não pago de valor irrisório basta para travar a decisão.',
        ],
        es: [
          'Certificados de pago de tributos nacionales y locales',
          'Se comprueban tanto los registros nacionales como los locales, y un tributo local impagado de valor irrisorio basta para frenar la decisión.',
        ],
      },
      {
        en: [
          'Evidence of assets or a registered lease',
          'A property deed or a registered rental contract with the deposit shown; stable housing is read as part of the settlement case.',
        ],
        pt: [
          'Comprovação de bens ou contrato de aluguel registado',
          'Escritura de imóvel ou contrato de locação registado com o depósito indicado; moradia estável é lida como parte do argumento de fixação.',
        ],
        es: [
          'Prueba de bienes o contrato de alquiler registrado',
          'Escritura de un inmueble o contrato de alquiler registrado con el depósito indicado; la vivienda estable se lee como parte del caso de arraigo.',
        ],
      },
      {
        en: [
          'Investment maintained and jobs created for that route',
          'The investor path to permanent status requires the capital to stay in place and, above certain levels, a number of Korean employees kept on payroll for a sustained period. Withdrawing early collapses the whole claim.',
        ],
        pt: [
          'Investimento mantido e empregos criados nessa rota',
          'O caminho de investidor para o status permanente exige que o capital permaneça aplicado e, acima de certos níveis, um número de empregados coreanos mantidos em folha por período sustentado. Retirar antes derruba toda a pretensão.',
        ],
        es: [
          'Inversión mantenida y empleos creados en esa vía',
          'La vía de inversor hacia el estatus permanente exige que el capital siga colocado y, por encima de ciertos niveles, un número de empleados coreanos en nómina durante un periodo sostenido. Retirarlo antes derriba toda la pretensión.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Book an appointment at the immigration office well ahead',
          'Slots at the offices covering the main cities are released online and fill months in advance, so the appointment often sets the timeline rather than the paperwork.',
        ],
        pt: [
          'Agendar com muita antecedência no escritório de imigração',
          'As vagas nos escritórios que atendem as principais cidades são liberadas online e se esgotam meses antes, então o agendamento costuma definir o cronograma mais do que a papelada.',
        ],
        es: [
          'Reservar cita en la oficina de inmigración con mucha antelación',
          'Las citas en las oficinas que cubren las grandes ciudades se liberan en línea y se agotan con meses de antelación, así que la cita marca el calendario más que los papeles.',
        ],
      },
      {
        en: [
          'Pay the application fee and the card issuance charge',
          'Two amounts at different moments, one on lodgement and one when the new card is produced. Check both at the time of filing.',
        ],
        pt: [
          'Pagar a taxa do pedido e o custo de emissão do cartão',
          'São dois valores em momentos distintos, um no protocolo e outro quando o novo cartão é produzido. Confira ambos na data do pedido.',
        ],
        es: [
          'Pagar la tasa de solicitud y el coste de emisión de la tarjeta',
          'Son dos importes en momentos distintos, uno al presentar y otro cuando se produce la nueva tarjeta. Verifique ambos al presentar.',
        ],
      },
      {
        en: [
          'Keep the existing status valid during the wait',
          'Decisions take many months, and the current permission must be extended normally in the meantime; letting it lapse ends the application outright.',
        ],
        pt: [
          'Manter o status atual válido durante a espera',
          'As decisões levam muitos meses, e a permissão atual precisa ser prorrogada normalmente nesse intervalo; deixá-la caducar encerra o pedido de imediato.',
        ],
        es: [
          'Mantener vigente el estatus actual durante la espera',
          'Las decisiones tardan muchos meses, y el permiso actual debe prorrogarse con normalidad mientras tanto; dejarlo caducar termina la solicitud de inmediato.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph for the permanent card',
          'Taken at the office when the application is lodged, and again if the details change before issue.',
        ],
        pt: [
          'Impressões digitais e fotografia para o cartão permanente',
          'Colhidas no escritório no momento do protocolo, e novamente se os dados mudarem antes da emissão.',
        ],
        es: [
          'Huellas y fotografía para la tarjeta permanente',
          'Se toman en la oficina al presentar la solicitud, y de nuevo si los datos cambian antes de la emisión.',
        ],
      },
      {
        en: [
          'Unbroken health insurance record without arrears',
          'Gaps in enrolment and unpaid premiums are checked directly and are among the most common practical reasons a settlement file is refused.',
        ],
        pt: [
          'Histórico de seguro de saúde sem lacunas nem atrasos',
          'Lacunas de inscrição e mensalidades não pagas são conferidas diretamente e estão entre os motivos práticos mais comuns de indeferimento de um dossiê de fixação.',
        ],
        es: [
          'Historial de seguro de salud sin lagunas ni impagos',
          'Las lagunas de afiliación y las cuotas impagadas se comprueban directamente y están entre los motivos prácticos más comunes de denegación de un expediente de arraigo.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the permanent residence card and renew it in cycles',
          'The status itself is open ended, but the physical card expires and has to be renewed periodically; an expired card is treated as a compliance failure.',
        ],
        pt: [
          'Retirar o cartão de residência permanente e renová-lo em ciclos',
          'O status em si é por prazo indeterminado, mas o cartão físico vence e precisa ser renovado periodicamente; um cartão vencido é tratado como descumprimento.',
        ],
        es: [
          'Recoger la tarjeta de residencia permanente y renovarla por ciclos',
          'El estatus en sí es indefinido, pero la tarjeta física caduca y hay que renovarla periódicamente; una tarjeta caducada se trata como un incumplimiento.',
        ],
      },
      {
        en: [
          'Obtain a re-entry permit for long absences',
          'Leaving for longer than the permitted period without one causes the permanent status to lapse, and recovering it means starting the whole path again.',
        ],
        pt: [
          'Obter permissão de reentrada para ausências longas',
          'Sair por período maior que o permitido sem ela faz o status permanente caducar, e recuperá-lo significa refazer todo o caminho.',
        ],
        es: [
          'Obtener permiso de reentrada para ausencias largas',
          'Salir por más tiempo del permitido sin él hace caducar el estatus permanente, y recuperarlo implica rehacer todo el camino.',
        ],
      },
      {
        en: [
          'Work freely but keep the compliance record clean',
          'The permanent status removes the occupation restrictions of the work categories, yet it can be revoked for serious offences or for sustained tax and insurance default.',
        ],
        pt: [
          'Trabalhar livremente, mas manter o histórico de conformidade limpo',
          'O status permanente remove as restrições de ocupação das categorias de trabalho, mas pode ser revogado por infrações graves ou por inadimplência prolongada de impostos e seguro.',
        ],
        es: [
          'Trabajar con libertad pero mantener limpio el historial de cumplimiento',
          'El estatus permanente elimina las restricciones de ocupación de las categorías laborales, pero puede revocarse por delitos graves o por impago sostenido de impuestos y seguro.',
        ],
      },
      {
        en: [
          'Understand what permanent residence is not',
          'It is not citizenship: you keep your original nationality, you cannot hold a Korean passport, and voting is limited to local elections after a further qualifying period.',
        ],
        pt: [
          'Entender o que a residência permanente não é',
          'Não é cidadania: você mantém a nacionalidade original, não pode ter passaporte coreano, e o voto se limita a eleições locais após um período adicional de qualificação.',
        ],
        es: [
          'Entender lo que la residencia permanente no es',
          'No es ciudadanía: conserva su nacionalidad original, no puede tener pasaporte coreano, y el voto se limita a las elecciones locales tras un periodo adicional de cualificación.',
        ],
      },
      {
        en: [
          'Weigh naturalisation separately if you want a passport',
          'Naturalisation is a different application with its own examination and, in most cases, the renunciation of your previous nationality; permanent residence does not convert into it automatically.',
        ],
        pt: [
          'Avaliar a naturalização à parte se quiser um passaporte',
          'A naturalização é um pedido diferente, com prova própria e, na maioria dos casos, renúncia à nacionalidade anterior; a residência permanente não se converte nela automaticamente.',
        ],
        es: [
          'Valorar la naturalización aparte si quiere un pasaporte',
          'La naturalización es una solicitud distinta, con su propio examen y, en la mayoría de los casos, la renuncia a su nacionalidad anterior; la residencia permanente no se convierte en ella automáticamente.',
        ],
        priority: 2,
      },
    ],
  },
};
