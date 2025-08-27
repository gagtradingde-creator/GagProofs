// Modal
const modal = document.getElementById("post-modal");
const openBtn = document.getElementById("new-post-btn");
const closeBtn = document.querySelector(".close");

openBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }

// Posts
let posts = JSON.parse(localStorage.getItem("posts")) || [];
const postsContainer = document.getElementById("posts-container");

function renderPosts() {
    postsContainer.innerHTML = "";
    posts.forEach((post, index) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerHTML = `
            <img src="${post.image}" alt="Post Image">
            <div class="post-content">
                <div class="post-title">${post.title}</div>
                <div class="post-comment">${post.comment}</div>
                <div class="post-actions">
                    <div>
                        <span class="vote-btn" onclick="vote(${index},1)">⬆️ ${post.upvotes}</span>
                        <span class="vote-btn" onclick="vote(${index},-1)">⬇️ ${post.downvotes}</span>
                    </div>
                </div>
                <div class="comments">
                    ${post.comments.map(c => `<div class="comment">💬 ${c}</div>`).join('')}
                    <input type="text" placeholder="Kommentar hinzufügen..." onkeydown="addComment(event, ${index})">
                </div>
            </div>
        `;
        postsContainer.appendChild(postDiv);
    });
}

function vote(index, value) {
    if(value === 1) posts[index].upvotes++;
    else posts[index].downvotes++;
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

function addComment(event, index) {
    if(event.key === "Enter") {
        const text = event.target.value.trim();
        if(text) {
            posts[index].comments.push(text);
            localStorage.setItem("posts", JSON.stringify(posts));
            renderPosts();
        }
    }
}

// Neues Post erstellen
document.getElementById("submit-post").onclick = () => {
    const title = document.getElementById("post-title").value;
    const image = document.getElementById("post-image").value;
    const comment = document.getElementById("post-comment").value;

    if(title && image) {
        posts.unshift({title, image, comment, upvotes: 0, downvotes: 0, comments: []});
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
        modal.style.display = "none";
        document.getElementById("post-title").value = "";
        document.getElementById("post-image").value = "";
        document.getElementById("post-comment").value = "";
    } else {
        alert("Titel und Bild sind erforderlich!");
    }
}

renderPosts();
