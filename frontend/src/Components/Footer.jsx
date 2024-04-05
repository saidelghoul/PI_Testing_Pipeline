import "../../public/assets/css/animate.css";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/line-awesome.css";
import "../../public/assets/css/line-awesome-font-awesome.min.css";
import "../../public/assets/vendor/fontawesome-free/css/all.min.css";
import "../../public/assets/css/font-awesome.min.css";
import "../../public/assets/css/style.css";
import "../../public/assets/css/responsive.css";
import "../../public/assets/lib/slick/slick.css";
import "../../public/assets/lib/slick/slick-theme.css";

export default function Footer() {
  return (
    <>
      <div className="footy-sec" style={{ backgroundColor: "#e44d3a" }}>
        <div className="container">
          <ul>
            <li>
              <a href="help-center.html" title="">
                Help Center
              </a>
            </li>
            <li>
              <a href="about.html" title="">
                About
              </a>
            </li>
            <li>
              <a title="">Privacy Policy</a>
            </li>
            <li>
              <a href="#" title="">
                Community Guidelines
              </a>
            </li>
            <li>
              <a href="#" title="">
                Cookies Policy
              </a>
            </li>
            <li>
              <a href="#" title="">
                Career
              </a>
            </li>
            <li>
              <a href="forum.html" title="">
                Forum
              </a>
            </li>
            <li>
              <a href="#" title="">
                Language
              </a>
            </li>
            <li>
              <a href="#" title="">
                Copyright Policy
              </a>
            </li>
          </ul>
          <p>
            <img src="images/copy-icon.png" alt="" />
            Copyright 2019
          </p>
        </div>
      </div>
    </>
  );
}
