function About() {
  return (
    <div style={styles.container}>
      <h1>About This Project</h1>
      <p>
        This ATS Resume Analyzer uses NLP techniques to compare resumes with job descriptions.
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: "50px",
    color: "white",
    background: "#020617",
    height: "90vh",
  },
};

export default About;