import { TutorialStep } from "@models/tutorial-step/tutorial-step.model";

export const tutorialSteps: TutorialStep[] = [
  {
    id: 'name',
    text: 'Select a name for the scheduled task.',
  },
  {
    id: 'query',
    text: 'This field is where instructions are provided.',
  },
  {
    id: 'suggestions',
    text: 'Some suggestions for the scheduled task.',
  },
  {
    id: 'systemPrompt',
    text: 'It is an instruction that guides how responses are generated in our system and helps give personality to the artificial intelligence system ',
  },
  {
    id: 'dateTime',
    text: 'Select the time for the scheduled task at different intervals.',
  },
  {
    id: 'deepSearch',
    text: 'If you select this option, a deep search will be performed, bringing more data for a URL.',
  },
  {
    id: 'urls',
    text: 'Select the URLs for the scheduled task.',
  },
  {
    id: 'emails',
    text: 'Select the emails for the scheduled task where the results will be delivered at the agreed time.',
  }
];
