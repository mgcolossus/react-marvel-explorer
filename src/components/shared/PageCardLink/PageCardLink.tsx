import React from "react";
import { Link } from "react-router-dom";

interface Thumbnail {
  path: string;
  extension: string;
}

interface PageCardLinkProps {
  thumbnail: Thumbnail;
  text: string;
  to: string;
}

export const PageCardLink = ({ thumbnail, text, to }: PageCardLinkProps) => (
  <Link className="card" to={to}>
    <div className="card__image-wrapper">
      <img src={`${thumbnail.path}/standard_xlarge.${thumbnail.extension}`} alt="thumbnail" />
    </div>
    <div className="card__footer">
      <div className="card__footer-text">{text}</div>
    </div>
  </Link>
);
