const FooterUI = ({ loadTotLocations }) => {
  return (
    <div id="FooterUI">
      <nav id="footer-nav">
        <i className="material-icons" onClick={loadTotLocations}>
          autorenew
        </i>
      </nav>
    </div>
  );
};

export default FooterUI;
