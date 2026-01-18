# Student Name: Esra Özdemir  
# Student ID: 220408014  
# Git: <https://github.com/esraozdemir6/FinalProject>

# StudyFlow

StudyFlow is a React Native mobile application developed as part of the Mobile Programming course to help students organize their study routines more effectively. The application brings together task management, study notes, and focus sessions in a single platform, reducing the need to use multiple tools.

The main purpose of StudyFlow is to improve time management and productivity by allowing users to plan their tasks, track progress, and stay focused during study sessions. The project demonstrates core mobile development concepts such as component-based design, state management, navigation, and user interface optimization, while maintaining a clean and user-friendly layout.


## Features

- User authentication (mock login)
- Task management with completion tracking
- Study notes section
- Pomodoro focus sessions
- User profile with selectable avatar icon
- Dark / Light mode support
- Local state management using stores

---

## Technologies Used

- React Native
- Expo
- JavaScript
- Zustand (state management)
- React Navigation

## Project Structure

studyflow/
├── src/
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   │
│   │   ├── app/
│   │   │   ├── DashboardScreen.js
│   │   │   ├── TasksScreen.js
│   │   │   ├── PomodoroScreen.js
│   │   │   ├── ProfileScreen.js
│   │   │   ├── AddTaskScreen.js
│   │   │   └── AddNoteScreen.js
│   │
│   ├── navigation/
│   │   ├── RootNavigation.js
│   │   ├── AppTabs.js
│   │   ├── AppStack.js
│   │   └── AuthStack.js
│   │
│   ├── store/
│   │   ├── authStore.js
│   │   └── themeStore.js
│   │
│   ├── components/
│   │   ├── PrimaryButton.js
│   │   ├── TaskCard.js
│   │   ├── NoteCard.js
│   │   ├── QuoteCard.js
│   │   └── SummaryCard.js
│   │
│   ├── theme/
│   │   └── colors.js
│
├── assets/
│   └── bear.png
│
├── App.js
├── package.json
└── README.md




## How to Run the App

1. **Prerequisites**
- Node.js 
- npm
- Expo Go 

2. **Clone the Repository**

git clone https://github.com/esraozdemir6/FinalProject  
cd StudyFlow

3. **Install Dependencies**

npm install

4. **Start the Application**

npx expo start --tunnel

5. **Run the App**
- Scan the QR code using Expo Go on your mobile device  

