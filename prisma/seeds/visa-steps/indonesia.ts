import type { CountryVisaSteps } from './types';

/**
 * Steps for Indonesia.
 *
 * Three facts shape almost every application. First, the electronic visa is
 * filed on the immigration portal by an Indonesian guarantor — a company, an
 * agency, or, in a few categories, the applicant registering as their own
 * sponsor — so someone waiting at a consulate abroad is waiting in the wrong
 * place. Second, anything involving a working position starts at the manpower
 * ministry with the RPTKA foreign manpower plan, approved before immigration
 * looks at the file at all. Third, the permit itself is now electronic: there
 * is no sticker in the passport, the KITAS arrives as a PDF, and it turns into
 * the permanent KITAP only after consecutive years without a gap.
 *
 * The obligations people forget are the recurring ones — reporting the address
 * to the local immigration office and to the neighbourhood administration, and
 * the local tax duties that attach once the stay crosses the residency
 * threshold. Both surface later, when a renewal is refused.
 */
export const indonesia: CountryVisaSteps = {
  'Visa on Arrival / Tourist Visa': {
    core_documents: [
      {
        en: [
          'Passport valid for at least six months on arrival',
          'Airlines check this before boarding and the arrival counter refuses anyone short of it; two blank pages are expected as well.',
        ],
        pt: [
          'Passaporte válido por pelo menos seis meses na chegada',
          'As companhias aéreas conferem isso antes do embarque e o guichê de chegada recusa quem estiver abaixo disso; também se esperam duas páginas em branco.',
        ],
        es: [
          'Pasaporte vigente por al menos seis meses a la llegada',
          'Las aerolíneas lo comprueban antes del embarque y la ventanilla de llegada rechaza a quien no lo cumpla; también se esperan dos páginas en blanco.',
        ],
      },
      {
        en: [
          'Confirm your nationality qualifies for the visa on arrival',
          'The list of eligible passports is set by regulation and changes; anyone outside it needs an electronic visa filed from Indonesia before travelling.',
        ],
        pt: [
          'Confirmar se sua nacionalidade tem direito ao visto na chegada',
          'A lista de passaportes elegíveis é definida por regulamento e muda; quem está fora dela precisa de um visto eletrônico protocolado desde a Indonésia antes de viajar.',
        ],
        es: [
          'Confirmar que su nacionalidad tiene derecho al visado a la llegada',
          'La lista de pasaportes elegibles la fija un reglamento y cambia; quien queda fuera necesita un visado electrónico presentado desde Indonesia antes de viajar.',
        ],
      },
      {
        en: [
          'Choose between the airport counter and the online version',
          'Buying it online beforehand lets you use the automatic gate; the counter means queueing twice, once to pay and again for immigration.',
        ],
        pt: [
          'Escolher entre o guichê do aeroporto e a versão online',
          'Comprar online com antecedência permite usar o portão automático; pelo guichê você enfrenta duas filas, uma para pagar e outra na imigração.',
        ],
        es: [
          'Elegir entre la ventanilla del aeropuerto y la versión en línea',
          'Comprarlo en línea con antelación permite usar la puerta automática; por ventanilla se hacen dos colas, una para pagar y otra en inmigración.',
        ],
      },
      {
        en: [
          'Return or onward ticket inside the permitted stay',
          'The departure date is compared against the period granted, and a later one gets you stopped at check-in rather than at immigration.',
        ],
        pt: [
          'Passagem de volta ou de continuação dentro do prazo permitido',
          'A data de saída é comparada com o período concedido, e uma data posterior faz você ser barrado já no check-in, não na imigração.',
        ],
        es: [
          'Billete de vuelta o de continuación dentro del plazo permitido',
          'La fecha de salida se compara con el periodo concedido, y una posterior hace que le detengan en el mostrador, no en inmigración.',
        ],
      },
      {
        en: [
          'Address of your accommodation in Indonesia',
          'The arrival declaration asks for a complete address; leaving it undecided is a common cause of secondary questioning.',
        ],
        pt: [
          'Endereço da sua hospedagem na Indonésia',
          'A declaração de chegada pede um endereço completo; deixá-lo em aberto é causa comum de interrogatório em segunda linha.',
        ],
        es: [
          'Dirección de su alojamiento en Indonesia',
          'La declaración de llegada pide una dirección completa; dejarla sin definir es una causa habitual de entrevista en segunda línea.',
        ],
      },
      {
        en: [
          'Electronic customs declaration filed before landing',
          'Submitted online in the days before arrival and producing a QR code scanned at customs; paper forms are no longer handed out on board.',
        ],
        pt: [
          'Declaração aduaneira eletrônica preenchida antes de pousar',
          'Enviada online nos dias que antecedem a chegada e gera um código QR lido na alfândega; formulários de papel não são mais distribuídos a bordo.',
        ],
        es: [
          'Declaración aduanera electrónica presentada antes de aterrizar',
          'Se envía en línea en los días previos a la llegada y genera un código QR que se escanea en aduana; ya no se reparten formularios en papel a bordo.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the length of the visit',
          'Officers may ask for statements or cash at the counter; no figure is published, so carry evidence proportionate to the trip you described.',
        ],
        pt: [
          'Comprovação de recursos para a duração da visita',
          'Os agentes podem pedir extratos ou dinheiro no guichê; não há valor publicado, então leve comprovação proporcional à viagem que você declarou.',
        ],
        es: [
          'Prueba de fondos para la duración de la visita',
          'Los agentes pueden pedir extractos o efectivo en la ventanilla; no hay cifra publicada, así que lleve pruebas proporcionales al viaje que declaró.',
        ],
      },
      {
        en: [
          'A payment method that works at the airport counter',
          'Card readers reject some foreign cards and the fee has to be settled before you reach immigration, so carry a backup.',
        ],
        pt: [
          'Um meio de pagamento que funcione no guichê do aeroporto',
          'As maquininhas recusam alguns cartões estrangeiros e a taxa precisa ser quitada antes de chegar à imigração, então tenha uma alternativa.',
        ],
        es: [
          'Un medio de pago que funcione en la ventanilla del aeropuerto',
          'Los datáfonos rechazan algunas tarjetas extranjeras y la tasa hay que abonarla antes de llegar a inmigración, así que lleve una alternativa.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the visa on arrival fee',
          'The amount is fixed by regulation and has been revised more than once; check the figure currently in force instead of an old travel post.',
        ],
        pt: [
          'Pagar a taxa do visto na chegada',
          'O valor é fixado por regulamento e já foi revisto mais de uma vez; confira o montante vigente em vez de um post de viagem antigo.',
        ],
        es: [
          'Pagar la tasa del visado a la llegada',
          'El importe lo fija un reglamento y se ha revisado más de una vez; consulte la cifra vigente en lugar de una entrada de viaje antigua.',
        ],
      },
      {
        en: [
          'Apply on the official immigration portal if buying online',
          'Look-alike agency sites sell the same document with a markup, and a mistyped passport number there is not corrected for free.',
        ],
        pt: [
          'Pedir no portal oficial de imigração se comprar online',
          'Sites de agências parecidos vendem o mesmo documento com sobretaxa, e um número de passaporte digitado errado ali não é corrigido de graça.',
        ],
        es: [
          'Solicitar en el portal oficial de inmigración si compra en línea',
          'Sitios de agencias parecidos venden el mismo documento con recargo, y un número de pasaporte mal escrito allí no se corrige gratis.',
        ],
      },
      {
        en: [
          'Keep the payment receipt until you leave the country',
          'It is what the immigration office asks for when you request the single extension, and it is not reissued.',
        ],
        pt: [
          'Guardar o comprovante de pagamento até sair do país',
          'É o que o escritório de imigração pede quando você solicita a única prorrogação, e ele não é emitido de novo.',
        ],
        es: [
          'Guardar el comprobante de pago hasta salir del país',
          'Es lo que la oficina de inmigración pide cuando solicita la única prórroga, y no se vuelve a emitir.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Facial capture at the automatic gate on entry',
          'The online version is read at the gate; if the match fails you are sent to a manual counter, so keep the photo page unmarked.',
        ],
        pt: [
          'Captura facial no portão automático na entrada',
          'A versão online é lida no portão; se a comparação falhar você é mandado para um guichê manual, então mantenha a página da foto sem marcas.',
        ],
        es: [
          'Captura facial en la puerta automática al entrar',
          'La versión en línea se lee en la puerta; si la comparación falla le mandan a una ventanilla manual, así que mantenga limpia la página de la foto.',
        ],
      },
      {
        en: [
          'Travel medical insurance for the whole trip',
          'Visitors have no access to the public system, and the real expense is an evacuation from an island to Jakarta or Singapore.',
        ],
        pt: [
          'Seguro médico de viagem para toda a estadia',
          'Visitantes não têm acesso ao sistema público, e o gasto de verdade é uma remoção de uma ilha para Jacarta ou Singapura.',
        ],
        es: [
          'Seguro médico de viaje para todo el viaje',
          'Los visitantes no tienen acceso al sistema público, y el gasto real es una evacuación desde una isla a Yakarta o Singapur.',
        ],
      },
      {
        en: [
          'Yellow fever certificate depending on your route',
          'Demanded from travellers coming from listed countries, and a transit stop in one of them counts.',
        ],
        pt: [
          'Certificado de febre amarela conforme a sua rota',
          'Exigido de quem vem de países listados, e uma escala em um deles já conta.',
        ],
        es: [
          'Certificado de fiebre amarilla según su ruta',
          'Se exige a quien procede de países listados, y una escala en uno de ellos ya cuenta.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Extend the stay once at an immigration office',
          'This category allows a single extension of the same length, requested before expiry and in person because a photograph is taken.',
        ],
        pt: [
          'Prorrogar a estadia uma vez em um escritório de imigração',
          'Esta categoria admite uma única prorrogação de igual duração, pedida antes do vencimento e presencialmente, porque tiram uma fotografia.',
        ],
        es: [
          'Prorrogar la estancia una vez en una oficina de inmigración',
          'Esta categoría admite una sola prórroga de igual duración, solicitada antes del vencimiento y en persona, porque se toma una fotografía.',
        ],
      },
      {
        en: [
          'Do not take paid work while on a tourist entry',
          'Enforcement runs to deportation and a re-entry ban, and it covers work done for an Indonesian client even when the money is paid abroad.',
        ],
        pt: [
          'Não exercer trabalho remunerado em uma entrada de turismo',
          'A fiscalização chega à deportação e à proibição de reentrada, e alcança o trabalho feito para cliente indonésio mesmo quando o pagamento é no exterior.',
        ],
        es: [
          'No realizar trabajo remunerado con una entrada de turismo',
          'La fiscalización llega a la deportación y a la prohibición de reingreso, y alcanza el trabajo hecho para un cliente indonesio aunque se cobre fuera.',
        ],
      },
      {
        en: [
          'Count the overstay days from the printed expiry date',
          'A fine per day is charged when you leave, and a long overstay stops being a fine and becomes deportation with a blacklist entry.',
        ],
        pt: [
          'Contar os dias de excesso a partir da data de validade impressa',
          'Cobra-se uma multa por dia na saída, e um excesso longo deixa de ser multa e vira deportação com inclusão em lista de impedidos.',
        ],
        es: [
          'Contar los días de exceso desde la fecha de vencimiento impresa',
          'Se cobra una multa por día al salir, y un exceso largo deja de ser multa y pasa a ser deportación con inclusión en lista de vetados.',
        ],
      },
      {
        en: [
          'Have your host report you if you stay in a private home',
          'Whoever accommodates a foreigner must notify the local authorities; hotels do it automatically and private hosts usually do not.',
        ],
        pt: [
          'Fazer o anfitrião comunicar você se ficar em casa particular',
          'Quem hospeda um estrangeiro precisa avisar as autoridades locais; hotéis fazem isso automaticamente e anfitriões particulares em geral não.',
        ],
        es: [
          'Hacer que su anfitrión le comunique si se aloja en casa particular',
          'Quien aloja a un extranjero debe avisar a las autoridades locales; los hoteles lo hacen de forma automática y los anfitriones particulares no.',
        ],
      },
      {
        en: [
          'Do not count on converting this into a stay permit locally',
          'Moving to a KITAS normally means leaving the country and having an Indonesian guarantor file a new electronic visa for you.',
        ],
        pt: [
          'Não contar em converter isso em autorização de permanência no local',
          'Migrar para um KITAS normalmente exige sair do país e ter um garantidor indonésio protocolando um novo visto eletrônico para você.',
        ],
        es: [
          'No contar con convertir esto en un permiso de estancia in situ',
          'Pasar a un KITAS normalmente exige salir del país y que un garante indonesio presente un nuevo visado electrónico para usted.',
        ],
        priority: 2,
      },
    ],
  },

  'Remote Worker KITAS (E33G)': {
    core_documents: [
      {
        en: [
          'Passport with validity beyond the requested permit period',
          'The remaining validity has to exceed the stay being granted, not merely the entry date, and renewing it later means updating the permit record.',
        ],
        pt: [
          'Passaporte com validade além do período de permissão pedido',
          'A validade restante precisa ultrapassar a permanência concedida, não apenas a data de entrada, e renová-lo depois obriga a atualizar o registro da permissão.',
        ],
        es: [
          'Pasaporte con vigencia superior al periodo de permiso solicitado',
          'La vigencia restante debe superar la estancia concedida, no solo la fecha de entrada, y renovarlo después obliga a actualizar el registro del permiso.',
        ],
      },
      {
        en: [
          'Remote employment contract with a company outside Indonesia',
          'This route exists only for income earned abroad; a contract with an Indonesian entity disqualifies you and pushes you to a work permit instead.',
        ],
        pt: [
          'Contrato de trabalho remoto com empresa fora da Indonésia',
          'Esta rota existe apenas para renda gerada no exterior; um contrato com entidade indonésia desqualifica você e o empurra para uma autorização de trabalho.',
        ],
        es: [
          'Contrato de trabajo remoto con una empresa fuera de Indonesia',
          'Esta vía existe solo para ingresos generados fuera; un contrato con una entidad indonesia le descalifica y le empuja a un permiso de trabajo.',
        ],
      },
      {
        en: [
          'Digital photograph meeting the portal specifications',
          'Uploaded in a fixed size against a plain background; a rejected file sends the whole submission back rather than just that field.',
        ],
        pt: [
          'Fotografia digital dentro das especificações do portal',
          'Enviada em tamanho fixo e fundo liso; um arquivo recusado devolve o envio inteiro, não apenas aquele campo.',
        ],
        es: [
          'Fotografía digital conforme a las especificaciones del portal',
          'Se sube en un tamaño fijo y con fondo liso; un archivo rechazado devuelve el envío entero, no solo ese campo.',
        ],
      },
      {
        en: [
          'Written statement that no Indonesian client is involved',
          'Signed by you, and it is the condition immigration checks later; taking local clients on the side is what gets this permit cancelled.',
        ],
        pt: [
          'Declaração escrita de que nenhum cliente indonésio está envolvido',
          'Assinada por você, é a condição que a imigração fiscaliza depois; pegar clientes locais por fora é o que cancela esta permissão.',
        ],
        es: [
          'Declaración escrita de que ningún cliente indonesio participa',
          'Firmada por usted, es la condición que inmigración comprueba después; aceptar clientes locales por fuera es lo que cancela este permiso.',
        ],
      },
      {
        en: [
          'Declared address where you will live in Indonesia',
          'Reporting duties attach to whatever address you declare, so moving afterwards means amending the record, not just telling the landlord.',
        ],
        pt: [
          'Endereço declarado onde você vai morar na Indonésia',
          'As obrigações de comunicação se prendem ao endereço declarado, então mudar depois exige alterar o registro, não só avisar o locador.',
        ],
        es: [
          'Dirección declarada donde vivirá en Indonesia',
          'Las obligaciones de comunicación se atan a la dirección declarada, así que mudarse después exige modificar el registro, no solo avisar al casero.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Curriculum vitae describing the remote role',
          'Not a formal condition, but officers use it to check that the contract matches the occupation you stated on the form.',
        ],
        pt: [
          'Currículo descrevendo a função remota',
          'Não é condição formal, mas os agentes o usam para verificar se o contrato bate com a ocupação declarada no formulário.',
        ],
        es: [
          'Currículum que describa el puesto remoto',
          'No es una condición formal, pero los agentes lo usan para comprobar que el contrato coincide con la ocupación declarada en el formulario.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Diploma or professional certificate for your field',
          'No qualification threshold applies here, unlike the work categories, but a credential helps when the job title is unusual.',
        ],
        pt: [
          'Diploma ou certificado profissional da sua área',
          'Aqui não há exigência de qualificação, ao contrário das categorias de trabalho, mas uma credencial ajuda quando o cargo é pouco comum.',
        ],
        es: [
          'Título o certificado profesional de su área',
          'Aquí no hay umbral de cualificación, a diferencia de las categorías de trabajo, pero una credencial ayuda cuando el cargo es poco común.',
        ],
        priority: 3,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of annual income sourced abroad',
          'The rule sets a minimum yearly figure that has already been adjusted, so confirm the amount in force before assembling payslips.',
        ],
        pt: [
          'Comprovação de renda anual originada no exterior',
          'A norma fixa um piso anual que já foi ajustado, então confirme o valor vigente antes de juntar os holerites.',
        ],
        es: [
          'Prueba de ingresos anuales originados en el extranjero',
          'La norma fija un mínimo anual que ya se ha ajustado, así que confirme el importe vigente antes de reunir las nóminas.',
        ],
      },
      {
        en: [
          'Bank statements covering the last three months',
          'They must show a balance above the required floor and the salary actually landing, not a single deposit made the week before.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'Precisam mostrar saldo acima do piso exigido e o salário efetivamente entrando, não um depósito único feito na semana anterior.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'Deben mostrar un saldo por encima del mínimo exigido y el salario entrando de verdad, no un depósito único hecho la semana anterior.',
        ],
      },
      {
        en: [
          'Funds held in an account in your own name',
          'Joint accounts and company accounts are routinely refused, and a family transfer arriving days before raises the same doubt.',
        ],
        pt: [
          'Recursos mantidos em conta no seu próprio nome',
          'Contas conjuntas e contas de empresa são recusadas de rotina, e uma transferência da família chegando dias antes levanta a mesma dúvida.',
        ],
        es: [
          'Fondos en una cuenta a su propio nombre',
          'Las cuentas conjuntas y las de empresa se rechazan de forma habitual, y una transferencia familiar llegada días antes genera la misma duda.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Have an Indonesian guarantor file the electronic visa',
          'The application is lodged from a sponsor account on the immigration portal; there is no consulate queue abroad that replaces this.',
        ],
        pt: [
          'Fazer um garantidor indonésio protocolar o visto eletrônico',
          'O pedido é lançado a partir de uma conta de patrocinador no portal de imigração; não há fila de consulado no exterior que substitua isso.',
        ],
        es: [
          'Hacer que un garante indonesio presente el visado electrónico',
          'La solicitud se registra desde una cuenta de patrocinador en el portal de inmigración; ninguna cola consular en el extranjero sustituye esto.',
        ],
      },
      {
        en: [
          'Pay the visa and stay permit charges through the billing code',
          'The code generated by the portal expires within days and the payment is not refunded if the application is refused; check the current tariff.',
        ],
        pt: [
          'Pagar as cobranças de visto e permanência pelo código de faturamento',
          'O código gerado pelo portal expira em poucos dias e o pagamento não é devolvido se o pedido for negado; confira a tabela vigente.',
        ],
        es: [
          'Pagar los cargos de visado y estancia con el código de facturación',
          'El código que genera el portal caduca en pocos días y el pago no se devuelve si se deniega la solicitud; consulte la tarifa vigente.',
        ],
      },
      {
        en: [
          'Wait for the approval to arrive as a PDF by email',
          'Nothing is stamped into the passport; the file itself is what the airline and the arrival officer read, so carry it printed as well.',
        ],
        pt: [
          'Aguardar a aprovação chegar como PDF por e-mail',
          'Nada é carimbado no passaporte; o próprio arquivo é o que a companhia aérea e o agente de chegada leem, então leve-o também impresso.',
        ],
        es: [
          'Esperar a que la aprobación llegue como PDF por correo',
          'Nada se sella en el pasaporte; el propio archivo es lo que leen la aerolínea y el agente de llegada, así que llévelo también impreso.',
        ],
      },
      {
        en: [
          'Enter the country inside the entry validity window',
          'The approval carries a deadline for first entry, and missing it means applying and paying again from the start.',
        ],
        pt: [
          'Entrar no país dentro da janela de validade de entrada',
          'A aprovação traz um prazo para a primeira entrada, e perdê-lo obriga a pedir e pagar tudo de novo desde o início.',
        ],
        es: [
          'Entrar al país dentro de la ventana de validez de entrada',
          'La aprobación lleva un plazo para el primer ingreso, y perderlo obliga a solicitar y pagar todo de nuevo desde el principio.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Attend the immigration office for fingerprints after arrival',
          'Booked shortly after you land and required before the permit is activated; skipping it leaves you holding an approval that is not yet a residence permit.',
        ],
        pt: [
          'Comparecer à imigração para impressões digitais após a chegada',
          'Agendado logo depois do desembarque e exigido antes de a permissão ser ativada; faltar deixa você com uma aprovação que ainda não é residência.',
        ],
        es: [
          'Acudir a inmigración para las huellas tras la llegada',
          'Se agenda poco después de aterrizar y se exige antes de activar el permiso; faltar le deja con una aprobación que aún no es residencia.',
        ],
      },
      {
        en: [
          'Private health insurance valid inside Indonesia',
          'This category does not enrol you in the national scheme because you are not on a local payroll, so the cover has to be bought.',
        ],
        pt: [
          'Seguro de saúde privado com validade dentro da Indonésia',
          'Esta categoria não inscreve você no sistema nacional porque não há folha de pagamento local, então a cobertura precisa ser comprada.',
        ],
        es: [
          'Seguro de salud privado con validez dentro de Indonesia',
          'Esta categoría no le inscribe en el sistema nacional porque no hay nómina local, así que la cobertura hay que contratarla.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the electronic KITAS after the biometric appointment',
          'It is issued as a digital document with nothing added to the passport, so keep a copy on your phone for hotel and bank checks.',
        ],
        pt: [
          'Retirar o KITAS eletrônico após o agendamento biométrico',
          'É emitido como documento digital sem nada acrescentado ao passaporte, então guarde uma cópia no celular para conferências de hotel e banco.',
        ],
        es: [
          'Obtener el KITAS electrónico tras la cita biométrica',
          'Se emite como documento digital sin añadir nada al pasaporte, así que guarde una copia en el móvil para controles de hotel y banco.',
        ],
      },
      {
        en: [
          'Report where you live to the local office and the neighbourhood',
          'Two separate registrations, done within days of settling in; the missing one usually surfaces months later and slows the renewal.',
        ],
        pt: [
          'Comunicar onde você mora ao escritório local e ao bairro',
          'São dois registros distintos, feitos em poucos dias após se instalar; o que faltou costuma aparecer meses depois e atrasa a renovação.',
        ],
        es: [
          'Comunicar dónde vive a la oficina local y al barrio',
          'Son dos registros distintos, hechos a los pocos días de instalarse; el que falta suele aflorar meses después y retrasa la renovación.',
        ],
      },
      {
        en: [
          'Confirm the re-entry permission before leaving the country',
          'It is normally bundled with the electronic permit now, but travelling without it valid cancels the permit while you are outside.',
        ],
        pt: [
          'Confirmar a permissão de reentrada antes de sair do país',
          'Hoje ela costuma vir embutida na permissão eletrônica, mas viajar sem ela válida cancela a permissão enquanto você está fora.',
        ],
        es: [
          'Confirmar el permiso de reingreso antes de salir del país',
          'Hoy suele venir incluido en el permiso electrónico, pero viajar sin él vigente cancela el permiso mientras está fuera.',
        ],
      },
      {
        en: [
          'Start the renewal weeks before the permit runs out',
          'There is no grace period: the daily overstay charge begins on the first day past expiry even if the renewal is already lodged.',
        ],
        pt: [
          'Iniciar a renovação semanas antes de a permissão acabar',
          'Não há período de tolerância: a cobrança diária por excesso começa no primeiro dia após o vencimento mesmo com a renovação já protocolada.',
        ],
        es: [
          'Iniciar la renovación semanas antes de que acabe el permiso',
          'No hay periodo de gracia: el cargo diario por exceso empieza el primer día tras el vencimiento aunque la renovación ya esté presentada.',
        ],
      },
      {
        en: [
          'Review your tax position once the stay passes the residency test',
          'Crossing the day count in a twelve month period generally makes you a local tax resident with filing duties, wherever the salary is paid.',
        ],
        pt: [
          'Revisar sua situação fiscal quando a estadia passar do teste de residência',
          'Ultrapassar a contagem de dias em doze meses normalmente torna você residente fiscal local com dever de declarar, onde quer que o salário seja pago.',
        ],
        es: [
          'Revisar su situación fiscal cuando la estancia supere el test de residencia',
          'Superar el cómputo de días en doce meses suele convertirle en residente fiscal local con deber de declarar, se pague donde se pague el salario.',
        ],
        priority: 2,
      },
    ],
  },

  'Second Home Visa': {
    core_documents: [
      {
        en: [
          'Passport valid for at least thirty-six months',
          'Far more remaining validity than any other category demands, so most applicants have to renew the passport before they even start.',
        ],
        pt: [
          'Passaporte válido por pelo menos trinta e seis meses',
          'Muito mais validade restante do que qualquer outra categoria exige, então a maioria precisa renovar o passaporte antes mesmo de começar.',
        ],
        es: [
          'Pasaporte vigente por al menos treinta y seis meses',
          'Mucha más vigencia restante de la que exige cualquier otra categoría, así que la mayoría debe renovar el pasaporte antes incluso de empezar.',
        ],
      },
      {
        en: [
          'Decide between the deposit route and the property route',
          'Two qualifying paths with different evidence; picking one halfway through the application means restarting the financial file.',
        ],
        pt: [
          'Decidir entre a via do depósito e a via do imóvel',
          'São dois caminhos de qualificação com provas diferentes; trocar no meio do pedido significa refazer todo o dossiê financeiro.',
        ],
        es: [
          'Decidir entre la vía del depósito y la vía del inmueble',
          'Dos caminos de calificación con pruebas distintas; cambiar a mitad de la solicitud implica rehacer todo el expediente financiero.',
        ],
      },
      {
        en: [
          'Curriculum vitae in the format the portal asks for',
          'Read as a background check on how you funded your life, not as a job application, so gaps invite questions about the money.',
        ],
        pt: [
          'Currículo no formato exigido pelo portal',
          'Lido como uma verificação de como você sustentou sua vida, não como candidatura a emprego, então lacunas geram perguntas sobre o dinheiro.',
        ],
        es: [
          'Currículum en el formato que pide el portal',
          'Se lee como una verificación de cómo financió su vida, no como una candidatura, así que los vacíos generan preguntas sobre el dinero.',
        ],
      },
      {
        en: [
          'Recent colour photograph on a white background',
          'Uploaded to the portal in the stated dimensions; scans of an old printed photo are rejected on sight.',
        ],
        pt: [
          'Fotografia colorida recente em fundo branco',
          'Enviada ao portal nas dimensões indicadas; digitalizações de uma foto impressa antiga são recusadas de imediato.',
        ],
        es: [
          'Fotografía en color reciente sobre fondo blanco',
          'Se sube al portal en las dimensiones indicadas; los escaneos de una foto impresa antigua se rechazan de inmediato.',
        ],
      },
      {
        en: [
          'Undertaking that you will not take employment locally',
          'The category is designed for people who spend rather than earn here; hiring yourself to your own venture belongs to a different permit.',
        ],
        pt: [
          'Compromisso de que você não assumirá emprego no país',
          'A categoria foi feita para quem gasta e não ganha aqui; contratar a si mesmo no próprio negócio pertence a outra permissão.',
        ],
        es: [
          'Compromiso de que no aceptará empleo en el país',
          'La categoría está pensada para quien gasta y no gana aquí; contratarse a uno mismo en su propio negocio pertenece a otro permiso.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Deposit held in an account at a designated state bank',
          'The qualifying minimum is set by circular and has been revised since launch, so verify the figure in force at the bank itself.',
        ],
        pt: [
          'Depósito mantido em conta de banco estatal designado',
          'O mínimo de qualificação é fixado por circular e já foi revisto desde o lançamento, então confirme o valor vigente no próprio banco.',
        ],
        es: [
          'Depósito mantenido en una cuenta de banco estatal designado',
          'El mínimo de calificación lo fija una circular y se ha revisado desde el lanzamiento, así que verifique la cifra vigente en el propio banco.',
        ],
      },
      {
        en: [
          'Keep the balance untouched for the life of the permit',
          'It is re-checked, not just checked once; drawing the account down below the threshold is grounds to revoke the stay.',
        ],
        pt: [
          'Manter o saldo intocado durante toda a vigência da permissão',
          'Ele é reconferido, e não conferido uma única vez; puxar a conta para baixo do piso é motivo para revogar a permanência.',
        ],
        es: [
          'Mantener el saldo intacto durante toda la vigencia del permiso',
          'Se vuelve a comprobar, no se comprueba una sola vez; bajar la cuenta del umbral es motivo para revocar la estancia.',
        ],
      },
      {
        en: [
          'Property title documents if you take the property route',
          'Foreigners cannot hold freehold land here; qualifying ownership runs through a right-of-use title, and only certain property types count.',
        ],
        pt: [
          'Documentos de titularidade do imóvel se optar pela via do imóvel',
          'Estrangeiros não podem ter propriedade plena da terra aqui; a titularidade que qualifica passa por um direito de uso, e só certos tipos de imóvel contam.',
        ],
        es: [
          'Documentos de titularidad del inmueble si elige esa vía',
          'Los extranjeros no pueden tener propiedad plena del suelo aquí; la titularidad que califica pasa por un derecho de uso, y solo cuentan ciertos inmuebles.',
        ],
        required: false,
      },
      {
        en: [
          'Documentary evidence of where the money came from',
          'Sale contracts, inheritance papers or pension statements; an unexplained lump sum stalls the file more often than a small balance does.',
        ],
        pt: [
          'Prova documental da origem do dinheiro',
          'Contratos de venda, papéis de herança ou extratos de aposentadoria; uma quantia sem explicação trava o processo mais do que um saldo pequeno.',
        ],
        es: [
          'Prueba documental del origen del dinero',
          'Contratos de venta, papeles de herencia o extractos de pensión; una suma sin explicación atasca el expediente más que un saldo pequeño.',
        ],
      },
      {
        en: [
          'Budget for the dependants you want to bring',
          'A spouse and children can be included, but each adds separate fees and its own document set to the same submission.',
        ],
        pt: [
          'Prever orçamento para os dependentes que quiser trazer',
          'Cônjuge e filhos podem ser incluídos, mas cada um acrescenta taxas próprias e um conjunto de documentos ao mesmo envio.',
        ],
        es: [
          'Presupuestar a los dependientes que quiera traer',
          'Cónyuge e hijos pueden incluirse, pero cada uno añade tasas propias y su propio juego de documentos al mismo envío.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Register on the immigration portal as your own guarantor',
          'One of the few categories that does not need an Indonesian company to sponsor it, which is precisely why agents are not required here.',
        ],
        pt: [
          'Registrar-se no portal de imigração como seu próprio garantidor',
          'Uma das poucas categorias que dispensa uma empresa indonésia patrocinando, e é justamente por isso que agentes não são necessários aqui.',
        ],
        es: [
          'Registrarse en el portal de inmigración como su propio garante',
          'Una de las pocas categorías que no necesita una empresa indonesia que la patrocine, y por eso mismo aquí no hacen falta gestores.',
        ],
      },
      {
        en: [
          'Upload translated and legalised copies of every document',
          'Foreign papers need a sworn translation and consular legalisation or an apostille; an untranslated bank letter is the usual rejection.',
        ],
        pt: [
          'Enviar cópias traduzidas e legalizadas de cada documento',
          'Papéis estrangeiros exigem tradução juramentada e legalização consular ou apostila; uma carta bancária sem tradução é a recusa mais comum.',
        ],
        es: [
          'Subir copias traducidas y legalizadas de cada documento',
          'Los papeles extranjeros exigen traducción jurada y legalización consular o apostilla; una carta bancaria sin traducir es el rechazo habitual.',
        ],
      },
      {
        en: [
          'Settle the visa and residence charges due on approval',
          'Several distinct charges land at different stages rather than one payment; ask for the full schedule before you start, as the tariff is revised.',
        ],
        pt: [
          'Quitar as cobranças de visto e de residência devidas na aprovação',
          'São várias cobranças distintas em etapas diferentes, e não um pagamento único; peça a tabela completa antes de começar, pois ela é revista.',
        ],
        es: [
          'Liquidar los cargos de visado y residencia debidos al aprobar',
          'Son varios cargos distintos en etapas diferentes, no un pago único; pida el listado completo antes de empezar, pues la tarifa se revisa.',
        ],
      },
      {
        en: [
          'Travel before the approval letter loses its validity',
          'The document carries a window for first entry, and a deposit already locked in the bank does not extend it.',
        ],
        pt: [
          'Viajar antes de a carta de aprovação perder a validade',
          'O documento traz uma janela para a primeira entrada, e um depósito já preso no banco não a prorroga.',
        ],
        es: [
          'Viajar antes de que la carta de aprobación pierda validez',
          'El documento lleva una ventana para el primer ingreso, y un depósito ya bloqueado en el banco no la amplía.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Present yourself for photograph and fingerprinting on arrival',
          'The appointment converts the approval into an actual residence permit, and it cannot be delegated to the agent who filed the papers.',
        ],
        pt: [
          'Apresentar-se para fotografia e coleta de digitais ao chegar',
          'O atendimento converte a aprovação em residência de fato, e não pode ser delegado ao agente que protocolou os papéis.',
        ],
        es: [
          'Presentarse para fotografía y toma de huellas al llegar',
          'La cita convierte la aprobación en una residencia real, y no puede delegarse en el gestor que presentó los papeles.',
        ],
      },
      {
        en: [
          'Health cover for a stay measured in years',
          'The national scheme is tied to local employment, which this permit forbids, so retirees carry the cost of a long private policy.',
        ],
        pt: [
          'Cobertura de saúde para uma permanência medida em anos',
          'O sistema nacional está ligado ao emprego local, que esta permissão proíbe, então aposentados arcam com uma apólice privada longa.',
        ],
        es: [
          'Cobertura sanitaria para una estancia medida en años',
          'El sistema nacional se vincula al empleo local, que este permiso prohíbe, así que los jubilados asumen una póliza privada larga.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive the long electronic residence permit',
          'Granted for five or ten years depending on what you qualified with, but the underlying condition is reviewed inside that period.',
        ],
        pt: [
          'Receber a permissão eletrônica de residência longa',
          'Concedida por cinco ou dez anos conforme o que qualificou você, mas a condição de base é revista dentro desse período.',
        ],
        es: [
          'Recibir el permiso electrónico de residencia larga',
          'Se concede por cinco o diez años según con qué haya calificado, pero la condición de base se revisa dentro de ese periodo.',
        ],
      },
      {
        en: [
          'File the address notification with the local authorities',
          'Required within days of moving in and repeated whenever you change house, which long-stay holders forget precisely because the permit is long.',
        ],
        pt: [
          'Protocolar a comunicação de endereço às autoridades locais',
          'Exigida poucos dias após se mudar e repetida a cada troca de casa, algo que titulares de longa duração esquecem justamente por ser longa.',
        ],
        es: [
          'Presentar la notificación de domicilio ante las autoridades locales',
          'Se exige a los pocos días de mudarse y se repite en cada cambio de casa, algo que los titulares de larga duración olvidan justo por ser larga.',
        ],
      },
      {
        en: [
          'Keep out of paid activity and out of running a business',
          'Investing or working means moving to a different category; being caught trading under this one ends the permit and the deposit does not protect you.',
        ],
        pt: [
          'Manter-se fora de atividade remunerada e da gestão de negócios',
          'Investir ou trabalhar exige migrar para outra categoria; ser pego negociando sob esta encerra a permissão, e o depósito não protege você.',
        ],
        es: [
          'Mantenerse fuera de la actividad remunerada y de gestionar negocios',
          'Invertir o trabajar exige pasar a otra categoría; que le pillen operando bajo esta acaba con el permiso, y el depósito no le protege.',
        ],
      },
      {
        en: [
          'Deal with local tax duties once you become resident here',
          'A long stay makes you a tax resident, and residents are assessed on worldwide income unless a treaty says otherwise.',
        ],
        pt: [
          'Cuidar das obrigações fiscais locais ao se tornar residente aqui',
          'Uma permanência longa torna você residente fiscal, e residentes são tributados sobre a renda mundial salvo se um tratado dispuser diferente.',
        ],
        es: [
          'Atender las obligaciones fiscales locales al ser residente aquí',
          'Una estancia larga le convierte en residente fiscal, y a los residentes se les grava la renta mundial salvo que un tratado diga otra cosa.',
        ],
      },
      {
        en: [
          'Plan the extension or the move to permanent status in advance',
          'Consecutive years on a stay permit open the door to the permanent KITAP, but a break in the chain resets the count to zero.',
        ],
        pt: [
          'Planejar com antecedência a prorrogação ou a virada para o status permanente',
          'Anos consecutivos com permissão de permanência abrem caminho ao KITAP permanente, mas uma interrupção na sequência zera a contagem.',
        ],
        es: [
          'Planificar con antelación la prórroga o el paso al estatus permanente',
          'Los años consecutivos con permiso de estancia abren la puerta al KITAP permanente, pero un corte en la cadena reinicia el cómputo.',
        ],
        priority: 2,
      },
    ],
  },

  'Investor KITAS': {
    core_documents: [
      {
        en: [
          'Passport covering the entire permit validity applied for',
          'Immigration cuts the permit to whatever the passport supports, so a short passport quietly shortens the stay you paid for.',
        ],
        pt: [
          'Passaporte cobrindo toda a validade de permissão solicitada',
          'A imigração encurta a permissão até onde o passaporte alcança, então um passaporte curto reduz silenciosamente a estadia que você pagou.',
        ],
        es: [
          'Pasaporte que cubra toda la vigencia de permiso solicitada',
          'Inmigración recorta el permiso hasta donde llegue el pasaporte, así que uno corto reduce en silencio la estancia que usted pagó.',
        ],
      },
      {
        en: [
          'Deed of establishment approved by the Ministry of Law',
          'The foreign investment company must legally exist before any immigration step; this cannot run in parallel with the visa application.',
        ],
        pt: [
          'Ato constitutivo aprovado pelo Ministério da Justiça',
          'A empresa de investimento estrangeiro precisa existir juridicamente antes de qualquer etapa migratória; isso não corre em paralelo com o visto.',
        ],
        es: [
          'Escritura de constitución aprobada por el Ministerio de Justicia',
          'La empresa de inversión extranjera debe existir jurídicamente antes de cualquier paso migratorio; esto no corre en paralelo con el visado.',
        ],
      },
      {
        en: [
          'Business identification number issued through the OSS system',
          'Generated online, and the business classification you pick decides whether foreign ownership is allowed at all in that activity.',
        ],
        pt: [
          'Número de identificação empresarial emitido pelo sistema OSS',
          'Gerado online, e a classificação de atividade escolhida define se a propriedade estrangeira é sequer permitida naquele ramo.',
        ],
        es: [
          'Número de identificación empresarial emitido por el sistema OSS',
          'Se genera en línea, y la clasificación de actividad elegida decide si la propiedad extranjera está permitida en ese rubro.',
        ],
      },
      {
        en: [
          'Shareholder register naming you and your stake',
          'The permit rests on the shareholding itself; a nominee arrangement holding shares for you is unlawful and voids the permit when found.',
        ],
        pt: [
          'Registro de acionistas nomeando você e sua participação',
          'A permissão se apoia na participação societária; um arranjo de laranja segurando as ações por você é ilegal e anula a permissão quando descoberto.',
        ],
        es: [
          'Registro de accionistas que le nombre a usted y su participación',
          'El permiso se apoya en la participación societaria; un testaferro que tenga las acciones por usted es ilegal y anula el permiso al descubrirse.',
        ],
      },
      {
        en: [
          'Decide whether you will also hold a working position',
          'A pure shareholder permit carries no right to work; drawing a salary or acting as director turns this into a manpower case with different paperwork.',
        ],
        pt: [
          'Decidir se você também ocupará um cargo de trabalho',
          'A permissão de mero acionista não dá direito a trabalhar; receber salário ou atuar como diretor transforma isso em um caso de mão de obra com outra papelada.',
        ],
        es: [
          'Decidir si además ocupará un puesto de trabajo',
          'El permiso de mero accionista no da derecho a trabajar; cobrar un salario o actuar como director lo convierte en un caso laboral con otros papeles.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Qualification and experience record for a director role',
          'The pure investment route sets no academic bar, but a working position is measured against a degree and a number of years in the field.',
        ],
        pt: [
          'Comprovação de qualificação e experiência para cargo de diretor',
          'A rota de puro investimento não impõe barreira acadêmica, mas um cargo de trabalho é avaliado contra um diploma e anos de atuação na área.',
        ],
        es: [
          'Acreditación de titulación y experiencia para un puesto de director',
          'La vía de pura inversión no impone barrera académica, pero un puesto de trabajo se mide contra un título y años de ejercicio en el sector.',
        ],
        required: false,
      },
      {
        en: [
          'Knowledge transfer plan for an Indonesian counterpart',
          'Every foreign worker must have a local understudy being trained; the plan is part of the manpower file and is audited later, not just filed.',
        ],
        pt: [
          'Plano de transferência de conhecimento para um substituto indonésio',
          'Todo trabalhador estrangeiro precisa ter um aprendiz local em treinamento; o plano integra o dossiê de mão de obra e é auditado depois, não só arquivado.',
        ],
        es: [
          'Plan de transferencia de conocimiento a un homólogo indonesio',
          'Todo trabajador extranjero debe tener un aprendiz local en formación; el plan forma parte del expediente laboral y luego se audita, no solo se archiva.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Investment value and paid-up capital of the company',
          'Regulation fixes both a minimum total investment and a minimum share value per foreign holder; confirm the thresholds currently applied.',
        ],
        pt: [
          'Valor de investimento e capital integralizado da empresa',
          'A norma fixa tanto um investimento total mínimo quanto um valor mínimo de participação por sócio estrangeiro; confirme os pisos aplicados hoje.',
        ],
        es: [
          'Valor de inversión y capital desembolsado de la empresa',
          'La norma fija tanto una inversión total mínima como un valor mínimo de participación por socio extranjero; confirme los umbrales aplicados hoy.',
        ],
      },
      {
        en: [
          'Bank statement showing the capital actually paid in',
          'Capital declared in the deed but never deposited is caught at the first extension, when the company accounts are compared with the filing.',
        ],
        pt: [
          'Extrato bancário mostrando o capital efetivamente integralizado',
          'Capital declarado no ato constitutivo mas nunca depositado é pego na primeira prorrogação, quando as contas da empresa são comparadas ao protocolo.',
        ],
        es: [
          'Extracto bancario que muestre el capital realmente desembolsado',
          'El capital declarado en la escritura pero nunca ingresado se detecta en la primera prórroga, al comparar las cuentas con lo presentado.',
        ],
      },
      {
        en: [
          'Provision for the foreign manpower compensation levy',
          'Charged per month of employment for a working position and paid by the company up front; the rate is set by regulation, so budget the current one.',
        ],
        pt: [
          'Provisão para a taxa compensatória de mão de obra estrangeira',
          'Cobrada por mês de emprego no caso de cargo de trabalho e paga adiantada pela empresa; a alíquota é normativa, então orce a vigente.',
        ],
        es: [
          'Provisión para la tasa compensatoria de mano de obra extranjera',
          'Se cobra por mes de empleo cuando hay puesto de trabajo y la empresa la paga por adelantado; la cuantía es normativa, así que presupueste la vigente.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Evidence that the company is current with its tax filings',
          'Monthly and annual returns are checked at renewal, and a dormant company with unfiled returns loses the permit for its own shareholder.',
        ],
        pt: [
          'Prova de que a empresa está em dia com as declarações fiscais',
          'As obrigações mensais e anuais são conferidas na renovação, e uma empresa parada com declarações em atraso derruba a permissão do próprio sócio.',
        ],
        es: [
          'Prueba de que la empresa está al día con sus declaraciones fiscales',
          'Las obligaciones mensuales y anuales se revisan en la renovación, y una empresa inactiva con declaraciones pendientes tumba el permiso de su propio socio.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Get the RPTKA manpower plan approved before anything else',
          'The foreign employment plan goes to the manpower ministry first, and no immigration stage moves until it is stamped when a working role is involved.',
        ],
        pt: [
          'Aprovar o plano de mão de obra RPTKA antes de qualquer coisa',
          'O plano de emprego estrangeiro vai primeiro ao ministério do trabalho, e nenhuma etapa migratória anda até ele ser deferido quando há cargo de trabalho.',
        ],
        es: [
          'Aprobar el plan de mano de obra RPTKA antes que nada',
          'El plan de empleo extranjero va primero al ministerio de trabajo, y ninguna etapa migratoria avanza hasta que se apruebe si hay puesto de trabajo.',
        ],
        required: false,
      },
      {
        en: [
          'Let the company lodge the electronic visa as your guarantor',
          'The application comes from the corporate account on the portal, which is why the company has to be fully registered before you can apply at all.',
        ],
        pt: [
          'Deixar a empresa protocolar o visto eletrônico como sua garantidora',
          'O pedido sai da conta corporativa no portal, e é por isso que a empresa precisa estar totalmente registrada antes de você poder pedir qualquer coisa.',
        ],
        es: [
          'Dejar que la empresa presente el visado electrónico como su garante',
          'La solicitud sale de la cuenta corporativa del portal, y por eso la empresa debe estar plenamente registrada antes de que usted pueda solicitar nada.',
        ],
      },
      {
        en: [
          'Pay each charge against the billing code it generates',
          'Visa, stay permit and levy are separate codes with separate deadlines; one expired code holds up the whole file until it is regenerated.',
        ],
        pt: [
          'Pagar cada cobrança pelo código de faturamento que ela gera',
          'Visto, permissão de permanência e taxa são códigos separados com prazos separados; um código vencido trava o processo inteiro até ser gerado de novo.',
        ],
        es: [
          'Pagar cada cargo con el código de facturación que genera',
          'Visado, permiso de estancia y tasa son códigos distintos con plazos distintos; un código caducado frena todo el expediente hasta regenerarlo.',
        ],
      },
      {
        en: [
          'Arrive within the window the approval sets for first entry',
          'The company paid for a window, not an open ticket, and letting it lapse means the corporate sponsor files and pays again.',
        ],
        pt: [
          'Chegar dentro da janela que a aprovação define para a primeira entrada',
          'A empresa pagou por uma janela, não por um bilhete aberto, e deixá-la vencer faz o patrocinador corporativo protocolar e pagar de novo.',
        ],
        es: [
          'Llegar dentro de la ventana que la aprobación fija para el primer ingreso',
          'La empresa pagó por una ventana, no por un billete abierto, y dejarla caducar obliga al patrocinador corporativo a presentar y pagar de nuevo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Report for biometric capture within days of landing',
          'The deadline after entry is short and counted in working days; missing it invalidates the approval the company already paid for.',
        ],
        pt: [
          'Comparecer para coleta biométrica em poucos dias após o desembarque',
          'O prazo depois da entrada é curto e contado em dias úteis; perdê-lo invalida a aprovação que a empresa já pagou.',
        ],
        es: [
          'Acudir a la toma biométrica pocos días después de aterrizar',
          'El plazo tras la entrada es corto y se cuenta en días hábiles; incumplirlo invalida la aprobación que la empresa ya pagó.',
        ],
      },
      {
        en: [
          'Sort out health and social security enrolment',
          'A foreign worker on the local payroll must be enrolled in the national schemes by the employer; a shareholder without salary buys private cover instead.',
        ],
        pt: [
          'Resolver a inscrição em saúde e previdência social',
          'Um trabalhador estrangeiro na folha local precisa ser inscrito nos sistemas nacionais pelo empregador; um sócio sem salário compra cobertura privada.',
        ],
        es: [
          'Resolver la afiliación a salud y seguridad social',
          'Un trabajador extranjero en nómina local debe ser afiliado a los sistemas nacionales por el empleador; un socio sin salario contrata cobertura privada.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the electronic stay permit issued after biometrics',
          'It exists only as a digital record, so banks and notaries are shown a printout; nothing is stuck into the passport any more.',
        ],
        pt: [
          'Retirar a permissão eletrônica de permanência emitida após a biometria',
          'Ela existe apenas como registro digital, então bancos e cartórios recebem uma impressão; nada mais é colado no passaporte.',
        ],
        es: [
          'Recoger el permiso electrónico de estancia emitido tras la biometría',
          'Existe solo como registro digital, así que a bancos y notarías se les muestra una impresión; ya no se pega nada en el pasaporte.',
        ],
      },
      {
        en: [
          'Obtain a personal tax number once you are resident',
          'Separate from the company number, and required before you can be paid, own vehicles or repatriate dividends without a penalty rate.',
        ],
        pt: [
          'Obter um número fiscal pessoal assim que se tornar residente',
          'É separado do número da empresa e exigido antes de você ser remunerado, ter veículos ou repatriar dividendos sem alíquota punitiva.',
        ],
        es: [
          'Obtener un número fiscal personal en cuanto sea residente',
          'Es distinto del número de la empresa y se exige antes de cobrar, tener vehículos o repatriar dividendos sin un tipo penalizado.',
        ],
      },
      {
        en: [
          'Notify your residential address and every later change of it',
          'Registered with the local immigration office and the neighbourhood administration; an outdated address is the quiet reason renewals get queried.',
        ],
        pt: [
          'Comunicar seu endereço residencial e cada mudança posterior',
          'Registrado no escritório local de imigração e na administração do bairro; um endereço desatualizado é a razão silenciosa de renovações questionadas.',
        ],
        es: [
          'Comunicar su domicilio y cada cambio posterior',
          'Se registra en la oficina local de inmigración y en la administración del barrio; una dirección desactualizada es la razón silenciosa de renovaciones cuestionadas.',
        ],
      },
      {
        en: [
          'Hold the shareholding and the investment in place',
          'Selling down below the qualifying level, or letting the company go dormant, ends the basis of the permit before its printed expiry.',
        ],
        pt: [
          'Manter a participação societária e o investimento no lugar',
          'Vender abaixo do nível de qualificação, ou deixar a empresa parada, extingue a base da permissão antes da validade impressa nela.',
        ],
        es: [
          'Mantener la participación societaria y la inversión en su sitio',
          'Vender por debajo del nivel de calificación, o dejar la empresa inactiva, extingue la base del permiso antes de su vigencia impresa.',
        ],
      },
      {
        en: [
          'Build the consecutive years towards the permanent KITAP',
          'Several unbroken extensions in the same category qualify you; changing sponsor or letting a year lapse restarts the clock from the beginning.',
        ],
        pt: [
          'Acumular os anos consecutivos rumo ao KITAP permanente',
          'Várias prorrogações ininterruptas na mesma categoria qualificam você; trocar de patrocinador ou deixar um ano vencer reinicia a contagem do zero.',
        ],
        es: [
          'Acumular los años consecutivos hacia el KITAP permanente',
          'Varias prórrogas ininterrumpidas en la misma categoría le califican; cambiar de patrocinador o dejar caducar un año reinicia el cómputo desde cero.',
        ],
        priority: 2,
      },
    ],
  },
};
