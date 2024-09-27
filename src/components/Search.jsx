import Fuse from "fuse.js";
import { useState } from "react";
import "./Search.css";

const options = {
  keys: ["data.title", "data.excerpt", "slug", "id", "body"],
  includeMatches: true,
  findAllMatches: true,
  threshold: 0.3,
  ignoreLocation: true,
};

function Search({ searchList }) {
  const styles = {
    h1: {
      marginBottom: "2.25rem",
      color: "var(--theme-lilac)",
    },
    section: {
      marginBottom: "4rem",
    },
    ul: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      columnGap: "2rem",
      rowGap: "2.5rem",
      listStyleType: "none",
      margin: 0,
      padding: 0,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "2rem",
      color: "var(--theme-blue)",
      marginTop: "1.5rem",
    },
    h3Hover: {
      color: "var(--theme-lilac)",
    },
    p: {
      color: "var(--theme-text)",
      fontSize: "1rem",
      marginTop: "0.5rem",
    },
    a: {
      textDecoration: "none",
    },
    "@media (max-width: 480px)": {
      ul: {
        gridTemplateColumns: "1fr",
        rowGap: "4rem",
      },
      li: {
        width: "100%",
        flexDirection: "column",
      },
      "li a": {
        maxWidth: "100%",
      },
      "li a:first-child": {
        width: "100%",
      },
      "li p": {
        marginBottom: 0,
      },
      "h3.title": {
        fontSize: "1.5rem",
        lineHeight: "2rem",
        marginBottom: "0.5rem",
        marginTop: "2rem",
      },
    },
  };
  let results, posts;
  const [query, setQuery] = useState("");

  const fuse = new Fuse(searchList, options);

  results = fuse.search(query);
  posts = results.map((result) => result.item).slice(0, 5);

  function handleOnSearch({ target = {} }) {
    const { value } = target;
    setQuery(value);
  }

  return (
    <div className="container">
      <input
        className="input"
        type="text"
        value={query}
        onChange={handleOnSearch}
        placeholder="Search..."
      />
      {query.length > 2 && (
        <p>
          Found {posts.length} {posts.length === 1 ? "result" : "results"} for "
          {query}"
        </p>
      )}
      <ul className="results">
        {posts &&
          posts.map((post) => (
            <li className="result">
              <a className="link" href={`/${post.collection}/${post.slug}/`}>
                {post.data.thumbnailImage && (
                  <img src={post.data.thumbnailImage} alt="" />
                )}
              </a>
              <a className="link" href={`/${post.collection}/${post.slug}/`}>
                <h3 className="title">{post.data.title}</h3>
                {post.data.excerpt && (
                  <p className="excerpt">{post.data.excerpt}</p>
                )}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Search;
