const BaseURL: string = 'https://jsonplaceholder.typicode.com/users/';
const url: URL = new URL(location.href);
const iD: string = url.searchParams.get('userId');
const main: HTMLElement = document.body.getElementsByTagName('main')[0];
const infoDiv: Element = document.body.getElementsByClassName('info')[0];

const h2Ud: HTMLHeadingElement = document.createElement('h2');
h2Ud.innerText = 'User Details';

const list: HTMLUListElement = document.createElement('ul');
list.classList.add('list');
infoDiv.append(h2Ud, list);
fetch(BaseURL + iD)
    .then(value => value.json())
    .then(user => {
        const tidyUser: string[] = JSON.stringify(user)
            .replace(/[{}"]/g, '')
            .replace(/:/g, ': ')
            .split(',');

        for (const item of tidyUser) {
            const li: HTMLLIElement = document.createElement('li');
            li.innerText = item.charAt(0).toUpperCase() + item.slice(1) + ';';
            list.appendChild(li);
        }
    })

const divForBtn: HTMLDivElement = document.createElement('div');
divForBtn.classList.add('divForBtn');

const btnPosts: HTMLButtonElement = document.createElement('button');
btnPosts.classList.add('btnPosts');
btnPosts.innerText = 'Show posts of current user';

divForBtn.appendChild(btnPosts);

const postsDiv: HTMLDivElement = document.createElement('div');
postsDiv.classList.add('posts');
main.append(divForBtn, postsDiv);

let clicked: boolean = false;

const toggleContent = (): void => {
    if (clicked) {
        btnPosts.innerText = 'Show posts of current user';
        postsDiv.innerHTML = null;
    } else {
        btnPosts.innerText = 'Hide Posts';
        const h2Posts: HTMLHeadingElement = document.createElement('h2');
        h2Posts.id = 'h2Posts';
        h2Posts.innerText = "Post's Titles";
        postsDiv.appendChild(h2Posts);
        fetch(BaseURL + iD + '/posts')
            .then(value => value.json())
            .then(posts => posts.forEach(post => {
                const div: HTMLDivElement = document.createElement('div');
                div.classList.add('post');
                const p: HTMLParagraphElement = document.createElement('p');
                p.innerText = `"${post.title}"`;

                const btn: HTMLButtonElement = document.createElement('button');
                btn.classList.add('btnPost');
                btn.innerText = 'About the post';
                btn.onclick = ((): void => {
                    open(`../PostDetails/post-details.html?post=${JSON.stringify(post)}`);
                })
                div.append(p, btn);
                postsDiv.appendChild(div);
            }))
            .catch(reason => console.error(reason))
    }
    clicked = !clicked;
}
btnPosts.addEventListener("click", toggleContent);