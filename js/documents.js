const CONTACTS = {
  standard: {
    pt: "Se após o exame notar algo de anormal, contacte a Unidade de Exames Especiais através dos números 967 776 921 ou 210 025 255/0, nos dias úteis entre as 08h e as 20h. Contacte também o seu médico assistente ou dirija-se a um serviço de urgência.",
    en: "If you notice anything unusual after the examination, contact the Special Examinations Unit on 967 776 921 or 210 025 255/0 on working days between 08:00 and 20:00. You should also contact your attending doctor or go to an emergency department.",
  },
  singleNumber: {
    pt: "Se necessitar de algum esclarecimento ou informação, contacte telefonicamente o Serviço de Exames Especiais, de segunda-feira a sexta-feira, entre as 08h e as 20h, através do número 967 776 921.",
    en: "If you need clarification or information, call the Special Examinations Service on 967 776 921, Monday to Friday between 08:00 and 20:00.",
  },
};

const SEDATION = {
  pt: {
    title: "Se efetuou o exame sob anestesia",
    items: [
      { text: "Não pode conduzir nem manobrar máquinas nas próximas 24 horas." },
      {
        text: "Terá de sair do hospital acompanhado e permanecer o resto do dia em casa, a repousar.",
      },
      { text: "Não pode trabalhar." },
      { text: "Não deve tomar decisões importantes, como assinar documentos." },
    ],
  },
  en: {
    title: "If the examination was performed under anaesthesia",
    items: [
      { text: "Do not drive or operate machinery for the next 24 hours." },
      {
        text: "You must leave the hospital accompanied and rest at home for the remainder of the day.",
      },
      { text: "Do not work." },
      { text: "Do not make important decisions, such as signing documents." },
    ],
  },
};

const SHARED = {
  pt: {
    service: "Serviço de Enfermagem · Exames Especiais",
    languageLabel: "Português",
    contactTitle: "Contactos",
  },
  en: {
    service: "Nursing Service · Special Procedures",
    languageLabel: "English",
    contactTitle: "Contact details",
  },
};

export const SPECIALTIES = [
  { id: "gastroenterology", names: { pt: "Gastrenterologia", en: "Gastroenterology" } },
  { id: "pulmonology", names: { pt: "Pneumologia", en: "Pulmonology" } },
  { id: "gynecology", names: { pt: "Ginecologia", en: "Gynecology" } },
  { id: "proctology", names: { pt: "Proctologia", en: "Proctology" } },
  { id: "cardiology", names: { pt: "Cardiologia", en: "Cardiology" } },
];

function localized(language, source, content, contact = CONTACTS.standard[language]) {
  return {
    ...SHARED[language],
    ...content,
    contact,
    source,
  };
}

function documents(id) {
  return {
    pt: `./assets/documents/pt/${id}.pdf`,
    en: `./assets/documents/en/${id}.pdf`,
  };
}

export const EXAMS = [
  {
    id: "upper-endoscopy",
    specialty: "gastroenterology",
    names: { pt: "Endoscopia Digestiva Alta", en: "Upper GI Endoscopy" },
    documents: documents("upper-endoscopy"),
    source: { page: 4 },
    content: {
      pt: localized(
        "pt",
        { page: 4 },
        {
          summary: "Informações e cuidados após uma endoscopia digestiva alta.",
          sections: [
            {
              title: "Cuidados após o exame",
              items: [
                {
                  text: "Depois do exame pode retomar a sua alimentação habitual, exceto se lhe for dada indicação contrária.",
                },
                {
                  text: "Poderá sentir algum desconforto abdominal durante 24 a 72 horas, que irá passando progressivamente.",
                },
              ],
            },
            {
              title: "Sinais e sintomas de complicações",
              items: [
                { text: "Dor torácica ou abdominal forte." },
                { text: "Febre." },
                { text: "Vómitos persistentes." },
                { text: "Fezes negras." },
              ],
            },
            SEDATION.pt,
          ],
        },
      ),
      en: localized(
        "en",
        { page: 4 },
        {
          summary: "Information and care after an upper gastrointestinal endoscopy.",
          sections: [
            {
              title: "Care after the examination",
              items: [
                {
                  text: "After the examination, you may resume your usual diet unless you have been instructed otherwise.",
                },
                {
                  text: "You may have some abdominal discomfort for 24 to 72 hours. It should gradually improve.",
                },
              ],
            },
            {
              title: "Signs and symptoms of complications",
              items: [
                { text: "Severe chest or abdominal pain." },
                { text: "Fever." },
                { text: "Persistent vomiting." },
                { text: "Black stools." },
              ],
            },
            SEDATION.en,
          ],
        },
      ),
    },
  },
  {
    id: "lower-endoscopy",
    specialty: "gastroenterology",
    names: { pt: "Colonoscopia Total", en: "Total Colonoscopy" },
    documents: documents("lower-endoscopy"),
    source: { page: 5 },
    content: {
      pt: localized(
        "pt",
        { page: 5 },
        {
          summary: "Informações e cuidados após uma colonoscopia total.",
          sections: [
            {
              title: "Cuidados após o exame",
              items: [
                {
                  text: "Depois do exame pode retomar a sua alimentação habitual, exceto se lhe for dada indicação contrária.",
                },
                {
                  text: "As cólicas e a distensão abdominal são as queixas mais frequentes. Irão passando gradualmente à medida que elimina os gases.",
                },
                {
                  text: "Se efetuou biópsias, pode notar uma pequena perda de sangue na primeira dejeção. Habitualmente não é preocupante, exceto se as perdas se mantiverem nas dejeções seguintes em quantidade abundante.",
                },
              ],
            },
            {
              title: "Sinais e sintomas de complicações",
              items: [
                { text: "Dores abdominais fortes e persistentes." },
                { text: "Febre." },
                { text: "Vómitos de repetição." },
                { text: "Perdas abundantes de sangue pelo ânus." },
              ],
            },
            SEDATION.pt,
          ],
        },
      ),
      en: localized(
        "en",
        { page: 5 },
        {
          summary: "Information and care after a total colonoscopy.",
          sections: [
            {
              title: "Care after the examination",
              items: [
                {
                  text: "After the examination, you may resume your usual diet unless you have been instructed otherwise.",
                },
                {
                  text: "Abdominal cramps and bloating are the most common complaints. They should gradually improve as you pass gas.",
                },
                {
                  text: "If biopsies were taken, you may notice a small amount of blood with the first bowel movement. This is usually not a concern unless heavy bleeding continues with later bowel movements.",
                },
              ],
            },
            {
              title: "Signs and symptoms of complications",
              items: [
                { text: "Severe, persistent abdominal pain." },
                { text: "Fever." },
                { text: "Repeated vomiting." },
                { text: "Heavy bleeding from the anus." },
              ],
            },
            SEDATION.en,
          ],
        },
      ),
    },
  },
  {
    id: "bronchoscopy",
    specialty: "pulmonology",
    names: { pt: "Broncofibroscopia", en: "Fiberoptic Bronchoscopy" },
    documents: documents("bronchoscopy"),
    source: { page: 6, code: "INF.2014.01", revision: "13-08-2024" },
    content: {
      pt: localized(
        "pt",
        { page: 6, code: "INF.2014.01", revision: "13-08-2024" },
        {
          summary: "Informações e cuidados após uma broncoscopia.",
          sections: [
            {
              title: "Cuidados após o exame",
              items: [
                { text: "Faça a primeira ingestão de líquidos e sólidos 2 horas após o exame." },
                {
                  text: "Nas primeiras horas pode sentir desconforto ou dor na garganta, tosse e dificuldade em engolir. Pode ter expetoração raiada de sangue nas primeiras 48 a 72 horas, sobretudo se forem efetuadas biópsias.",
                },
              ],
            },
            {
              title: "Sinais e sintomas de alerta",
              items: [
                { text: "Falta de ar." },
                { text: "Dor no peito." },
                { text: "Perda de sangue por via oral e/ou associada à tosse após 72 horas." },
                {
                  text: "Febre. Se ocorrer nas primeiras 48 horas, fazer paracetamol de 8 em 8 horas.",
                },
                { text: "Reação alérgica a medicamentos." },
                {
                  text: "Se foi anestesiado, inflamação, dor, calor ou inchaço no local da punção venosa.",
                },
              ],
            },
            SEDATION.pt,
          ],
        },
      ),
      en: localized(
        "en",
        { page: 6, code: "INF.2014.01", revision: "13-08-2024" },
        {
          summary: "Information and care after a bronchoscopy.",
          sections: [
            {
              title: "Care after the examination",
              items: [
                { text: "Have your first liquids and solid food 2 hours after the examination." },
                {
                  text: "During the first few hours, you may have throat discomfort or pain, coughing, and difficulty swallowing. Your sputum may be streaked with blood for the first 48 to 72 hours, especially if biopsies were taken.",
                },
              ],
            },
            {
              title: "Warning signs and symptoms",
              items: [
                { text: "Shortness of breath." },
                { text: "Chest pain." },
                {
                  text: "Blood from the mouth and/or blood associated with coughing after 72 hours.",
                },
                {
                  text: "Fever. If it occurs within the first 48 hours, take paracetamol every 8 hours.",
                },
                { text: "Allergic reaction to medication." },
                {
                  text: "If you had anaesthesia, inflammation, pain, warmth, or swelling at the intravenous puncture site.",
                },
              ],
            },
            SEDATION.en,
          ],
        },
      ),
    },
  },
  {
    id: "anoscopy",
    specialty: "proctology",
    names: { pt: "Anuscopia de Alta Resolução", en: "High-resolution Anoscopy" },
    documents: documents("anoscopy"),
    source: { page: 8, code: "INF.2000.00" },
    content: {
      pt: localized(
        "pt",
        { page: 8, code: "INF.2000.00" },
        {
          summary: "Informações e cuidados após uma anuscopia de alta resolução.",
          sections: [
            {
              title: "Cuidados após o exame",
              paragraphs: [
                "Se efetuou biópsias e/ou tratamento, poderá sentir dor ligeira e notar uma pequena perda de sangue na primeira dejeção. Habitualmente não é preocupante, exceto se as perdas se mantiverem nas dejeções seguintes em quantidade abundante.",
              ],
            },
            {
              title: "Sinais e sintomas de complicações",
              items: [
                { text: "Hemorragia abundante." },
                { text: "Dor anal persistente." },
                { text: "Febre." },
                {
                  text: "Infeção local: dor, rubor e/ou exsudado ou corrimento amarelado na zona à volta do ânus.",
                },
              ],
            },
            SEDATION.pt,
            {
              title: "Medicação",
              paragraphs: [
                "Cumpra as indicações médicas relativas à medicação que lhe tenha sido prescrita.",
              ],
            },
          ],
        },
      ),
      en: localized(
        "en",
        { page: 8, code: "INF.2000.00" },
        {
          summary: "Information and care after high-resolution anoscopy.",
          sections: [
            {
              title: "Care after the examination",
              paragraphs: [
                "If biopsies and/or treatment were performed, you may have mild pain and notice a small amount of blood with the first bowel movement. This is usually not a concern unless heavy bleeding continues with later bowel movements.",
              ],
            },
            {
              title: "Signs and symptoms of complications",
              items: [
                { text: "Heavy bleeding." },
                { text: "Persistent anal pain." },
                { text: "Fever." },
                {
                  text: "Local infection: pain, redness, and/or yellow discharge around the anus.",
                },
              ],
            },
            SEDATION.en,
            {
              title: "Medication",
              paragraphs: ["Follow the medical instructions for any medication prescribed to you."],
            },
          ],
        },
      ),
    },
  },
  {
    id: "sigmoidoscopy",
    specialty: "gastroenterology",
    names: { pt: "Fibrosigmoidoscopia", en: "Flexible Sigmoidoscopy" },
    documents: documents("sigmoidoscopy"),
    source: { page: 12, code: "INF.2012.00" },
    content: {
      pt: localized(
        "pt",
        { page: 12, code: "INF.2012.00" },
        {
          summary: "Informações e cuidados após uma fibrosigmoidoscopia.",
          sections: [
            {
              title: "Cuidados após o exame",
              items: [
                {
                  text: "Depois do exame pode retomar a sua alimentação habitual, exceto se lhe for dada indicação contrária.",
                },
                {
                  text: "As cólicas e a distensão abdominal são as queixas mais frequentes. Irão passando gradualmente à medida que elimina os gases.",
                },
                {
                  text: "Se efetuou biópsias, pode notar uma pequena perda de sangue na primeira dejeção. Habitualmente não é preocupante, exceto se as perdas se mantiverem nas dejeções seguintes em quantidade abundante.",
                },
              ],
            },
            {
              title: "Sinais e sintomas de complicações",
              items: [
                { text: "Dores abdominais fortes e persistentes." },
                { text: "Febre." },
                { text: "Vómitos de repetição." },
                { text: "Perdas abundantes de sangue pelo ânus." },
              ],
            },
            SEDATION.pt,
          ],
        },
      ),
      en: localized(
        "en",
        { page: 12, code: "INF.2012.00" },
        {
          summary: "Information and care after a flexible sigmoidoscopy.",
          sections: [
            {
              title: "Care after the examination",
              items: [
                {
                  text: "After the examination, you may resume your usual diet unless you have been instructed otherwise.",
                },
                {
                  text: "Abdominal cramps and bloating are the most common complaints. They should gradually improve as you pass gas.",
                },
                {
                  text: "If biopsies were taken, you may notice a small amount of blood with the first bowel movement. This is usually not a concern unless heavy bleeding continues with later bowel movements.",
                },
              ],
            },
            {
              title: "Signs and symptoms of complications",
              items: [
                { text: "Severe, persistent abdominal pain." },
                { text: "Fever." },
                { text: "Repeated vomiting." },
                { text: "Heavy bleeding from the anus." },
              ],
            },
            SEDATION.en,
          ],
        },
      ),
    },
  },
  {
    id: "hysteroscopy",
    specialty: "gynecology",
    names: { pt: "Histeroscopia", en: "Hysteroscopy" },
    documents: documents("hysteroscopy"),
    source: { page: 1 },
    content: {
      pt: localized(
        "pt",
        { page: 1 },
        {
          summary: "Informação pós-alta após uma histeroscopia.",
          sections: [
            {
              title: "Cuidados gerais",
              items: [
                {
                  text: "Pode ter uma perda ligeira de sangue por via vaginal durante cerca de 2 a 3 dias.",
                },
                {
                  text: "Pode surgir mal-estar ou dor local. Neste caso, é suficiente tomar um analgésico.",
                },
                {
                  text: "Se realizou biópsia, deve abster-se de relações sexuais durante 1 a 2 dias ou enquanto tiver perda de sangue.",
                },
              ],
            },
            {
              title: "Contacte a equipa clínica se surgir",
              items: [
                { text: "Febre." },
                { text: "Dores abdominais intensas." },
                { text: "Hemorragia vaginal intensa." },
              ],
            },
          ],
        },
        CONTACTS.singleNumber.pt,
      ),
      en: localized(
        "en",
        { page: 1 },
        {
          summary: "Discharge information after hysteroscopy.",
          sections: [
            {
              title: "General care",
              items: [
                { text: "You may have light vaginal bleeding for about 2 to 3 days." },
                {
                  text: "You may have some discomfort or local pain. Taking an analgesic should be sufficient.",
                },
                {
                  text: "If a biopsy was performed, avoid sexual intercourse for 1 to 2 days or while bleeding continues.",
                },
              ],
            },
            {
              title: "Contact the clinical team if you develop",
              items: [
                { text: "Fever." },
                { text: "Severe abdominal pain." },
                { text: "Heavy vaginal bleeding." },
              ],
            },
          ],
        },
        CONTACTS.singleNumber.en,
      ),
    },
  },
  {
    id: "monalisa-touch",
    specialty: "gynecology",
    names: { pt: "MonaLisa Touch", en: "MonaLisa Touch" },
    documents: documents("monalisa-touch"),
    source: { page: 2, code: "INF.1738.00" },
    content: {
      pt: localized(
        "pt",
        { page: 2, code: "INF.1738.00" },
        {
          summary: "Informação pós-alta após tratamento MonaLisa Touch.",
          sections: [
            {
              title: "Durante os 5 dias seguintes ao tratamento",
              items: [
                { text: "Não tenha relações sexuais." },
                { text: "Não coloque tampões vaginais." },
                { text: "Não faça irrigações vaginais." },
                { text: "Não tome banho de imersão." },
              ],
            },
            {
              title: "Se foi submetida a tratamento da vulva",
              paragraphs: [
                "Faça as lavagens recomendadas e aplique os cremes indicados pelo médico. Evite calças justas e use roupa interior de algodão.",
              ],
            },
          ],
        },
        CONTACTS.singleNumber.pt,
      ),
      en: localized(
        "en",
        { page: 2, code: "INF.1738.00" },
        {
          summary: "Discharge information after MonaLisa Touch treatment.",
          sections: [
            {
              title: "For the 5 days after treatment",
              items: [
                { text: "Do not have sexual intercourse." },
                { text: "Do not use vaginal tampons." },
                { text: "Do not douche." },
                { text: "Do not take an immersion bath." },
              ],
            },
            {
              title: "If the vulva was treated",
              paragraphs: [
                "Wash as recommended and apply the creams prescribed by your doctor. Avoid tight trousers and wear cotton underwear.",
              ],
            },
          ],
        },
        CONTACTS.singleNumber.en,
      ),
    },
  },
  {
    id: "gynecologic-laser",
    specialty: "gynecology",
    names: {
      pt: "Tratamento Laser do Colo do Útero, Vagina ou Vulva",
      en: "Laser Treatment of the Cervix, Vagina or Vulva",
    },
    documents: documents("gynecologic-laser"),
    source: { page: 3, code: "INF.2027.00" },
    content: {
      pt: localized(
        "pt",
        { page: 3, code: "INF.2027.00" },
        {
          summary: "Informações após tratamento laser do colo do útero, vagina ou vulva.",
          sections: [
            {
              title: "Cuidados gerais",
              items: [
                {
                  text: "Pode perder sangue em pequena quantidade, menos do que na menstruação, durante cerca de 2 semanas.",
                },
                {
                  text: "Se tiver dores, pode tomar um analgésico, por exemplo paracetamol. Evite aspirina ou derivados do ácido acetilsalicílico.",
                },
                {
                  text: "Se foi submetida a tratamento da vulva, faça as lavagens recomendadas e aplique os cremes indicados pelo médico. Evite calças justas e use roupa interior de algodão.",
                },
                { text: "É recomendado repouso ligeiro na primeira semana após o tratamento." },
              ],
            },
            {
              title: "Durante as 3 semanas seguintes ao tratamento",
              items: [
                { text: "Não tenha relações sexuais." },
                { text: "Não coloque tampões vaginais." },
                { text: "Não faça irrigações vaginais." },
                { text: "Não tome banho de imersão. Tome apenas duche." },
              ],
            },
            {
              title: "Contacte a equipa clínica se surgir",
              items: [
                { text: "Febre." },
                { text: "Dores abdominais intensas." },
                { text: "Hemorragia vaginal." },
                { text: "Corrimento com odor intenso e comichão." },
              ],
            },
          ],
        },
        CONTACTS.singleNumber.pt,
      ),
      en: localized(
        "en",
        { page: 3, code: "INF.2027.00" },
        {
          summary: "Information after laser treatment of the cervix, vagina or vulva.",
          sections: [
            {
              title: "General care",
              items: [
                {
                  text: "You may have light bleeding, less than a menstrual period, for about 2 weeks.",
                },
                {
                  text: "If you have pain, you may take an analgesic such as paracetamol. Avoid aspirin and other acetylsalicylic acid products.",
                },
                {
                  text: "If the vulva was treated, wash as recommended and apply the creams prescribed by your doctor. Avoid tight trousers and wear cotton underwear.",
                },
                { text: "Light rest is recommended during the first week after treatment." },
              ],
            },
            {
              title: "For the 3 weeks after treatment",
              items: [
                { text: "Do not have sexual intercourse." },
                { text: "Do not use vaginal tampons." },
                { text: "Do not douche." },
                { text: "Do not take an immersion bath. Shower only." },
              ],
            },
            {
              title: "Contact the clinical team if you develop",
              items: [
                { text: "Fever." },
                { text: "Severe abdominal pain." },
                { text: "Vaginal bleeding." },
                { text: "Discharge with a strong odour and itching." },
              ],
            },
          ],
        },
        CONTACTS.singleNumber.en,
      ),
    },
  },
  {
    id: "standard-anoscopy",
    specialty: "proctology",
    names: { pt: "Anuscopia", en: "Anoscopy" },
    documents: documents("standard-anoscopy"),
    source: { page: 7, alternatePage: 9 },
    content: {
      pt: localized(
        "pt",
        { page: "7 (duplicada na página 9)" },
        {
          summary: "Informações e cuidados após uma anuscopia.",
          sections: [
            {
              title: "Após o exame",
              paragraphs: [
                "A anuscopia é um exame simples do qual habitualmente não resultam complicações. Poderá haver algum desconforto relacionado com a introdução do anuscópio, mas desaparece rapidamente.",
                "Se durante a anuscopia foi submetido a terapêutica instrumental, como tratamento de hemorróidas, drenagem de trombose hemorroidária ou tratamento de fístulas, esteja atento aos sinais abaixo.",
              ],
            },
            {
              title: "Sinais e sintomas de complicações",
              items: [
                { text: "Hemorragia abundante." },
                { text: "Dor anal persistente." },
                { text: "Febre." },
                {
                  text: "Infeção local: dor, rubor e/ou exsudado ou corrimento amarelado na zona à volta do ânus.",
                },
              ],
            },
            {
              title: "Dieta e medicação",
              paragraphs: [
                "Cumpra as indicações médicas relativas à dieta e medicação que lhe tenham sido prescritas.",
              ],
            },
          ],
        },
      ),
      en: localized(
        "en",
        { page: "7 (duplicated on page 9)" },
        {
          summary: "Information and care after an anoscopy.",
          sections: [
            {
              title: "After the examination",
              paragraphs: [
                "Anoscopy is a simple examination that does not usually cause complications. You may have some discomfort from insertion of the anoscope, but it should pass quickly.",
                "If an instrumental treatment was performed during anoscopy, such as haemorrhoid treatment, drainage of a thrombosed haemorrhoid, or fistula treatment, watch for the signs below.",
              ],
            },
            {
              title: "Signs and symptoms of complications",
              items: [
                { text: "Heavy bleeding." },
                { text: "Persistent anal pain." },
                { text: "Fever." },
                {
                  text: "Local infection: pain, redness, and/or yellow discharge around the anus.",
                },
              ],
            },
            {
              title: "Diet and medication",
              paragraphs: [
                "Follow the medical instructions for any diet and medication prescribed to you.",
              ],
            },
          ],
        },
      ),
    },
  },
  {
    id: "electrical-cardioversion",
    specialty: "cardiology",
    names: { pt: "Cardioversão Elétrica Eletiva", en: "Elective Electrical Cardioversion" },
    documents: documents("electrical-cardioversion"),
    source: { page: 10, code: "INF.3049.00", revision: "24-03-2026" },
    content: {
      pt: localized(
        "pt",
        { page: 10, code: "INF.3049.00", revision: "24-03-2026" },
        {
          summary: "Informações e cuidados após uma cardioversão elétrica eletiva.",
          sections: [
            {
              title: "Cuidados após o exame",
              items: [
                {
                  text: "Pode retomar a alimentação habitual, exceto se lhe for dada indicação contrária.",
                },
                { text: "Retome gradualmente as suas atividades de vida diárias." },
                { text: "Mantenha a medicação hipocoagulante e restante até indicação médica." },
                {
                  text: "Nos primeiros dias, tenha uma vida calma, evite exercício físico e reduza o stress psíquico.",
                },
              ],
            },
            SEDATION.pt,
            {
              title: "Sinais e sintomas de complicações",
              items: [
                { text: "Sensação de desmaio ou tonturas." },
                { text: "Palpitações." },
                { text: "Queimaduras na pele ao nível do tórax." },
                { text: "Febre." },
                { text: "Reação alérgica a medicamentos." },
                {
                  text: "Se foi anestesiado, inflamação, dor, calor ou inchaço no local da punção venosa.",
                },
              ],
            },
          ],
        },
      ),
      en: localized(
        "en",
        { page: 10, code: "INF.3049.00", revision: "24-03-2026" },
        {
          summary: "Information and care after elective electrical cardioversion.",
          sections: [
            {
              title: "Care after the examination",
              items: [
                {
                  text: "You may resume your usual diet unless you have been instructed otherwise.",
                },
                { text: "Gradually resume your daily activities." },
                {
                  text: "Continue your anticoagulant and other medication until instructed otherwise by your doctor.",
                },
                {
                  text: "For the first few days, take things slowly, avoid physical exercise, and reduce psychological stress.",
                },
              ],
            },
            SEDATION.en,
            {
              title: "Signs and symptoms of complications",
              items: [
                { text: "Feeling faint or dizzy." },
                { text: "Palpitations." },
                { text: "Skin burns on the chest." },
                { text: "Fever." },
                { text: "Allergic reaction to medication." },
                {
                  text: "If you had anaesthesia, inflammation, pain, warmth, or swelling at the intravenous puncture site.",
                },
              ],
            },
          ],
        },
      ),
    },
  },
  {
    id: "capsule-endoscopy",
    specialty: "gastroenterology",
    names: { pt: "Cápsula Endoscópica", en: "Capsule Endoscopy" },
    documents: documents("capsule-endoscopy"),
    source: { page: 11 },
    content: {
      pt: localized(
        "pt",
        { page: 11 },
        {
          summary: "Informações e cuidados após uma cápsula endoscópica.",
          sections: [
            {
              title: "Cuidados após o exame",
              items: [
                {
                  text: "Pode retomar a alimentação habitual, exceto se lhe for dada indicação contrária.",
                },
                {
                  text: "Vigie as fezes para confirmar a excreção da cápsula. Não precisa de a recuperar.",
                },
                {
                  text: "A cápsula será excretada naturalmente 24 a 72 horas após o exame. Se após uma semana não detetar a sua excreção, contacte a Unidade de Exames Especiais.",
                },
                {
                  text: "Não se exponha a campos eletromagnéticos, como ressonância magnética, até à expulsão da cápsula.",
                },
              ],
            },
            {
              title: "Sinais e sintomas de complicações",
              items: [
                { text: "Dor abdominal forte." },
                { text: "Náuseas ou vómitos persistentes." },
                { text: "Perdas abundantes de sangue pelo ânus." },
                { text: "Febre." },
              ],
            },
          ],
        },
      ),
      en: localized(
        "en",
        { page: 11 },
        {
          summary: "Information and care after capsule endoscopy.",
          sections: [
            {
              title: "Care after the examination",
              items: [
                {
                  text: "You may resume your usual diet unless you have been instructed otherwise.",
                },
                {
                  text: "Check your stools to confirm that the capsule has passed. You do not need to retrieve it.",
                },
                {
                  text: "The capsule should pass naturally 24 to 72 hours after the examination. If you have not seen it pass after one week, contact the Special Examinations Unit.",
                },
                {
                  text: "Do not expose yourself to electromagnetic fields, such as magnetic resonance imaging, until the capsule has passed.",
                },
              ],
            },
            {
              title: "Signs and symptoms of complications",
              items: [
                { text: "Severe abdominal pain." },
                { text: "Persistent nausea or vomiting." },
                { text: "Heavy bleeding from the anus." },
                { text: "Fever." },
              ],
            },
          ],
        },
      ),
    },
  },
  {
    id: "thoracentesis",
    specialty: "pulmonology",
    names: { pt: "Toracocentese", en: "Thoracentesis" },
    documents: documents("thoracentesis"),
    source: { page: 13, code: "INF.2016.01", revision: "30-12-2025" },
    content: {
      pt: localized(
        "pt",
        { page: 13, code: "INF.2016.01", revision: "30-12-2025" },
        {
          summary: "Informações e cuidados após uma toracocentese.",
          sections: [
            {
              title: "Cuidados após o exame",
              items: [
                { text: "Mantenha o penso limpo e seco." },
                { text: "Pode remover o penso após 24 horas." },
              ],
            },
            {
              title: "Sinais e sintomas de alerta",
              items: [
                { text: "Falta de ar." },
                { text: "Dor no peito." },
                { text: "Febre." },
                { text: "Reação alérgica a medicamentos." },
                { text: "Inflamação, dor, calor ou inchaço no local da punção." },
              ],
            },
          ],
        },
      ),
      en: localized(
        "en",
        { page: 13, code: "INF.2016.01", revision: "30-12-2025" },
        {
          summary: "Information and care after thoracentesis.",
          sections: [
            {
              title: "Care after the examination",
              items: [
                { text: "Keep the dressing clean and dry." },
                { text: "You may remove the dressing after 24 hours." },
              ],
            },
            {
              title: "Warning signs and symptoms",
              items: [
                { text: "Shortness of breath." },
                { text: "Chest pain." },
                { text: "Fever." },
                { text: "Allergic reaction to medication." },
                { text: "Inflammation, pain, warmth, or swelling at the puncture site." },
              ],
            },
          ],
        },
      ),
    },
  },
];
