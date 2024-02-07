import type { TQuestion } from "~/types/question.type";

export const SeedQuestions: TQuestion[] = [
  {
    question: {
      en: 'What is the recommended following distance in ideal driving conditions?',
      ru: 'Каково рекомендуемое расстояние между автомобилями в идеальных условиях движения?'
    },
    options: [
      { en: 'One second', ru: 'Одна секунда' },
      { en: 'Three seconds', ru: 'Три секунды' },
      { en: 'Five seconds', ru: 'Пять секунд' },
      { en: 'Ten seconds', ru: 'Десять секунд' }
    ],
    correctOption: 1,
    description: {
      en: 'Maintaining a safe following distance helps prevent accidents and allows for better reaction time.',
      ru: 'Сохранение безопасного расстояния помогает предотвращать аварии и обеспечивает лучшее время реакции.'
    }
  },
  {
    question: {
      en: 'When should you use your hazard lights?',
      ru: 'Когда следует использовать аварийные мигалки?'
    },
    options: [
      { en: 'In heavy traffic', ru: 'В плотном потоке' },
      { en: 'During heavy rain or snow', ru: 'Во время сильного дождя или снегопада' },
      { en: 'When parked on the side of the road', ru: 'Когда припаркованы у обочины' },
      { en: 'All of the above', ru: 'Все вышеперечисленное' }
    ],
    correctOption: 3,
    description: {
      en: 'Using hazard lights in appropriate situations helps alert other drivers to potential dangers.',
      ru: 'Использование аварийных мигалок в соответствующих ситуациях помогает предупредить других водителей о потенциальных опасностях.'
    }
  },
  {
    question: {
      en: 'What should you do if you experience a tire blowout while driving?',
      ru: 'Что следует делать, если произошел взрыв шины во время движения?'
    },
    options: [
      { en: 'Brake hard immediately', ru: 'Сразу сильно затормозить' },
      { en: 'Grip the steering wheel firmly and keep the vehicle straight', ru: 'Крепко удерживать руль и двигаться прямо' },
      { en: 'Swerve to the side of the road', ru: 'Съехать на обочину' },
      { en: 'Accelerate to maintain control', ru: 'Ускориться для сохранения контроля' }
    ],
    correctOption: 1,
    description: {
      en: 'Maintaining control of the vehicle by gripping the steering wheel is crucial after a tire blowout.',
      ru: 'Сохранение контроля над транспортным средством с помощью крепкого удержания руля является ключевым после взрыва шины.'
    }
  },
  {
    question: {
      en: 'What is the purpose of an exhaust brake?',
      ru: 'Какова цель выхлопного тормоза?'
    },
    options: [
      { en: 'To reduce engine noise', ru: 'Снижение шума двигателя' },
      { en: 'To assist with braking on downhill slopes', ru: 'Помощь при торможении на спусках' },
      { en: 'To increase fuel efficiency', ru: 'Увеличение эффективности топлива' },
      { en: 'To improve acceleration', ru: 'Улучшение ускорения' }
    ],
    correctOption: 1,
    description: {
      en: 'Exhaust brakes are designed to provide additional braking power on downhill slopes, reducing reliance on the vehicle\'s primary braking system.',
      ru: 'Выхлопные тормоза предназначены для предоставления дополнительной тормозной силы на спусках, уменьшая зависимость от основной тормозной системы транспортного средства.'
    }
  },
  {
    question: {
      en: 'When should you check your mirrors while driving?',
      ru: 'Когда следует проверять зеркала во время движения?'
    },
    options: [
      { en: 'Only when changing lanes', ru: 'Только при перестроении' },
      { en: 'Every 5-8 seconds', ru: 'Каждые 5-8 секунд' },
      { en: 'Only at intersections', ru: 'Только на перекрестках' },
      { en: 'Before starting the engine', ru: 'Перед запуском двигателя' }
    ],
    correctOption: 1,
    description: {
      en: 'Regularly checking mirrors helps maintain awareness of surrounding traffic and enhances overall safety while driving.',
      ru: 'Регулярная проверка зеркал помогает поддерживать осведомленность о движущемся транспорте вокруг и повышает общую безопасность во время движения.'
    }
  },
  {
    question: {
      en: 'What does the term "blind spot" refer to in driving?',
      ru: 'Что означает термин "слепое пятно" в вождении?'
    },
    options: [
      { en: 'An area behind the vehicle that cannot be seen in mirrors', ru: 'Область позади транспортного средства, невидимая в зеркалах' },
      { en: 'The front area of the vehicle not covered by headlights', ru: 'Передняя область транспортного средства, не освещенная фарами' },
      { en: 'A section of the road without road signs', ru: 'Участок дороги без дорожных знаков' },
      { en: 'An intersection with limited visibility', ru: 'Перекресток с ограниченной видимостью' }
    ],
    correctOption: 0,
    description: {
      en: 'Understanding and being aware of blind spots is crucial for safe lane changes and overall driving awareness.',
      ru: 'Понимание и осведомленность о слепых зонах критичны для безопасных перестроений и общей осведомленности при вождении.'
    }
  },
  {
    question: {
      en: 'What should you do if your brakes fail while driving downhill?',
      ru: 'Что следует делать, если тормоза отказывают при спуске?'
    },
    options: [
      { en: 'Pump the brake pedal rapidly', ru: 'Быстро нажимать на педаль тормоза' },
      { en: 'Downshift to a lower gear and use engine braking', ru: 'Переключиться на более низкую передачу и использовать двигательное торможение' },
      { en: 'Turn off the engine and coast to a stop', ru: 'Выключить двигатель и подняться на холостом ходу для остановки' },
      { en: 'Increase speed to reach a flat surface', ru: 'Увеличить скорость, чтобы достичь ровной поверхности' }
    ],
    correctOption: 1,
    description: {
      en: 'Downshifting and using engine braking can help slow down the vehicle when traditional brakes fail, especially on downhill slopes.',
      ru: 'Переключение на более низкую передачу и использование двигательного торможения могут помочь замедлить транспортное средство, когда традиционные тормоза отказывают, особенно на спуске.'
    }
  },
  {
    question: {
      en: 'What is the purpose of a weigh station on the highway?',
      ru: 'Какова цель весовой станции на автостраде?'
    },
    options: [
      { en: 'To check the weight of vehicles for compliance with regulations', ru: 'Проверка веса транспортных средств на соответствие законодательству' },
      { en: 'To provide rest areas for drivers', ru: 'Обеспечение зон отдыха для водителей' },
      { en: 'To inspect vehicles for engine performance', ru: 'Проверка транспортных средств на работоспособность двигателя' },
      { en: 'To refill fuel for long-distance drivers', ru: 'Дозаправка топлива для дальнобойщиков' }
    ],
    correctOption: 0,
    description: {
      en: 'Weigh stations are used to ensure that vehicles comply with weight regulations, promoting road safety and preventing excessive wear on roads.',
      ru: 'Весовые станции используются для контроля соответствия веса транспортных средств законодательству, способствуя дорожной безопасности и предотвращению избыточного износа дорог.'
    }
  },
  {
    question: {
      en: 'What should you do when approaching a railroad crossing with flashing lights and gates down?',
      ru: 'Что следует делать при приближении к железнодорожному переезду с мигающими огоньками и опущенными шлагбаумами?'
    },
    options: [
      { en: 'Stop at least 15 feet away from the tracks', ru: 'Остановиться не менее чем на 15 футах от путей' },
      { en: 'Drive around the gates if there is no train in sight', ru: 'Объехать шлагбаумы, если поезда нет в поле зрения' },
      { en: 'Continue across the tracks at a steady speed', ru: 'Продолжить движение через пути со стабильной скоростью' },
      { en: 'Honk the horn and proceed cautiously', ru: 'Гудеть и продолжать движение осторожно' }
    ],
    correctOption: 0,
    description: {
      en: 'Stopping at a safe distance from the railroad crossing is essential to avoid collisions with oncoming trains.',
      ru: 'Остановка на безопасном расстоянии от железнодорожного переезда необходима для избежания столкновений с приближающимися поездами.'
    }
  },
  {
    question: {
      en: 'What is the purpose of a CDL (Commercial Driver\'s License)?',
      ru: 'Какова цель CDL (Коммерческого Водительского Удостоверения)?'
    },
    options: [
      { en: 'To operate personal vehicles', ru: 'Для управления личными транспортными средствами' },
      { en: 'To drive large or specialized commercial vehicles', ru: 'Для управления крупными или специализированными коммерческими транспортными средствами' },
      { en: 'For recreational driving on weekends', ru: 'Для рекреационного вождения на выходных' },
      { en: 'To use high-occupancy vehicle lanes', ru: 'Для использования полос для высокозагруженных транспортных средств' }
    ],
    correctOption: 1,
    description: {
      en: 'A CDL is required for drivers operating large or specialized commercial vehicles, ensuring they meet specific safety and skill requirements.',
      ru: 'CDL требуется водителям, управляющими крупными или специализированными коммерческими транспортными средствами, чтобы обеспечить соответствие определенным требованиям безопасности и навыков.'
    }
  },
  {
    question: {
      en: 'When should you use your high beams while driving at night?',
      ru: 'Когда следует использовать дальний свет фар во время ночного вождения?'
    },
    options: [
      { en: 'In well-lit urban areas', ru: 'В хорошо освещенных городских районах' },
      { en: 'When following another vehicle closely', ru: 'При движении плотно к другому транспортному средству' },
      { en: 'In foggy or poorly lit conditions', ru: 'В тумане или при плохом освещении' },
      { en: 'When passing through a toll booth', ru: 'При проезде через платную кассу' }
    ],
    correctOption: 2,
    description: {
      en: 'Using high beams in foggy or poorly lit conditions helps improve visibility and ensures safer driving at night.',
      ru: 'Использование дальнего света фар в тумане или при плохом освещении помогает улучшить видимость и обеспечивает безопасное вождение ночью.'
    }
  },
  {
    question: {
      en: 'What does the term "downshifting" mean in truck driving?',
      ru: 'Что означает термин "понижение передачи" в вождении грузовика?'
    },
    options: [
      { en: 'Switching to a higher gear', ru: 'Переключение на более высокую передачу' },
      { en: 'Reducing speed by shifting to a lower gear', ru: 'Уменьшение скорости путем переключения на более низкую передачу' },
      { en: 'Turning off the engine temporarily', ru: 'Временное отключение двигателя' },
      { en: 'Using cruise control on a downhill slope', ru: 'Использование круиз-контроля на спуске' }
    ],
    correctOption: 1,
    description: {
      en: 'Downshifting involves shifting to a lower gear to slow down the vehicle, especially when descending hills or approaching a stop.',
      ru: 'Понижение передачи включает в себя переключение на более низкую передачу для замедления транспортного средства, особенно при спуске с холма или при подходе к остановке.'
    }
  },
  {
    question: {
      en: 'What is the purpose of a reflective triangle in a commercial vehicle?',
      ru: 'Какова цель отражающего треугольника в коммерческом транспортном средстве?'
    },
    options: [
      { en: 'To warn other drivers of a slow-moving vehicle', ru: 'Предупреждение других водителей о медленно движущемся транспортном средстве' },
      { en: 'To indicate the vehicle is carrying hazardous materials', ru: 'Указание на то, что транспортное средство перевозит опасные материалы' },
      { en: 'To mark the vehicle in case of a breakdown or emergency stop', ru: 'Маркировка транспортного средства в случае поломки или экстренной остановки' },
      { en: 'To indicate the driver\'s preference for carpooling', ru: 'Указание предпочтения водителя к поездкам в машине нескольких человек' }
    ],
    correctOption: 2,
    description: {
      en: 'Reflective triangles are used to mark a commercial vehicle in case of breakdowns or emergency stops, enhancing visibility for other road users.',
      ru: 'Отражающие треугольники используются для маркировки коммерческого транспортного средства в случае поломок или экстренных остановок, улучшая видимость для других участников дорожного движения.'
    }
  },
  {
    question: {
      en: 'What does the term "jackknife" refer to in truck driving?',
      ru: 'Что означает термин "складной нож" в вождении грузовика?'
    },
    options: [
      { en: 'A type of folding knife commonly used by truck drivers', ru: 'Тип складного ножа, часто используемого водителями грузовиков' },
      { en: 'A dangerous situation where a truck trailer swings around to form a V-shape with the cab', ru: 'Опасная ситуация, когда прицеп грузовика качается, образуя форму буквы V с кабиной' },
      { en: 'A specialized maneuver for parking in tight spaces', ru: 'Специализированный маневр для парковки в тесных местах' },
      { en: 'A type of braking system in commercial vehicles', ru: 'Тип тормозной системы в коммерческих транспортных средствах' }
    ],
    correctOption: 1,
    description: {
      en: 'Jackknifing is a dangerous situation where the trailer of a truck swings around, creating a V-shape with the cab, often resulting in a loss of control.',
      ru: 'Складной нож - это опасная ситуация, при которой прицеп грузовика качается, образуя форму буквы V с кабиной, что часто приводит к потере контроля.'
    }
  },
  {
    question: {
      en: 'What is the purpose of an anti-lock braking system (ABS) in commercial vehicles?',
      ru: 'Какова цель антиблокировочной тормозной системы (ABS) в коммерческих транспортных средствах?'
    },
    options: [
      { en: 'To increase fuel efficiency', ru: 'Увеличение эффективности топлива' },
      { en: 'To prevent wheels from locking up during hard braking', ru: 'Предотвращение блокировки колес во время резкого торможения' },
      { en: 'To enhance engine performance', ru: 'Улучшение производительности двигателя' },
      { en: 'To improve acceleration on uphill slopes', ru: 'Улучшение ускорения на подъемах' }
    ],
    correctOption: 1,
    description: {
      en: 'ABS helps prevent wheel lockup during hard braking, allowing the driver to maintain steering control and reduce the risk of skidding.',
      ru: 'ABS помогает предотвратить блокировку колес во время резкого торможения, позволяя водителю сохранить управление рулевым управлением и снизить риск срыва с пути.'
    }
  },
  {
    question: {
      en: 'What does the term "blindside" refer to in truck driving?',
      ru: 'Что означает термин "слепое место" в вождении грузовика?'
    },
    options: [
      { en: 'An area directly behind the truck not visible in mirrors', ru: 'Область непосредственно за грузовиком, не видимая в зеркалах' },
      { en: 'A type of reverse parking technique', ru: 'Тип техники парковки задним ходом' },
      { en: 'An advanced braking maneuver for emergency stops', ru: 'Сложный маневр торможения для экстренных остановок' },
      { en: 'A special lane for trucks on the highway', ru: 'Специальная полоса для грузовиков на автостраде' }
    ],
    correctOption: 0,
    description: {
      en: 'The blindside refers to the area directly behind the truck that is not visible in the driver\'s mirrors, emphasizing the importance of extra caution during maneuvers.',
      ru: 'Слепое место относится к области непосредственно за грузовиком, которая не видна в зеркалах водителя, подчеркивая важность дополнительной осторожности при маневрах.'
    }
  },
  {
    question: {
      en: 'What is the purpose of a fifth wheel on a commercial truck?',
      ru: 'Какова цель пятого колеса на коммерческом грузовике?'
    },
    options: [
      { en: 'To improve fuel efficiency', ru: 'Увеличение эффективности топлива' },
      { en: 'To provide additional storage space', ru: 'Обеспечение дополнительного места для хранения' },
      { en: 'To connect the tractor unit to the trailer', ru: 'Соединение тягача с полуприцепом' },
      { en: 'To enhance vehicle aerodynamics', ru: 'Улучшение аэродинамики транспортного средства' }
    ],
    correctOption: 2,
    description: {
      en: 'The fifth wheel is a crucial component that allows the tractor unit to connect with and articulate movements with the trailer, facilitating turning and maneuverability.',
      ru: 'Пятое колесо - это важный компонент, который позволяет тягачу соединяться с полуприцепом и сгибаться вместе с ним, облегчая повороты и маневрирование.'
    }
  },
  {
    question: {
      en: 'What is the primary purpose of a sleeper berth in a commercial truck?',
      ru: 'Какова основная цель спального места в коммерческом грузовике?'
    },
    options: [
      { en: 'To transport additional cargo', ru: 'Транспортировка дополнительного груза' },
      { en: 'To provide a resting and sleeping area for the driver', ru: 'Обеспечение зоны отдыха и сна для водителя' },
      { en: 'To store tools and equipment', ru: 'Хранение инструментов и оборудования' },
      { en: 'To accommodate additional passengers', ru: 'Принятие дополнительных пассажиров' }
    ],
    correctOption: 1,
    description: {
      en: 'A sleeper berth is designed to provide a comfortable resting and sleeping area for long-haul truck drivers during extended trips.',
      ru: 'Спальное место предназначено для обеспечения комфортной зоны отдыха и сна водителей грузовиков на дальние расстояния в течение продолжительных поездок.'
    }
  },
  {
    question: {
      en: 'When is it necessary to use tire chains on a commercial vehicle?',
      ru: 'Когда необходимо использовать цепи на колесах на коммерческом транспортном средстве?'
    },
    options: [
      { en: 'During heavy rain', ru: 'Во время сильного дождя' },
      { en: 'On dry and smooth roads', ru: 'На сухих и ровных дорогах' },
      { en: 'In snowy or icy conditions', ru: 'В снежные или обледенелые условия' },
      { en: 'Only on the front wheels', ru: 'Только на передних колесах' }
    ],
    correctOption: 2,
    description: {
      en: 'Tire chains are necessary in snowy or icy conditions to enhance traction and improve vehicle stability on slippery surfaces.',
      ru: 'Использование цепей на колесах необходимо в снежные или обледенелые условия для увеличения сцепления и повышения стабильности транспортного средства на скользких поверхностях.'
    }
  },
];