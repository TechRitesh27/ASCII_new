import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      
      {/* HERO SECTION */}
      <section className="hero">
        <h1>🏆 ASCII – Student of the Year</h1>
        <p>
          Recognizing excellence in academics, leadership, innovation,
          and contribution to the department.
        </p>

        <div className="hero-buttons">
          <Link to="/login" className="btn-primary">
            Login
          </Link>

          <Link to="/register" className="btn-outline">
            Student Register
          </Link>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about">
        <h2>About SOY</h2>
        <p>
          The Student of the Year award is designed to identify and
          reward outstanding students from the Computer Engineering
          department based on:
        </p>

        <ul>
          <li>📚 Academic Performance</li>
          <li>💡 Major Projects & Innovation</li>
          <li>🏢 Internships & Industry Exposure</li>
          <li>🏅 Achievements & Activities</li>
          <li>👑 Leadership & Discipline</li>
        </ul>
      </section>

      {/* PROCESS SECTION */}
      <section className="process">
        <h2>How It Works</h2>

        <div className="process-grid">
          <div className="process-card">
            <h3>1️⃣ Nomination</h3>
            <p>Eligible BE students submit their nomination form.</p>
          </div>

          <div className="process-card">
            <h3>2️⃣ Faculty Evaluation</h3>
            <p>Multiple faculty members evaluate candidates.</p>
          </div>

          <div className="process-card">
            <h3>3️⃣ Student Voting</h3>
            <p>Students vote for shortlisted candidates.</p>
          </div>

          <div className="process-card">
            <h3>4️⃣ Final Result</h3>
            <p>
              Final score = 80% Faculty + 20% Student Voting.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} ASCII – Computer Engineering</p>
      </footer>
    </div>
  );
};

export default Home;
