import React, { Fragment } from "react";
import { Router } from "@reach/router";

import Artwork from "./artwork";
import Artworks from "./artworks";

export default function Pages() {
  return (
    <Router primary={false} component={Fragment}>
      <Artworks path="/artworks" />
      <Artwork path="/artwork/:artworkId" />
    </Router>
  );
}
