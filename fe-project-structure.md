src/
├── app/
│   ├── routes/
│   │   ├── index.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── providers/
│   │   ├── AuthProvider.tsx
│   │   ├── QueryProvider.tsx
│   │   └── NotificationProvider.tsx
│   │
│   └── store/
│       ├── index.ts
│       ├── hooks.ts
│       └── rootReducer.ts
│
├── features/
│   ├── auth/
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── ForgotPasswordPage.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   │
│   │   ├── services/
│   │   │   └── authApi.ts
│   │   │
│   │   ├── types/
│   │   │   ├── auth.type.ts
│   │   │   └── auth.dto.ts
│   │   │
│   │   └── store/
│   │       └── authSlice.ts
│   │
│   └── scrum/
│       ├── layout/
│       │   ├── ScrumLayout.tsx
│       │   ├── Sidebar.tsx
│       │   └── Header.tsx
│       │
│       ├── shared/
│       │   ├── components/
│       │   │   ├── TaskCard.tsx
│       │   │   ├── SprintHeader.tsx
│       │   │   └── StatusBadge.tsx
│       │   │
│       │   ├── hooks/
│       │   │   ├── useSprint.ts
│       │   │   └── useTask.ts
│       │   │
│       │   ├── services/
│       │   │   ├── sprintApi.ts
│       │   │   └── taskApi.ts
│       │   │
│       │   └── types/
│       │       ├── sprint.type.ts
│       │       └── task.type.ts
│       │
│       ├── backlog/
│       │   ├── pages/
│       │   │   └── BacklogPage.tsx
│       │   ├── components/
│       │   ├── services/
│       │   └── types/
│       │
│       ├── sprint/
│       │   ├── pages/
│       │   │   └── SprintBoardPage.tsx
│       │   ├── components/
│       │   ├── services/
│       │   └── types/
│       │
│       ├── reports/
│       │   ├── pages/
│       │   ├── components/
│       │   ├── services/
│       │   └── types/
│       │
│       └── retrospective/
│           ├── pages/
│           ├── components/
│           ├── services/
│           └── types/
│
├── shared/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── index.ts
│   │   │
│   │   ├── Modal/
│   │   └── Input/
│   │
│   ├── services/
│   │   ├── apiClient.ts
│   │   └── axiosInstance.ts
│   │
│   ├── hooks/
│   │   └── useDebounce.ts
│   │
│   ├── types/
│   │   └── common.type.ts
│   │
│   ├── constants/
│   │   └── index.ts
│   │
│   └── utils/
│       ├── date.ts
│       └── helpers.ts
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── styles/
│
├── App.tsx
├── main.tsx
└── vite-env.d.ts
