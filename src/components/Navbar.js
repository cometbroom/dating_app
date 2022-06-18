import "../../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <nav>
      <div>
        <img src="submarine.svg" alt="An svg of a submarine" />
        <h2>Submarine Dating</h2>
      </div>
      <ul>
        <li>Features</li>
        <li>Testimonial</li>
        <li>Pricing</li>
      </ul>
    </nav>
  );
}
