import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import "../../styles/Overview.css";

const Overview = () => {
  const contributionData = [
    { day: 'Mon', count: 5 },
    { day: 'Tue', count: 8 },
    { day: 'Wed', count: 12 },
    { day: 'Thu', count: 6 },
    { day: 'Fri', count: 9 },
    { day: 'Sat', count: 4 },
    { day: 'Sun', count: 2 },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard Overview | MergeMate</title>
      </Helmet>
      <div className="overview-container mt-5">
        {/* Hero Section */}
        <motion.div 
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Welcome Back, John!</h1>
          <p className="subtitle">Here's what's happening with your projects</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {[
            { title: 'Total Commits', value: '284', icon: 'bi-code-square' },
            { title: 'Pull Requests', value: '12', icon: 'bi-git' },
            { title: 'Issues Resolved', value: '47', icon: 'bi-check-circle' },
            { title: 'Contributions', value: '156', icon: 'bi-graph-up' },
          ].map((stat, index) => (
            <motion.div 
              className="stat-card"
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <i className={`bi ${stat.icon}`}></i>
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Activity Section */}
        <div className="activity-section">
          <div className="contribution-graph">
            <h2>Contribution Activity</h2>
            <div className="graph-container">
              {contributionData.map((day, index) => (
                <motion.div 
                  className="day-column"
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${day.count * 10}px` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="day-bar" style={{ height: `${day.count * 10}px` }}></div>
                  <span>{day.day}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="recent-activities">
            <h2>Recent Activities</h2>
            {[
              { action: 'Merged Pull Request', project: 'Frontend Updates', time: '2h ago' },
              { action: 'Created Issue', project: 'Bug Fixes', time: '4h ago' },
              { action: 'Pushed Commits', project: 'API Integration', time: '6h ago' },
            ].map((activity, index) => (
              <motion.div 
                className="activity-card"
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="activity-icon">
                  <i className="bi bi-git"></i>
                </div>
                <div className="activity-details">
                  <h4>{activity.action}</h4>
                  <p>{activity.project}</p>
                  <span>{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview; 