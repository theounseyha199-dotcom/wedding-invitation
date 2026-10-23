import type { WeddingConfig } from "@/types/wedding";

// The couple names were provided by the user. All other event details remain sample placeholders.
export const weddingConfig: WeddingConfig = {
  sample: true,
  language: "km",
  timezone: "Asia/Phnom_Penh",
  title: "សិរីសួស្តី អាពាហ៍ពិពាហ៍មង្គល",
  dateISO: "2027-01-15T17:00:00+07:00",
  dateLabel: "ថ្ងៃសុក្រ ទី ១៥ ខែមករា ឆ្នាំ ២០២៧",
  couple: {
    groom: {
      nameKh: "អ៊ា ផូរីឡង់ឌី",
      nameEn: "Ea Phorilanddy",
      fullNameKh: "លោក អ៊ា ផូរីឡង់ឌី",
      parents: ["លោក សុខ សុវណ្ណ", "លោកស្រី ចាន់ ដារ៉ា"],
    },
    bride: {
      nameKh: "ដាឡែន",
      nameEn: "Dalen",
      fullNameKh: "កញ្ញា ដាឡែន",
      parents: ["លោក លី វណ្ណៈ", "លោកស្រី ហេង មាលា"],
    },
    initials: "P & D",
  },
  monogram: {
    initials: "P & D",
    style: "royal",
    showOnEnvelope: true,
    showOnHero: true,
    showOnClosing: true,
  },
  wording: {
    salutation: "សូមគោរពអញ្ជើញ",
    invitation:
      "យើងខ្ញុំជាមាតាបិតា មានកិត្តិយសសូមគោរពអញ្ជើញ លោក លោកស្រី អ្នកនាងកញ្ញា និងភ្ញៀវកិត្តិយសជាទីគោរព ចូលរួមជាភ្ញៀវកិត្តិយស និងប្រសិទ្ធពរជ័យសិរីមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍របស់កូនប្រុស និងកូនស្រីយើងខ្ញុំ។",
    blessing: "សេចក្តីស្រឡាញ់ដែលចែករំលែក គឺជាពរជ័យដ៏ស្រស់ស្អាតបំផុត។",
    gratitude:
      "វត្តមានដ៏ឧត្តុង្គឧត្តមរបស់លោកអ្នក គឺជាកិត្តិយសដ៏ខ្ពង់ខ្ពស់សម្រាប់ក្រុមគ្រួសារយើងខ្ញុំ។",
  },
  story: {
    eyebrow: "រឿងរ៉ាវរបស់យើង",
    title: "ពីថ្ងៃដំបូង រហូតដល់ថ្ងៃដ៏ពិសេស",
    intro:
      "មនុស្សពីរនាក់បានជួបគ្នា ហើយដំណើរដ៏សាមញ្ញមួយបានក្លាយជារឿងរ៉ាវដែលចង់ចែករំលែកពេញមួយជីវិត។",
    message:
      "គ្រប់ជំហានដែលយើងដើរជាមួយគ្នា បាននាំយើងមកដល់ថ្ងៃនេះ។ យើងរីករាយណាស់ដែលមានលោកអ្នកជាផ្នែកមួយនៃការចងចាំដ៏មានតម្លៃនេះ។",
    moments: [
      {
        year: "២០២២",
        title: "ថ្ងៃដែលបានជួប",
        description: "ការសន្ទនាដំបូង ដែលបើកទំព័រថ្មីមួយ។",
      },
      {
        year: "២០២៥",
        title: "ពាក្យសន្យា",
        description: "យើងជ្រើសរើសបន្តដំណើរជាមួយគ្នា។",
      },
      {
        year: "២០២៧",
        title: "ថ្ងៃមង្គល",
        description: "ថ្ងៃដែលយើងអញ្ជើញអ្នកជាទីស្រឡាញ់មកអបអរ។",
      },
    ],
  },
  ceremonies: [
    {
      time: "០៨:០០",
      title: "ពិធីហែជំនូន",
      description: "ក្រុមគ្រួសារ និងមិត្តភក្តិជួបជុំគ្នាសម្រាប់ពិធីហែជំនូន។",
      venue: "គេហដ្ឋានគ្រួសារ",
    },
    {
      time: "១០:០០",
      title: "ពិធីកាត់សក់បង្កក់សិរី",
      description: "ពិធីប្រសិទ្ធពរជ័យ និងសេចក្តីសុខដល់គូស្វាមីភរិយា។",
      venue: "គេហដ្ឋានគ្រួសារ",
    },
    {
      time: "១៤:០០",
      title: "ពិធីសំពះផ្ទឹម និងចងដៃ",
      description: "ពិធីគោរពដឹងគុណ និងទទួលពរពីចាស់ទុំ។",
      venue: "គេហដ្ឋានគ្រួសារ",
    },
    {
      time: "១៧:០០",
      title: "ពិធីពិសាភោជនាហារ",
      description: "សូមអញ្ជើញចូលរួមពិសាភោជនាហារ និងអបអរសាទរជាមួយយើង។",
      venue: "សាលមង្គលឧទាហរណ៍",
    },
  ],
  venues: {
    ceremony: {
      name: "គេហដ្ឋានគ្រួសារ (ទីតាំងគំរូ)",
      address: "ភ្នំពេញ ប្រទេសកម្ពុជា",
      time: "០៨:០០ — ១៥:០០",
    },
    reception: {
      name: "សាលមង្គលឧទាហរណ៍",
      address: "មហាវិថីព្រះនរោត្តម ភ្នំពេញ ប្រទេសកម្ពុជា",
      time: "ចាប់ពីម៉ោង ១៧:០០",
      coordinates: { lat: 11.5564, lng: 104.9282 },
    },
  },
  images: {
    hero: {
      src: "/images/gallery/story2.png",
      alt: "រូបថតគូស្នេហ៍គំរូក្នុងសម្លៀកបំពាក់ប្រពៃណីខ្មែរ",
      caption: "រូបថតគំរូ · មិនមែនគូក្នុងធៀប",
      width: 683,
      height: 1024,
    },
    story: {
      src: "/images/couple/couple.png",
      alt: "រូបថតគូស្នេហ៍គំរូក្នុងឈុតប្រពៃណីខ្មែរពណ៌មាស មិនមែនគូក្នុងធៀប",
      caption: "រូបថតគំរូ · មិនមែនគូក្នុងធៀប",
      width: 736,
      height: 1104,
    },
    gallery: [
      {
        src: "/images/gallery/story1.png",
        alt: "គូស្នេហ៍គំរូពាក់ឈុតពណ៌ប្រាក់ និងកម្រងផ្កា — មិនមែនគូក្នុងធៀប",
        caption: "រូបថតគំរូ ០១",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/gallery/story2.png",
        alt: "គូស្នេហ៍គំរូក្នុងឈុតប្រពៃណីខ្មែរនៅសួនច្បារ — មិនមែនគូក្នុងធៀប",
        caption: "រូបថតគំរូ ០២",
        width: 683,
        height: 1024,
      },
      {
        src: "/images/gallery/story3.png",
        alt: "គូស្នេហ៍គំរូពាក់ឈុតពណ៌បៃតងក្នុងពិធីអាពាហ៍ពិពាហ៍ — មិនមែនគូក្នុងធៀប",
        caption: "រូបថតគំរូ ០៣",
        width: 335,
        height: 597,
      },
      {
        src: "/images/gallery/story4.png",
        alt: "គូស្នេហ៍គំរូក្នុងឈុតប្រពៃណីខ្មែរឈរនៅមាត់ទ្វារ — មិនមែនគូក្នុងធៀប",
        caption: "រូបថតគំរូ ០៤",
        width: 735,
        height: 980,
      },
      {
        src: "/images/gallery/story5.png",
        alt: "គូស្នេហ៍គំរូកាន់ឆ័ត្រពណ៌លឿងនៅមុខប្រាសាទ — មិនមែនគូក្នុងធៀប",
        caption: "រូបថតគំរូ ០៥",
        width: 1200,
        height: 1799,
      },
      {
        src: "/images/gallery/story6.png",
        alt: "គូស្នេហ៍គំរូអង្គុយជាមួយគ្នានៅពេលថ្ងៃលិច — មិនមែនគូក្នុងធៀប",
        caption: "រូបថតគំរូ ០៦",
        width: 736,
        height: 1104,
      },
      {
        src: "/images/gallery/story7.png",
        alt: "គូស្នេហ៍គំរូឈរនៅខ្លោងទ្វារប្រាសាទ — មិនមែនគូក្នុងធៀប",
        caption: "រូបថតគំរូ ០៧",
        width: 736,
        height: 1103,
      },
    ],
  },
  audio: {
    src: "/audio/wedding-music.mp3",
    label: "តន្ត្រីមង្គលការ",
    volume: 0.35,
  },
  rsvp: { maxGuests: 10, enabled: true },
  features: {
    story: true,
    schedule: true,
    countdown: true,
    gallery: true,
    location: true,
    rsvp: true,
    music: true,
  },
};

export const weddingShareImage = {
  url: "/images/socail-share.png",
  width: 2048,
  height: 1152,
  alt: `${weddingConfig.couple.groom.nameEn} & ${weddingConfig.couple.bride.nameEn} — Wedding invitation`,
};
