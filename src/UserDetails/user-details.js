const BaseURL = 'https://jsonplaceholder.typicode.com/users/';
const url = new URL(location.href);
const iD = url.searchParams.get('userId');
const main = document.body.getElementsByTagName('main')[0];
const infoDiv = document.body.getElementsByClassName('info')[0];
const h2Ud = document.createElement('h2');
h2Ud.innerText = 'User Details';
infoDiv.append(h2Ud);
const iterObj = (obj) => {
    const list = document.createElement('ul');
    list.classList.add('list');
    for (const key in obj) {
        const li = document.createElement('li');
        li.textContent = key + ':';
        if (typeof obj[key] === 'object') {
            li.appendChild(iterObj(obj[key]));
        }
        else {
            li.textContent = `${key}: ${obj[key]}`;
        }
        list.appendChild(li);
    }
    return list;
};
fetch(BaseURL + iD)
    .then(value => value.json())
    .then(user => infoDiv.appendChild(iterObj(user)))
    .catch(reason => console.error(reason));
const divForBtn = document.createElement('div');
divForBtn.classList.add('divForBtn');
const btnPosts = document.createElement('button');
btnPosts.classList.add('btnPosts');
btnPosts.innerText = 'Show posts of current user';
divForBtn.appendChild(btnPosts);
const postsDiv = document.createElement('div');
postsDiv.classList.add('posts');
main.append(divForBtn, postsDiv);
let clicked = false;
const toggleContent = () => {
    if (clicked) {
        btnPosts.innerText = 'Show posts of current user';
        postsDiv.innerHTML = null;
    }
    else {
        btnPosts.innerText = 'Hide Posts';
        const h2Posts = document.createElement('h2');
        h2Posts.id = 'h2Posts';
        h2Posts.innerText = "Post's Titles";
        postsDiv.appendChild(h2Posts);
        fetch(BaseURL + iD + '/posts')
            .then(value => value.json())
            .then(posts => posts.forEach(post => {
            const div = document.createElement('div');
            div.classList.add('post');
            const p = document.createElement('p');
            p.innerText = `"${post.title}"`;
            const btn = document.createElement('button');
            btn.classList.add('btnPost');
            btn.innerText = 'About the post';
            btn.onclick = (() => {
                open(`../PostDetails/post-details.html?post=${JSON.stringify(post)}`);
            });
            div.append(p, btn);
            postsDiv.appendChild(div);
        }))
            .catch(reason => console.error(reason));
    }
    clicked = !clicked;
};
btnPosts.addEventListener("click", toggleContent);
