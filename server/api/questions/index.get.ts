import { Question } from "../../models/question";

export default defineEventHandler(async (event) => {
  return Question.find();
  
  const drivingExamQuestionsData = [
    {
      question: 'What does a flashing red traffic signal mean?',
      options: [
        'Stop and proceed when safe',
        'Slow down and proceed with caution',
        'Stop and wait for a green light',
        'Speed up to clear the intersection',
      ],
      correctOption: 1, // Slow down and proceed with caution
    },
    {
      question: 'When should you use your turn signals?',
      options: [
        'Only when making a left turn',
        'Only when making a right turn',
        'Only when changing lanes',
        'When making any turn or changing lanes',
      ],
      correctOption: 3, // When making any turn or changing lanes
    },
    {
      question: 'What does a solid yellow line on the road indicate?',
      options: [
        'No passing allowed',
        'Passing allowed with caution',
        'Passing allowed only on the right',
        'Passing allowed on the left',
      ],
      correctOption: 0, // No passing allowed
    },
    {
      question: 'When can you pass another vehicle on the right?',
      options: [
        'When the vehicle is turning left',
        'When the vehicle is going below the speed limit',
        'When the vehicle is in the left-turn lane',
        'When there is a paved shoulder on the right',
      ],
      correctOption: 0, // When the vehicle is turning left
    },
    {
      question: 'What is the proper way to make a right turn?',
      options: [
        'Turn into the left lane',
        'Turn into the right lane',
        'Stay in the center of the road while turning',
        'Make a U-turn and then turn right',
      ],
      correctOption: 1, // Turn into the right lane
    },
    {
      question: 'What is the speed limit in a residential area?',
      options: [
        '25 mph',
        '30 mph',
        '35 mph',
        '40 mph',
      ],
      correctOption: 0, // 25 mph
    },
    {
      question: 'When is it necessary to use your headlights?',
      options: [
        '30 minutes after sunset until 30 minutes before sunrise',
        'During inclement weather with reduced visibility',
        'When encountering other vehicles at night',
        'All of the above',
      ],
      correctOption: 3, // All of the above
    },
    {
      question: 'What does a diamond-shaped sign with an orange symbol indicate?',
      options: [
        'Construction zone ahead',
        'School zone ahead',
        'Hospital ahead',
        'Railroad crossing ahead',
      ],
      correctOption: 0, // Construction zone ahead
    },
    {
      question: 'When approaching a school bus with flashing red lights, what should you do?',
      options: [
        'Pass the bus carefully',
        'Proceed with caution',
        'Stop until the lights stop flashing and the bus moves',
        'Honk your horn to alert the bus driver',
      ],
      correctOption: 2, // Stop until the lights stop flashing and the bus moves
    },
    {
      question: 'How should you react to a yield sign?',
      options: [
        'Speed up and merge quickly',
        'Stop and wait for other traffic to clear',
        'Slow down and proceed with caution',
        'Ignore the sign and proceed as usual',
      ],
      correctOption: 2, // Slow down and proceed with caution
    },
  ];

  await Question.create(drivingExamQuestionsData);
});