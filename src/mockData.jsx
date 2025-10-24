export const users = [
  // Admin
  {
    id: 1,
    name: "System Administrator",
    email: "admin@edu.vn",
    pass: "123456",
    role: 2,
    avatar: "/avatars/admin.png",
    phone: "0900000001"
  },

  // Instructors
  {
    id: 2,
    name: "Nguyen Thanh Toan",
    email: "instructor1@edu.vn",
    pass: "123456",
    role: 1,
    avatar: "/avatars/teacher1.png",
    phone: "0900000002"
  },
  {
    id: 3,
    name: "Bui Dinh Huy",
    email: "instructor2@edu.vn",
    pass: "123456",
    role: 1,
    avatar: "/avatars/teacher2.png",
    phone: "0900000003"
  },

  // Students
  {
    id: 4,
    name: "Alice Nguyen",
    email: "student01@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s1.png",
    phone: "0900001001"
  },
  {
    id: 5,
    name: "Bob Tran",
    email: "student02@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s2.png",
    phone: "0900001002"
  },
  {
    id: 6,
    name: "Chris Le",
    email: "student03@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s3.png",
    phone: "0900001003"
  },
  {
    id: 7,
    name: "David Vo",
    email: "student04@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s4.png",
    phone: "0900001004"
  },
  {
    id: 8,
    name: "Emma Pham",
    email: "student05@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s5.png",
    phone: "0900001005"
  },
  {
    id: 9,
    name: "Frank Dang",
    email: "student06@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s6.png",
    phone: "0900001006"
  },
  {
    id: 10,
    name: "Grace Ho",
    email: "student07@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s7.png",
    phone: "0900001007"
  },
  {
    id: 11,
    name: "Henry Bui",
    email: "student08@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s8.png",
    phone: "0900001008"
  },
  {
    id: 12,
    name: "Isabella Do",
    email: "student09@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s9.png",
    phone: "0900001009"
  },
  {
    id: 13,
    name: "Jack Phan",
    email: "student10@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s10.png",
    phone: "0900001010"
  },
  {
    id: 14,
    name: "Kelly Dang",
    email: "student11@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s11.png",
    phone: "0900001011"
  },
  {
    id: 15,
    name: "Leo Vo",
    email: "student12@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s12.png",
    phone: "0900001012"
  },
  {
    id: 16,
    name: "Mia Nguyen",
    email: "student13@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s13.png",
    phone: "0900001013"
  },
  {
    id: 17,
    name: "Noah Tran",
    email: "student14@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s14.png",
    phone: "0900001014"
  },
  {
    id: 18,
    name: "Olivia Le",
    email: "student15@edu.vn",
    pass: "123456",
    role: 0,
    avatar: "/avatars/s15.png",
    phone: "0900001015"
  }
];


// ✅ TEAM LIST
export const teams = [
  {
    id: 1,
    teamName: "Smart Home Monitoring System",
    members: [14, 15],
    leader: 14,
    maxMember: 5,
    status: "Open",
    createDate: "2025-01-10"
  },
  {
    id: 2,
    teamName: "IoT-Based Agriculture Assistant",
    members: [13, 5, 6],
    leader: 5,
    maxMember: 5,
    status: "Open",
    createDate: "2025-01-12"
  },
  {
    id: 3,
    teamName: "Smart Energy Management System",
    members: [7, 8, 9, 10],
    leader: 7,
    maxMember: 4,
    status: "Close",
    createDate: "2025-01-15"
  },
  {
    id: 4,
    teamName: "Health Monitoring IoT Platform",
    members: [11, 12],
    leader: 11,
    maxMember: 5,
    status: "Open",
    createDate: "2025-01-20"
  }
];


// ✅ NOTIFICATION
export const notifications = [
  { id: 1, toUser: [1], fromUser: 1, title: "Welcome!", content: "Join team now!", isRead: false, isAccept: null },
  { id: 2, toUser: [1], fromUser: 1, title: "Success", content: "You are now a member!", isRead: true, isAccept: true },
  { id: 3, toUser: [1], fromUser: 1, title: "New Task", content: "Check new project update!", isRead: false, isAccept: null }
];

// ✅ PROJECTS
export const projects = [
  {
    id: 1,
    title: "AI Face Detection",
    description: "Detect face using computer vision",
    teamID: 1,
    dateCreate: "2024-10-01",
    status: "Doing",
    score: 90
  }
];

// ✅ ASSET
export const assets = [
  {
    id: 1,
    title: "Design Pack",
    description: "UI/UX assets",
    asset: "/assets/ui-kit.zip"
  }
];

// ✅ CLASS
export const classes = [
  {
    id: 1,
    name: "CNTT 2024",
    year: 2024,
    semester: 1,
    classType: "Project",
    student: [1, 2],
    project: [1]
  }
];

// ✅ SCORE
export const scores = [
  {
    id: 1,
    userID: 1,
    typeScore: "Final",
    percent: 70,
    des: "Good!"
  }
];
