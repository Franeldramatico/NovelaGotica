import { DialogueNode, Ending } from '../types';

export const ENDINGS_DATA: Ending[] = [
  { id: 1, title: 'El Romance Perfecto', description: 'Aranxita y Franxito unen sus almas en una comunión perfecta de amor, confianza y poder vampírico, jurando gobernar el Castillo Noctis juntos por toda la eternidad.', type: 'perfect' },
  { id: 2, title: 'Amor Bajo la Luna', description: 'Bajo el manto plateado en el balcón supremo, confiesan un amor intenso y eterno mientras las estrellas atestiguan su primer beso escarlata.', type: 'romantic' },
  { id: 3, title: 'Compañeros Eternos', description: 'Deciden forjar un pacto inquebrantable de complicidad y lealtad recíproca, convirtiéndose en soberanos independientes que comparten su inmortalidad.', type: 'companion' },
  { id: 4, title: 'El Baile Prohibido', description: 'En un salón olvidado por el tiempo, giran eternamente en un vals hipnótico que sella una trágica pero apasionada unión romántica prohibida.', type: 'romantic' },
  { id: 5, title: 'Guardianes del Reino', description: 'Aranxita acepta su deber real infundiendo valor a Franxito. Juntos se alzan como guardianes imbatibles de las fronteras de la bruma.', type: 'royal' },
  { id: 6, title: 'Confesión en la Torre', description: 'Bajo un cielo despejado de presagios oscuros en la aguja de piedra, ambos abren sus corazones revelando sus miedos y sellando una promesa eterna.', type: 'romantic' },
  { id: 7, title: 'La Biblioteca Secreta', description: 'Entre grimorios polvorientos y runas de dinastías pasadas, descubren una profecía milenaria que describía que sus almas estaban unidas antes de nacer.', type: 'secret' },
  { id: 8, title: 'Los Secretos de Franxito', description: 'Franxito revela el peso de su antigua maldición familiar y Aranxita decide cobijarlo en su propia nobleza, sanando las grietas de su corazón herido.', type: 'secret' },
  { id: 9, title: 'La Verdad de Aranxita', description: 'Aranxita confiesa el secreto de su linaje progenitor y descubre en Franxito un refugio devoto de consuelo y comprensión absoluta.', type: 'secret' },
  { id: 10, title: 'Una Noche Inolvidable', description: 'Una noche de risas, confesiones y calidez compartida junto al fuego sagrado de la chimenea que iluminará sus almas por el resto de su milenaria existencia.', type: 'companion' },
  { id: 11, title: 'El Misterio Sin Resolver', description: 'El sol amenaza el horizonte plateado. Franxito se desvanece sutilmente entre la niebla nocturna, dejando solo una rosa y la promesa de volver.', type: 'melancholic' },
  { id: 12, title: 'Amigos para Siempre', description: 'Aranxita y Franxito deciden que un romance empañaría su sublime entendimiento. Forjan una amistad indestructible e inmune al paso del tiempo.', type: 'companion' },
  { id: 13, title: 'Caminos Separados', description: 'Un amargo y respetuoso adiós al alba. La realeza y el deber exigen que sigan caminos opuestos, llevando consigo el eterno suspiro de lo que pudo ser.', type: 'melancholic' },
  { id: 14, title: 'La Maldición del Castillo', description: 'La desconfianza mutua despierta las sombras ancestrales encerradas en los muros de Noctis, sumiendo su lazo en una tormenta de penumbra perpetua.', type: 'danger' },
  { id: 15, title: 'Final Secreto: El Destino Escarlata', description: 'Desbloqueas el pacto ancestral de sangre prohibida. Aranxita y Franxito despiertan el gran Linaje Escarlata original para reinar como soberanos absolutos.', type: 'secret' },
];

export const STORY_NODES: Record<string, DialogueNode> = {
  // --- INICIO / PRÓLOGO ---
  start: {
    id: 'start',
    character: 'Narrador',
    text: 'La bruma de la medianoche fluye espesa como la seda sobre los torreones de piedra del Castillo Noctis. Sentada en tu tocador de ébano pulido, tú, la Princesa Vampira Aranxita, observas una misteriosa misiva. El lacre rojo muestra un blasón heráldico que no reconoces. La carta reza: "Te espero en el vestíbulo susurrante. Hay verdades ocultas en tu eternidad que solo yo puedo revelarte. Atentamente, Franxito". Jamás habías oído ese nombre. ¿Qué decidirá hacer tu alteza?',
    background: 'habitacion',
    portraitActive: 'aranxita',
    sceneName: 'Aposentos Reales de Aranxita',
    choices: [
      {
        text: 'Lacre misterioso... guardaré la carta con sumo sigilo e iré armada con mi orgullo.',
        nextNodeId: 'intro_1',
        personalityTag: 'Desconfiada',
        statsMod: { curiosidad: 1, valentia: 1, misterio: 1 }
      },
      {
        text: '¿Franxito? Un nombre sugerente... Me aplicaré mi perfume de jazmín oscuro y acudiré a su encuentro con gracia.',
        nextNodeId: 'intro_1',
        personalityTag: 'Coqueta',
        statsMod: { romance: 2, atraccion: 1, complicidad: 1 }
      },
      {
        text: '¡Por fin una intriga digna en esta noche de aburrimiento! Descubriré quién es el osado emisor de inmediato.',
        nextNodeId: 'intro_1',
        personalityTag: 'Curiosa',
        statsMod: { curiosidad: 2, honestidad: 1, valentia: 1 }
      }
    ]
  },

  intro_1: {
    id: 'intro_1',
    character: 'Narrador',
    text: 'Dejas atrás tus suntuosos aposentos. Tus pasos de seda apenas hacen ruido en las alfombras escarlatas del vestíbulo de Castillo Noctis. El viento gótico silba suavemente colándose entre las vidrieras de cristal tintado. Al final de la larga escalinata, apoyado ligeramente sobre la barandilla plateada, divisas la silueta de un joven noble vampiro. Viste un abrigo oscuro victoriano de terciopelo bordado de hilos escarlatas y negros. Su postura emana una elegancia innata, casi felina.',
    background: 'vestibulo',
    portraitActive: 'none',
    sceneName: 'Gran Escalera del Castillo',
    choices: [
      {
        text: 'Detenerte un instante en las sombras para analizar minuciosamente su porte.',
        nextNodeId: 'intro_2',
        personalityTag: 'Reservada',
        statsMod: { misterio: 1, curiosidad: 1, confianza: -1 } // stats keys mapped dynamically
      },
      {
        text: 'Caminar con determinación firme, dejando que el vuelo de tu vestido gótico anuncie tu llegada.',
        nextNodeId: 'intro_2',
        personalityTag: 'Valiente',
        statsMod: { valentia: 2, atraccion: 1 }
      },
      {
        text: 'Disculpar tu timidez con un suave carraspeo de garganta para llamar dulcemente su atención.',
        nextNodeId: 'intro_2',
        personalityTag: 'Dulce',
        statsMod: { confianza: 1, romance: 1 }
      }
    ]
  },

  intro_2: {
    id: 'intro_2',
    character: 'Franxito',
    text: 'El joven vampiro se gira con pausada gracia aristocrática al escuchar tus sutiles pasos. Sus ojos rojos, brillantes y profundos como diamantes de sangre bajo la luz espectral de la luna, te miran fijamente. Una ligera y cautivadora sonrisa curva sus labios pálidos. "Princesa Aranxita... Al fin nos encontramos frente a frente. Llevaba siglos imaginando el carmesí indomable de tu mirada. Soy Franxito". Su tono de voz es un barítono melodioso, rico en matices sutiles.',
    background: 'vestibulo',
    portraitActive: 'both',
    emotion: 'mysterious',
    sceneName: 'Gran Escalera del Castillo',
    choices: [
      {
        text: 'Inclinar un poco la barbilla. "Hola, Franxito. ¿Es costumbre en tu linaje invitar a princesas con acertijos?"',
        nextNodeId: 'meeting_1',
        personalityTag: 'Sarcástica',
        statsMod: { honestidad: 1, valentia: 1, complicidad: 1 }
      },
      {
        text: 'Ofrecerle tu mano pálida con majestuosidad. "Un gusto conocerte, caballero. Tu nombre e intrigas han despertado mi interés."',
        nextNodeId: 'meeting_1',
        personalityTag: 'Coqueta',
        statsMod: { romance: 1, atraccion: 1, confianza: 1 }
      },
      {
        text: 'Mirarlo desconfiada con los brazos cruzados. "¿Cómo has burlado la guardia ancestral del dragón del castillo?"',
        nextNodeId: 'meeting_1',
        personalityTag: 'Desconfiada',
        statsMod: { curiosidad: 1, misterio: 2 }
      }
    ]
  },

  meeting_1: {
    id: 'meeting_1',
    character: 'Franxito',
    text: 'Se inclina con una reverencia perfecta y toma delicadamente el dorso de tu mano pálida, imprimiendo un beso casi imperceptible, pero cargado de atracción eléctrica. Al incorporarse, mantiene fijos sus ojos rubí en los tuyos. "Noctis es un refugio sumiso para quienes dominamos el arte del viento y las sombras, hermosa princesa. He venido aquí no a profanar, sino a ofrecerte el elixir más escaso del mundo vampírico: una noche de auténtico asombro y confesiones. ¿Qué te parece si caminamos?"',
    background: 'vestibulo',
    portraitActive: 'both',
    emotion: 'normal',
    sceneName: 'Gran Escalera del Castillo',
    choices: [
      {
        text: 'Aceptar su propuesta guiñando un ojo. "Solo si prometes no aburrirme con discursos nobiliarios."',
        nextNodeId: 'meeting_2',
        personalityTag: 'Sarcástica',
        statsMod: { complicidad: 2, romance: 1 }
      },
      {
        text: 'Sonreír levemente sintiendo tus mejillas algo tibias. "Me agradaría mucho tu compañía, Franxito."',
        nextNodeId: 'meeting_2',
        personalityTag: 'Dulce',
        statsMod: { confianza: 2, romance: 1 }
      },
      {
        text: 'Mantener un semblante enigmático. "Muy bien. Pero ten en cuenta que soy experta en detectar engaños."',
        nextNodeId: 'meeting_2',
        personalityTag: 'Reservada',
        statsMod: { misterio: 2, valentia: 1 }
      }
    ]
  },

  meeting_2: {
    id: 'meeting_2',
    character: 'Franxito',
    text: '"Tus deseos son mis leyes en esta velada, Aranxita," murmura con deleite. El viento hace oscilar suavemente los candelabros del salón, proyectando sombras danzantes de murciélagos a través del portal de piedra tallada. "El Castillo Noctis posee cuatro grandes rincones mágicos despiertos esta noche. Elige nuestro primer destino e introduce tus pasos en mi destino... ¿Adónde deseas ir?" El muchacho te ofrece el calor de su brazo.',
    background: 'vestibulo',
    portraitActive: 'both',
    emotion: 'happy',
    sceneName: 'Vestíbulo de las Velas',
    choices: [
      {
        text: 'Sujetar su brazo con firmeza. "Vayamos a los enigmáticos Jardines de Rosas Negras bajo la luna."',
        nextNodeId: 'jardines_start',
        personalityTag: 'Coqueta',
        statsMod: { romance: 2, atraccion: 2 }
      },
      {
        text: '"La mística Biblioteca Prohibida. Busquemos antiguas leyendas custodiadas."',
        nextNodeId: 'biblioteca_start',
        personalityTag: 'Curiosa',
        statsMod: { curiosidad: 2, misterio: 1 }
      },
      {
        text: '"A la Torre de la Luna Plateada, donde el viento nocturno desafía el vértigo."',
        nextNodeId: 'torre_start',
        personalityTag: 'Valiente',
        statsMod: { valentia: 2, curiosidad: 1 }
      },
      {
        text: 'Soltar una suave risita. "Prefiero la intimidad y confort del Gran Salón de la Chimenea."',
        nextNodeId: 'chimenea_start',
        personalityTag: 'Dulce',
        statsMod: { confianza: 2, complicidad: 1 }
      }
    ]
  },


  // ==================== RUTA JARDINES (ROSAS NEGRAS / ROMANCE) ====================
  jardines_start: {
    id: 'jardines_start',
    character: 'Narrador',
    text: 'Camináis bajo pórticos de piedra cubiertos de espinas y hiedra. El Jardín de Rosas Negras brilla cubierto por un suave rocío lunar. Pequeñas luciérnagas de fuego azulado flotan entre los setos laberínticos tallados con formas de gárgola. El aroma de las flores es un perfume exótico y seductor. Franxito detiene su paso frente a una flor de pétalos oscuros aterciopelados de un rojo cercano a la sangre coagulada. La arranca con ágiles movimientos de dedos y limpia con cuidado las espinas antes de extendértela.',
    background: 'jardin',
    portraitActive: 'both',
    sceneName: 'Jardín de las Rosas Negras',
    choices: [
      {
        text: 'Aceptar la rosa rozando tus dedos fríos con los suyos y mirarlo intensamente.',
        nextNodeId: 'jardines_love',
        personalityTag: 'Coqueta',
        statsMod: { romance: 3, atraccion: 2 }
      },
      {
        text: 'Recibir la rosa con un toque poético pero desconfiado. "¿Las espinas han sido removidas por piedad o astucia?"',
        nextNodeId: 'jardines_mystery',
        personalityTag: 'Desconfiada',
        statsMod: { misterio: 2, confianza: -1 }
      },
      {
        text: 'Agradecer con una dulce sonrisa inclinando su flor. "Es la rosa más hermosa de mi colección."' ,
        nextNodeId: 'jardines_sweet',
        personalityTag: 'Dulce',
        statsMod: { confianza: 2, complicidad: 1 }
      }
    ]
  },

  jardines_love: {
    id: 'jardines_love',
    character: 'Franxito',
    text: 'Un brillo de intensa fascinación enciende la mirada escarlata de Franxito al sentir el roce de tu piel. Sus dedos permanecen un segundo extra sobre los tuyos antes de retirarse. "La flor palidece ante la majestuosidad de su dueña, Aranxita. Dicen las leyendas góticas que regalar una rosa de sangre a una vampira de alta cuna equivale a entregar el propio latido inerte del corazón. ¿Te asusta la entrega incondicional?" Su mirada rebosa cercanía.',
    background: 'jardin',
    portraitActive: 'both',
    emotion: 'intense',
    sceneName: 'Terraza de los Suspiros',
    choices: [
      {
        text: '"No me asusta nada, Franxito... a menos que los latidos de ese corazón cobijado sean falsos."',
        nextNodeId: 'jardines_dance_intro',
        personalityTag: 'Valiente',
        statsMod: { valentia: 2, romance: 1, atraccion: 1 }
      },
      {
        text: 'Sonreír con coquetería apoyando la rosa en tus labios. "Me fascinan los regalos peligrosos. Sigue mostrándome tu valor."',
        nextNodeId: 'jardines_dance_intro',
        personalityTag: 'Coqueta',
        statsMod: { romance: 2, atraccion: 2 }
      },
      {
        text: 'Murmurar abrumada y dulce. "No es miedo... es que tu intensidad me desarma con asombrosa facilidad."',
        nextNodeId: 'jardines_dance_intro',
        personalityTag: 'Dulce',
        statsMod: { confianza: 2, romance: 2 }
      }
    ]
  },

  jardines_mystery: {
    id: 'jardines_mystery',
    character: 'Franxito',
    text: 'Forma una pequeña mueca graciosa mientras cruza sus brazos elegantemente. "Astucia para preservarte ilesa, Princesa. Quien desea desarmar tu desconfianza sabe muy bien que las heridas sangran diferente en una deidad como tú. El misterio en una mujer es fascinante, pero temo que si no bajas los muros de espinas de tu alma, jamás sabré si bajo la coraza hay fuego o ceniza."',
    background: 'jardin',
    portraitActive: 'both',
    emotion: 'normal',
    sceneName: 'Setos de la Luna Solitaria',
    choices: [
      {
        text: '"Hay un volcán esperando a la persona adecuada, Franxito. Depende de ti descubrirlo."',
        nextNodeId: 'jardines_dance_intro',
        personalityTag: 'Coqueta',
        statsMod: { atraccion: 2, romance: 1 }
      },
      {
        text: '"El misterio es mi mejor consejero, pero tal vez esta noche te regale algún mapa."',
        nextNodeId: 'jardines_dance_intro',
        personalityTag: 'Reservada',
        statsMod: { misterio: 2, confianza: 1 }
      },
      {
        text: '"Solo protejo mi corazón de lo inexplorado... es instinto real."',
        nextNodeId: 'jardines_dance_intro',
        personalityTag: 'Desconfiada',
        statsMod: { curiosidad: 1, confianza: 1 }
      }
    ]
  },

  jardines_sweet: {
    id: 'jardines_sweet',
    character: 'Franxito',
    text: 'Sus hombros se relajan y sus ojos destellan con una ternura genuina y protectora. "Me conmueve tu dulzura, Aranxita. En un mundo donde la nobleza vampírica solo habla de alianzas frías y traición, tu calidez es un bálsamo de plata pura. Quiero asegurarte que no hay dobleces en mí. Esta noche soy tuyo por completo". Te guía con paso firme hacia un gran porche acristalado.',
    background: 'jardin',
    portraitActive: 'both',
    emotion: 'happy',
    sceneName: 'La Glorieta de Vidrio',
    choices: [
      {
        text: '"Confío en tus palabras, Franxito. Bailemos juntos en esta noche eterna."',
        nextNodeId: 'jardines_dance_intro',
        personalityTag: 'Dulce',
        statsMod: { confianza: 2, romance: 2, complicidad: 1 }
      },
      {
        text: '"Tantas bellas promesas en un noble suspicaz... ¿Me invitarás a bailar para demostrarlo?"',
        nextNodeId: 'jardines_dance_intro',
        personalityTag: 'Coqueta',
        statsMod: { romance: 1, atraccion: 2 }
      },
      {
        text: '"Muy bien... veamos si tu lealtad supera mi desconfianza de siglos."',
        nextNodeId: 'jardines_dance_intro',
        personalityTag: 'Desconfiada',
        statsMod: { misterio: 1, confianza: 1 }
      }
    ]
  },

  jardines_dance_intro: {
    id: 'jardines_dance_intro',
    character: 'Narrador',
    text: 'Entráis al majestuoso Salón de Baile Abandonado del Castillo Noctis. El suelo de mármol pulido refleja la luna llena que se filtra desde las amplias cúpulas de cristal del techo. Cortinas descoloridas de brocado carmesí ondean como alas fantasmales. El piar lejano de unos murciélagos ambienta el lugar. Franxito avanza hacia el centro, te mira con profunda devoción caballeresca y te extiende formalmente la palma de su mano enguantada. "Acompáñame... bailemos un vals inmortal, mi princesa."',
    background: 'salon_baile',
    portraitActive: 'both',
    sceneName: 'El Gran Salón de los Espejos',
    choices: [
      {
        text: 'Acercarte a su pecho, colocar tu mano pálida en su hombro elegante y dejarte llevar.',
        nextNodeId: 'jardines_dance_eval',
        personalityTag: 'Coqueta',
        statsMod: { romance: 3, atraccion: 2, complicidad: 2 }
      },
      {
        text: 'Aceptar sonriendo. "Veremos si el gran tejedor de sombras tiene buen ritmo de vals."',
        nextNodeId: 'jardines_dance_eval',
        personalityTag: 'Sarcástica',
        statsMod: { complicidad: 2, confianza: 1, valentia: 1 }
      },
      {
        text: 'Dar la mano con timidez y mantener una prudente pero romántica distancia en los pasos.',
        nextNodeId: 'jardines_dance_eval',
        personalityTag: 'Dulce',
        statsMod: { confianza: 2, romance: 1, misterio: 1 }
      }
    ]
  },

  jardines_dance_eval: {
    id: 'jardines_dance_eval',
    character: 'Narrador',
    text: 'Franxito coloca su mano sutil pero firmemente sobre tu cintura de seda negra. El vals fluye de forma hipnótica y melodiosa. Vuestros cuerpos giran en perfecta sincronía. Sientes su aliento tibio y su aroma varonil a pino y madera antigua. El magnetismo entre vosotros asciende sin cesar. El baile sella una comunión irrepetible. Conforme el vals concluye, Franxito te mira fijamente, respirando suavemente cerca de tu mejilla húmeda por el aire gótico...',
    background: 'salon_baile',
    portraitActive: 'both',
    sceneName: 'El Vals Inmortal',
    choices: [
      {
        text: '[Requisito de Romance Alto] Dar un paso al frente y acortar la distancia con un abrazo apasionado de amor total.',
        nextNodeId: 'jardines_branch_perfect',
        statsMod: { romance: 3, atraccion: 3 }
      },
      {
        text: '[Requisito de Alta Complicidad] Sonreír divertida y susurrarle al oído lo bien que se complementan sus almas.',
        nextNodeId: 'jardines_branch_royal',
        statsMod: { complicidad: 3, confianza: 2 }
      },
      {
        text: 'Retirarte un poco con elegancia y proponer asomarse al balcón real para admirar la cordillera.',
        nextNodeId: 'jardines_branch_moonlight',
        statsMod: { romance: 1, misterio: 2 }
      }
    ]
  },

  jardines_branch_perfect: {
    id: 'jardines_branch_perfect',
    character: 'Franxito',
    text: 'Sientes cómo te oprime contra su pecho con una ternura arrolladora. "Se acabó el misterio ficticio, Aranxita," susurra con los ojos brillando de una pasión colosal. "Siento que he esperado mil vidas para sostenerte así. Eres la única soberana capaz de dar luz a mi calabozo eterno. Mi amor por ti es absoluto y quiero demostrártelo coronándote conmigo". El aire se llena de un aura purpúrea plateada magnífica.',
    background: 'salon_baile',
    portraitActive: 'both',
    emotion: 'intense',
    sceneName: 'El Elíxir del Destino',
    choices: [
      {
        text: 'Unir tus labios escarlata con los del apuesto Franxito bajo el hechizo nocturno.',
        nextNodeId: 'ending_1_perfect',
        personalityTag: 'Coqueta',
        statsMod: { romance: 5, atraccion: 5 }
      },
      {
        text: 'Aceptar su propuesta solemne de reinar juntos como compañeros de dinastía eterna.',
        nextNodeId: 'ending_3_companion',
        personalityTag: 'Dulce',
        statsMod: { confianza: 4, complicidad: 3 }
      },
      {
        text: 'Suscitar que antes de gobernar, debéis realizar un baile final e hipnótico que no termine jamás.',
        nextNodeId: 'ending_4_dance',
        personalityTag: 'Coqueta',
        statsMod: { romance: 3, misterio: 2 }
      }
    ]
  },

  jardines_branch_royal: {
    id: 'jardines_branch_royal',
    character: 'Franxito',
    text: '"Tu complicidad y valentía me asombran, Aranxita," exclama alegre. "No eres una princesa sumisa en su torre de marfil. Eres una protectora curtida en la noche oscura. Al lado de una mujer tan magnánima, siento que este reino de sombras por fin encontrará la paz contra los embates de los cazadores y el sol. ¿Estás lista para sellar nuestra gran alianza dinástica?" Te ofrece una medalla heráldica de oro y rubí.',
    background: 'salon_baile',
    portraitActive: 'both',
    emotion: 'happy',
    sceneName: 'Soberanía del Reino',
    choices: [
      {
        text: 'Aceptar la heráldica jurando proteger el reino de la bruma como excelsos soberanos.',
        nextNodeId: 'ending_5_guardians',
        personalityTag: 'Valiente',
        statsMod: { valentia: 4, confianza: 3 }
      },
      {
        text: 'Sonreír y declarar que su lazo será de amistad fiel y libre, sin coronas de por medio.',
        nextNodeId: 'ending_12_friends',
        personalityTag: 'Dulce',
        statsMod: { confianza: 4, complicidad: 2 }
      },
      {
        text: 'Declinar misteriosamente. "El peso del trono requiere meditar bajo la luna plateada en solitario aún..."',
        nextNodeId: 'ending_13_separated',
        personalityTag: 'Reservada',
        statsMod: { misterio: 3, confianza: -2 }
      }
    ]
  },

  jardines_branch_moonlight: {
    id: 'jardines_branch_moonlight',
    character: 'Franxito',
    text: 'Él asiente respetuosamente, aunque sus ojos denotan melancolía y una fuerte atracción reprimida. Te guía hacia las balaustradas del majestuoso balcón real esculpido en mármol blanco, donde la luna de plata reposa redonda y descomunal en el cenit. "La inmensidad del cielo oscuro nos recuerda lo solos que estamos en esta eternidad desolada... a no ser que compartamos el vuelo".',
    background: 'balcon',
    portraitActive: 'both',
    emotion: 'normal',
    sceneName: 'El Balcón Real Supremo',
    choices: [
      {
        text: 'Mirarle fijamente a los ojos, tomar su rostro entre tus suaves manos y confesar tu tierno romance gótico.',
        nextNodeId: 'ending_2_moon',
        personalityTag: 'Coqueta',
        statsMod: { romance: 4, atraccion: 4 }
      },
      {
        text: 'Declarar con timidez y fe que te encantaría intentar amarlo con sinceridad total.',
        nextNodeId: 'ending_6_confession',
        personalityTag: 'Dulce',
        statsMod: { confianza: 4, romance: 2 }
      },
      {
        text: 'Admitir que tus dudas aún te consumen y prefieres que los secretos queden a merced del viento plateado.',
        nextNodeId: 'ending_11_unresolved',
        personalityTag: 'Reservada',
        statsMod: { misterio: 4, confianza: -2 }
      }
    ]
  },


  // ==================== RUTA BIBLIOTECA (INVESTIGACIÓN / SECRETOS) ====================
  biblioteca_start: {
    id: 'biblioteca_start',
    character: 'Narrador',
    text: 'Os adentráis en la colosal Biblioteca Prohibida del Castillo Noctis. Estanterías de caoba oscura ascienden decenas de metros, repletas de volúmenes antiquísimos encuadernados en cuero gastado y letras de pan de oro. Las arañas de cristal sostienen cirios flotantes que proyectan luces titilantes de tono violeta. Un olor a papel ancestral, polvo cósmico y secretos de magia gótica inunda tus sentidos. Franxito señala una vitrina custodiada por runas escarlatas de apariencia maldita.',
    background: 'biblioteca',
    portraitActive: 'both',
    sceneName: 'Biblioteca Prohibida de las Runas',
    choices: [
      {
        text: 'Utilizar tu magia real de sangre para disolver la maldición rúnica de un suspiro aventurero.',
        nextNodeId: 'biblioteca_magic',
        personalityTag: 'Valiente',
        statsMod: { valentia: 3, curiosidad: 2 }
      },
      {
        text: 'Preguntar con enorme avidez. "Franxito... ¿qué misterios yacen ahí? Cuéntame cada detalle, por favor."',
        nextNodeId: 'biblioteca_explore',
        personalityTag: 'Curiosa',
        statsMod: { curiosidad: 3, confianza: 2 }
      },
      {
        text: 'Mirarlo de soslayo con suspicacia. "¿Acaso intentas guiarme a una trampa de conocimiento mágico?"',
        nextNodeId: 'biblioteca_wary',
        personalityTag: 'Desconfiada',
        statsMod: { confianza: -3, misterio: 2 }
      }
    ]
  },

  biblioteca_magic: {
    id: 'biblioteca_magic',
    character: 'Franxito',
    text: 'Tus dedos se iluminan con un haz de luz carmesí destellante que neutraliza los arcanos de la vitrina con un sonoro crujido seco. Franxito suelta una exclamación de absoluta fascinación, asombrado por el enorme torrente de tu poder real. "Eres formidable, Aranxita. La dinastía de tu estirpe corre ardiente en tus venas. Lo que hay aquí dentro es el Códice Escarlata, un volumen que profetiza un pacto eterno entre una princesa del norte y un tejedor de las sombras".',
    background: 'biblioteca',
    portraitActive: 'both',
    emotion: 'intense',
    sceneName: 'Cripta de los Grimorios',
    choices: [
      {
        text: 'Estudiar juntos el grimorio ancestral, sintiendo la cercanía cálida de sus hombros mientras traduces.',
        nextNodeId: 'biblioteca_branch_eval',
        personalityTag: 'Curiosa',
        statsMod: { curiosidad: 3, romance: 2, complicidad: 2 }
      },
      {
        text: 'Sonreír engreída. "¿Profecías? Qué poético... Pero el destino lo escribo yo con mi propia tinta."',
        nextNodeId: 'biblioteca_branch_eval',
        personalityTag: 'Sarcástica',
        statsMod: { valentia: 3, confianza: 1 }
      },
      {
        text: 'Acariciar el lomo del libro sagrado con recelo sintiendo que esconde advertencias siniestras.',
        nextNodeId: 'biblioteca_branch_eval',
        personalityTag: 'Reservada',
        statsMod: { misterio: 3, confianza: -1 }
      }
    ]
  },

  biblioteca_explore: {
    id: 'biblioteca_explore',
    character: 'Franxito',
    text: 'Acaricia suavemente el cristal de la vitrina. "Aquí confluimos los rebeldes de nuestra raza, Aranxita," explica con nostalgia suave. "El Códice relata la maldición de Castillo Noctis. Las paredes guardan memorias de los amores inconclusos de nuestros ancestros. Siento que tú y yo estamos repitiendo un patrón que data del primer eclipse solar. Si nos fundimos en la búsqueda, hallaremos la senda definitiva". Sus ojos delatan una súplica muda de confianza.',
    background: 'biblioteca',
    portraitActive: 'both',
    emotion: 'happy',
    sceneName: 'Cúpula del Conocimiento',
    choices: [
      {
        text: '"Busquemos juntos, entonces. No temo a la revelación si estás aferrándote a mi mano."',
        nextNodeId: 'biblioteca_branch_eval',
        personalityTag: 'Dulce',
        statsMod: { confianza: 3, romance: 2, complicidad: 2 }
      },
      {
        text: 'Guiñarle un ojo de forma jovial. "Menos misterios familiares y más acción de leyenda. ¿Hablamos del Códice?"',
        nextNodeId: 'biblioteca_branch_eval',
        personalityTag: 'Sarcástica',
        statsMod: { complicidad: 3, curiosidad: 2 }
      },
      {
        text: '"El conocimiento suele costar caro... mantengamos los ojos abiertos, querido caballero."',
        nextNodeId: 'biblioteca_branch_eval',
        personalityTag: 'Desconfiada',
        statsMod: { confianza: -2, misterio: 2 }
      }
    ]
  },

  biblioteca_wary: {
    id: 'biblioteca_wary',
    character: 'Franxito',
    text: 'Da un paso atrás alzando sus manos pálidas con docilidad. "Tu suspicacia te mantiene a salvo, Princesa, pero ahoga mi corazón. No planeo atraparte. Al contrario, este tomo encierra la profecía para fracturar mi vieja condena personal. Quería pedir tu auxilio místico porque solo una vampira de corazón noble y sangre real pura puede descifrar el Códice Escarlata. Por favor, confía en mí por esta noche".',
    background: 'biblioteca',
    portraitActive: 'both',
    emotion: 'shy',
    sceneName: 'El Ala Oriente del Polvo',
    choices: [
      {
        text: 'Guardar tus armas de desconfianza y tomar el grimorio con un tierno suspiro.',
        nextNodeId: 'biblioteca_branch_eval',
        personalityTag: 'Dulce',
        statsMod: { confianza: 3, honestidad: 3 }
      },
      {
        text: 'Decir coqueta: "Está bien, te ayudaré. Pero ten por seguro que demandaré un pago delicioso a cambio."',
        nextNodeId: 'biblioteca_branch_eval',
        personalityTag: 'Coqueta',
        statsMod: { romance: 2, atraccion: 3, complicidad: 2 }
      },
      {
        text: '"Una alianza temporal. Solo revelaré lo que considere seguro tanto para ti como para mí."',
        nextNodeId: 'biblioteca_branch_eval',
        personalityTag: 'Reservada',
        statsMod: { misterio: 3, curiosidad: 1 }
      }
    ]
  },

  biblioteca_branch_eval: {
    id: 'biblioteca_branch_eval',
    character: 'Narrador',
    text: 'Abrís el monumental Códice Escarlata sobre una pesada mesa de piedra circular esculpida con lobos góticos. Al pasar las hojas de pergamino milenario, las runas mágicas comienzan a titilar reflejándose con fuerza sobre vuestros pálidos rostros. Franxito lee con sigilo un párrafo susurrado, y un calor extraño penetra la atmósfera fría del lugar. Las palabras de la profecía se revelan ante vuestros ojos de sangre...',
    background: 'biblioteca',
    portraitActive: 'both',
    sceneName: 'El Misterio Escarlata Despierta',
    choices: [
      {
        text: '[Requisito de Alta Curiosidad] Intentar descifrar la profecía del amor secreto conectando sus mundos primordiales.',
        nextNodeId: 'biblioteca_branch_profecy',
        statsMod: { curiosidad: 3, romance: 2 }
      },
      {
        text: '[Requisito de Alto Romance] Dejar el grimorio a un lado y aprovechar la soledad de la biblioteca para preguntarle sobre sus miedos íntimos.',
        nextNodeId: 'biblioteca_branch_franxitosecret',
        statsMod: { romance: 3, confianza: 2 }
      },
      {
        text: '[Requisito de Alta Valentía] Invocar las runas de sangre real para romper la maldición de Noctis con bravura indomable.',
        nextNodeId: 'biblioteca_branch_cursecrimson',
        statsMod: { valentia: 4, misterio: 2 }
      }
    ]
  },

  biblioteca_branch_profecy: {
    id: 'biblioteca_branch_profecy',
    character: 'Franxito',
    text: 'Tus dedos traducen la escritura celestial. Un destello de runas flotantes se materializa dibujando las siluetas de Aranxita y Franxito entrelazadas bajo una corona de espinas de cristal. "Es real, Aranxita," gime sobrecogido por la emoción sublime. "Nuestros destinos no coinciden por capricho. Estábamos predeterminados antes del alba del primer milenio. ¿Estás lista para fundir tu alma con la mía bajo las leyes prohibidas de la Biblioteca Nocturna?" El aire vibra con magia antigua.',
    background: 'biblioteca',
    portraitActive: 'both',
    emotion: 'intense',
    sceneName: 'Santuario de los Secretos',
    choices: [
      {
        text: 'Aceptar la profecía, fundiendo vuestra conciencia en un lazo de amor mágico insondable.',
        nextNodeId: 'ending_7_library',
        personalityTag: 'Coqueta',
        statsMod: { romance: 4, curiosidad: 3 }
      },
      {
        text: 'Jurar alianza solemne como compañeros de magia eternos sin reclamaciones del corazón.',
        nextNodeId: 'ending_3_companion',
        personalityTag: 'Dulce',
        statsMod: { confianza: 4, complicidad: 2 }
      },
      {
        text: 'Dudar del libro. "Aprecio las leyendas góticas, pero me asusta quedar atrapada en profecías ajenas."',
        nextNodeId: 'ending_11_unresolved',
        personalityTag: 'Reservada',
        statsMod: { misterio: 3, confianza: -2 }
      }
    ]
  },

  // Final Secreto o Secretos de Franxito
  biblioteca_branch_franxitosecret: {
    id: 'biblioteca_branch_franxitosecret',
    character: 'Franxito',
    text: 'Cierra el grimorio con suavidad y suspira, sentándose a tu lado en el diván de terciopelo. "Es hora de que sepas la verdad, Aranxita," murmura con la mirada ensombrecida de una noble melancolía. "Fui recluido en Noctis porque mi sangre posee una cepa maldita que me condena al exilio eterno celando la herencia oscura de Noctis. Si te asocio a mí, compartirás mi melancolía. Mi alma te la entrego pero temo causarte tormento. ¿Aceptarías a una criatura rota como tu compañero de vida?"',
    background: 'biblioteca',
    portraitActive: 'both',
    emotion: 'shy',
    sceneName: 'Confidencias en las Sombras',
    choices: [
      {
        text: 'Tomar sus manos pálidas dándole cobijo íntimo. "Acepto tus secretos y tu pasado, Franxito. Juntos sanaremos."',
        nextNodeId: 'ending_8_franxitosecret',
        personalityTag: 'Dulce',
        statsMod: { romance: 4, confianza: 5 }
      },
      {
        text: 'Revelar con valentía tu propio secreto oculto: que eres la llave viva de la liberación familiar de Noctis.',
        nextNodeId: 'ending_9_aranxitasecret',
        personalityTag: 'Valiente',
        statsMod: { valentia: 4, honestidad: 4 }
      },
      {
        text: 'Recomendar que vuestra relación sea de amistad incondicional, libres de toda condena trágica amorosa.',
        nextNodeId: 'ending_12_friends',
        personalityTag: 'Dulce',
        statsMod: { confianza: 4, complicidad: 3 }
      }
    ]
  },

  biblioteca_branch_cursecrimson: {
    id: 'biblioteca_branch_cursecrimson',
    character: 'Franxito',
    text: 'Se desata una vorágine de energía roja carmesí que sacude las estanterías de la biblioteca prohibida. Cortinas de terciopelo vuelan y las sombras asedian el lugar rugiendo en lamentos antiguos de espectros nobles. Franxito te mira, con los ojos poseídos por el fuego del gran linaje escarlata primordial. "¡Aranxita! ¡Has despertado la antigua llama de los fundadores sagrados de Noctis! Nuestro destino de sangre arde impávido ante el tiempo. Unamos nuestras venas ahora mismo para ascender al trono real".',
    background: 'biblioteca',
    portraitActive: 'both',
    emotion: 'intense',
    sceneName: 'El Despertar de la Sangre',
    choices: [
      {
        text: '[Final Secreto] Morder tu propia muñeca e invocar el legendario Pacto de Sangre prohibido.',
        nextNodeId: 'ending_15_crimson',
        statsMod: { valentia: 5, romance: 4, atraccion: 5 }
      },
      {
        text: 'Tratar de amansar las sombras purpurinas del templo empleando tu dulce templanza real.',
        nextNodeId: 'ending_14_curse',
        statsMod: { confianza: -3, misterio: 3 }
      },
      {
        text: 'Huir del salón al dudar de esta magia descontrolada que amenaza con destruirte.',
        nextNodeId: 'ending_13_separated',
        statsMod: { confianza: -4, misterio: 2 }
      }
    ]
  },


  // ==================== RUTA TORRE (DESTINO / VALENTÍA) ====================
  torre_start: {
    id: 'torre_start',
    character: 'Narrador',
    text: 'Subís la empinada, estrecha y caracolada Escalera del Viento de Castillo Noctis. Conforme ascendéis por la piedra fría, el silbido huracanado del exterior se torna colosal. Los relámpagos iluminan de color blanco las aspilleras de piedra revelando los acantilados brumosos que rodean Castillo Noctis. Al salir a la cúspide de la Torre de la Luna Plateada, el cabello oscuro de Aranxita ondea salvaje desafiando el abismo bajo vuestros pies inmortales. Franxito se adelanta hacia el suntuoso torreón almenado sin un ápice de temor.',
    background: 'torre',
    portraitActive: 'both',
    sceneName: 'Aguja de la Luna Plateada',
    choices: [
      {
        text: 'Correr hacia el borde de la almena con temerario deleite riendo de orgullo.',
        nextNodeId: 'torre_bold',
        personalityTag: 'Valiente',
        statsMod: { valentia: 3, complicidad: 2 }
      },
      {
        text: 'Detenerte junto a la barandilla con serenidad y contemplar el infinito plateado de las nubes.',
        nextNodeId: 'torre_serene',
        personalityTag: 'Reservada',
        statsMod: { misterio: 3, confianza: 1 }
      },
      {
        text: 'Acercarte a Franxito sintiendo la refrescante e intensa brisa de la tormenta gótica.',
        nextNodeId: 'torre_intimate',
        personalityTag: 'Dulce',
        statsMod: { romance: 2, atraccion: 1, confianza: 2 }
      }
    ]
  },

  torre_bold: {
    id: 'torre_bold',
    character: 'Franxito',
    text: 'Se para a tu lado mirando el inmenso abismo de niebla gótica que yace cientos de metros abajo. Un relámpago ilumina su perfil aristocrático fascinado. "Eres asombrosa, Aranxita," confiesa maravillado por tu soberbia valentía vampírica. "Cualquier otra princesa temblaría ante el rugido del cielo y la caída del destino. Tu bravura complementa a la perfección los tormentos que guardo en mi pecho. Juntos nos alzaríamos ante cualquier castigo".',
    background: 'torre',
    portraitActive: 'both',
    emotion: 'happy',
    sceneName: 'Cenit de la Tempestad',
    choices: [
      {
        text: '"El abismo no intimida a quien nació para domar las sombras. ¿Me ofreces tu mano, Franxito?"',
        nextNodeId: 'torre_branch_eval',
        personalityTag: 'Coqueta',
        statsMod: { romance: 2, atraccion: 3 }
      },
      {
        text: '"Gobernemos Noctis como los temibles monarcas de la bruma gótica!"',
        nextNodeId: 'torre_branch_eval',
        personalityTag: 'Valiente',
        statsMod: { valentia: 3, confianza: 2 }
      },
      {
        text: 'Mantener la sonrisa irónica. "La caída del abismo es tentadora, pero prefiero tener los pies firmes."',
        nextNodeId: 'torre_branch_eval',
        personalityTag: 'Sarcástica',
        statsMod: { complicidad: 2, confianza: -1 }
      }
    ]
  },

  torre_serene: {
    id: 'torre_serene',
    character: 'Franxito',
    text: 'Se apoya a tu lado con la elegancia innata de su estirpe. La silueta plateada de la inmensa luna se refleja con misticismo en el carmesí de sus pupilas. "El castillo se alza solitario vigilando la frontera del olvido gótico. Muchas veces he pensado que la eternidad es solo un telón negro... hasta que te vi recorrer el portal de la noche hoy. Tu misterio gótico tiene un imán sublime que disuelve toda mi apatía milenaria".',
    background: 'torre',
    portraitActive: 'both',
    emotion: 'mysterious',
    sceneName: 'Mirador de Plata Profunda',
    choices: [
      {
        text: '"El misterio de Castillo Noctis se desvanece si entonamos el canto romántico ideal."',
        nextNodeId: 'torre_branch_eval',
        personalityTag: 'Coqueta',
        statsMod: { romance: 3, atraccion: 2 }
      },
      {
        text: '"Me causa sosiego tu hablar refinado. Háblame de los orígenes de tu melancólica dinastía nocturna."',
        nextNodeId: 'torre_branch_eval',
        personalityTag: 'Reservada',
        statsMod: { misterio: 3, curiosidad: 2 }
      },
      {
        text: '"El tiempo vampírico es cruel... tal vez la luna nos regale una respuesta hoy."',
        nextNodeId: 'torre_branch_eval',
        personalityTag: 'Dulce',
        statsMod: { confianza: 3, romance: 1 }
      }
    ]
  },

  torre_intimate: {
    id: 'torre_intimate',
    character: 'Franxito',
    text: 'Avanza hacia ti extendiendo una capa de fina lana victoriana con bordes heráldicos de seda carmesí para resguardar con esmero tus delicados hombros reales del gélido vendaval. Su cercanía física desata una inmensa electricidad magnética entre vosotros. Su voz de barítono murmura cálida sobre tu oreja: "No consentiré jamás que las tormentas de Castillo Noctis causen frío a mi soberana. He venido para acogerte e incrustarme en tu porvenir".',
    background: 'torre',
    portraitActive: 'both',
    emotion: 'intense',
    sceneName: 'El Nido del Viento',
    choices: [
      {
        text: 'Acurrucarte dulcemente sintiendo el dulce calor de su tierno abrazo protector.',
        nextNodeId: 'torre_branch_eval',
        personalityTag: 'Dulce',
        statsMod: { romance: 3, confianza: 3, atraccion: 2 }
      },
      {
        text: 'Burlarle de forma juguetona: "Un noble muy atento... ¿Me abrigas por afecto puro o astucia de conquistador?"',
        nextNodeId: 'torre_branch_eval',
        personalityTag: 'Sarcástica',
        statsMod: { complicidad: 3, atraccion: 2 }
      },
      {
        text: 'Recibir el abrigo admirando las montañas de niebla con un semblante regio, distante pero sumamente agradecida.',
        nextNodeId: 'torre_branch_eval',
        personalityTag: 'Reservada',
        statsMod: { misterio: 2, confianza: 2 }
      }
    ]
  },

  torre_branch_eval: {
    id: 'torre_branch_eval',
    character: 'Narrador',
    text: 'La velada en la cima de Castillo Noctis alcanza su punto culminante de tensión gótica. El azote de los truenos y relámpagos se silencia brevemente dando paso a una extraña y romántica pasividad devota. El muchacho sostiene tu mirada, con los labios sutilmente entreabiertos y vuestros rostros a mínimos centímetros de distancia. El desenlace de la torre de plata aguarda el mandato heráldico de tus elecciones...',
    background: 'torre',
    portraitActive: 'both',
    sceneName: 'El Vértice del Destino Infinito',
    choices: [
      {
        text: '[Requisito de Alto Romance] Ofrecer una ardiente y entregada confesión de romance gótico mutuo en el baluarte supremo.',
        nextNodeId: 'ending_6_confession_node',
        statsMod: { romance: 4, atraccion: 3 }
      },
      {
        text: '[Requisito de Alta Valentía] Consagrarse como reyes y guardianes del Castillo batiendo las alas al unísono.',
        nextNodeId: 'ending_5_guardians_node',
        statsMod: { valentia: 4, confianza: 2 }
      },
      {
        text: '[Requisito de Alto Misterio] Decidir alejarse velozmente con un suspiro de melancólica lejanía al asomar la luz helada del amanecer.',
        nextNodeId: 'ending_13_separated_node',
        statsMod: { misterio: 4, confianza: -3 }
      }
    ]
  },

  ending_6_confession_node: {
    id: 'ending_6_confession_node',
    character: 'Franxito',
    text: '"Tus sinceras palabras disuelven siglos de soledad glacial, Aranxita," solloza con los ojos iluminados de una devota admiración. Sostiene tus pálidas manos de reina con devoción suprema. "Te juro mi lealtad, mi espada gótica y mi amor absoluto. Este castillo será el testigo eterno de nuestra promesa sagrada". Un aura áurea envuelve la torre imperial.',
    background: 'torre',
    portraitActive: 'both',
    emotion: 'happy',
    sceneName: 'Bautismo Estelar',
    choices: [
      { text: '[Finalizar] Consumar vuestra promesa eterna de amor inmortal.', nextNodeId: 'ending_6_tower' }
    ]
  },

  ending_5_guardians_node: {
    id: 'ending_5_guardians_node',
    character: 'Franxito',
    text: '"Tu liderazgo y honor real inflaman mi pálida alma," grita extendiendo su capa al viento como alas de murciélago colosales. "No hay dragón de sombras ni cazador humano capaz de quebrar nuestro escudo real unidos. Asumiremos el reinado eterno y seremos los soberanos de la Bruma Infinita!"',
    background: 'torre',
    portraitActive: 'both',
    emotion: 'intense',
    sceneName: 'Edictos del Reino',
    choices: [
      { text: '[Finalizar] Alzaros orgullosos como los colosales Guardianes del Reino.', nextNodeId: 'ending_5_guardians' }
    ]
  },

  ending_13_separated_node: {
    id: 'ending_13_separated_node',
    character: 'Franxito',
    text: 'Una profunda y dolorosa resignación ensombrece su rostro. El sol despunta muy levemente en la cordillera pintando de oro el cielo oscuro de Castillo Noctis. "Entiendo... los edictos reales y tus deberes como princesa nos imponen senderos separados. Aunque mi alma te pertenecerá por siempre, conservaré el recuerdo de esta mágica noche gótica". Se desvanece de espaldas entre la hiedra brumosa.',
    background: 'torre',
    portraitActive: 'both',
    emotion: 'shy',
    sceneName: 'El Ocaso del Ocaso',
    choices: [
      { text: '[Finalizar] Despedirte con un amargo suspiro real de melancolía.', nextNodeId: 'ending_13_separated' }
    ]
  },


  // ==================== RUTA CHIMENEA (AMISTAD / COMPAÑERISMO / INTIMIDAD) ====================
  chimenea_start: {
    id: 'chimenea_start',
    character: 'Narrador',
    text: 'Os cobijáis en el Gran Salón de Chimeneas ancestrales de Noctis. Enormes troncos mágicos arden despacio despidiendo reconfortantes chispas doradas que contrastan hermosamente con los fríos azulejos góticos de color jade oscuro. La luz cálida acaricia los sillones de terciopelo bordó donde os disponéis a descansar. Franxito prepara dos copas de cristal cortado rellenas de un denso brebaje rojo borgoña destilado de uvas silvestres y néctar inmortal de la noche eterna. Te ofrece una copa de plata tallada.',
    background: 'chimenea',
    portraitActive: 'both',
    sceneName: 'Salón de la Chimenea de Jade',
    choices: [
      {
        text: 'Aceptar la copa y brindar sonriendo de forma cómplice. "Por los tejedores nobles con corazón hospitalario."',
        nextNodeId: 'chimenea_toast',
        personalityTag: 'Dulce',
        statsMod: { confianza: 3, complicidad: 2 }
      },
      {
        text: 'Cruzar las piernas elegantemente en el sillón. "Espero que no pretendas emborrachar a la corona para sonsacar secretos."',
        nextNodeId: 'chimenea_playful',
        personalityTag: 'Sarcástica',
        statsMod: { complicidad: 3, confianza: -1 }
      },
      {
        text: 'Recibir la copa enigmáticamente acariciando el borde de plata tallada antes de beber.',
        nextNodeId: 'chimenea_mystery',
        personalityTag: 'Reservada',
        statsMod: { misterio: 3, romance: 1 }
      }
    ]
  },

  chimenea_toast: {
    id: 'chimenea_toast',
    character: 'Franxito',
    text: 'Choca su copa produciendo un delicado tañido musical cristalino. Toma un sorbo pausado sonriendo con calidez sincera. "Por Aranxita, la princesa que con su sola presencia disuelve los fantasmas helados de este castillo. Me alegra que dejes de lado el protocolo aristocrático imperial para regalarme tu sincera templanza... Me gustaría sincerarme sobre lo que verdaderamente soy".',
    background: 'chimenea',
    portraitActive: 'both',
    emotion: 'happy',
    sceneName: 'Vino de la Eternidad',
    choices: [
      {
        text: '"Por favor, Franxito. Abre tu noble corazón ante mí. Busco sinceridad incondicional esta noche."',
        nextNodeId: 'chimenea_branch_eval',
        personalityTag: 'Dulce',
        statsMod: { confianza: 3, honestidad: 3 }
      },
      {
        text: 'Sonreír coqueta arrimándote un poco: "Me encantan las revelaciones nocturnas al calor del fuego."',
        nextNodeId: 'chimenea_branch_eval',
        personalityTag: 'Coqueta',
        statsMod: { romance: 2, atraccion: 3 }
      },
      {
        text: 'Adoptar un tono de sabia comprensión: "Te escucho. La corte vampírica está llena de mentiras; aquí eres libre de confesarte."',
        nextNodeId: 'chimenea_branch_eval',
        personalityTag: 'Reservada',
        statsMod: { complicidad: 3, misterio: 2 }
      }
    ]
  },

  chimenea_playful: {
    id: 'chimenea_playful',
    character: 'Franxito',
    text: 'Forma una graciosa y elocuente reverencia sentado sobre el sofá de cuero bordó con una sonrisa sumamente guasona y brillante. "¡Jamás osaría cometer semejante traición nobiliaria, su alteza desconfiada! Aunque debo confesar que tus agudos comentarios sarcásticos son el mejor condimento para animar mi milenaria reclusión. Tu fuego de alma me nutre más que cualquier brebaje antiguo celestial".',
    background: 'chimenea',
    portraitActive: 'both',
    emotion: 'happy',
    sceneName: 'Humor de la Corte',
    choices: [
      {
        text: '"Me alegra ser tu entretenimiento real... Aunque ten por seguro que las sorpresas apenas comienzan."',
        nextNodeId: 'chimenea_branch_eval',
        personalityTag: 'Sarcástica',
        statsMod: { complicidad: 3, romance: 1 }
      },
      {
        text: '"Menos burlas caballerescas, Franxito... prefiero que me confieses por qué te alegra tanto verme."',
        nextNodeId: 'chimenea_branch_eval',
        personalityTag: 'Coqueta',
        statsMod: { romance: 2, atraccion: 2 }
      },
      {
        text: 'Ofrecerle una palmada tímida y dulce en el hombro. "Eres un gran bálsamo de alegría, apuesto caballero."',
        nextNodeId: 'chimenea_branch_eval',
        personalityTag: 'Dulce',
        statsMod: { confianza: 3, complicidad: 2 }
      }
    ]
  },

  chimenea_mystery: {
    id: 'chimenea_mystery',
    character: 'Franxito',
    text: 'Sostiene tu mirada admirando el sutil rastro de vino escarlata en la comisura de tus labios con una contenida devoción varonil. "Adoro tu porte enigmático de deidad oscura, Aranxita," susurra en tono de devota admiración real. "Eres como una página de magia prohibida que todos ansían descifrar pero pocos se atreven a comprender de verdad. Yo anhelo conocer cada una de tus dinastías rotas si me das el privilegio".',
    background: 'chimenea',
    portraitActive: 'both',
    emotion: 'mysterious',
    sceneName: 'Silencios de Terciopelo',
    choices: [
      {
        text: '"Tal vez... si tu lealtad gótica me convence antes del amanecer plateado."',
        nextNodeId: 'chimenea_branch_eval',
        personalityTag: 'Reservada',
        statsMod: { misterio: 3, confianza: 1 }
      },
      {
        text: 'Acercar tu mano pálida para acariciar levemente su mejilla templada de vampiro cariñoso.',
        nextNodeId: 'chimenea_branch_eval',
        personalityTag: 'Coqueta',
        statsMod: { romance: 3, atraccion: 3 }
      },
      {
        text: '"El misterio es mi armadura, pero a tu lado se siente sumamente liviana esta noche."',
        nextNodeId: 'chimenea_branch_eval',
        personalityTag: 'Dulce',
        statsMod: { confianza: 3, curiosidad: 2 }
      }
    ]
  },

  chimenea_branch_eval: {
    id: 'chimenea_branch_eval',
    character: 'Narrador',
    text: 'Las llamas góticas azotan el fogón ancestral pintando la estancia de colores ámbar cálido y purpurina plateada. Sientes las brasas mágicas elevarse. Vuestras copas descansan vacías, reflejando el intenso y profundo magnetismo cultivado en estas horas de pláticas sinceras y risas compartidas de complicidad sincera en la medianoche...',
    background: 'chimenea',
    portraitActive: 'both',
    sceneName: 'Brasas de Luna Radiante',
    choices: [
      {
        text: '[Requisito de Alto Romance] Declarar un romance inquebrantable que unirá vuestras almas inmortales de dinastía de reyes.',
        nextNodeId: 'ending_3_companion_node',
        statsMod: { romance: 4, confianza: 3 }
      },
      {
        text: '[Requisito de Alta Complicidad] Consolidar una amistad de hierro y complicidad libre del peso del romance trágico.',
        nextNodeId: 'ending_12_friends_node',
        statsMod: { complicidad: 4, confianza: 2 }
      },
      {
        text: '[Requisito de Alto Misterio] Sugerir que los muros de Noctis se alzan con misterios imposibles de romper por hoy y retirarse solemnes.',
        nextNodeId: 'ending_10_night_node',
        statsMod: { misterio: 4, confianza: -2 }
      }
    ]
  },

  ending_3_companion_node: {
    id: 'ending_3_companion_node',
    character: 'Franxito',
    text: '"Tu asombrosa sinceridad aviva mi ser como ninguna pócima inmortal," confiesa extasiado tomando tu rostro con ternura caballeresca excelsa. "No seremos marionetas del protocolo imperial vampírico. Seremos reyes independientes gobernando las sombras como iguales inseparables por toda la eternidad solar y lunar".',
    background: 'chimenea',
    portraitActive: 'both',
    emotion: 'happy',
    sceneName: 'Alianza de las Brasas',
    choices: [
      { text: '[Finalizar] Consumar vuestro glorioso destino como Compañeros Eternos.', nextNodeId: 'ending_3_companion' }
    ]
  },

  ending_12_friends_node: {
    id: 'ending_12_friends_node',
    character: 'Franxito',
    text: '"Admiro enormemente tu sabiduría real, mi excelsa princesa," exclama estrechando tu mano con un tierno apretón afectuoso de respeto total. "Un romance efímero se marchita como rosa sin riego. Una amistad inmortal e indestructible forjada en el fuego de Noctis es un escudo inviolable ante los milenios. Seré tu leal confidente!"',
    background: 'chimenea',
    portraitActive: 'both',
    emotion: 'happy',
    sceneName: 'El Pacto Sabio de la Plata',
    choices: [
      { text: '[Finalizar] Sellar vuestro lazo eterno como Amigos para Siempre.', nextNodeId: 'ending_12_friends' }
    ]
  },

  ending_10_night_node: {
    id: 'ending_10_night_node',
    character: 'Franxito',
    text: 'Franxito contempla el fuego que se apaga lentamente y sonríe con apacible melancolía gótica nocturna. "Ha sido... una noche inolvidable, encantadora Aranxita. Aunque las sombras del destino reclaman que el misterio prosiga, la calidez de esta chimenea quedará grabada a fuego puro en mi corazón inerte".',
    background: 'chimenea',
    portraitActive: 'both',
    emotion: 'normal',
    sceneName: 'El Último Rescoldo',
    choices: [
      { text: '[Finalizar] Concluir con nostalgia Una Noche Inolvidable frente al fuego.', nextNodeId: 'ending_10_night' }
    ]
  },


  // ==================== END NODES (1 to 15) ====================
  ending_1_perfect: {
    id: 'ending_1_perfect',
    character: 'Narrador',
    text: 'A través del lazo sagrado de su primer beso de amor puro bajando de la luna de sangre, se forja la comunión definitiva. Aranxita y Franxito unen sus almas en la corona imperial escarlata de Noctis. Reinarán como los monarcas góticos soberanos del mundo inmortal en un nexo perfecto y glorioso.',
    background: 'salon_baile',
    portraitActive: 'both',
    endingId: 1
  },
  ending_2_moon: {
    id: 'ending_2_moon',
    character: 'Narrador',
    text: 'En el balcón supremo de plata tallada, te aferras a sus pálidos hombros bajo el infinito sideral gótico. Vuestras confesiones románticas abren las compuertas de vuestro ser, coronando vuestra eterna existencia en un romance romántico bajo la luna eterno.',
    background: 'balcon',
    portraitActive: 'both',
    endingId: 2
  },
  ending_3_companion: {
    id: 'ending_3_companion',
    character: 'Narrador',
    text: 'Con una solemne alianza heráldica y un brindis ardiente de complicidad excelsa, decidís compartir el devenir de vuestros reinados inmortales sin coronas de sumisión. Aranxita y Franxito se proclaman Compañeros Eternos de la bruma.',
    background: 'chimenea',
    portraitActive: 'both',
    endingId: 3
  },
  ending_4_dance: {
    id: 'ending_4_dance',
    character: 'Narrador',
    text: 'Aceptando un vals eterno e hipnótico que desafía las gélidas e implacables leyes ancestrales de los vampiros ancianos, Aranxita y Franxito giran infinitos en el salón marchito. Su amor prohibido perdurará de leyenda en leyenda.',
    background: 'salon_baile',
    portraitActive: 'both',
    endingId: 4
  },
  ending_5_guardians: {
    id: 'ending_5_guardians',
    character: 'Narrador',
    text: 'Con medallas de oro rubí y palabras de soberanía imbatibles de valentía excelsa, Aranxita y Franxito asumen el glorioso deber militar inmortal. Son ahora los imbatibles Guardianes del Reino gótico ante la invasión humana solar.',
    background: 'torre',
    portraitActive: 'both',
    endingId: 5
  },
  ending_6_tower: {
    id: 'ending_6_tower',
    character: 'Narrador',
    text: 'Bajo el manto celeste y el trémulo palpitar de las constelaciones sagradas de la noche gótica, Aranxita y Franxito sellan su confesión de amor eterno en el torreón más alto. Una promesa pura inmune a las tinieblas de la tierra.',
    background: 'torre',
    portraitActive: 'both',
    endingId: 6
  },
  ending_7_library: {
    id: 'ending_7_library',
    character: 'Narrador',
    text: 'Las hojas de magia prohibida del Códice Escarlata brillan fundiendo vuestra conciencia de dinastía con runas celestiales sagradas de predeterminación sagrada. Aranxita y Franxito descubren que estaban unidos antes de nacer.',
    background: 'biblioteca',
    portraitActive: 'both',
    endingId: 7
  },
  ending_8_franxitosecret: {
    id: 'ending_8_franxitosecret',
    character: 'Narrador',
    text: 'Franxito llora sobre tus pálidos hombros de reina sanando su condena y maldición de exilio ancestral gótico. Tu inmensa piedad sincera de amor cobija sus dolores por siempre. Desbloqueas los secretos familiares profundos de Franxito.',
    background: 'biblioteca',
    portraitActive: 'both',
    endingId: 8
  },
  ending_9_aranxitasecret: {
    id: 'ending_9_aranxitasecret',
    character: 'Narrador',
    text: 'Revelas con audacia y bravura la verdad sagrada de tu linaje fundador de Castillo Noctis, encontrando en el tierno e incondicional abrazo protector de Franxito el santuario de paz y asombro que aguardabas por siglos.',
    background: 'biblioteca',
    portraitActive: 'both',
    endingId: 9
  },
  ending_10_night: {
    id: 'ending_10_night',
    character: 'Narrador',
    text: 'La mágica noche de risas góticas, copas de vino inmortal y brasas de ceniza mágica de chimenea llega a su fin. Aunque vuestros caminos sigan en asombro, la velada quedará impregnada de calor eterno en vuestras frías existencias.',
    background: 'chimenea',
    portraitActive: 'both',
    endingId: 10
  },
  ending_11_unresolved: {
    id: 'ending_11_unresolved',
    character: 'Narrador',
    text: 'Surgiendo la desconfianza gótica y la cautela de dinastías milenarias, la noche expira sin confesiones finales. Franxito se disuelve entre la bruma plateada con una rosa ensangrentada y el solemne enigma de un retorno lejano.',
    background: 'balcon',
    portraitActive: 'both',
    endingId: 11
  },
  ending_12_friends: {
    id: 'ending_12_friends',
    character: 'Narrador',
    text: 'Evitando los tormentos de un romance trágico y traicionero, Aranxita y Franxito deciden estrecharse en un lazo de excelsa amistad indestructible de hierro eterna, forjando el entendimiento devoto definitivo.',
    background: 'chimenea',
    portraitActive: 'both',
    endingId: 12
  },
  ending_13_separated: {
    id: 'ending_13_separated',
    character: 'Narrador',
    text: 'El amanecer dorado asoma en la cordillera gótica de niebla sagrada. La corona heráldica y tus estrictos deberes como princesa imponen la dolorosa separación física de vuestras almas inmortales. Un suspiro del olvido.',
    background: 'torre',
    portraitActive: 'both',
    endingId: 13
  },
  ending_14_curse: {
    id: 'ending_14_curse',
    character: 'Narrador',
    text: 'Las sombras ancestrales asediadoras de la biblioteca castigan vuestras desconfianzas rúnicas y dudas nobiliarias. Castillo Noctis desata su condena consumiendo vuestra historia en niebla perpetua eterna sin salvación.',
    background: 'biblioteca',
    portraitActive: 'both',
    endingId: 14
  },
  ending_15_crimson: {
    id: 'ending_15_crimson',
    character: 'Narrador',
    text: '¡Has forjado el pacto de sangre original y prohibido bajo el Códice primordial! Despiertas el linaje de los Reyes Escarlata y junto a un bendito Franxito poseído por el poder supremo, ascendéis como Soberanos Absolutos de Noctis.',
    background: 'biblioteca',
    portraitActive: 'both',
    endingId: 15
  }
};
