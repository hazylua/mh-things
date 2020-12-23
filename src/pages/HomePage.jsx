import React from "react";
import { Navbar } from "../components/Navbar";

const HomePage = () => (
  <div>
    <Navbar />
    <div>
      <div>
        <h4>What is this?</h4>
        <div>
          <p>
            A webpage with a collection of assorted tools related to the Monster
            Hunter series.
          </p>
          <p>
            At the moment the page is incomplete, but there's a filter page that
            let's you find the location of a skill from the decoration filter
            page. An armor set searcher is also planned to be implemented.
          </p>
        </div>
      </div>
      <div>
        <div>
          <h4>Other</h4>
          <div style={{ display: "grid" }}>
            <a href="https://mhworld.kiranico.com/">
              https://mhworld.kiranico.com/
            </a>
            <a href="https://mhw.wiki-db.com/sim/?hl=en">
              https://mhw.wiki-db.com/sim/?hl=en
            </a>
            <a href="https://mhwleaderboards.com/">
              https://mhwleaderboards.com/
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
