import React, { useState, useEffect } from 'react';
import { TourProvider, useTour } from '@reactour/tour';
import './styles.css';

const TOUR_STEPS = [
  {
    selector: 'body',
    content: 'Welcome to your Student Dashboard! This guided tour will show you around. Click the bouncing arrow to continue.',
  },
  {
    selector: '.nav-profile',
    content: 'This is your "Profile Section" in the top-right corner. Here you can see your name and access settings.',
  },
  {
    selector: '.card-assignments',
    content: 'This card shows your "Upcoming Assignments". Check due dates and stay on top of your work.',
  },
  {
    selector: '.card-grades',
    content: 'View your "Latest Grades" here. Track your academic progress across all subjects.',
  },
  {
    selector: '.btn-settings',
    content: 'Click the "Settings" button anytime to customize your dashboard preferences.',
  },
];

const LOCAL_STORAGE_KEY = 'tour_completed';

function CustomNavigation() {
  const { currentStep, steps, setCurrentStep, setIsOpen } = useTour();
  const isLastStep = currentStep === steps.length - 1;

  const nextStep = () => {
    if (isLastStep) {
      setIsOpen(false);
      localStorage.setItem(LOCAL_STORAGE_KEY, 'yes');
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div style={{
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px'
    }}>
      <div style={{
        fontSize: '16px',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '10px'
      }}>
        Click the arrow to continue
      </div>
      <button
        onClick={nextStep}
        style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
          animation: 'bounce 1s infinite',
          transform: 'translateZ(0)',
          transition: 'all 0.3s ease'
        }}
      >
        {isLastStep ? '✓' : '➜'}
      </button>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
}

function StudentDashboardContent() {
  const { setIsOpen, setCurrentStep, setSteps } = useTour();
  const [tourCompleted, setTourCompleted] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem(LOCAL_STORAGE_KEY) === 'yes';
    setTourCompleted(completed);
    setSteps(TOUR_STEPS);
  }, [setSteps]);

  const startTutorial = () => {
    setTourCompleted(true);
    setIsOpen(true);
    setCurrentStep(0);
  };

  const skipWelcome = () => {
    setTourCompleted(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, 'yes');
  };

  return (
    <div className="dashboard-container">
      {!tourCompleted && (
        <div className="welcome-modal">
          <h1>👋 Welcome, Student!</h1>
          <p>It looks like this is your first time here. Would you like a quick guided tour of your dashboard?</p>
          <button onClick={startTutorial} className="btn-primary">Start Tutorial</button>
          <button onClick={skipWelcome} className="btn-secondary">Skip for Now</button>
        </div>
      )}

      <header className="dashboard-header">
        <h2>Student Dashboard</h2>
        <div className="nav-profile">
          <span>John Doe</span>
          <button className="btn-settings">Settings</button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="card-assignments">
          <h3>Upcoming Assignments</h3>
          <p>Math - Chapter 3 Review (Due Today)</p>
          <p>Science - Lab Report (Due Tomorrow)</p>
        </section>

        <section className="card-grades">
          <h3>Latest Grades</h3>
          <p>History: A-</p>
          <p>English: B+</p>
        </section>
      </main>
    </div>
  );
}

function StudentDashboard() {
  return (
    <TourProvider
      steps={TOUR_STEPS}
      showNavigation={true}
      showPrevNextButtons={false}
      showCloseButton={false}
      showDots={false}
      padding={20}
      disableInteraction={false}
      components={{ Navigation: CustomNavigation }}
      styles={{
        popover: (base) => ({
          ...base,
          '--reactour-accent': '#667eea',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          padding: '20px',
          maxWidth: '350px',
          fontSize: '16px',
          fontFamily: "'Inter', sans-serif",
          color: '#2c3e50',
        }),
        badge: (base) => ({
          ...base,
          background: '#667eea',
          padding: '4px 10px'
        }),
        maskArea: (base) => ({
          ...base,
          rx: 16,
        }),
        maskWrapper: (base) => ({
          ...base,
          color: 'rgba(102, 126, 234, 0.5)',
        }),
        controls: (base) => ({
          ...base,
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }),
        button: (base, { primary }) => ({
          ...base,
          background: primary ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255, 255, 255, 0.8)',
          color: primary ? 'white' : '#34495e',
          border: primary ? 'none' : '1px solid rgba(52, 73, 94, 0.2)',
          borderRadius: '25px',
          padding: '10px 20px',
          fontWeight: '500',
          fontFamily: "'Inter', sans-serif",
          transition: 'all 0.3s ease',
          boxShadow: primary ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none',
          cursor: 'pointer',
          outline: 'none',
        }),
        close: (base) => ({
          ...base,
          color: '#34495e',
          opacity: 0.7,
          right: '15px',
          top: '15px',
          width: '20px',
          height: '20px',
        }),
        dot: (base, { current }) => ({
          ...base,
          background: current ? '#667eea' : 'rgba(102, 126, 234, 0.3)',
        }),
        prev: (base) => ({
          ...base,
          display: 'block',
        }),
        next: (base) => ({
          ...base,
          display: 'block',
        }),
      }}
    >
      <StudentDashboardContent />
    </TourProvider>
  );
}

export default StudentDashboard;