import React, { useState, useRef } from "react";
import "../../styles/Discover.css";
import { Helmet } from "react-helmet-async";

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Mock projects data
  const projects = [
    {
      id: 1,
      title: "React Component Library",
      description: "A modern component library built with React and TypeScript",
      category: "frontend",
      tags: ["React", "TypeScript", "UI"],
      stars: 245,
      contributors: 12,
      owner: {
        name: "Sarah Chen",
        avatar: "https://github.com/github.png",
      },
    },
    {
      id: 2,
      title: "AI Code Assistant",
      description:
        "Machine learning powered code completion and suggestion engine",
      category: "ai/ml",
      tags: ["Python", "TensorFlow", "NLP"],
      stars: 892,
      contributors: 24,
      owner: {
        name: "Alex Rodriguez",
        avatar: "https://github.com/github.png",
      },
    },
    {
      id: 3,
      title: "Cloud Native Backend",
      description: "Scalable microservices architecture with Kubernetes and Go",
      category: "backend",
      tags: ["Go", "Kubernetes", "Microservices"],
      stars: 567,
      contributors: 18,
      owner: {
        name: "Mike Johnson",
        avatar: "https://github.com/github.png",
      },
    },
    {
      id: 4,
      title: "Mobile Chat App",
      description:
        "Cross-platform messaging app built with React Native and Firebase",
      category: "mobile",
      tags: ["React Native", "Firebase", "Mobile"],
      stars: 334,
      contributors: 8,
      owner: {
        name: "Emma Wilson",
        avatar: "https://github.com/github.png",
      },
    },
    {
      id: 5,
      title: "DevOps Automation Tools",
      description:
        "Collection of scripts and tools for CI/CD pipeline automation",
      category: "backend",
      tags: ["Python", "Docker", "Jenkins"],
      stars: 423,
      contributors: 15,
      owner: {
        name: "David Kim",
        avatar: "https://github.com/github.png",
      },
    },
  ];

  const handleSwipeStart = (e) => {
    setIsDragging(true);
    const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;
    setDragStart({ x: clientX, y: clientY });
  };

  const handleSwipeMove = (e) => {
    if (!isDragging) return;

    const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;

    const offsetX = clientX - dragStart.x;
    const offsetY = clientY - dragStart.y;

    setDragOffset({ x: offsetX, y: offsetY });

    // Calculate rotation based on drag distance
    const rotate = offsetX * 0.1;
    cardRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`;
  };

  const handleSwipeEnd = () => {
    if (!isDragging) return;

    const threshold = 100; // minimum distance to trigger swipe

    if (Math.abs(dragOffset.x) > threshold) {
      // Swipe was strong enough
      const direction = dragOffset.x > 0 ? "right" : "left";
      handleSwipeComplete(direction);
    } else {
      // Reset card position
      cardRef.current.style.transform = "translate(0px, 0px) rotate(0deg)";
    }

    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleSwipeComplete = (direction) => {
    const finalX =
      direction === "right" ? window.innerWidth : -window.innerWidth;
    cardRef.current.style.transform = `translate(${finalX}px, ${
      dragOffset.y
    }px) rotate(${direction === "right" ? 45 : -45}deg)`;

    // Move to next card after animation
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      cardRef.current.style.transform = "translate(0px, 0px) rotate(0deg)";
    }, 300);
  };

  const handleLike = () => {
    handleSwipeComplete("right");
  };

  const handleDislike = () => {
    handleSwipeComplete("left");
  };

  return (
    <>
      <Helmet>
        <title>Discover | MergeMate</title>
      </Helmet>
      <div className="d-flex flex-column flex-lg-row">
        {/* Left Sidebar - Filters */}
        <div className="sidebar-wrapper mt-4">
          <div className="p-4">
            <h5 className="mb-4 fw-bold">Discover Projects</h5>

            {/* Search Bar */}
            <div className="search-container mb-4">
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="mb-4">
              <h6 className="mb-3">Categories</h6>
              <div className="d-flex flex-column gap-2">
                {[
                  "All",
                  "Frontend",
                  "Backend",
                  "Full Stack",
                  "Mobile",
                  "AI/ML",
                ].map((category) => (
                  <button
                    key={category}
                    className={`btn category-btn ${
                      selectedCategory === category.toLowerCase()
                        ? "active"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="mb-4">
              <h6 className="mb-3">Quick Filters</h6>
              <div className="d-flex flex-wrap gap-2">
                {["Most Stars", "Recently Added", "Active"].map((filter) => (
                  <span key={filter} className="filter-badge">
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content-wrapper mt-5">
          <div className="custom-cards-container">
            {currentIndex < projects.length && (
              <div
                ref={cardRef}
                className="custom-swipe-card"
                onMouseDown={handleSwipeStart}
                onMouseMove={handleSwipeMove}
                onMouseUp={handleSwipeEnd}
                onMouseLeave={handleSwipeEnd}
                onTouchStart={handleSwipeStart}
                onTouchMove={handleSwipeMove}
                onTouchEnd={handleSwipeEnd}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={projects[currentIndex].owner.avatar}
                      alt={projects[currentIndex].owner.name}
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    <div>
                      <h6 className="mb-0">{projects[currentIndex].title}</h6>
                      <small className="text-muted">
                        by {projects[currentIndex].owner.name}
                      </small>
                    </div>
                  </div>
                  <button className="btn btn-outline-primary btn-sm">
                    Join
                  </button>
                </div>
                <p className="project-description">
                  {projects[currentIndex].description}
                </p>
                <div className="d-flex gap-2 mb-3">
                  {projects[currentIndex].tags.map((tag) => (
                    <span key={tag} className="tag-badge">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="d-flex justify-content-center gap-5 mt-4">
                  <button
                    className="btn btn-light rounded-circle p-3"
                    onClick={handleDislike}
                  >
                    <i className="bi bi-x fs-2 text-danger"></i>
                  </button>
                  <button
                    className="btn btn-light rounded-circle p-3"
                    onClick={handleLike}
                  >
                    <i className="bi bi-heart fs-2 text-success"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Discover;
