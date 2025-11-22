export const LEGACY_NEWS = [
  {
    id: 'legacy-protest-electricity-1',
    title: 'Protest against tax bill, electricity bill, loan interest',
    description:
      'Union members voiced their concerns against rising living costs, including electricity bills and loan interest rates.',
    imageUrl: '/assets/images/blog/nblog1.png',
    category: 'Protest against Electricity',
    type: 'news',
    createdAt: '2023-05-25T00:00:00.000Z',
  },
  {
    id: 'legacy-conference-kurunegala-1',
    title: 'How should nursing management work? Conference, Kurunegala General Hospital',
    description:
      'Insights from nursing leaders around the island shared during the Kurunegala General Hospital conference.',
    imageUrl: '/assets/images/blog/nblog2.png',
    category: 'Conference Kurunegala',
    type: 'event',
    createdAt: '2023-05-25T00:00:00.000Z',
  },
  {
    id: 'legacy-protest-electricity-2',
    title: 'Protest against tax bill, electricity bill, loan interest',
    description:
      'Continuing demonstrations calling for relief on essential utility payments and financial burdens.',
    imageUrl: '/assets/images/blog/nblog1.png',
    category: 'Protest against Electricity',
    type: 'news',
    createdAt: '2023-05-24T00:00:00.000Z',
  },
  {
    id: 'legacy-national-nursing-sports-2025',
    title:
      "All Lanka Nursing Union's Second National Nursing Sports Festival",
    description:
      "Held at the Vincent Dias Stadium in Badulla, the festival welcomed nurses and students from across Sri Lanka, featuring cricket, volleyball, netball, and badminton.",
    imageUrl: '/assets/images/blog/nblog3.jpeg',
    category: 'National Nursing Sports Festival',
    type: 'event',
    createdAt: '2025-09-12T00:00:00.000Z',
  },
];

export const findLegacyNewsById = (id) =>
  LEGACY_NEWS.find((item) => item.id === id);
