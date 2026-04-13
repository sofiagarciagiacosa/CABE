function AddProjectCard({ onClick }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div
        className="project-card add-project-btn d-flex align-items-center justify-content-center"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <i className="bi bi-plus-lg" style={{ fontSize: "2rem" }}></i>
      </div>
    </div>
  );
}

export default AddProjectCard;