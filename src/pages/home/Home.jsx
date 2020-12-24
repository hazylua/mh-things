import React from "react";

import { Layout } from "../../components/Layout";

import "./Home.css";

const Home = () => (
  <Layout>
    <div className="container">
      <section>
        <h3>About</h3>
        <p>
          A webpage with a collection of assorted tools related to the Monster
          Hunter series.
        </p>
        <p>
          At the moment the page is incomplete, but there's a filter page that
          let's you find the location of a skill from the decoration filter
          page. An armor set searcher is also planned to be implemented.
        </p>
      </section>
      <section>
        <h3>Other</h3>

        <a href="https://mhworld.kiranico.com/">
          https://mhworld.kiranico.com/
        </a>
        <br />
        <a href="https://mhw.wiki-db.com/sim/?hl=en">
          https://mhw.wiki-db.com/sim/?hl=en
        </a>
        <br />
        <a href="https://mhwleaderboards.com/">https://mhwleaderboards.com/</a>
      </section>
    </div>
  </Layout>
);

export default Home;
