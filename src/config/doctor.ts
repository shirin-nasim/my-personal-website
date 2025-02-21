export const doctorInfo = {
  name: "Dr. Shirin nasimudeen",
  title: "Senior Ophthalmologist",
  image: {
    url: new URL(
      "../assets/images/WhatsApp Image 2025-02-20 at 21.41.30.jpeg",
      import.meta.url,
    ).href,
    ratio: "16/12", // Can be "1/1", "16/9", "4/3", etc.
    fit: "cover", // Can be "cover", "contain", "fill"
  },
  contact: {
    email: "shirin.nasim@gmail.com",
    phone: "+91 9606136078",
    location: "Raysal khaima, Dubai",
    website: "www.shirinnasim.com",
  },
  stats: {
    experience: "3+",
    patients: "2k+",
    awards: "5+",
    successRate: "99%",
  },
  experience: [
    {
      title: "Chief of Ophthalmologist",
      company: "New York Eye Center",
      period: "2018 - Present",
      achievements: [
        "Led a team of 15+ eye care professionals",
        "Performed 500+ successful cataract surgeries annually",
        "Implemented new LASIK protocols improving success rates by 15%",
      ],
    },
    {
      title: "Senior Ophthalmologist",
      company: "Boston Vision Institute",
      period: "2012 - 2018",
      achievements: [
        "Specialized in pediatric ophthalmology",
        "Conducted research on innovative eye treatment methods",
        "Mentored 12 ophthalmology residents",
      ],
    },
  ],
  education: [
    {
      degree: "Fellowship in Advanced Ophthalmology",
      school: "Yenepoya University",
      years: "2016-2022",
    },
    {
      degree: "MD in Ophthalmology",
      school: "Harvard Medical School",
      years: "2005-2009",
    },
    {
      degree: "MBBS",
      school: "Stanford University",
      years: "2000-2004",
    },
  ],
  publications: [
    {
      title: "Advanced Techniques in Laser Eye Surgery",
      journal: "Journal of Ophthalmology",
      year: "2021",
    },
    {
      title: "Pediatric Vision Care: A Comprehensive Study",
      journal: "International Eye Research",
      year: "2020",
    },
  ],
  languages: [
    { language: "English", level: "Native" },
    { language: "Malyalam", level: "Professional" },
    { language: "Hindi", level: "Intermediate" },
  ],
  specializations: [
    "Cataract Surgery",
    "LASIK",
    "Glaucoma Treatment",
    "Pediatric Ophthalmology",
    "Retinal Disorders",
    "Corneal Transplantation",
  ],
};
