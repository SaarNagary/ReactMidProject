import React, { useEffect } from "react";
import { getAll } from "../src/utils";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

function PostComp({ posts}) {
  

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", height : "15rem", overflow : "auto" }}>
      {posts.map(post => (
        <div key={post.id} style={{
          border: "1px solid gray",
          padding: "10px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center"
        }}>
          <div style={{ flex: 1 }}>
            <strong>Title:</strong> {post.title}<br />
            <strong>Body:</strong> {post.body}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostComp;
