function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} Sarah Malak. All rights reserved.</p>
    </footer>
  );
}

export default Footer;